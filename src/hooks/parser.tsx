export function parseSize(size: number): string {
  if (size < 1024) {
    return '' + Math.floor(size) + 'B';
  }
  if (size < 1024 * 1024) {
    return '' + Math.floor(size / 1024) + 'KB';
  }
  if (size < 1024 * 1024 * 1024) {
    return '' + Math.floor(size / (1024 * 1024)) + 'MB';
  }
  return '' + Math.floor(size / (1024 * 1024 * 1024)) + 'GB';
}

export function parseExtension(filepath: string): string {
  return filepath.split(".").pop()?.toUpperCase() ?? "UNSUPPORTED";
}

export function parseName(filepath: string): string {
  return filepath.split(".")[0] ?? "Untitled";
}
