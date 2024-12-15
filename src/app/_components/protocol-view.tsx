'use client';

import { CircleCheckBig, CircleStop, ImageIcon, User } from 'lucide-react';
import { useState } from 'react';
import { clsx } from 'clsx';
import Image from 'next/image';
import { Protocol, S3FolderList } from '@/types';
import { Button } from '@/components/ui/button';
import Avatar from '@/components/ui/avatar';
import { marked } from 'marked';
import { removeS3Prefix } from '@/utils';
import FileTreeView from '@/components/ui/file-tree';
import CodeViewer from '@/components/ui/code-viewer';
import StarButton from '@/components/ui/star-button';

interface ProtocolViewProps {
  data: Protocol;
  defaultFile?: string;
  sources: S3FolderList;
}

const TabItems = ['Info', 'Docs', 'Source'];

export default function ProtocolView({
  data,
  defaultFile,
  sources,
}: ProtocolViewProps) {
  const [tab, setTab] = useState<typeof TabItems[ number ]>(TabItems[ 2 ]);
  const [selectedFile, setSelectedFile] = useState<string>(defaultFile || '');
  const logo = data.logo?.url || data.logo_url || '';
  const descriptionHtml = marked(data.description || '');
  const infoHtml = marked(data.info || '');

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
                id={data.documentId}
                number={data.stars?.stars || 0}
                type="protocol"
              />
              <div className="flex items-center gap-1.5">
                {data.chains?.map(chain => (
                  <Avatar
                    className="w-4 h-4"
                    key={chain.id}
                    name={chain.name}
                    src={chain.logo?.url || chain.logo_url || ''}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1 px-4 h-8 bg-neutral-200 rounded-lg text-sm">
              <CircleStop size={16}/>
              Token
            </div>
            <div className="flex items-center gap-1 px-4 h-8 bg-neutral-200 rounded-lg text-sm">
              <ImageIcon size={16}/>
              NFT
            </div>
            <div className="flex items-center gap-1 px-4 h-8 bg-neutral-200 rounded-lg text-sm">
              <User size={16}/>
              DAO
            </div>
            <div className="flex items-center gap-1 px-4 h-8 bg-neutral-200 rounded-lg text-sm">
              <CircleCheckBig size={16} color="#26BF59"/>
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
      <article
        className={clsx('prose sm:prose-xl mx-auto border border-gray rounded-lg p-6 bg-white text-pretty break-words', { hidden: tab !== 'Info' })}
        dangerouslySetInnerHTML={{ __html: infoHtml }}
      />
      <article
        className={clsx('mt-6 prose sm:prose-xl mx-auto border border-gray rounded-lg p-6 bg-white text-pretty break-words', { hidden: tab !== 'Docs' })}
        dangerouslySetInnerHTML={{ __html: descriptionHtml }}
      />
      <div className={clsx('flex min-h-96 gap-6', { hidden: tab !== 'Source' })}>
        <aside className="w-54 flex-none py-3 px-5 bg-white border border-black rounded-lg">
          <FileTreeView
            folderList={sources}
            onSelectFile={file => setSelectedFile(file)}
            prefix={removeS3Prefix(data.document_link)}
            selectedFile={selectedFile}
          />
        </aside>
        <div className="flex-1 flex flex-col">
          <CodeViewer
            allCode={data.document_json}
            name={data.name}
            prefix={data.document_link}
            selectedFile={selectedFile}
            zipUrl={data.document_zip}
          />
        </div>
      </div>
    </main>
  );
}
