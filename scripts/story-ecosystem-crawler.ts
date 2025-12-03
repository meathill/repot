/**
 * Story Ecosystem Crawler
 * 
 * 这个脚本用于从 https://www.story.foundation/ecosystem 页面抓取生态系统合作伙伴信息，
 * 并将其同步到 Strapi CMS 中作为 Protocol 数据。
 * 
 * 使用方法:
 *   npx tsx scripts/story-ecosystem-crawler.ts
 * 
 * 环境变量 (从 .dev.vars 读取):
 *   - STRAPI_SUPER_ADMIN_TOKEN: Strapi 超级管理员令牌
 *   - NEXT_PUBLIC_BACKEND_URL: Strapi 后端 URL
 */

import { config } from 'dotenv';
import { readFileSync } from 'fs';

// 加载环境变量
config({ path: '.dev.vars' });

// 从 wrangler.jsonc 读取额外配置
function loadWranglerConfig() {
  try {
    const content = readFileSync('wrangler.jsonc', 'utf-8');
    // 移除注释
    const jsonContent = content.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
    const config = JSON.parse(jsonContent);
    return config.vars || {};
  } catch {
    return {};
  }
}

const wranglerVars = loadWranglerConfig();
const STRAPI_URL = process.env.NEXT_PUBLIC_BACKEND_URL || wranglerVars.NEXT_PUBLIC_BACKEND_URL;
const STRAPI_TOKEN = process.env.STRAPI_SUPER_ADMIN_TOKEN;
const STORY_ECOSYSTEM_URL = 'https://www.story.foundation/ecosystem';

// Story Chain 的 documentId，需要在 Strapi 中预先创建
const STORY_CHAIN_NAME = 'Story';

interface Partner {
  name: string;
  logoUrl: string;
  website: string;
  category?: string;
}

interface StrapiProtocol {
  id: number;
  documentId: string;
  name: string;
}

interface StrapiChain {
  id: number;
  documentId: string;
  name: string;
}

/**
 * 从 Story Foundation 页面抓取生态系统数据
 */
async function fetchEcosystemData(): Promise<Partner[]> {
  console.log('正在抓取 Story Foundation 生态系统页面...');
  
  const response = await fetch(STORY_ECOSYSTEM_URL, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    },
  });

  if (!response.ok) {
    throw new Error(`抓取失败: ${response.status} ${response.statusText}`);
  }

  const html = await response.text();
  console.log(`页面大小: ${(html.length / 1024).toFixed(1)} KB`);

  // 解析 Next.js RSC payload 中的合作伙伴数据
  // 数据是转义的 JSON 格式，如: \"id\":\"partner\"
  const partners: Partner[] = [];
  const seen = new Set<string>();

  let pos = 0;
  while (true) {
    // 查找 partner 类型的条目
    const idx = html.indexOf('\\"id\\":\\"partner\\"', pos);
    if (idx === -1) break;
    
    // 在这个条目之后的区域查找 name
    const searchArea = html.substring(idx, idx + 2000);
    const nameMatch = searchArea.match(/\\"name\\":\\"([^\\]+)\\"/);
    
    if (nameMatch) {
      const name = nameMatch[1];
      if (!seen.has(name)) {
        seen.add(name);
        
        // 找 logo URL
        let logoUrl = '';
        const logoMatch = searchArea.match(/\\"url\\":\\"(\/\/images\.ctfassets\.net[^\\]+)\\"/);
        if (logoMatch) {
          logoUrl = 'https:' + logoMatch[1].replace(/\\u0026/g, '&');
        }
        
        // 找 website URL (在 partnerLink 类型的条目中)
        let website = '';
        const linkMatch = searchArea.match(/\\"partnerLink\\".*?\\"url\\":\\"(https?:[^\\]+)\\"/);
        if (linkMatch) {
          website = linkMatch[1].replace(/\\u0026/g, '&');
        } else {
          // 备用：直接找 links 中的 url
          const altLinkMatch = searchArea.match(/\\"links\\":\[.*?\\"url\\":\\"(https?:[^\\]+)\\"/);
          if (altLinkMatch) {
            website = altLinkMatch[1].replace(/\\u0026/g, '&');
          }
        }
        
        partners.push({ name, logoUrl, website });
      }
    }
    
    pos = idx + 1;
  }

  console.log(`找到 ${partners.length} 个生态系统合作伙伴`);
  return partners;
}

/**
 * 获取或创建 Story Chain
 */
async function getOrCreateStoryChain(): Promise<StrapiChain | null> {
  console.log('正在查找 Story Chain...');
  
  // 查找现有的 Story Chain
  const searchUrl = new URL(`${STRAPI_URL}/api/chains`);
  searchUrl.searchParams.set('filters[name][$eq]', STORY_CHAIN_NAME);
  
  const response = await fetch(searchUrl.toString(), {
    headers: {
      'Authorization': `Bearer ${STRAPI_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    console.error('查找 Chain 失败:', await response.text());
    return null;
  }

  const result = await response.json();
  
  if (result.data && result.data.length > 0) {
    console.log(`找到现有 Story Chain: ${result.data[0].documentId}`);
    return result.data[0];
  }

  // 创建新的 Story Chain
  console.log('正在创建 Story Chain...');
  const createResponse = await fetch(`${STRAPI_URL}/api/chains`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${STRAPI_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: {
        name: STORY_CHAIN_NAME,
        overview: 'Story is a purpose-built layer 1 blockchain designed to be the world\'s Intellectual Property (IP) blockchain.',
        website: 'https://www.story.foundation/',
        developer_docs: 'https://docs.story.foundation/',
        chain_language: 'Solidity',
        consensus: 'Proof of Stake',
        network_layer: 'Layer 1',
        network_type: 'EVM Compatible',
        explorer: 'https://explorer.story.foundation/',
        logo_url: 'https://www.story.foundation/_next/static/media/logo.svg',
      },
    }),
  });

  if (!createResponse.ok) {
    console.error('创建 Chain 失败:', await createResponse.text());
    return null;
  }

  const createResult = await createResponse.json();
  console.log(`创建了新的 Story Chain: ${createResult.data.documentId}`);
  
  // 发布 Chain
  await publishEntry('chains', createResult.data.documentId);
  
  return createResult.data;
}

/**
 * 发布 Strapi 条目
 */
async function publishEntry(type: string, documentId: string): Promise<boolean> {
  const response = await fetch(`${STRAPI_URL}/api/${type}/${documentId}/publish`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${STRAPI_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  return response.ok;
}

/**
 * 获取现有的 Protocols
 */
async function getExistingProtocols(): Promise<Map<string, StrapiProtocol>> {
  console.log('正在获取现有 Protocols...');
  
  const protocols = new Map<string, StrapiProtocol>();
  let page = 1;
  const pageSize = 100;
  
  while (true) {
    const url = new URL(`${STRAPI_URL}/api/protocols`);
    url.searchParams.set('pagination[page]', page.toString());
    url.searchParams.set('pagination[pageSize]', pageSize.toString());
    url.searchParams.set('fields[0]', 'name');
    
    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('获取 Protocols 失败:', await response.text());
      break;
    }

    const result = await response.json();
    
    for (const protocol of result.data) {
      protocols.set(protocol.name.toLowerCase(), protocol);
    }

    if (result.data.length < pageSize) break;
    page++;
  }

  console.log(`找到 ${protocols.size} 个现有 Protocols`);
  return protocols;
}

/**
 * 带重试的 fetch
 */
async function fetchWithRetry(
  url: string,
  options: RequestInit,
  retries = 3,
  delay = 1000
): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      return response;
    } catch (error) {
      if (i === retries - 1) throw error;
      console.log(`  请求失败，${delay / 1000}秒后重试... (${i + 1}/${retries})`);
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2; // 指数退避
    }
  }
  throw new Error('请求失败');
}

/**
 * 创建新的 Protocol
 */
async function createProtocol(partner: Partner, chainDocumentId: string): Promise<boolean> {
  const response = await fetchWithRetry(`${STRAPI_URL}/api/protocols`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${STRAPI_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: {
        name: partner.name,
        overview: `${partner.name} is a partner in the Story Protocol ecosystem.`,
        logo_url: partner.logoUrl || undefined,
        document_link: partner.website || undefined,
        chains: [chainDocumentId],
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error(`创建 Protocol "${partner.name}" 失败:`, error);
    return false;
  }

  const result = await response.json();
  
  // 发布 Protocol
  await publishEntry('protocols', result.data.documentId);
  
  return true;
}

/**
 * 更新现有的 Protocol
 */
async function updateProtocol(
  documentId: string, 
  partner: Partner, 
  chainDocumentId: string
): Promise<boolean> {
  const response = await fetchWithRetry(`${STRAPI_URL}/api/protocols/${documentId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${STRAPI_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: {
        logo_url: partner.logoUrl || undefined,
        document_link: partner.website || undefined,
        chains: [chainDocumentId],
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error(`更新 Protocol "${partner.name}" 失败:`, error);
    return false;
  }

  return true;
}

/**
 * 主函数
 */
async function main() {
  console.log('========================================');
  console.log('Story Ecosystem Crawler');
  console.log('========================================\n');

  // 检查环境变量
  if (!STRAPI_URL) {
    console.error('错误: 缺少 NEXT_PUBLIC_BACKEND_URL 环境变量');
    process.exit(1);
  }
  if (!STRAPI_TOKEN) {
    console.error('错误: 缺少 STRAPI_SUPER_ADMIN_TOKEN 环境变量');
    process.exit(1);
  }

  console.log(`Strapi URL: ${STRAPI_URL}`);
  console.log(`目标页面: ${STORY_ECOSYSTEM_URL}\n`);

  try {
    // 1. 获取或创建 Story Chain
    const storyChain = await getOrCreateStoryChain();
    if (!storyChain) {
      console.error('无法获取或创建 Story Chain');
      process.exit(1);
    }

    // 2. 抓取生态系统数据
    const partners = await fetchEcosystemData();
    if (partners.length === 0) {
      console.log('没有找到合作伙伴数据');
      process.exit(0);
    }

    // 3. 获取现有 Protocols
    const existingProtocols = await getExistingProtocols();

    // 4. 同步数据
    console.log('\n正在同步数据到 Strapi...');
    let created = 0;
    let updated = 0;
    let skipped = 0;

    for (const partner of partners) {
      const existing = existingProtocols.get(partner.name.toLowerCase());
      
      if (existing) {
        // 更新现有记录
        const success = await updateProtocol(existing.documentId, partner, storyChain.documentId);
        if (success) {
          updated++;
          console.log(`  ✓ 更新: ${partner.name}`);
        } else {
          skipped++;
        }
      } else {
        // 创建新记录
        const success = await createProtocol(partner, storyChain.documentId);
        if (success) {
          created++;
          console.log(`  + 创建: ${partner.name}`);
        } else {
          skipped++;
        }
      }

      // 避免请求过快
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // 5. 输出统计
    console.log('\n========================================');
    console.log('同步完成!');
    console.log(`  创建: ${created}`);
    console.log(`  更新: ${updated}`);
    console.log(`  跳过: ${skipped}`);
    console.log('========================================');

  } catch (error) {
    console.error('爬虫执行失败:', error);
    process.exit(1);
  }
}

// 运行主函数
main();
