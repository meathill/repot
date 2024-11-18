import { getProtocolDetail } from '@/services';
import ProtocolView from '@/app/_components/protocol-view';
import { readDir } from '@/services/s3';

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
  const sources = protocolData.document_link
    ? await readDir(protocolData.document_link)
    : { folders: [], files: [] };

  return <ProtocolView data={protocolData} sources={sources} />;
}