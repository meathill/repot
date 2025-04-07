import { xai } from '@ai-sdk/xai';
import { CoreMessage, streamText } from 'ai';

export const config = {
  runtime: 'edge',
};

export async function POST(req: Request) {
  const {
    messages,
    model = 'grok-2-1212',
  } = (await req.json()) as {
    messages: CoreMessage[],
    model?: string;
  };

  const result = streamText({
    model: xai(model),
    messages: [
      ...messages.filter(item => item.role === 'user' || item.role === 'assistant'),
      {
        role: 'system',
        content: 'You are Repot, a great Web3 Chat bot, with every knowledge of Web3. Please answer help our user to learn more about web3. If the conversation is outside web3 scope, you should end it.',
      },
    ],
  });
  return result.toDataStreamResponse();
}
