import { CircleDot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface KeywordsFilterProps {
  params: { [key: string]: string | string[] | undefined };
}

const keywords = [
  {
    name: 'token',
    label: 'Token',
    icon: CircleDot,
  },
];

export default function KeywordsFilter({
  params,
}: KeywordsFilterProps) {
  function getParams(keyword: string) {
    const newParams = new URLSearchParams();
    for (const key in params) {
      if (params[ key ]) {
        newParams.set(key, params[ key ] as string);
      }
    }
    newParams.set('keyword', keyword);
    return `?${newParams.toString()}`;
  }

  return <>
    <h2 className="text-sm font-bold mb-4 text-dark-gray">Keywords Filters</h2>
    <div className="flex flex-wrap gap-4 mb-6">
      {keywords.map((keyword) => (
        <Button
          asChild
          key={keyword.name}
          className="flex items-center gap-2 h-8 text-sm rounded-full text-primary-800 hover:bg-main-green active:bg-light-green bg-white border border-gray"
        >
          <Link
            href={getParams(keyword.name)}
          >
            <keyword.icon size={16} />
            {keyword.label}
          </Link>
        </Button>
      ))}
    </div>
  </>;
}
