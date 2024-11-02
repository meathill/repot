// import Image from "next/image";
// import styles from './styles.module.css';
import { ArrowLeft, ArrowRight, FileMinus, CircleArrowRight, Download, Star, User, Wallet, Layers, Lock} from 'lucide-react';
import { Button } from "@/components/ui/button";
import ContractLayoutIcon from "@/components/icons/contract-layout-icon";

const CuttingEdgeCard = () => {
  return (
    <div className="bg-white p-6 border border-primary-800 rounded-2.5xl shadow-[0_4px_0_0_#000]">
      <div className="flex justify-between items-center mb-5">
        <div className="flex gap-4 items-center">
          <img src="/ce.png" className="w-12 h-12 rounded-lg" />
          <div className="font-bold text-lg text-primary-800">Cutting Edge</div>
        </div>
        <CircleArrowRight
          className="w-6 h-6 stroke-dark-green"
          stroke="#08320F"
          strokeWidth={1.3}
        />
      </div>
      <div className='text-primary-800 capitalize text-sm'>
        Discover the most innovative Web3 contracts, showcasing fresh ideas and
        advanced techniquesthat keep you at the forefront of smart
        contract development.
      </div>
    </div>
  );
};

const ContractCard = () => {
  return (
    <div className="bg-white p-6 border border-gray rounded-2.5xl flex flex-col gap-4">
      <div className="flex gap-4 items-center">
        <img src="/ce.png" className="w-12 h-12 rounded-lg" />
        <div className="font-bold text-lg text-primary-800">Cutting Edge</div>
      </div>
      <div className="text-primary-800 capitalize text-sm max-h-11 text-ellipsis overflow-hidden">
        Discover the most innovative Web3 contracts, showcasing fresh ideas and
        advanced techniques that keep you at the forefront of smart
        contractdevelopment.
      </div>
      <div className="bg-zinc-50 h-12 border-y -ml-6 -mr-6 flex flex-row">
        <div className="flex justify-center items-center w-1/2 gap-1.5 border-r">
          <Download className="w-4 h-4" />
          <span className="text-sm text-dark-gray">13123</span>
        </div>
        <div className="flex justify-center items-center w-1/2 gap-1.5">
          <Star className="w-4 h-4" />
          <span className="text-sm text-dark-gray">123</span>
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-2">
        <div className="border border-gray rounded-2xl px-2 py-1 inline-flex items-center gap-1">
          <User className="w-3 h-3" />
          <span className="text-xs text-primary-800">DAO</span>
        </div>
        <div className="border border-gray rounded-2xl px-2 py-1 inline-flex items-center gap-1">
          <Wallet className="w-3 h-3" />
          <span className="text-xs text-primary-800">Payment</span>
        </div>
        <div className="border border-gray rounded-2xl px-2 py-1 inline-flex items-center gap-1">
          <Layers className="w-3 h-3" />
          <span className="text-xs text-primary-800">ERC721</span>
        </div>
        <div className="border border-gray rounded-2xl px-2 py-1 inline-flex items-center gap-1">
          <Lock className="w-3 h-3" />
          <span className="text-xs text-primary-800">Staking</span>
        </div>
        <div className="border border-gray rounded-2xl px-2 py-1 inline-flex items-center gap-1">
          <span className="text-xs text-primary-800">...</span>
        </div>
      </div>

      <Button variant={'outline'} className='bg-ivory border-dark-gray rounded-lg font-bold text-base text-primary-800'>Go Contract</Button>
    </div>
  );
};

export default function Landing() {
  return (
    <div className="min-h-screen pt-20 pb-8">
      <main className="flex flex-col gap-24 mt-8">
        <div className="hero-section relative">
          <img src="/hero-bg.svg" alt="" className="w-full" />
          <img
            src="/hero-pic.svg"
            alt=""
            className="w-[30%] absolute right-14 bottom-12"
          />
          <div className="flex flex-col gap-8 absolute top-8 left-8 w-5/12">
            <div className="font-title text-5.5xl text-dark-green leading-tight capitalize">
              Build Smart Contract That Scale And Fast
            </div>
            <div className="text-base capitalize text-dark-green">
              Fuel your vision with powerful, ready-to-launch smart contracts
              across chains. We power your projects, you build your dreams
            </div>
            <Button className="w-fit font-bold">
              Get Started
              <ArrowRight className="w-3 h-3" />
            </Button>
          </div>

          <div className="absolute bottom-0 left-0 flex flex-row gap-6 w-1/2 h-[35%]">
            <div className="bg-main-purple p-6 border border-black rounded-2.5xl grow flex flex-1 flex-col justify-between">
              <ContractLayoutIcon className="w-14 h-14" />
              <div className="flex justify-between items-center">
                <div className="text-dark-purple text-xl font-title">
                  500+ Smart Contracts
                </div>
                <CircleArrowRight
                  className="w-6 h-6 stroke-primary-800"
                  stroke="#3E2D68"
                />
              </div>
            </div>
            <div className="bg-lime-green p-6 border border-black rounded-2.5xl grow flex flex-1 flex-col justify-between">
              <FileMinus className="w-14 h-14" strokeWidth={1} />
              <div className="flex justify-between items-center">
                <div className="text-dark-green text-xl font-title">
                  500+ Protocols
                </div>
                <CircleArrowRight
                  className="w-6 h-6 stroke-primary-800"
                  stroke="#3E2D68"
                />
              </div>
            </div>
          </div>
        </div>

        {/* feature */}
        <div className="feature-section flex flex-row gap-16 justify-between">
          <img
            src="/feature-contracts.png"
            alt="Smart Contracts"
            className="w-5/12"
          />
          <div className="w-1/2 flex flex-col gap-6">
            <div className="font-title text-3xl capitalize text-dark-green">
              Repot Featured
            </div>
            <div className="font-default text-base space-y-6 text-primary-800">
              <p>
                Compute Resource Optimization: efficient deployments across
                multiple clusters and regions, with intelligent resource
                provisioning.
              </p>
              <p>
                Instant Scaling: Minimize latency and improve utilization with
                rapid cold starts and flexible scaling.
              </p>
              <p>
                Full Observability: Real-time monitoring and logging for
                reliable AI operations.
              </p>
            </div>
            <CuttingEdgeCard />
            <CuttingEdgeCard />
            <CuttingEdgeCard />
          </div>
        </div>

        {/* Contracts */}
        <div className="contracts-section flex flex-col gap-8">
          <div className="flex flex-row justify-between items-center">
            <div className="font-title text-3xl text-dark-green">Contracts</div>
            <div className="flex gap-4">
              <Button
                variant={'outline'}
                size={'icon'}
                className="w-12 h-12 rounded-xl border-black shadow-[0_4px_0_0_#000]"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <Button
                variant={'outline'}
                size={'icon'}
                className="w-12 h-12 rounded-xl border-black shadow-[0_4px_0_0_#000]"
              >
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <ContractCard />
            <ContractCard />
            <ContractCard />
          </div>
        </div>

        {/*
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div> */}
      </main>
      {/* <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer> */}
    </div>
  );
}
