export interface SelectedOptions {
  id: string; // important identifier
  from: [name: string, version: string];
  to: [name: string, version: string];
}

export interface TransformedCode {
  original_code: string;
  transformed_code: string;
}

export interface TransformRequestBody {
  id: string;
  from: { name: string; version: string };
  to: { name: string; version: string };
}
