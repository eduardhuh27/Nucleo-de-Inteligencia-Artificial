import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://seu-dominio-customizado.com.br';
  return [
    { url: baseUrl, lastModified: new Date(), priority: 1 },
    { url: `${baseUrl}/acervo`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/diretorio`, lastModified: new Date(), priority: 0.8 },
  ];
}