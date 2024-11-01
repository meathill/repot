// import Image from "next/image";
// import styles from './styles.module.css';
import { ArrowRight, FileMinus, CircleArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import ContractLayoutIcon from "@/components/icons/contract-layout-icon";

export default function Landing() {
  return (
    <div className="min-h-screen pt-20">
      <main className="flex flex-col gap-8 mt-8">
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
                <div className="text-dark-green text-xl font-title">500+ Protocols</div>
                <CircleArrowRight
                  className="w-6 h-6 stroke-primary-800"
                  stroke="#3E2D68"
                />
              </div>
            </div>
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
