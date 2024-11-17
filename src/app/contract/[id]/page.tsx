import Footer from '@/app/_components/footer';
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
  const contractData = await getContractDetail(contractId as string);
  const sources = contractData.document_links
    ? await readDir(contractData.document_links)
    : { folders: [], files: [] };

  return <>
    <ContractView data={contractData} sources={sources} />
    <Footer className="mx-6 mb-6 sm:mx-auto"/>
  </>;
}
