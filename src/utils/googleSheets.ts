import type { Certificate, ExperienceItem, Project, ResumeInfo } from '../types/portfolio';
import { clean, safeUrl, slugify, splitList, toBoolean } from './parse';

/**
 * Public, read-only Google Sheet used as the CMS for this portfolio.
 * Only a public sheet id is referenced here — no credentials of any kind.
 */
export const SHEET_ID: string =
  import.meta.env.VITE_GOOGLE_SHEET_ID as string ||
  '1-vYObH2VKo9MLaLqE5CktEUtlxZhYs10GnUENQRRViI';

export const SHEET_NAMES = {
  projects: 'Projects',
  certificates: 'Certificates',
  experience: 'Experience',
  resume: 'Resume'
} as const;

export type SheetRow = Record<string, string>;

interface GvizCell {
  v: string | number | boolean | null;
  f?: string;
}

interface GvizRow {
  c: Array<GvizCell | null>;
}

interface GvizTable {
  cols: Array<{id: string;label: string;}>;
  rows: GvizRow[];
}

interface GvizResponse {
  status: string;
  table?: GvizTable;
}

const CACHE_TTL_MS = 5 * 60 * 1000;
const cache = new Map<string, {at: number;rows: SheetRow[];}>();

function normalizeKey(label: string): string {
  return label.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function cellToString(cell: GvizCell | null): string {
  if (!cell) return '';
  if (typeof cell.f === 'string' && cell.f.length > 0) return cell.f.trim();
  if (cell.v === null || cell.v === undefined) return '';
  if (typeof cell.v === 'boolean') return cell.v ? 'TRUE' : 'FALSE';
  return String(cell.v).trim();
}

function buildUrl(sheetName: string): string {
  const base = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq`;
  const params = new URLSearchParams({
    tqx: 'out:json',
    headers: '1',
    sheet: sheetName
  });
  return `${base}?${params.toString()}`;
}

/** Fallback reader for the same public sheet, used only if the primary endpoint is unreachable. */
async function fetchViaOpenSheet(sheetName: string): Promise<SheetRow[]> {
  const response = await fetch(`https://opensheet.elk.sh/${SHEET_ID}/${encodeURIComponent(sheetName)}`);
  if (!response.ok) throw new Error(`Unable to read the "${sheetName}" sheet.`);
  const payload: unknown = await response.json();
  if (!Array.isArray(payload)) return [];
  const rows: SheetRow[] = [];
  payload.forEach((entry) => {
    if (typeof entry !== 'object' || entry === null) return;
    const record: SheetRow = {};
    let hasValue = false;
    Object.entries(entry as Record<string, unknown>).forEach(([key, value]) => {
      const normalized = normalizeKey(key);
      if (!normalized) return;
      const text = value === null || value === undefined ? '' : String(value).trim();
      if (text) hasValue = true;
      record[normalized] = text;
    });
    if (hasValue) rows.push(record);
  });
  return rows;
}

export async function fetchSheetRows(sheetName: string): Promise<SheetRow[]> {
  const cached = cache.get(sheetName);
  if (cached && Date.now() - cached.at < CACHE_TTL_MS) return cached.rows;

  try {
    const rows = await fetchGvizRows(sheetName);
    cache.set(sheetName, { at: Date.now(), rows });
    return rows;
  } catch {
    const rows = await fetchViaOpenSheet(sheetName);
    cache.set(sheetName, { at: Date.now(), rows });
    return rows;
  }
}

/**
 * Reads only cell A1 from the Resume sheet.
 * The sheet is expected to have just the resume URL in A1 — no header row needed.
 * Falls back to scanning all rows if A1 doesn't contain a URL.
 */
export async function fetchResumeUrl(): Promise<ResumeInfo> {
  const CACHE_KEY = '__resume_url__';
  const cached = cache.get(CACHE_KEY);
  if (cached && Date.now() - cached.at < CACHE_TTL_MS && cached.rows.length > 0) {
    return { url: cached.rows[0]['url'] };
  }

  try {
    const base = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq`;
    const params = new URLSearchParams({
      tqx: 'out:json',
      sheet: SHEET_NAMES.resume,
      range: 'A1',
    });
    const response = await fetch(`${base}?${params.toString()}`);
    if (!response.ok) throw new Error('Resume sheet fetch failed');

    const text = await response.text();
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start === -1 || end === -1) throw new Error('Resume parse failed');

    const payload = JSON.parse(text.slice(start, end + 1)) as GvizResponse;
    const row0 = payload.table?.rows?.[0];
    const cell = row0?.c?.[0];
    const rawValue = cellToString(cell ?? null);
    const url = safeUrl(rawValue) ?? undefined;

    // Cache the result
    if (url) {
      cache.set(CACHE_KEY, { at: Date.now(), rows: [{ url }] });
    }

    return { url };
  } catch {
    // Fallback: scan all rows for any URL
    try {
      const rows = await fetchSheetRows(SHEET_NAMES.resume);
      return parseResume(rows);
    } catch {
      return {};
    }
  }
}

async function fetchGvizRows(sheetName: string): Promise<SheetRow[]> {
  const response = await fetch(buildUrl(sheetName));
  if (!response.ok) {
    throw new Error(`Unable to read the "${sheetName}" sheet.`);
  }

  const text = await response.text();
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start === -1 || end === -1) {
    throw new Error(`Unexpected response for the "${sheetName}" sheet.`);
  }

  let payload: GvizResponse;
  try {
    payload = JSON.parse(text.slice(start, end + 1)) as GvizResponse;
  } catch {
    throw new Error(`Could not parse the "${sheetName}" sheet.`);
  }

  if (payload.status === 'error') {
    throw new Error(`The "${sheetName}" sheet could not be read.`);
  }

  const table = payload.table;
  if (!table || !Array.isArray(table.rows)) return [];

  let headers = table.cols.map((col) => normalizeKey(col.label ?? ''));
  let dataRows = table.rows;

  // Some sheets return unlabelled columns — fall back to the first data row.
  if (headers.every((header) => header.length === 0) && dataRows.length > 0) {
    headers = dataRows[0].c.map((cell) => normalizeKey(cellToString(cell)));
    dataRows = dataRows.slice(1);
  }

  const rows: SheetRow[] = [];
  dataRows.forEach((row) => {
    if (!row || !Array.isArray(row.c)) return;
    const record: SheetRow = {};
    let hasValue = false;
    row.c.forEach((cell, index) => {
      const key = headers[index];
      if (!key) return;
      const value = cellToString(cell);
      if (value) hasValue = true;
      record[key] = value;
    });
    if (hasValue) rows.push(record);
  });

  cache.set(sheetName, { at: Date.now(), rows });
  return rows;
}

function pick(row: SheetRow, keys: string[]): string | undefined {
  for (const key of keys) {
    const value = row[key];
    const cleaned = clean(value);
    if (cleaned) return cleaned;
  }
  return undefined;
}

export function parseProjects(rows: SheetRow[]): Project[] {
  return rows.
  map((row, index) => {
    const title = pick(row, ['title', 'name', 'project', 'projecttitle']);
    if (!title) return null;
    const rawId = pick(row, ['id', 'sno', 'serialno']);
    const project: Project = {
      id: rawId ? slugify(rawId) || slugify(title) : slugify(title) || `project-${index + 1}`,
      title,
      description: pick(row, ['description', 'summary', 'about']) ?? '',
      image: safeUrl(pick(row, ['image', 'imageurl', 'thumbnail'])),
      technologies: splitList(pick(row, ['technologies', 'techstack', 'tech']), /[;,|]/),
      githubUrl: safeUrl(pick(row, ['githuburl', 'github', 'repo', 'repository'])),
      liveUrl: safeUrl(pick(row, ['liveurl', 'live', 'demo', 'demourl'])),
      category: pick(row, ['category', 'type']),
      featured: toBoolean(pick(row, ['featured'])),
      features: splitList(pick(row, ['features', 'keyfeatures']))
    };
    return project;
  }).
  filter((project): project is Project => project !== null);
}

export function parseCertificates(rows: SheetRow[]): Certificate[] {
  return rows.
  map((row, index) => {
    const title = pick(row, ['title', 'name', 'certificate', 'certificatetitle']);
    if (!title) return null;
    const rawId = pick(row, ['sno', 'id', 'serialno']);
    const certificate: Certificate = {
      id: rawId ? `certificate-${slugify(rawId)}` : slugify(title) || `certificate-${index + 1}`,
      title,
      issuer: pick(row, ['issuer', 'provider', 'organization', 'issuedby']),
      date: pick(row, ['date', 'issuedate', 'issued']),
      image: safeUrl(pick(row, ['image', 'imageurl', 'thumbnail'])),
      link: safeUrl(pick(row, ['link', 'url', 'certificatelink', 'credentialurl'])),
      category: pick(row, ['category', 'type'])
    };
    return certificate;
  }).
  filter((certificate): certificate is Certificate => certificate !== null);
}

export function parseExperience(rows: SheetRow[]): ExperienceItem[] {
  return rows.
  map((row, index) => {
    const title = pick(row, ['title', 'role', 'position']);
    const company = pick(row, ['company', 'organization', 'employer']);
    if (!title && !company) return null;
    const rawId = pick(row, ['sno', 'id', 'serialno']);
    const item: ExperienceItem = {
      id: rawId ? `experience-${slugify(rawId)}` : `experience-${index + 1}`,
      title: title ?? company ?? '',
      company: title ? company : undefined,
      period: pick(row, ['period', 'duration', 'dates']),
      location: pick(row, ['location', 'place', 'city']),
      contributions: splitList(pick(row, ['keycontributions', 'contributions', 'responsibilities']))
    };
    return item;
  }).
  filter((item): item is ExperienceItem => item !== null);
}

/** The Resume sheet layout is not fixed, so the first valid URL found is used. */
export function parseResume(rows: SheetRow[]): ResumeInfo {
  for (const row of rows) {
    for (const value of Object.values(row)) {
      const url = safeUrl(value);
      if (url) {
        return {
          url,
          label: pick(row, ['title', 'name', 'label']),
          updated: pick(row, ['updated', 'lastupdated', 'date'])
        };
      }
    }
  }
  return {};
}

export function clearSheetCache(): void {
  cache.clear();
}