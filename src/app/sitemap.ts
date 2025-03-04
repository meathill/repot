import { MetadataRoute } from 'next'
import { getChains, getProtocols, getContracts } from '@/services';
import slugify from 'slugify';

const lastModified = new Date();
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://repot.dev';
const buildUrl = (path: string) => `${BASE_URL}${path}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/search`,
      lastModified,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/social`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    },
  ];
  try {
    const [chains, protocols, contracts] = await Promise.all([
      getChains(),
      getProtocols(),
      getContracts(),
    ]);

    const sitemapOfChains = chains.map((chain) => ({
      url: `${BASE_URL}/search?category=chains&chain=${chain.name}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    }));

    // 通用生成函数
    const generateDynamicEntries = <T extends { documentId: string; name: string }>(
      items: T[],
      pathPrefix: string
    ) => items.map((item) => ({
      url: buildUrl(`/${pathPrefix}/${item.documentId}-${slugify(item.name)}`),
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    }));

    const sitemapOfProtocols = generateDynamicEntries(protocols, 'protocol');
    const sitemapOfContracts = generateDynamicEntries(contracts, 'contract');

    return [
      ...staticPages,
      ...sitemapOfChains,
      ...sitemapOfProtocols,
      ...sitemapOfContracts,
    ]
  } catch (error) {
    console.error('Failed to generate sitemap:', error);
    return [
      ...staticPages,
    ];
  }
}
