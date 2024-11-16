export type StrapiResponse<T> = {
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
}

export type Contract = {
  id: number;
  documentId: string;
  name: string;
  protocols: Protocol[];
}
