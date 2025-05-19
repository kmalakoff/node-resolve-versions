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

export type VersionResult = string | VersionResultRaw;
export type VersionCallback = (error?: Error, result?: VersionResult | VersionResult[] | undefined) => undefined;

export interface VersionOptions {
  raw?: boolean;
}

export type VersionDetails = string | number;
