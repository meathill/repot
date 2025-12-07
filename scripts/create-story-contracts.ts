/**
 * 在 Strapi 中创建 Story Protocol 合约记录
 */

import { config } from 'dotenv';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

config({ path: '.dev.vars' });

const STRAPI_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://repot-cms.roudan.io';
const STRAPI_TOKEN = process.env.STRAPI_SUPER_ADMIN_TOKEN;

interface ContractInfo {
  name: string;
  path: string;
  description: string;
}

// 从本地文件收集合约信息
function collectContracts(): ContractInfo[] {
  const contracts: ContractInfo[] = [];
  const baseDir = './data/contracts/github/contracts';
  
  function scanDir(dir: string, prefix = '') {
    try {
      const items = readdirSync(dir);
      for (const item of items) {
        const fullPath = join(dir, item);
        const stat = statSync(fullPath);
        
        if (stat.isDirectory()) {
          scanDir(fullPath, `${prefix}${item}/`);
        } else if (item.endsWith('.sol') && !item.startsWith('I')) {
          // 跳过接口文件 (以 I 开头)
          const name = item.replace('.sol', '');
          contracts.push({
            name,
            path: `github/contracts/${prefix}`,
            description: `Story Protocol ${name} - Smart contract for intellectual property management on Story blockchain.`,
          });
        }
      }
    } catch (e) {
      // 目录不存在
    }
  }
  
  scanDir(baseDir);
  return contracts;
}

// 检查合约是否已存在
async function contractExists(name: string): Promise<boolean> {
  const url = new URL(`${STRAPI_URL}/api/contracts`);
  url.searchParams.set('filters[name][$eqi]', name);
  
  const response = await fetch(url.toString(), {
    headers: {
      'Authorization': `Bearer ${STRAPI_TOKEN}`,
    },
  });
  
  if (!response.ok) return false;
  
  const result = await response.json() as { data: Array<unknown> };
  return result.data && result.data.length > 0;
}

// 创建合约
async function createContract(contract: ContractInfo): Promise<string | null> {
  const url = new URL(`${STRAPI_URL}/api/contracts`);
  
  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${STRAPI_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: {
        name: contract.name,
        document_links: contract.path,
        overview: contract.description,
      },
    }),
  });
  
  if (!response.ok) {
    const error = await response.text();
    console.error(`  创建失败: ${error}`);
    return null;
  }
  
  const result = await response.json() as { data: { documentId: string } };
  return result.data?.documentId || null;
}

// 发布合约
async function publishContract(documentId: string): Promise<boolean> {
  const url = `${STRAPI_URL}/api/contracts/${documentId}`;
  
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${STRAPI_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: {
        publishedAt: new Date().toISOString(),
      },
    }),
  });
  
  return response.ok;
}

async function main() {
  console.log('========================================');
  console.log('创建 Story Protocol 合约记录');
  console.log('========================================\n');
  
  if (!STRAPI_TOKEN) {
    console.error('错误: 缺少 STRAPI_SUPER_ADMIN_TOKEN');
    process.exit(1);
  }
  
  // 收集合约
  console.log('收集本地合约文件...');
  const contracts = collectContracts();
  console.log(`  找到 ${contracts.length} 个合约\n`);
  
  // 创建合约记录
  console.log('创建合约记录...\n');
  let created = 0;
  let skipped = 0;
  const createdIds: { name: string; documentId: string }[] = [];
  
  for (const contract of contracts) {
    // 检查是否已存在
    if (await contractExists(contract.name)) {
      console.log(`  跳过 (已存在): ${contract.name}`);
      skipped++;
      continue;
    }
    
    console.log(`  创建: ${contract.name}`);
    const documentId = await createContract(contract);
    if (documentId) {
      created++;
      createdIds.push({ name: contract.name, documentId });
      
      // 发布
      await publishContract(documentId);
    }
    
    // 避免 API 限制
    await new Promise(r => setTimeout(r, 200));
  }
  
  console.log('\n========================================');
  console.log('完成!');
  console.log(`  创建: ${created}`);
  console.log(`  跳过: ${skipped}`);
  console.log('========================================');
  
  if (createdIds.length > 0) {
    console.log('\n可访问的合约 URL:');
    for (const { name, documentId } of createdIds.slice(0, 5)) {
      console.log(`  http://localhost:3000/contract/${documentId}-${name.toLowerCase()}`);
    }
    if (createdIds.length > 5) {
      console.log(`  ... 还有 ${createdIds.length - 5} 个`);
    }
  }
}

main();
