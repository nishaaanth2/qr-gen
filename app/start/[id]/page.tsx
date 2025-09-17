import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Body from '@/components/Body';

type KVData = {
  prompt: string;
  url: string;
  image_url?: string;
  model_latency_ms?: number | string;
};

async function getAllKv(_id: string): Promise<KVData | null> {
  // Placeholder function to fetch data
  // This should be replaced with an actual data fetching mechanism
  void _id;
  return null;
}

export async function generateMetadata({
  params,
}: {
  params: {
    id: string;
  };
}): Promise<Metadata | undefined> {
  const data = await getAllKv(params.id);
  if (!data) {
    return;
  }

  const title = `QrGPT: ${data.prompt}`;
  const description = `A QR code generated from qrGPT.io linking to: ${data.url}`;
  const image = data.image_url || 'https://qrGPT.io/og-image.png';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@nutlope',
    },
  };
}

export default async function Results({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const data = await getAllKv(params.id);
  if (!data) {
    notFound();
  }
  return <Body />;
}
