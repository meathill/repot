/**
 * Story Protocol 合约抓取脚本
 * 
 * 这个脚本用于从 Story Protocol 的 GitHub 仓库或 Block Explorer 抓取智能合约代码，
 * 并存储到本地目录，稍后可以通过 wrangler 上传到 R2。
 * 
 * 使用方法:
 *   npx tsx scripts/fetch-story-contracts.ts
 * 
 * 上传到 R2:
 *   npx wrangler r2 object put repot-contracts/<key> --file=<local-file>
 *   或批量上传:
 *   for file in ./data/contracts/**\/*.sol; do
 *     key=${file#./data/contracts/}
 *     npx wrangler r2 object put repot-contracts/$key --file=$file
 *   done
 */

import { config } from 'dotenv';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';

// 加载环境变量
config({ path: '.dev.vars' });

// 从 wrangler.jsonc 读取配置
function loadWranglerConfig() {
  try {
    const content = readFileSync('wrangler.jsonc', 'utf-8');
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

// Story Protocol 官方合约地址
const STORY_CONTRACTS = [
  // 这些是 Story Protocol 的核心合约地址
  // 可以从 https://docs.story.foundation/docs/deployed-smart-contracts 获取
  {
    name: 'IPAssetRegistry',
    address: '0x28E59E91C0467e89fd0f0438D47Ca839cDfEc095',
    network: 'story',
  },
  {
    name: 'LicenseRegistry',
    address: '0xBda3992c49E98392e75E78d82B934F3598bA495f',
    network: 'story',
  },
  {
    name: 'LicensingModule',
    address: '0x5a7D9Fa17DE09350F481A53B470D798c1c1aabae',
    network: 'story',
  },
  {
    name: 'RoyaltyModule',
    address: '0xEa6eD700b11DfF703665CCAF55887ca56134Ae3B',
    network: 'story',
  },
  {
    name: 'DisputeModule',
    address: '0xEB7B1dd43B81A7be1fA427515a2b173B454A9832',
    network: 'story',
  },
];

// Story 区块浏览器 API (类似 Etherscan)
const STORY_EXPLORER_API = 'https://www.storyscan.xyz/api';

interface ContractSource {
  name: string;
  address: string;
  sourceCode: string;
  abi?: string;
  compilerVersion?: string;
}

/**
 * 从 Story Explorer 获取合约源代码
 */
async function fetchContractFromExplorer(address: string): Promise<ContractSource | null> {
  try {
    // Story 使用类似 Etherscan 的 API
    const url = new URL(STORY_EXPLORER_API);
    url.searchParams.set('module', 'contract');
    url.searchParams.set('action', 'getsourcecode');
    url.searchParams.set('address', address);
    
    console.log(`  正在从 Story Explorer 获取合约: ${address}`);
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      console.log(`  请求失败: ${response.status}`);
      return null;
    }

    const data = await response.json() as {
      status: string;
      result: Array<{
        ContractName: string;
        SourceCode: string;
        ABI: string;
        CompilerVersion: string;
      }>;
    };

    if (data.status !== '1' || !data.result || data.result.length === 0) {
      console.log(`  未找到合约源代码`);
      return null;
    }

    const contract = data.result[0];
    return {
      name: contract.ContractName,
      address,
      sourceCode: contract.SourceCode,
      abi: contract.ABI,
      compilerVersion: contract.CompilerVersion,
    };
  } catch (error) {
    console.error(`  获取合约失败:`, error);
    return null;
  }
}

/**
 * 从 GitHub 获取 Story Protocol 合约源代码
 */
async function fetchContractsFromGitHub(): Promise<Map<string, string>> {
  const contracts = new Map<string, string>();
  
  // Story Protocol 的 GitHub 仓库
  const repos = [
    'storyprotocol/protocol-core-v1',
    'storyprotocol/protocol-periphery-v1',
  ];

  for (const repo of repos) {
    try {
      console.log(`正在从 GitHub 获取: ${repo}`);
      
      // 获取仓库的 contracts 目录
      const apiUrl = `https://api.github.com/repos/${repo}/git/trees/main?recursive=1`;
      const response = await fetch(apiUrl, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Repot-Crawler',
        },
      });

      if (!response.ok) {
        console.log(`  请求失败: ${response.status}`);
        continue;
      }

      const data = await response.json() as {
        tree: Array<{
          path: string;
          type: string;
          url: string;
        }>;
      };

      // 筛选 .sol 文件
      const solFiles = data.tree.filter(
        item => item.type === 'blob' && item.path.endsWith('.sol')
      );

      console.log(`  找到 ${solFiles.length} 个 Solidity 文件`);

      // 获取每个文件的内容
      for (const file of solFiles.slice(0, 50)) { // 限制数量避免 API 限制
        try {
          const contentResponse = await fetch(file.url, {
            headers: {
              'Accept': 'application/vnd.github.v3+json',
              'User-Agent': 'Repot-Crawler',
            },
          });

          if (contentResponse.ok) {
            const contentData = await contentResponse.json() as {
              content: string;
              encoding: string;
            };
            
            if (contentData.encoding === 'base64') {
              const content = Buffer.from(contentData.content, 'base64').toString('utf-8');
              contracts.set(file.path, content);
            }
          }

          // 避免 API 限制
          await new Promise(resolve => setTimeout(resolve, 100));
        } catch {
          // 忽略单个文件错误
        }
      }
    } catch (error) {
      console.error(`  获取仓库失败:`, error);
    }
  }

  return contracts;
}

/**
 * 保存合约到本地
 */
function saveContractLocally(prefix: string, filename: string, content: string): void {
  const dir = join('./data/contracts', prefix);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  
  const filePath = join(dir, filename);
  writeFileSync(filePath, content, 'utf-8');
  console.log(`  已保存: ${filePath}`);
}

/**
 * 更新 Strapi 中的 Protocol 信息
 */
async function updateProtocolInStrapi(
  name: string,
  documentLinks: string,
  documentJson?: string
): Promise<boolean> {
  // 首先查找现有的 Protocol
  const searchUrl = new URL(`${STRAPI_URL}/api/protocols`);
  searchUrl.searchParams.set('filters[name][$eqi]', name);
  
  try {
    const response = await fetch(searchUrl.toString(), {
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.log(`  查找 Protocol 失败: ${response.status}`);
      return false;
    }

    const result = await response.json() as {
      data: Array<{ id: number; documentId: string; name: string }>;
    };

    if (result.data && result.data.length > 0) {
      // 更新现有记录
      const protocol = result.data[0];
      const updateResponse = await fetch(
        `${STRAPI_URL}/api/protocols/${protocol.documentId}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${STRAPI_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: {
              document_link: documentLinks,
              document_json: documentJson,
            },
          }),
        }
      );

      return updateResponse.ok;
    }
  } catch (error) {
    console.error(`  更新 Strapi 失败:`, error);
  }

  return false;
}

/**
 * 生成上传脚本
 */
function generateUploadScript(): void {
  const script = `#!/bin/bash
# R2 上传脚本
# 运行此脚本将本地合约文件上传到 Cloudflare R2

BUCKET_NAME="repot-contracts"

echo "开始上传合约文件到 R2..."

find ./data/contracts -type f -name "*.sol" | while read file; do
  key=\${file#./data/contracts/}
  echo "上传: \$key"
  npx wrangler r2 object put "\$BUCKET_NAME/\$key" --file="\$file"
done

echo "上传完成!"
`;

  writeFileSync('./scripts/upload-contracts-to-r2.sh', script, { mode: 0o755 });
  console.log('\n已生成上传脚本: scripts/upload-contracts-to-r2.sh');
  console.log('运行 `bash scripts/upload-contracts-to-r2.sh` 上传到 R2');
}

/**
 * 主函数
 */
async function main() {
  console.log('========================================');
  console.log('Story Protocol 合约抓取脚本');
  console.log('========================================\n');

  if (!STRAPI_URL || !STRAPI_TOKEN) {
    console.error('错误: 缺少必要的环境变量');
    process.exit(1);
  }

  // 创建数据目录
  if (!existsSync('./data/contracts')) {
    mkdirSync('./data/contracts', { recursive: true });
  }

  // 1. 从 GitHub 获取合约
  console.log('\n步骤 1: 从 GitHub 获取 Story Protocol 合约...\n');
  const githubContracts = await fetchContractsFromGitHub();
  console.log(`\n从 GitHub 获取了 ${githubContracts.size} 个合约文件`);

  // 保存 GitHub 合约
  for (const [path, content] of githubContracts) {
    const parts = path.split('/');
    const filename = parts.pop() || 'contract.sol';
    const prefix = `github/${parts.join('/')}`;
    saveContractLocally(prefix, filename, content);
  }

  // 2. 从区块浏览器获取已部署的合约
  console.log('\n步骤 2: 从 Story Explorer 获取已部署合约...\n');
  for (const contract of STORY_CONTRACTS) {
    console.log(`获取 ${contract.name}...`);
    const source = await fetchContractFromExplorer(contract.address);
    
    if (source) {
      saveContractLocally(
        `deployed/${contract.address}`,
        `${source.name}.sol`,
        source.sourceCode
      );
      
      if (source.abi) {
        saveContractLocally(
          `deployed/${contract.address}`,
          `${source.name}.abi.json`,
          source.abi
        );
      }
    }

    // 避免 API 限制
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // 3. 生成 document_json (所有代码的 JSON)
  console.log('\n步骤 3: 生成 document_json...\n');
  const allCode: Array<{ file: string; code: string }> = [];
  
  for (const [path, content] of githubContracts) {
    allCode.push({ file: path, code: content });
  }

  const documentJson = JSON.stringify(allCode);
  writeFileSync('./data/contracts/story-protocol.json', documentJson);
  console.log('已生成: ./data/contracts/story-protocol.json');

  // 4. 更新 Strapi
  console.log('\n步骤 4: 更新 Strapi 中的 Protocol 信息...\n');
  
  // 查找 Story Protocol 相关的 Protocol
  const storyProtocols = ['Story Protocol', 'Story'];
  for (const name of storyProtocols) {
    const success = await updateProtocolInStrapi(
      name,
      'github/',
      documentJson
    );
    if (success) {
      console.log(`  ✓ 更新成功: ${name}`);
    }
  }

  // 5. 生成上传脚本
  generateUploadScript();

  console.log('\n========================================');
  console.log('抓取完成!');
  console.log(`  GitHub 合约: ${githubContracts.size} 个文件`);
  console.log(`  已部署合约: ${STORY_CONTRACTS.length} 个地址`);
  console.log('========================================');
  console.log('\n下一步:');
  console.log('1. 检查 ./data/contracts/ 目录中的文件');
  console.log('2. 运行 `bash scripts/upload-contracts-to-r2.sh` 上传到 R2');
  console.log('3. 或使用 wrangler: `npx wrangler r2 object put repot-contracts/<key> --file=<file>`');
}

// 运行主函数
main();
