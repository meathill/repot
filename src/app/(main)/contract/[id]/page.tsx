import ContractView from '@/app/_components/contract-view';
import { getContractDetail } from '@/services';
import { readDir, readFile } from '@/services/s3';
import { findFirstFileFrom } from '@/utils/server';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
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
  const contractId = id.match(/^\w+/)?.[ 0 ] as string;
  const contractData = await getContractDetail(contractId as string);
  
  // 只有当 document_links 不是 URL 时才读取 R2
  const isR2Path = contractData.document_links && 
    !contractData.document_links.startsWith('http://') && 
    !contractData.document_links.startsWith('https://');
  
  const sources = isR2Path
    ? await readDir(contractData.document_links)
    : { folders: [], files: [] };
    
  let description = contractData.description || '';
  if (/^s3:\/\//.test(description)) {
    description = await readFile(description);
  }
  const currentFile = await findFirstFileFrom(sources);

  return (
    <ContractView
      defaultFile={currentFile?.Key}
      data={{
        ...contractData,
        description,
      }}
      id={contractId}
      sources={sources}
    />
  );
}
