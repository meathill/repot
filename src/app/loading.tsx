import { Spinner } from '@/components/ui/spinner';

function MainLayoutLoading() {
  return (
    <main className="flex h-50dvh w-full items-center justify-center">
      <Spinner className="w-8 h-8" />
    </main>
  )
}

export default MainLayoutLoading
