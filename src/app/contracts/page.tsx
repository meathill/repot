import Footer from '@/app/_components/footer';
import { CircleCheckBig, CircleStop, Copy, Download, Github, Image, Star, User } from 'lucide-react';

export const metadata = {
  title: 'Contracts',
  description: 'Contracts page',
}

export default function Contracts() {
  return <>
    <main className="mt-8 mb-6">
      <header className="flex gap-6 mb-6 pb-6 border-b border-neutral-800">
        <img
          alt="Contracts name"
          className="block w-18 h-18 rounded-lg"
          src="/ce.png"
        />
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">OpenZeppelin / Voting ERC20 Token</h1>
            <div className="flex items-center gap-2 text-xs">
              <Star size={16} color="#636363"/>
              1323
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Download size={16} color="#636363"/>
              1323
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 px-4 h-8 bg-neutral-200 rounded-lg text-sm">
              <CircleStop size={16} />
              Token
            </div>
            <div className="flex items-center gap-1 px-4 h-8 bg-neutral-200 rounded-lg text-sm">
              <Image size={16} />
              NFT
            </div>
            <div className="flex items-center gap-1 px-4 h-8 bg-neutral-200 rounded-lg text-sm">
              <User size={16} />
              DAO
            </div>
            <div className="flex items-center gap-1 px-4 h-8 bg-neutral-200 rounded-lg text-sm">
              <CircleCheckBig size={16} color="#26BF59" />
              Audited
            </div>
          </div>
        </div>
        <div className="ms-auto flex flex-none items-center">
          <div
            className="w-27 h-12 border border-black rounded-l-lg bg-stone-100 flex justify-center items-center text-sm font-bold">Docs</div>
          <div className="w-27 h-12 border border-black rounded-r-lg bg-neutral-800 flex justify-center items-center text-white text-sm font-bold">Source</div>
        </div>
      </header>
      <div className="flex min-h-96 gap-6">
        <aside className="w-54 flex-none py-3 px-5 bg-white border border-black rounded-lg">

        </aside>
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-6 mb-6 flex-none">
            <div
              className="w-54 h-12 border border-black flex justify-center items-center bg-main-purple rounded-lg text-sm font-bold">
              Download Code
            </div>
            <div
              className="w-54 h-12 border border-black flex justify-center items-center bg-lime-green rounded-lg text-sm font-bold">
              Open Code
            </div>
            <div
              className="w-40 h-12 border border-black flex justify-center items-center gap-2 rounded-lg text-sm font-bold"
            >
              <Github size={16} />
              Inspect Audit
            </div>
          </div>
          <div className="flex items-center gap-4 mb-2 flex-none">
            <h2 className="text-sm text-dark-gray">simple-token.sol</h2>
            <div className="flex items-center ms-auto h-5 gap-0.5 text-sm font-bold">
              ABI:
              <Copy size={16}/>
            </div>
            <div className="flex items-center h-5 gap-0.5 text-sm font-bold">
              Bytecode:
              <Copy size={16}/>
            </div>
          </div>
          <div className="border border-black rounded-lg bg-lighter-gray flex-1">

          </div>
        </div>
      </div>
    </main>
    <Footer/>
  </>;
}
