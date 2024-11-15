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
}

export type Protocol = {
  id: number;
  documentId: string;
}

export type Contract = {
  id: number;
  documentId: string;
  name: string;
  protocols: Protocol[];
}
