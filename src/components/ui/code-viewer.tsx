import { removeS3Prefix, trimPrefix } from '@/utils';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import ReportDialog from '@/app/_components/report-dialog';
import { Copy } from 'lucide-react';
import { readFile } from '@/services/s3';
import { codeToHtml } from 'shiki';
import { useEffect, useMemo, useState } from 'react';
import { clsx } from 'clsx';
import slugify from 'slugify';
import SelectableContainer from '@/components/ui/selectable-container';
import useUiStore from '@/store/ui';

const CHAIN_IDE = 'https://chainide.com/s/';

interface CodeViewerProps {
  allCode?: string;
  className?: string;
  name: string;
  prefix: string;
  selectedFile: string;
  zipUrl?: string;
}

export default function CodeViewer({
  allCode,
  className = '',
  name,
  prefix,
  selectedFile,
  zipUrl,
}: CodeViewerProps) {
  const setCurrentFile = useUiStore(state => state.setCurrentFile);
  const [fileContent, setFileContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isShiki = useMemo(() => {
    return selectedFile && /\.sol$/.test(selectedFile);
  }, [selectedFile]);
  const fileName = useMemo(() => {
    if (!selectedFile) return '';

    return selectedFile.split('/').pop();
  }, [selectedFile]);

  async function loadSelectedFile(file: string) {
    if (!file) {
      setFileContent('');
      return;
    }

    setIsLoading(true);
    const content = await readFile(file);
    if (fileName) {
      setCurrentFile(fileName, content);
    }
    if (!/\.sol$/.test(file)) {
      setFileContent(content);
      setIsLoading(false);
      return;
    }

    const html = await codeToHtml(content, {
      lang: 'solidity',
      theme: 'github-light',
      transformers: [
        {
          line(node) {
            this.addClassToHast(node, 'whitespace-pre-wrap');
          },
        },
      ]
    });
    setFileContent(html);
    setIsLoading(false);
  }

  useEffect(() => {
    loadSelectedFile(selectedFile);
  }, [selectedFile]);
  useEffect(() => {
    return () => {
      setCurrentFile('');
    }
  }, []);

  return <>
    <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-6 sm:mb-6 flex-none order-3 sm:order-1 mt-6 sm:mt-0">
      <Button
        asChild
        className="w-full sm:w-54 h-12 border border-black flex justify-center items-center bg-main-purple rounded-lg text-sm font-bold hover:bg-main-purple/75"
        disabled={!zipUrl}
      >
        <a
          className={clsx({ 'pointer-events-none opacity-50 border-none': !zipUrl })}
          download={fileName}
          href={zipUrl}
        >Download Code</a>
      </Button>
      <Button
        asChild
        className="w-full sm:w-54 h-12 border border-black flex justify-center items-center bg-lime-green rounded-lg text-sm text-dark-green font-bold hover:bg-light-green"
        disabled={!allCode}
      >
        <a
          className={clsx({ 'pointer-events-none opacity-50 border-none': !allCode })}
          href={`${CHAIN_IDE}createHackProject?version=soljson-v0.8.12.js&open=${fileName || 'filename.move'}&chain=sui&type=type&uniqueId=${slugify(name)}&url=${encodeURIComponent(allCode || '')}`}
          target="_blank"
          rel="nofollow noreferrer"
        >Open Code</a>
      </Button>
      <ReportDialog />
    </div>
    <div className={clsx('flex items-center gap-4 mb-2 flex-none order-1 sm:order-2', className)}>
      <h2
        className="text-sm text-dark-gray font-mono"
      >{trimPrefix(selectedFile, removeS3Prefix(prefix))}</h2>
      <Button
        className="hidden items-center ms-auto h-5 gap-0.5 text-sm font-bold px-0"
        disabled
        variant="ghost"
      >
        ABI:
        <Copy size={16}/>
      </Button>
      <Button
        className="hidden items-center h-5 gap-0.5 text-sm font-bold px-0"
        disabled
        variant="ghost"
      >
        Bytecode:
        <Copy size={16}/>
      </Button>
    </div>
    <div
      className="border border-black rounded-lg bg-white flex-1 font-mono whitespace-pre-wrap p-6 max-h-[50dvh] overflow-auto relative order-2 sm:order-3"
    >
      <SelectableContainer file={fileName || ''}>
        {isShiki
          ? <div dangerouslySetInnerHTML={{ __html: fileContent }}/>
          : <div>{fileContent}</div>
        }
      </SelectableContainer>
      {isLoading && <div
        className="absolute top-0 left-0 w-full h-full bg-white/50 backdrop-blur-sm flex justify-center items-center">
        <Spinner className="w-8 h-8"/>
      </div>}
    </div>
  </>
}
