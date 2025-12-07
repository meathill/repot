import { GoogleGenAI } from '@google/genai';
import { getCloudflareContext } from '@opennextjs/cloudflare';

export async function POST(req: Request) {
  const { env } = await getCloudflareContext({ async: true });
  const ai = new GoogleGenAI({
    apiKey: env.GOOGLE_GENAI_API_KEY,
  });
  const {
    messages,
    model = 'gemini-2.5-flash',
  } = (await req.json()) as {
    messages: { role: string; content: string }[],
    model?: string;
  };

  const systemInstruction = 'You are Repot, a great Web3 Chat bot, with every knowledge of Web3. Please help our user to learn more about web3. If the conversation is outside web3 scope, you should end it.';

  // Convert messages to Google AI format
  const history = messages
    .filter(item => item.role === 'user' || item.role === 'assistant')
    .slice(0, -1) // Remove the last message as it will be sent as the current message
    .map(item => ({
      role: item.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: item.content }],
    }));

  const lastMessage = messages.filter(item => item.role === 'user').pop();
  if (!lastMessage) {
    return new Response('No user message found', { status: 400 });
  }

  const chat = ai.chats.create({
    model,
    history,
    config: {
      systemInstruction,
    },
  });

  const stream = await chat.sendMessageStream({
    message: lastMessage.content,
  });

  // Create a ReadableStream for SSE
  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          const text = chunk.text;
          if (text) {
            // Format as SSE data event compatible with useChat
            const data = JSON.stringify({ type: 'text-delta', textDelta: text });
            controller.enqueue(encoder.encode(`0:${data}\n`));
          }
        }
        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
  });

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
