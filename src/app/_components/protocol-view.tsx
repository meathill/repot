'use client';

import { CircleCheckBig, CircleStop, ImageIcon, Star, User } from 'lucide-react';
import { useState } from 'react';
import { clsx } from 'clsx';
import Image from 'next/image';
import { Protocol, S3FolderList } from '@/types';
import { Button } from '@/components/ui/button';
import Avatar from '@/components/ui/avatar';
import { marked } from 'marked';
import { removeS3Prefix } from '@/utils';
import FileTreeView from '@/components/ui/file-tree';
import GitHub from '@/assets/images/github.svg';
import CodeViewer from '@/components/ui/codeViewer';

interface ProtocolViewProps {
  data: Protocol;
  sources: S3FolderList;
}

const TabItems = ['Info', 'Docs', 'Source'];

export default function ProtocolView({
  data,
  sources,
}: ProtocolViewProps) {
  const [tab, setTab] = useState(TabItems[ 0 ]);
  const [selectedFile, setSelectedFile] = useState<string>('');
  const logo = data.logo?.url || data.logo_url || '';
  const descriptionHtml = marked(data.description || '');
  const infoHtml = marked(data.info || '');

  function doDownloadFile() {

  }
  function doOpenCode() {

  }
  function doInspectAudit() {

  }

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
              <div className="flex items-center gap-2 text-xs">
                <Star size={16} color="#636363"/>
                1323
              </div>
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
      <article
        className={clsx('prose sm:prose-xl mx-auto border border-gray rounded-lg p-6 bg-white text-pretty break-words', { hidden: tab !== 'Info' })}
        dangerouslySetInnerHTML={{ __html: infoHtml }}
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
          <div className="flex items-center gap-6 mb-6 flex-none">
            <Button
              className="w-54 h-12 border border-black flex justify-center items-center bg-main-purple rounded-lg text-sm font-bold"
              disabled={!selectedFile}
              onClick={doDownloadFile}
              variant="outline"
            >
              Download Code
            </Button>
            <Button
              className="w-54 h-12 border border-black flex justify-center items-center bg-lime-green rounded-lg text-sm text-dark-green font-bold"
              disabled={!selectedFile}
              onClick={doOpenCode}
              variant="outline"
            >
              Open Code
            </Button>
            <Button
              className="w-40 h-12 border border-black flex justify-center items-center gap-2 rounded-lg text-sm font-bold"
              disabled={!selectedFile}
              onClick={doInspectAudit}
              variant="outline"
            >
              <Image
                alt="GitHub logo"
                className="w-4 h-4"
                src={GitHub}
                width={16}
                height={16}
              />
              Inspect Audit
            </Button>
            <Button
              className="w-40 h-12 border border-black flex justify-center items-center gap-2 rounded-lg text-sm font-bold"
              disabled={!selectedFile}
              onClick={doInspectAudit}
              variant="outline"
            >
              <Image
                alt="GitHub logo"
                className="w-4 h-4"
                src={GitHub}
                width={16}
                height={16}
              />
              View Repo
            </Button>
          </div>
          <CodeViewer prefix={data.document_link} selectedFile={selectedFile} />
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
