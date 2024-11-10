import Footer from '@/app/_components/footer';
import ContractView from '@/app/_components/contract-view';

export const metadata = {
  title: 'Contracts',
  description: 'Contracts page',
}

export default function Contracts() {
  return <>
    <ContractView />
    <Footer className="mx-6 mb-6 sm:mx-auto"/>
  </>;
}
