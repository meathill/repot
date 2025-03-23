'use client';

import Image from 'next/image';
import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { ArrowUpIcon, CircleUserIcon, XIcon } from 'lucide-react';
import Ask from '@/assets/images/ask.svg';
import Logo from '@/assets/images/logo.svg';
import RepotText from '@/assets/images/repot.svg';
import { Button } from '@/components/ui/button';
import { sleep } from '@/utils';
import { clsx } from 'clsx';
import { marked } from 'marked';
import { useChat } from '@ai-sdk/react';
import { hasMetaKey } from '@/lib/utils';
import { Spinner } from '@/components/ui/spinner';
import useUiStore from '@/store/ui';

export default function AiChatbot() {
  const { messages, input, handleInputChange, handleSubmit, setInput, setMessages } = useChat({
    initialMessages: [
      {
        id: '',
        role: 'assistant',
        content: 'Hi, there, welcome to REPOT AI.',
      },
    ],
    onFinish: () => setIsChatting(false),
  });
  const currentFile = useUiStore(state => state.currentFile);
  const selectedCodes = useUiStore(state => state.selectedCodes);
  const clearSelectedCodes = useUiStore(state => state.clearSelectedCodes);
  const removeSelectedCode = useUiStore(state => state.removeSelectedCode);
  const textarea = useRef<HTMLTextAreaElement>(null);
  const [isChatting, setIsChatting] = useState(false);
  const [isInclude, setIsInclude] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  async function doChat(event?: FormEvent<HTMLFormElement>) {
    if (event) {
      event.preventDefault();
      if ((event.target as HTMLFormElement).matches(':invalid')) return;
    }
    if (isChatting) return;
    if (!input.trim()) return;

    setIsChatting(true);
    setInput('');
    if (selectedCodes.length || currentFile) {
      const lastItem = messages[ messages.length - 1 ];
      const lastContent = lastItem.content;
      if (currentFile && isInclude) {
        lastItem.content = `Reference: ${currentFile.file}
        
\`\`\`
${currentFile.code}
\`\`\`
        
${lastItem.content}`;
      }
      lastItem.content = selectedCodes.reduce((acc, item) => {
        return `Reference: ${item.file} Line ${item.startLine}~${item.endLine}

\`\`\`
${item.code}
\`\`\`

${acc}`;
      }, lastContent);
      setMessages(messages);
      clearSelectedCodes();
    }
    handleSubmit();
  }
  function doOpen(isOpen?: boolean) {
    setIsOpen(prev => {
      if (!prev) {
        sleep(50).then(() => {
          textarea.current?.focus();
        });
      }
      return !prev || !!isOpen;
    });
  }

  function onTextareaKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (hasMetaKey(event) && event.key === 'Enter') {
      doChat();
    }
  }

  function toHtml(content: string) {
    return content ? marked(content) : '';
  }

  useEffect(() => {
    doOpen(true);
  }, [selectedCodes]);

  return (
    <div className="fixed right-4 bottom-20 z-50 hidden md:flex flex-col gap-5 items-end">
      {isOpen && (
        <div className="w-128 border border-black rounded-lg bg-white shadow-[0 8px]">
          <header className="flex items-center px-6 h-18 gap-1.5 border-b border-black">
            <Image
              src={Logo}
              alt="Repot Logo"
              className="w-6 h-6"
              width={24}
              height={24}
            />
            <Image
              src={RepotText}
              alt="Repot"
              className="w-18 h-4 me-1.5"
              width={72}
              height={16}
            />
            AI
          </header>
          <div className="h-90 max-h-90 overflow-auto p-6">
            {messages.map((item, index) =>
              <div
                className={clsx(
                  'flex flex-col gap-2',
                  item.role === 'assistant' ? 'items-start' : 'items-end',
                )}
                key={index}
              >
                {item.role === 'assistant' ?
                  <div className="bg-zinc-100 rounded-full w-8 h-8 flex justify-center items-center">
                    <Image
                      src={Logo}
                      alt="Repot Logo"
                      className="w-6 h-6"
                      width={24}
                      height={24}
                    />
                  </div> : <CircleUserIcon size={32} strokeWidth={2} />}
                {item.role === 'assistant' ? <div
                  className="text-primary-800 p-4 rounded-lg rounded-tl-none bg-ivory"
                  dangerouslySetInnerHTML={{ __html: toHtml(item.content) }}
                /> : <div className="text-primary-800 p-4 rounded-lg rounded-tr-none bg-main-green whitespace-pre-wrap">
                  {item.content as string}
                </div>}
              </div>
            )}
          </div>
          <form
            className="border-t border-black p-4"
            onSubmit={event => doChat(event)}
          >
            {selectedCodes.length || currentFile ? (
              <div className="flex items-center flex-wrap gap-2 mb-2">
                {currentFile && (
                  <label className="inline-flex items-center gap-1 px-2 py-1 border rounded text-xs">
                    <input
                      type="checkbox"
                      checked={isInclude}
                      className="block"
                      onChange={(event) => setIsInclude(event.target.checked)}
                    />
                    Include current file
                  </label>
                )}
                {selectedCodes.map((code, index) => (
                  <div
                    className="flex items-center border gap-1 ps-2 pe-1 py-1 whitespace-nowrap text-xs rounded"
                    key={index}
                  >
                    {code.file} ({code.startLine}~{code.endLine})
                    <Button
                      aria-label="Remove"
                      className="w-4 h-4 p-0"
                      onClick={() => removeSelectedCode(index)}
                      size="xs"
                      type="button"
                      variant="ghost"
                    >
                      <XIcon className="size-3" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : null}
            <div className={clsx(
              'border border-primary-800 rounded-lg flex items-end py-2.5 px-3 gap-2',
              { 'bg-lighter-gray': isChatting },
            )}>
              <textarea
                className="w-full text-sm py-1.5 outline-0"
                disabled={isChatting}
                onChange={handleInputChange}
                onKeyDown={event => onTextareaKeyDown(event)}
                placeholder="Ask about smart contract"
                ref={textarea}
                rows={1}
                value={input}
              />
              <Button
                aria-label="Send"
                className="w-8 h-8 rounded-full border border-black p-0 flex-none [&_svg]:size-5 bg-light-green"
                disabled={isChatting}
                variant="primary"
              >
                {isChatting ? <Spinner className="w-6 h-6" />
                  : <ArrowUpIcon
                    strokeWidth={2}
                  />
                }
              </Button>
            </div>
          </form>
        </div>
      )}
      <Button
        aria-label="Ask Repot"
        className="p-2 h-auto border-black flex-col items-center gap-1"
        effect="raised"
        onClick={() => doOpen()}
        type="button"
        variant="outline"
      >
        <Image
          src={Logo}
          alt="Repot Logo"
          className="w-4 h-4 mb-1"
          width={16}
          height={16}
        />
        <Image
          src={Ask}
          alt="ask"
          className="w-6 h-2 block"
          width={24}
          height={8}
        />
        <Image
          src={RepotText}
          alt="Repot"
          className="block w-9 h-2"
          width={36}
          height={8}
        />
      </Button>
    </div>
  )
}
