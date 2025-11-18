export interface ImageFormat {
  ext: string;
  hash: string;
  height: number;
  mime: string;
  name: string;
  path?: string;
  size: number;
  url: string;
  width: number;
}

export interface Image {
  id: number;
  name: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
  formats: Record<'small' | 'thumbnail', ImageFormat>;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
}
