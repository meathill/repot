# Repot - Story Protocol 智能合约学习平台

帮助用户学习和理解 Story Protocol 智能合约的 Web3 应用。

## 快速开始

```bash
pnpm install
pnpm dev
```

打开 http://localhost:3000

## 合约数据管理

```bash
# 抓取合约代码
npx tsx scripts/fetch-story-contracts.ts

# 上传到 R2
bash scripts/upload-contracts-to-r2.sh

# 创建 CMS 记录
npx tsx scripts/create-story-contracts.ts
```

## 环境变量

在 `.dev.vars` 中配置：
- `NEXT_PUBLIC_SITE_URL` - 网站 URL
- `NEXT_PUBLIC_BACKEND_URL` - Strapi CMS URL  
- `STRAPI_SUPER_ADMIN_TOKEN` - Strapi 管理员 Token
- `GOOGLE_GENAI_API_KEY` - Google AI API Key

## 部署

```bash
pnpm build
pnpm deploy
```

## License

MIT
