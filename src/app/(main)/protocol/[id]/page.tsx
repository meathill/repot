import { getProtocolDetail } from '@/services';
import ProtocolView from '@/app/_components/protocol-view';
import { readDir, readFile } from '@/services/s3';
import { findFirstFileFrom } from '@/utils/server';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps) {
  const { id } = await params;
  const protocolId = id.match(/^\w+/)?.[ 0 ];
  const protocolData = await getProtocolDetail(protocolId as string);

  return {
    title: `${protocolData.name} - Repot.dev`,
    description: protocolData.overview,
  };
}

export default async function Contracts({
  params,
}: PageProps) {
  const { id } = await params;
  const protocolId = id.match(/^\w+/)?.[ 0 ];
  const protocolData = await getProtocolDetail(protocolId as string);
  
  // 只有当 document_link 不是 URL 时才读取 R2
  const isR2Path = protocolData.document_link && 
    !protocolData.document_link.startsWith('http://') && 
    !protocolData.document_link.startsWith('https://');
  
  const sources = isR2Path
    ? await readDir(protocolData.document_link)
    : { folders: [], files: [] };
    
  let { info, description } = protocolData;
  if (/^s3:\/\//.test(info)) {
    info = await readFile(info);
  }
  if (/^s3:\/\//.test(description)) {
    description = await readFile(description);
  }
  const currentFile = await findFirstFileFrom(sources);

  return (
    <ProtocolView
      data={{
        ...protocolData,
        description,
        info,
      }}
      defaultFile={currentFile?.Key}
      sources={sources}
    />
  );
}
