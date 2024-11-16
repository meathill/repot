import { getProtocolDetail } from '@/services';
import Footer from '@/app/_components/footer';
import ProtocolView from '@/app/_components/protocol-view';

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

  return <>
    <ProtocolView data={protocolData} />
    <Footer className="mx-6 mb-6 sm:mx-auto"/>
  </>;
}
