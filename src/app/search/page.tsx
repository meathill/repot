 interface SearchProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Search({
  searchParams,
}: SearchProps) {
  const { query } = await searchParams;

  return <div>Search page with query: {query}</div>;
}
