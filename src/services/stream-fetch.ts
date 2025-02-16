import EventEmitter3 from 'eventemitter3';
import type { RequestType } from '@/constants';
import type OpenAI from 'openai';

export enum StreamFetchEvent {
  CHANGE = 'change',
}
export type StreamParams = {
  messages?: OpenAI.ChatCompletionMessageParam[];
  model?: string;
  prompt?: string;
}

export async function sendMessage(
  type: RequestType,
  messages: OpenAI.ChatCompletionMessageParam[],
  model: string,
  prompt?: string,
): Promise<Response> {
  return fetch('/api/chat', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      type,
      messages,
      prompt,
      model,
    }),
  });
}

export default class StreamFetch extends EventEmitter3 {
  promise: Promise<void>;

  constructor(
    type: RequestType,
    {
      messages = [],
      model = 'gpt-4o',
    }: StreamParams = {},
  ) {
    super();

    let response: Promise<Response>;
    switch (type) {
      default:
        response = sendMessage(type, messages, model);
        break;
    }
    this.promise = this.fetch(response);
  }

  private async fetch(p: Promise<Response>): Promise<void> {
    const response = await p;

    if (!response.ok) {
      throw new Error('Network error');
    }

    const data: ReadableStream<Uint8Array> = response.body as ReadableStream<Uint8Array>;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      if (!value) {
        break;
      }

      const chunkValue = decoder.decode(value);
      this.emit(StreamFetchEvent.CHANGE, chunkValue);
    }
  }
}
