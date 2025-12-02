export interface Resource {
  title: string;
  url: string;
  description: string;
  authorSource?: string;
  type?: string;
}

export interface ResourceCategory {
  title: string;
  description: string;
  resources: Resource[];
}

