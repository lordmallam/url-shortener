export interface UrlEntry {
  id: string;
  url: string;
  shortCount: number;
  accessCount: number;
};

export interface ShortenResponse {
  shortenedUrl: string;
  stats: { shortCount: number; accessCount: number };
};
