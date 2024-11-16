import { CircleDot } from 'lucide-react';
import { Button } from '@/components/ui/button';

const keywords = [
  {
    name: 'token',
    label: 'Token',
    icon: CircleDot,
  },
];

export default function KeywordsFilter() {
  return <>
    <h2 className="text-sm font-bold mb-4 text-dark-gray">Keywords Filters</h2>
    <div className="flex flex-wrap gap-4 mb-6">
      {keywords.map((keyword) => (
        <Button
          key={keyword.name}
          className="flex items-center gap-2 h-8 text-sm rounded-full text-primary-800 hover:bg-main-green active:bg-light-green bg-white border border-gray"
        >
          <keyword.icon size={16} />
          {keyword.label}
        </Button>
      ))}
    </div>
  </>;
}
