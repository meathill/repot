import { ArrowRight, FileMinus, CircleArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ContractLayoutIcon from '@/components/icons/contract-layout-icon';
import Discord from '@/components/icons/discord-icon';
import Hackquest from '@/components/icons/hackquest-icon';
import Footer from '@/app/_components/footer';
import FeaturedList from '@/app/_components/featured-list';
import ContractsDisplay from '@/app/_components/contracts-display';
import PointsDialog from '@/app/_components/points-dialog';
import { getLatestContracts, getLatestProtocol, getProtocolCount } from '@/services';
import Image from 'next/image';
import Link from 'next/link';
import HeroBg from '@/assets/images/hero-bg.svg';
import HeroPic from '@/assets/images/hero-pic.svg';

export default async function Landing() {
  // fetch count of contracts, protocols
  const protocolCount = await getProtocolCount();
  const protocols = await getLatestProtocol();
  // fetch latest contracts
  const contracts = await getLatestContracts(9);
  const contractCount = contracts.meta.pagination.total;

  return <>
    <main className="px-8 sm:px-0 pt-6 sm:pt-12">
      <div className="hero-section sm:relative flex flex-col gap-6 sm:gap-0 sm:block container mx-auto mb-8 sm:mb-16">
        <Image
          src={HeroBg}
          alt="Repot hero background"
          className="hidden sm:block w-full"
        />
        <Image
          src={HeroPic}
          alt="Repot hero pic"
          className="hidden sm:block w-[30%] absolute right-14 bottom-12 aspect-[376/519]"
        />
        <video
          autoPlay
          className="hidden sm:block w-[30%] absolute right-14 bottom-12 aspect-[376/519]"
          loop
          muted
          playsInline
          src="https://assets.repot.dev/hero-pic.mp4"
          width={376}
          height={519}
        />
        <div className="flex flex-col items-center sm:items-start p-6 sm:p-0 gap-8 bg-main-green sm:bg-none rounded-2.5xl sm:rounded-none border border-black shadow-[0_8px_0_0_#000] sm:shadow-none sm:border-none sm:absolute sm:top-8 sm:left-8 sm:w-5/12">
          <div className="font-title text-2xl sm:text-5.5xl text-dark-green leading-tight capitalize">
            Build Smart Contract That Scale And Fast
          </div>
          <div className="text-sm sm:text-base capitalize text-dark-green">
            Fuel your vision with powerful, ready-to-launch smart contracts
            across chains. We power your projects, you build your dreams
          </div>
          <div className="sm:hidden relative w-full aspect-[376/519]">
            <Image
              src={HeroPic}
              alt="Repot hero pic"
              className="sm:hidden block w-full h-full"
            />
            <video
              autoPlay
              className="w-full h-full absolute top-0 left-0"
              loop
              muted
              playsInline
              src="https://assets.repot.dev/hero-pic.mp4"
              width={376}
              height={519}
            />
          </div>
          <Button className="w-fit font-bold">
            Get Started
            <ArrowRight className="w-3 h-3"/>
          </Button>
        </div>

        <div className="sm:absolute sm:bottom-0 sm:left-0 flex flex-col sm:flex-row gap-6 sm:w-1/2 sm:h-[35%]">
          <Link
            className="bg-main-purple p-6 border border-black rounded-2.5xl sm:grow flex sm:flex-1 flex-col justify-between h-48 sm:h-auto raised-button"
            href="/search?category=contracts"
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
            href="/search?category=protocols"
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
      <div className="bg-white sm:pt-12 -mx-8 sm:mx-0">
        <div className="feature-section flex flex-col sm:flex-row gap-8 sm:gap-16 justify-between container mx-auto mb-8 sm:mb-0">
          <video
            autoPlay
            className="w-full sm:w-5/12 aspect-[1148/1650]"
            loop
            muted
            playsInline
            src="https://assets.repot.dev/featured-contracts.mp4"
            width={1148}
            height={1650}
          />
          <div className="w-full sm:w-1/2 flex flex-col gap-6 px-6 sm:px-0">
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
            <FeaturedList className="p-0 h-[512px]" items={protocols} />
          </div>
        </div>

        {/* Contracts */}
        <ContractsDisplay className="container mx-auto px-6 sm:px-0" items={contracts.data} />
      </div>
    </main>
    {/* footer */}
    <div className="bg-white py-8 sm:py-12 px-6 sm:px-0">
      <Footer className="container mx-auto">
        <div className="flex flex-row justify-between mb-12 sm:mb-16">
          <div className="hidden sm:block font-title text-5.5xl w-1/5">
            Freedom To Build
          </div>
          <div className="w-full sm:w-2/3 flex flex-col gap-6 sm:gap-8">
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
              <Link
                className="h-50 sm:w-2/3 bg-lime-green rounded-2.5xl border border-dark-green p-6 relative cursor-pointer raised-button inline-flex flex-col"
                href="https://consensys.io/academy"
                target="_blank"
              >
                <div className="font-title text-2xl text-dark-green inline-flex items-center gap-2 mb-4">
                  <Hackquest className="w-6 h-6"/>
                  Consensys Academy
                </div>
                <p className="hidden sm:block text-dark-green text-sm capitalize">Consensys Academy provides specialized training and resources for blockchain development, focusing on Ethereum-based technologies. Its programs include courses, workshops, and certifications designed to equip participants with practical skills in smart contract programming and decentralized application development.
                </p>
                <CircleArrowRight className="absolute w-6 h-6 stroke-dark-green ml-auto right-6 bottom-6"/>
              </Link>
              <Link
                className="grow h-50 bg-main-purple rounded-2.5xl border border-dark-green p-6 relative cursor-pointer inline-flex flex-col justify-between raised-button"
                href="https://t.me/repotadmin"
                target="_blank"
              >
                <span className="font-title text-2xl text-dark-purple">
                  Contact Us
                </span>
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
    </div>
  </>;
}
