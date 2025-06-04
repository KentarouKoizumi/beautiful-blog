import { getSortedPostsData, getAllPostSlugs, getPostData } from '../lib/posts.js';
import path from 'path';

describe('posts utilities', () => {
  test('getSortedPostsData returns array of posts', () => {
    const posts = getSortedPostsData();
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(0);
    // Check that required keys exist
    const post = posts[0];
    expect(post).toHaveProperty('slug');
    expect(post).toHaveProperty('date');
    expect(post).toHaveProperty('title');
  });

  test('getAllPostSlugs returns slugs', () => {
    const slugs = getAllPostSlugs();
    expect(Array.isArray(slugs)).toBe(true);
    expect(slugs.length).toBeGreaterThan(0);
    expect(slugs[0]).toHaveProperty('params');
    expect(slugs[0].params).toHaveProperty('slug');
  });

  test('getPostData returns post content', async () => {
    const { params } = getAllPostSlugs()[0];
    const post = await getPostData(params.slug);
    expect(post).toHaveProperty('slug', params.slug);
    expect(post).toHaveProperty('contentHtml');
    expect(post.contentHtml).toContain('<h1>');
  });
});
