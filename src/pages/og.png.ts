import type { APIRoute } from 'astro';
import { generateOgImageForSite } from '@utils/generateOgImages';

export const GET: APIRoute = async () => {
  const ogImage = await generateOgImageForSite();

  return new Response(new Uint8Array(ogImage), {
    headers: { 'Content-Type': 'image/png' },
  });
};
