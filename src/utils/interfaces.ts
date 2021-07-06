export interface TDProject {
  id: string;
  title: string;
  icon: string;
  description: string;
}

export interface TDNews {
  id: string;
  title: string;
  project: string;
  type: string;
  timestamp: number;
  content: string;
  thumbnail: string;
  featured?: string;
}
