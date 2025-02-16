import { S3FolderList } from '@/types';
import { readDir } from '@/services/s3';
import OpenAI from 'openai';

export async function findFirstFileFrom(sources: S3FolderList) {
  const { folders, files } = sources;
  if (files.length > 0) {
    return files[ 0 ];
  }
  const [ folder ] = folders;
  const content = await readDir(folder.Prefix);
  return await findFirstFileFrom(content);
}

export function getOpenAi(
  apiKey = process.env.OPENAI_API_KEY,
  endpoint?: string,
): OpenAI {
  return new OpenAI({
    apiKey,
    baseURL: endpoint,
  });
}

export function getAiClient(model: string) {
  let apiKey = process.env.OPENAI_API_KEY;
  let endpoint = undefined;
  switch (model) {
    case 'grok-2-latest':
      apiKey = process.env.XAI_API_KEY;
      endpoint = 'https://api.x.ai/v1';
      break;

    case 'gemini-2.0-flash-001':
      apiKey = process.env.GOOGLE_GEMINI_API_KEY;
      endpoint = 'https://generativelanguage.googleapis.com/v1beta/openai/';
      break;

    case 'meta-llama/Llama-3.3-70B-Instruct':
    case 'deepseek-ai/DeepSeek-R1-Distill-Qwen-32B':
      apiKey = process.env.HF_ACCESS_TOKEN;
      endpoint = 'https://api-inference.huggingface.co/v1/';
      break;

    case 'deepseek-ai/DeepSeek-V3':
    case 'deepseek-ai/DeepSeek-R1':
      apiKey = process.env.HF_ACCESS_TOKEN;
      endpoint = 'https://huggingface.co/api/inference-proxy/together';
      break;
  }
  return getOpenAi(apiKey, endpoint);
}
