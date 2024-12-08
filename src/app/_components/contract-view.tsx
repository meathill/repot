'use client';

import { clsx } from 'clsx';
import { CircleCheckBig, CircleStop, Download, ImageIcon, User } from 'lucide-react';
import Image from 'next/image';
import { marked } from 'marked';
import { useState } from 'react';
import { Contract, S3FolderList } from '@/types';
import { Button } from '@/components/ui/button';
import FileTreeView from '@/components/ui/file-tree';
import { removeS3Prefix } from '@/utils';
import CodeViewer from '@/components/ui/code-viewer';
import StarButton from '@/components/ui/star-button';

interface ContractViewProps {
  data: Contract;
  defaultFile?: string;
  id: string;
  sources: S3FolderList;
}

const TabItems = ['Docs', 'Source'];

export default function ContractView({
  data,
  defaultFile,
  id,
  sources,
}: ContractViewProps) {
  const [tab, setTab] = useState<typeof TabItems[ number ]>(TabItems[ 1 ]);
  const [selectedFile, setSelectedFile] = useState<string>(defaultFile || '');
  const logo = data.logo?.url || data.logo_url || '';
  const descriptionHtml = marked(data.description || '');

  return (
    <main className="mt-6 sm:mt-8 mb-6 px-6 sm:px-0">
      <header className="flex flex-col sm:flex-row gap-6 mb-6 pb-6 border-b border-neutral-800">
        {logo && <Image
          alt={data.name}
          className="block w-18 h-18 rounded-lg"
          src={logo}
          width={72}
          height={72}
          unoptimized
        />}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex sm:items-center gap-4 flex-col sm:flex-row">
            <h1 className="sm:text-xl font-bold">{data.name}</h1>
            <div className="flex gap-4">
              <StarButton
                id={id}
                number={data.stars?.stars || 0}
                type="contract"
              />
              <div className="flex items-center gap-2 text-xs">
                <Download size={16} color="#636363"/>
                {data.stars?.downloads || 0}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1 px-4 h-8 bg-neutral-200 rounded-lg text-sm">
              <CircleStop size={16}/>
              Token
            </div>
            <div className="flex items-center gap-1 px-4 h-8 bg-neutral-200 rounded-lg text-sm">
              <ImageIcon size={16} />
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
        <div className="sm:ms-auto flex flex-none items-center">
          {TabItems.map(item => (
            <Button
              className={clsx('flex-1 sm:w-27 h-12 border border-r-0 border-black rounded-none first:rounded-l-lg last:rounded-r-lg last:border-r flex justify-center items-center text-sm font-bold', tab === item ? 'bg-primary-800 text-white' : 'bg-lighter-gray text-primary-800 hover:bg-main-green')}
              key={item}
              type="button"
              onClick={() => setTab(item)}
            >{item}</Button>
          ))}
        </div>
      </header>
      <div className={clsx('flex min-h-96 gap-6', { hidden: tab !== 'Source' })}>
        <aside className="hidden sm:block w-64 flex-none p-3 bg-white border border-black rounded-lg">
          <FileTreeView
            folderList={sources}
            onSelectFile={file => setSelectedFile(file)}
            prefix={removeS3Prefix(data.document_links)}
            selectedFile={selectedFile}
          />
        </aside>
        <div className="flex-1 flex flex-col">
          <CodeViewer prefix={data.document_links} selectedFile={selectedFile} />
        </div>
      </div>
      <div className={clsx('mt-6', { hidden: tab !== 'Docs' })}>
        <article
          className="prose sm:prose-xl mx-auto border border-gray rounded-lg p-6 bg-white text-pretty break-words"
          dangerouslySetInnerHTML={{ __html: descriptionHtml }}
        />
      </div>
    </main>
  );
}
