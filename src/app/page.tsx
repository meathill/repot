import { ArrowRight, FileMinus, CircleArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ContractLayoutIcon from '@/components/icons/contract-layout-icon';
import Discord from '@/components/icons/discord-icon';
import Hackquest from '@/components/icons/hackquest-icon';
import Footer from '@/app/_components/footer';
import FeaturedList from '@/app/_components/featured-list';
import ContractsDisplay from '@/app/_components/contracts-display';
import PointsDialog from '@/app/_components/points-dialog';
import { getLatestContracts, getProtocolCount } from "@/services";
import Link from "next/link";

export default async function Landing() {
  // fetch count of contracts, protocols
  const protocolCount = await getProtocolCount();
  // fetch latest contracts
  const contracts = await getLatestContracts(9);
  const contractCount = contracts.meta.pagination.total;

  return (
    <div className="min-h-screen pt-[69px] sm:pt-20 pb-8">
      <main className="flex flex-col gap-8 sm:gap-24 sm:mt-8 pt-6 px-8 sm:px-0">
        <div className="hero-section sm:relative flex flex-col gap-6 sm:gap-0 sm:block">
          <img src="/hero-bg.svg" alt="" className="hidden sm:block w-full" />
          <img
            src="/hero-pic.svg"
            alt=""
            className="hidden sm:block w-[30%] absolute right-14 bottom-12"
          />
          <div className="flex flex-col items-center sm:items-start p-6 sm:p-0 gap-8 bg-main-green sm:bg-none rounded-2.5xl sm:rounded-none border border-black shadow-[0_8px_0_0_#000] sm:shadow-none sm:border-none sm:absolute sm:top-8 sm:left-8 sm:w-5/12">
            <div className="font-title text-2xl sm:text-5.5xl text-dark-green leading-tight capitalize">
              Build Smart Contract That Scale And Fast
            </div>
            <div className="text-sm sm:text-base capitalize text-dark-green">
              Fuel your vision with powerful, ready-to-launch smart contracts
              across chains. We power your projects, you build your dreams
            </div>
            <img
              src="/hero-pic.svg"
              alt=""
              className="sm:hidden block w-full"
            />
            <Button className="w-fit font-bold">
              Get Started
              <ArrowRight className="w-3 h-3" />
            </Button>
          </div>

          <div className="sm:absolute sm:bottom-0 sm:left-0 flex flex-col sm:flex-row gap-6 sm:w-1/2 sm:h-[35%]">
            <Link
              className="bg-main-purple p-6 border border-black rounded-2.5xl sm:grow flex sm:flex-1 flex-col justify-between h-48 sm:h-auto raised-button"
              href="/contracts"
            >
              <ContractLayoutIcon className="w-14 h-14" />
              <div className="flex justify-between items-center">
                <div className="text-dark-purple text-xl font-title">
                  {contractCount > 500 ? contractCount + '+' : contractCount} Smart Contracts
                </div>
                <CircleArrowRight
                  className="w-6 h-6 stroke-primary-800"
                  stroke="#3E2D68"
                />
              </div>
            </Link>
            <Link
              className="bg-lime-green p-6 border border-black rounded-2.5xl sm:grow flex sm:flex-1 flex-col justify-between h-48 sm:h-auto raised-button"
              href="/protocols"
            >
              <FileMinus className="w-14 h-14" strokeWidth={1} />
              <div className="flex justify-between items-center">
                <div className="text-dark-green text-xl font-title">
                  {protocolCount > 500 ? protocolCount + '+' : protocolCount} Protocols
                </div>
                <CircleArrowRight
                  className="w-6 h-6 stroke-primary-800"
                  stroke="#3E2D68"
                />
              </div>
            </Link>
          </div>
        </div>

        {/* feature */}
        <div className="feature-section flex flex-col sm:flex-row gap-8 sm:gap-16 justify-between">
          <img
            src="/feature-contracts.png"
            alt="Smart Contracts"
            className="w-full sm:w-5/12"
          />
          <div className="w-full sm:w-1/2 flex flex-col gap-6">
            <div className="font-title text-3xl capitalize text-dark-green">
              Repot Featured
            </div>
            <div className="hidden sm:block font-default text-base space-y-6 text-primary-800">
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
            <FeaturedList className="p-0 h-[512px]" />
          </div>
        </div>

        {/* Contracts */}
        <ContractsDisplay />

        {/* footer */}
        <Footer>
          <div className="flex flex-row justify-between mb-12 sm:mb-16">
            <div className="hidden sm:block font-title text-5.5xl w-1/5">
              Freedom To Build
            </div>
            <div className="w-full sm:w-2/3 flex flex-col gap-6 sm:gap-8">
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
                <Link
                  className="h-50 sm:w-2/3 bg-lime-green rounded-2.5xl border border-dark-green p-6 relative cursor-pointer raised-button inline-flex flex-col justify-between"
                  href="https://hackquest.io"
                  target="_blank"
                >
                  <div className="font-title text-2xl text-dark-green inline-flex items-center gap-2">
                    <Hackquest className="w-6 h-6" />
                    Hackquest Learning
                  </div>
                  <div className="hidden sm:block text-dark-green text-sm capitalize">
                    Discover the most innovative Web3 contracts,showcasing fresh
                    ideas and advanced techniquesthat keep you at the forefront
                    of smart contractdevelopment.
                  </div>
                  <CircleArrowRight className="w-6 h-6 stroke-dark-green ml-auto" />
                </Link>
                <Link
                  className="grow h-50 bg-main-purple rounded-2.5xl border border-dark-green p-6 relative cursor-pointer inline-flex flex-col justify-between raised-button"
                  href="/contact-us"
                >
                  <div className="font-title text-2xl text-dark-purple">
                    Contact Us
                  </div>
                  <CircleArrowRight className="w-6 h-6 stroke-dark-purple ml-auto" />
                </Link>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
                <div className="grow h-50 bg-lime-green rounded-2.5xl border border-dark-green p-6 relative cursor-pointer inline-flex flex-col justify-between raised-button">
                  <div className="font-title text-2xl text-dark-green inline-flex items-center gap-2">
                    <Discord className="w-8 h-6" fill="#5865f2" />
                    Discord
                  </div>
                  <CircleArrowRight className="w-6 h-6 stroke-dark-green ml-auto" />
                </div>
                <PointsDialog />
              </div>
            </div>
          </div>
        </Footer>
      </main>
    </div>
  );
}
