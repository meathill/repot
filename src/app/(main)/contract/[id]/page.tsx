import ContractView from '@/app/_components/contract-view';
import { getContractDetail } from '@/services';
import { readDir } from '@/services/s3';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps) {
  const { id } = await params;
  const contractId = id.match(/^\w+/)?.[ 0 ];
  const contractData = await getContractDetail(contractId as string);

  return {
    title: `${contractData.name} - Repot.dev`,
    description: contractData.overview,
  };
}

export default async function Contracts({
  params,
}: PageProps) {
  const { id } = await params;
  const contractId = id.match(/^\w+/)?.[ 0 ];
  console.log('xxx', id, contractId);
  const contractData = await getContractDetail(contractId as string);
  console.log('xxx', contractData.document_links);
  const sources = contractData.document_links
    ? await readDir(contractData.document_links)
    : { folders: [], files: [] };
  /*let description = contractData.description || '';
  if (/^s3:\/\//.test(description)) {
    description = await readFile(description);
  }
  const currentFile = await findFirstFileFrom(sources);*/
  console.log('xxx', JSON.stringify(sources));

  return (
    <ContractView
      data={contractData}
      sources={sources}
    />
  );
}
