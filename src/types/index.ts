export type StrapiResponse<T> = {
  error?: {
    status: number;
    name: string;
    message: string;
    details: unknown;
  };
  data: T,
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export type ApiResponse<T> = {
  code: number;
  data: T,
}

export type BaseStrapiRecord = {
  id: number;
  documentId: string;
}

export type ItemType = 'chain' | 'protocol' | 'contract';
export type ItemTypePlural = 'chains' | 'protocols' | 'contracts';

export type Chain = {
  id: number;
  documentId: string;
  name: string;
  logo?: {
    url: string;
  };
  logo_url?: string;
  overview: string;
  website: string;
  developer_docs: string;
  whitepaper: string;
  explorer: string;
  chain_language: string;
  consensus: string;
  network_layer: string;
  network_type: string;
  protocols?: Protocol[];
}

export type Protocol = {
  id: number;
  documentId: string;
  name: string;
  overview: string;
  info: string;
  description: string;
  document_link: string;
  logo?: {
    url: string;
  };
  logo_url?: string;
  chains?: Chain[];
  stars?: {
    stars: number;
  },
  document_json: string;
  document_zip: string;
}

export type Contract = {
  id: number;
  documentId: string;
  name: string;
  overview: string;
  logo?: {
    url: string;
  };
  logo_url?: string;
  document_links: string;
  description: string;
  protocols?: Protocol[];
  stars?: {
    stars: number;
    downloads: number;
  },
  document_json: string;
  document_zip: string;
}

export type S3File = {
  Key: string;
}
export type S3Folder = {
  Prefix: string;
}
export type S3FolderList = {
  files: S3File[];
  folders: S3Folder[];
}

export type UserProfile = {
  id: number;
  blocked: boolean;
  confirmed: boolean;
  username: string;
  email: string;
  avatar: string;
  provider: string;
  points?: number;
}

export type URLSearchParamsObject = { [key: string]: string | string[] | undefined };

export type UserResponse = {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export type SelectedCode = {
  file: string;
  code: string;
  startLine: number;
  endLine: number;
}

export type CodeFile = {
  file: string;
  code: string;
}

export type EtherscanData = {
  SourceCode: string;
  ABI: string;
  ContractName: string;
  CompilerVersion: string;
  OptimizationUsed: string;
  Runs: string;
  ConstructorArguments: string;
  EVMVersion: string;
  Library: string;
  LicenseType: string;
  Proxy: string;
  Implementation: string;
  SwarmSource: string;
}
