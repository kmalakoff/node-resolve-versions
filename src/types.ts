export interface VersionResultRaw {
  version: string;
  files: string[];
}
export type VersionResult = string | VersionResultRaw;
export type VersionCallback = (error?: Error, result?: VersionResult | undefined) => undefined;

export interface VersionOptions {
  raw?: boolean;
}

export type VersionDetails = string | number;
