import { ArrowRight, FileMinus, CircleArrowRight} from 'lucide-react';
import { Button } from "@/components/ui/button";
import ContractLayoutIcon from "@/components/icons/contract-layout-icon";
import Discord from '@/components/icons/discord-icon';
import Hackquest from '@/components/icons/hackquest-icon';
import Footer from '@/app/_components/footer';
import FeaturedList from '@/app/_components/featured-list';
import ContractsDisplay from '@/app/_components/contracts-display';
import PointsDialog from '@/app/_components/points-dialog';

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
            <FeaturedList />
          </div>
        </div>

        {/* Contracts */}
        <ContractsDisplay />

        {/* footer */}
        <Footer>
          <div className="flex flex-row justify-between mb-16">
            <div className="font-title text-5.5xl w-1/5">Freedom To Build</div>
            <div className="w-2/3 flex flex-col gap-8">
              <div className="flex flex-row gap-8">
                <div className="h-50 w-2/3 bg-lime-green rounded-2.5xl border border-dark-green p-6 relative cursor-pointer transition-all hover:shadow-[0_4px_0_0_#000] inline-flex flex-col justify-between">
                  <div className="font-title text-2xl text-dark-green inline-flex items-center gap-2">
                    <Hackquest className="w-6 h-6" />
                    Hackquest Learning
                  </div>
                  <div className="text-dark-green text-sm capitalize">
                    Discover the most innovative Web3 contracts,showcasing fresh
                    ideas and advanced techniquesthat keep you at the forefront
                    of smart contractdevelopment.
                  </div>
                  <CircleArrowRight className="w-6 h-6 stroke-dark-green ml-auto" />
                </div>
                <div className="grow h-50 bg-main-purple rounded-2.5xl border border-dark-green p-6 relative cursor-pointer transition-all hover:shadow-[0_4px_0_0_#000] inline-flex flex-col justify-between">
                  <div className="font-title text-2xl text-dark-purple">
                    Contact Us
                  </div>
                  <CircleArrowRight className="w-6 h-6 stroke-dark-purple ml-auto" />
                </div>
              </div>
              <div className="flex flex-row gap-8">
                <div className="grow h-50 bg-lime-green rounded-2.5xl border border-dark-green p-6 relative cursor-pointer transition-all hover:shadow-[0_4px_0_0_#000] inline-flex flex-col justify-between">
                  <div className="font-title text-2xl text-dark-green inline-flex items-center gap-2">
                    <Discord className="w-8 h-6" fill="#5865f2" />
                    Discord
                  </div>
                  <CircleArrowRight className="w-6 h-6 stroke-dark-green ml-auto" />
                </div>
                {/* <div className="h-50 w-2/3 bg-white rounded-2.5xl border border-dark-green p-6 relative cursor-pointer transition-all hover:shadow-[0_4px_0_0_#000] inline-flex flex-col justify-between">
                  <div className="font-title text-2xl text-dark-green">
                    How to Earn Repot points?
                  </div>
                  <CircleArrowRight className="w-6 h-6 stroke-dark-green ml-auto" />
                </div> */}
                <PointsDialog />
              </div>
            </div>
          </div>
        </Footer>
      </main>
    </div>
  );
}
