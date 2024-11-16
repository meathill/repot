import Footer from '@/app/_components/footer';
import ContractView from '@/app/_components/contract-view';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps) {
  const { id } = await params;
  const contractId = id.match(/^\d+/)?.[ 0 ];

  return {
    title: 'Contracts',
    description: 'Contracts page',
  };
}

export default async function Contracts({
  params,
}: PageProps) {
  const { id } = await params;
  const contractId = id.match(/^\d+/)?.[ 0 ];

  return <>
    <ContractView />
    <Footer className="mx-6 mb-6 sm:mx-auto"/>
  </>;
}
