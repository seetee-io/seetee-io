import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { serialize } from 'next-mdx-remote/serialize'
import { parseISO } from 'date-fns'

const postsDirectory = path.join(process.cwd(), 'posts')

// Does not return posts marked as unlisted in their frontmatter.
export async function loadPostMetadataByYear() {
  const fileNames = fs.readdirSync(postsDirectory)

  const allPosts = []
  for (let i = 0; i < fileNames.length; i++) {
    const fileName = fileNames[i]
    const id = fileName.replace(/\.md$/, '')

    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const matterResult = matter(fileContents)

    if (!matterResult.data.unlisted) {
      allPosts.push({
        id,
        ...matterResult.data,
      })
    }
  }

  allPosts.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1
    } else if (a > b) {
      return -1
    } else {
      return 0
    }
  })

  return allPosts.reduce((acc, curr) => {
    const currYear = parseISO(curr.date).getFullYear()
    if (!acc[currYear]) acc[currYear] = []
    acc[currYear].push(curr)
    return acc
  }, {})
}

export function loadPostsMetadata() {
  const fileNames = fs.readdirSync(postsDirectory)

  const allPosts = []
  for (let i = 0; i < fileNames.length; i++) {
    const fileName = fileNames[i]
    const id = fileName.replace(/\.md$/, '')

    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const matterResult = matter(fileContents)

    allPosts.push({
      id,
      ...matterResult.data,
    })
  }

  return allPosts
}

export async function loadPost(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const { content, data } = matter(fileContents)

  const mdxSource = await serialize(content, {
    scope: data,
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
    },
  })

  return {
    id,
    mdxSource,
    frontMatter: data,
  }
}
