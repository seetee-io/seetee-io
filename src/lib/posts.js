import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkMdx from 'remark-mdx'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeSlug from 'rehype-slug'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { serialize } from 'next-mdx-remote/serialize'
import { parseISO } from 'date-fns'
import { trimMessage } from './utils'

const postsDirectory = path.join(process.cwd(), 'posts')

export async function loadPostMetadataByYear() {
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

export function loadPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    }
  })
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const matterResult = matter(fileContents)

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: 'wrap',
    })
    .process(matterResult.content)

  const contentHtml = processedContent.toString()
  const mdxSource = await serialize(matterResult.content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
    },
  })

  const footnotesMarker = '<section data-footnotes class="footnotes">'
  const split = contentHtml.split(footnotesMarker)

  const postHtml = split[0]

  var footnotesHtml = null
  if (split.length == 2) {
    footnotesHtml = footnotesMarker + split[1]
  }

  return {
    id,
    postHtml,
    footnotesHtml,
    mdxSource,
    ...matterResult.data,
  }
}
