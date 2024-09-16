export {};

// Create a type for the roles
export type Roles = "admin" | "agent" | "viewer";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }

  interface RequestService<T> {
    static getAll(): Promise<T | null>;
    static create(data: T): Promise<T>;
    static delete(id: string): Promise<void>;
    static get(id: string): Promise<T | null>;
    static update(id: string, data: T): Promise<T>;
  }

  type OpenGraphArticle = {
    publishedTime?: string;
    modifiedTime?: string;
    expirationTime?: string;
    author?: string;
    section?: string;
    tag?: string[];
  };

  type OpenGraph = {
    type: string;
    locale: string;
    url: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    site_name: string;
    article?: OpenGraphArticle;
  };

  type Twitter = {
    card: string;
    site: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
  };

  type WebsiteConfig = {
    title: string;
    description: string;
    url: string;
    logo: string;
    favicon: string;
    themeColor: string;
    backgroundColor: string;
    siteLanguage: string;
    siteLocale: string;
    twitterUsername: string;
    facebookAppId: string;
    googleSiteVerification: string;
    openGraph: OpenGraph;
    twitter: Twitter;
  };
}
