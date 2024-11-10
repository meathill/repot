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

export type Protocol = {
  id: number;
}

export type Contract = {
  id: number;
  name: string;
  protocols: Protocol[];
}
