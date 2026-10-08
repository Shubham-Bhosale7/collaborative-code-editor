export interface FileData {
  id: string;
  name: string;
  language: string;
  code: string;
  savedCode: string;
}

export interface ContextData {
  x: number;
  y: number;
  fileId: string;
}
