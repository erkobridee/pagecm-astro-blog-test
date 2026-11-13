import type { APIRoute } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { generateOgImageForPost } from '@utils/generateOgImages';
import { slugifyStr } from '@utils/slugify';

type PostEntry = CollectionEntry<'blog'>;

export async function getStaticPaths() {
  const posts = await getCollection('blog');

  return posts
    .filter(({ data }) => !data.draft && !data.ogImage)
    .map(post => ({
      params: { slug: slugifyStr(post.data.title) },
      props: post,
    }));
}

export const GET: APIRoute = async ({ props }) => {
  const postOgImage = await generateOgImageForPost(props as PostEntry);

  return new Response(new Uint8Array(postOgImage), {
    headers: { 'Content-Type': 'image/png' },
  });
};
