#!/bin/bash
# R2 上传脚本
# 运行此脚本将本地合约文件上传到 Cloudflare R2
# 
# 使用前请确保:
# 1. 已安装 wrangler: npm install -g wrangler
# 2. 已登录 Cloudflare: wrangler login
# 3. R2 bucket 已创建: wrangler r2 bucket create repot-contracts

BUCKET_NAME="repot-contracts"
DATA_DIR="./data/contracts"

echo "=========================================="
echo "R2 合约文件上传脚本"
echo "=========================================="
echo ""

# 检查目录是否存在
if [ ! -d "$DATA_DIR" ]; then
    echo "错误: 目录 $DATA_DIR 不存在"
    echo "请先运行: npx tsx scripts/fetch-story-contracts.ts"
    exit 1
fi

# 计算文件数量
FILE_COUNT=$(find "$DATA_DIR" -type f \( -name "*.sol" -o -name "*.json" \) | wc -l | tr -d ' ')
echo "找到 $FILE_COUNT 个文件待上传"
echo ""

# 确认上传
read -p "确认上传到 R2 bucket '$BUCKET_NAME'? (y/n) " confirm
if [ "$confirm" != "y" ]; then
    echo "取消上传"
    exit 0
fi

echo ""
echo "开始上传..."
echo ""

# 上传所有 .sol 和 .json 文件
UPLOADED=0
FAILED=0

find "$DATA_DIR" -type f \( -name "*.sol" -o -name "*.json" \) | while read file; do
    # 计算相对路径作为 R2 key
    key=${file#$DATA_DIR/}
    
    echo "上传: $key"
    
    if npx wrangler r2 object put "$BUCKET_NAME/$key" --file="$file" --quiet 2>/dev/null; then
        ((UPLOADED++))
    else
        echo "  ✗ 失败"
        ((FAILED++))
    fi
done

echo ""
echo "=========================================="
echo "上传完成!"
echo "  成功: $UPLOADED"
echo "  失败: $FAILED"
echo "=========================================="
