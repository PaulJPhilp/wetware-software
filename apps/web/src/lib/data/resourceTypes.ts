export interface Resource {
  title: string;
  url: string;
  description: string;
  authorSource?: string;
  type?: string;
  /** GitHub repository in format "owner/repo" for release checking */
  githubRepo?: string;
}

export interface ResourceCategory {
  title: string;
  description: string;
  resources: Resource[];
}

