import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

function slugify(text) {
  return encodeURIComponent(text.trim().toLowerCase().replace(/\s+/g, '-'))
}

function headingExtractor(headings) {
  return () => tree => {
    const visit = node => {
      if (node.type === 'heading') {
        let text = ''
        node.children.forEach(child => {
          if (child.type === 'text') text += child.value
        })
        const id = slugify(text)
        headings.push({ depth: node.depth, text, id })
        node.data = node.data || {}
        node.data.hProperties = node.data.hProperties || {}
        node.data.id = id
        node.data.hProperties.id = id
      }
      if (Array.isArray(node.children)) node.children.forEach(visit)
    }
    visit(tree)
  }
}

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    const slug = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    return {
      slug,
      ...(matterResult.data)
    }
  })
  return allPostsData.sort((a, b) => {
    return a.date < b.date ? 1 : -1
  })
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map(fileName => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getPostData(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)
  const headings = []
  const processedContent = await remark()
    .use(headingExtractor(headings))
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()
  return {
    slug,
    contentHtml,
    headings,
    ...(matterResult.data)
  }
}
