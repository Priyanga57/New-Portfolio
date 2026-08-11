import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { Certificate, ExperienceItem, LoadStatus, PortfolioData, Project, ResumeInfo } from '../types/portfolio';
import {
  SHEET_NAMES,
  clearSheetCache,
  fetchSheetRows,
  parseCertificates,
  parseExperience,
  parseProjects,
  parseResume } from
'../utils/googleSheets';

const PortfolioContext = createContext<PortfolioData | undefined>(undefined);

interface State {
  projects: Project[];
  certificates: Certificate[];
  experience: ExperienceItem[];
  resume: ResumeInfo;
  status: LoadStatus;
  error?: string;
}

const initialState: State = {
  projects: [],
  certificates: [],
  experience: [],
  resume: {},
  status: 'loading'
};

export function PortfolioProvider({ children }: {children: React.ReactNode;}) {
  const [state, setState] = useState<State>(initialState);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setState((current) => ({ ...current, status: 'loading', error: undefined }));

    async function load(): Promise<void> {
      try {
        const [projectRows, certificateRows, experienceRows, resumeRows] = await Promise.all([
        fetchSheetRows(SHEET_NAMES.projects).catch(() => []),
        fetchSheetRows(SHEET_NAMES.certificates).catch(() => []),
        fetchSheetRows(SHEET_NAMES.experience).catch(() => []),
        fetchSheetRows(SHEET_NAMES.resume).catch(() => [])]
        );

        if (cancelled) return;

        const projects = parseProjects(projectRows);
        const certificates = parseCertificates(certificateRows);
        const experience = parseExperience(experienceRows);

        const nothingLoaded =
        projects.length === 0 && certificates.length === 0 && experience.length === 0;

        setState({
          projects,
          certificates,
          experience,
          resume: parseResume(resumeRows),
          status: nothingLoaded ? 'error' : 'ready',
          error: nothingLoaded ? 'Live content could not be loaded right now.' : undefined
        });
      } catch {
        if (cancelled) return;
        setState({
          ...initialState,
          status: 'error',
          error: 'Live content could not be loaded right now.'
        });
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [nonce]);

  const reload = useCallback(() => {
    clearSheetCache();
    setNonce((value) => value + 1);
  }, []);

  const value = useMemo<PortfolioData>(() => ({ ...state, reload }), [state, reload]);

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

export function usePortfolio(): PortfolioData {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error('usePortfolio must be used within a PortfolioProvider');
  return context;
}