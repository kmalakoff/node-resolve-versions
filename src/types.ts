export interface VersionResultRaw {
  version: string;
  date: string;
  files: string[];
  npm: string;
  v8: string;
  uv: string;
  zlib: string;
  openssl: string;
  modules: string;
  lts: boolean;
  security: boolean;
}

export type VersionCallback = (error?: Error | null, result?: string[] | VersionResultRaw[]) => void;

export interface VersionOptions {
  cwd?: string;
  path?: string;
  sort?: number;
  range?: string;
}

export type VersionDetails = string | number | VersionResultRaw;
