export interface UploadedImage {
  id: string;
  file: File;
  previewUrl: string;
}

export interface FromOptions {
  id: number;
  name: string;
  type: 'language' | 'framework' | 'library';
  possible_versions: string[];
}

export interface Suggestions {
  name: string;
  versions: string[];
}

export interface ToOptions {
  id: number;
  type: 'language' | 'framework' | 'library';
  suggestions: Suggestions[];
}

export interface UploadImageResponse {
  id: string;
  from: FromOptions[];
  to: ToOptions[];
}
