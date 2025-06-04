import Link from 'next/link'
import { getAllPostSlugs, getPostData } from '../../lib/posts'
import { motion } from 'framer-motion'
import { Button } from '@/components/components/ui/button'

export async function getStaticPaths() {
  const paths = getAllPostSlugs()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.slug)
  return {
    props: {
      postData
    }
  }
}

export default function Post({ postData }) {
  return (
    <motion.div
      className="container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1>{postData.title}</h1>
      <div className="relative">
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        {postData.headings && postData.headings.length > 0 && (
          <aside className="toc">
            <strong>目次</strong>
            <ul>
              {postData.headings.map(h => (
                <li key={h.id}>
                  <a href={`#${h.id}`}>{h.text}</a>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </div>
      <Button asChild variant="ghost" className="mt-4">
        <Link href="/">Back</Link>
      </Button>
    </motion.div>
  )
}
