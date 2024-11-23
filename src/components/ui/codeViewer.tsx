import { removeS3Prefix, trimPrefix } from '@/utils';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { readFile } from '@/services/s3';
import { codeToHtml } from 'shiki';
import { useEffect, useMemo, useState } from 'react';
import { clsx } from 'clsx';

interface CodeViewerProps {
  className?: string;
  prefix: string;
  selectedFile: string;
}

export default function CodeViewer({
  className = '',
  prefix,
  selectedFile,
}: CodeViewerProps) {
  const [fileContent, setFileContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isShiki = useMemo(() => {
    return selectedFile && /\.sol$/.test(selectedFile);
  }, [selectedFile]);

  async function loadSelectedFile(file: string) {
    if (!file) {
      setFileContent('');
      return;
    }

    setIsLoading(true);
    const content = await readFile(file);
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

  return <>
    <div className={clsx('flex items-center gap-4 mb-2 flex-none', className)}>
      <h2
        className="text-sm text-dark-gray font-mono"
      >{trimPrefix(selectedFile, removeS3Prefix(prefix))}</h2>
      <Button
        className="flex items-center ms-auto h-5 gap-0.5 text-sm font-bold px-0"
        disabled={!selectedFile}
        variant="ghost"
      >
        ABI:
        <Copy size={16}/>
      </Button>
      <Button
        className="flex items-center h-5 gap-0.5 text-sm font-bold px-0"
        disabled={!selectedFile}
        variant="ghost"
      >
        Bytecode:
        <Copy size={16}/>
      </Button>
    </div>
    <div
      className="border border-black rounded-lg bg-white flex-1 font-mono whitespace-pre-wrap p-6 max-h-[50dvh] overflow-auto relative"
    >
      {isShiki
        ? <div dangerouslySetInnerHTML={{ __html: fileContent }} />
        : <div>{fileContent}</div>
      }
      {isLoading && <div className="absolute top-0 left-0 w-full h-full bg-white/50 backdrop-blur-sm flex justify-center items-center">
        <Spinner className="w-8 h-8" />
      </div>}
    </div>
  </>
}
