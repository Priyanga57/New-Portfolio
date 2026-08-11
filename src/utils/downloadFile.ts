/**
 * Extracts the Google Drive file ID from various Drive URL formats:
 *   https://drive.google.com/file/d/FILE_ID/view
 *   https://drive.google.com/open?id=FILE_ID
 *   https://drive.google.com/uc?export=download&id=FILE_ID
 */
function extractDriveId(url: string): string | null {
  const patterns = [
    /\/file\/d\/([a-zA-Z0-9_-]{20,})/,        // /file/d/ID/view
    /[?&]id=([a-zA-Z0-9_-]{20,})/,            // ?id=ID or &id=ID
  ];
  for (const pattern of patterns) {
    const match = pattern.exec(url);
    if (match) return match[1];
  }
  return null;
}

/**
 * Converts any Google Drive share/view URL to a direct download URL.
 * Returns the original URL unchanged for non-Drive links.
 */
export function toDownloadUrl(url: string): string {
  if (!url.includes('drive.google.com')) return url;

  // Already a direct download URL
  if (url.includes('export=download')) return url;

  const id = extractDriveId(url);
  if (id) {
    return `https://drive.google.com/uc?export=download&id=${id}`;
  }

  return url;
}

/**
 * Triggers a file download to the user's system.
 * For Google Drive URLs: converts to export=download and navigates directly.
 * For same-origin URLs: uses fetch + blob approach.
 * Falls back to opening in a new tab if everything else fails.
 */
export async function downloadFile(
  url: string,
  filename = 'Priyanga_VS_Resume.pdf'
): Promise<void> {
  const downloadUrl = toDownloadUrl(url);

  // Google Drive direct download - navigate to the export URL directly.
  // Google sends Content-Disposition: attachment so the browser saves it.
  if (downloadUrl.includes('drive.google.com/uc?export=download')) {
    const anchor = document.createElement('a');
    anchor.href = downloadUrl;
    anchor.setAttribute('download', filename);
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    return;
  }

  // Same-origin or CORS-enabled URL - fetch as blob and force download
  try {
    const response = await fetch(downloadUrl);
    if (!response.ok) throw new Error('Fetch failed');
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = objectUrl;
    anchor.download = filename;
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    setTimeout(() => URL.revokeObjectURL(objectUrl), 10_000);
  } catch {
    // Last resort: open in new tab
    window.open(downloadUrl, '_blank', 'noopener,noreferrer');
  }
}
