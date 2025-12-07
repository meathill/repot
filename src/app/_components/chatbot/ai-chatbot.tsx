'use client';

import Image from 'next/image';
import { ChangeEvent, FormEvent, KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpIcon, CircleUserIcon, XIcon } from 'lucide-react';
import Ask from '@/assets/images/ask.svg';
import Logo from '@/assets/images/logo.svg';
import RepotText from '@/assets/images/repot.svg';
import { Button } from '@/components/ui/button';
import { sleep } from '@/utils';
import { clsx } from 'clsx';
import { marked } from 'marked';
import { hasMetaKey } from '@/lib/utils';
import { Spinner } from '@/components/ui/spinner';
import useUiStore from '@/store/ui';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function AiChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: 'Hi, there, welcome to REPOT AI.',
    },
  ]);
  const [input, setInput] = useState('');
  const currentFile = useUiStore(state => state.currentFile);
  const selectedCodes = useUiStore(state => state.selectedCodes);
  const clearSelectedCodes = useUiStore(state => state.clearSelectedCodes);
  const removeSelectedCode = useUiStore(state => state.removeSelectedCode);
  const textarea = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isChatting, setIsChatting] = useState(false);
  const [isInclude, setIsInclude] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  }, []);

  async function doChat(event?: FormEvent<HTMLFormElement>) {
    if (event) {
      event.preventDefault();
      if ((event.target as HTMLFormElement).matches(':invalid')) return;
    }
    if (isChatting) return;
    if (!input.trim()) return;

    setIsChatting(true);
    const userInput = input;
    setInput('');

    // Build message content with references
    let messageContent = userInput;
    if (currentFile && isInclude) {
      messageContent = `Reference: ${currentFile.file}
        
\`\`\`
${currentFile.code}
\`\`\`
        
${messageContent}`;
    }
    messageContent = selectedCodes.reduce((acc, item) => {
      return `Reference: ${item.file} Line ${item.startLine}~${item.endLine}

\`\`\`
${item.code}
\`\`\`

${acc}`;
    }, messageContent);

    clearSelectedCodes();

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageContent,
    };

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: '',
    };

    setMessages(prev => [...prev, userMessage, assistantMessage]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) throw new Error('Chat request failed');

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader available');

      const decoder = new TextDecoder();
      let accumulatedContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n').filter(line => line.trim());

        for (const line of lines) {
          // Parse the SSE format: 0:{"type":"text-delta","textDelta":"..."}
          const match = line.match(/^0:(.+)$/);
          if (match) {
            try {
              const data = JSON.parse(match[ 1 ]);
              if (data.textDelta) {
                accumulatedContent += data.textDelta;
                setMessages(prev => {
                  const newMessages = [...prev];
                  const lastMessage = newMessages[ newMessages.length - 1 ];
                  if (lastMessage.role === 'assistant') {
                    lastMessage.content = accumulatedContent;
                  }
                  return newMessages;
                });
              }
            } catch {
              // Skip invalid JSON
            }
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => {
        const newMessages = [...prev];
        const lastMessage = newMessages[ newMessages.length - 1 ];
        if (lastMessage.role === 'assistant') {
          lastMessage.content = 'Sorry, something went wrong. Please try again.';
        }
        return newMessages;
      });
    } finally {
      setIsChatting(false);
    }
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
    if (selectedCodes?.length) doOpen(true);
  }, [selectedCodes]);

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
                  className="text-primary-800 p-4 rounded-lg rounded-tl-none bg-ivory max-w-full text-sm prose-sm"
                  dangerouslySetInnerHTML={{ __html: toHtml(item.content) }}
                /> : <div className="text-primary-800 text-xs p-4 rounded-lg rounded-tr-none bg-main-green whitespace-pre-wrap overflow-hidden break-all">
                  {item.content as string}
                </div>}
              </div>
            )}
            <div ref={messagesEndRef} />
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
