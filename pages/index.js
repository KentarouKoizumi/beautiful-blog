import Link from 'next/link'
import { getSortedPostsData } from '../lib/posts'
import { motion } from 'framer-motion'
import { Button } from '@/components/components/ui/button'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Home({ allPostsData }) {
  return (
    <motion.div
      className="container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1>My Blog</h1>
      <motion.ul
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
      >
        {allPostsData.map(({ slug, date, title }) => (
          <motion.li key={slug} variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
            <Button asChild variant="link">
              <Link href={`/posts/${slug}`}>{title}</Link>
            </Button>
            <br />
            <small>{date}</small>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  )
}
