import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeSlug from 'rehype-slug'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { h } from 'hastscript'
import { trimMessage } from './utils'

import { ZapIcon } from '@primer/octicons-react'

const postsDirectory = path.join(process.cwd(), 'posts')

export async function getSortedPosts() {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = []

  for (let i = 0; i < fileNames.length; i++) {
    const fileName = fileNames[i]
    const id = fileName.replace(/\.md$/, '')

    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const matterResult = matter(fileContents)
    const summary = trimMessage(matterResult.content, 280)

    allPostsData.push({
      id,
      summary,
      ...matterResult.data,
    })
  }

  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1
    } else if (a > b) {
      return -1
    } else {
      return 0
    }
  })
}

export function getAllPostIds() {
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
    .use(rehypeRaw)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: 'wrap',
    })
    .process(matterResult.content)

  const contentHtml = processedContent.toString()

  const footnotesMarker = '<section data-footnotes class="footnotes">'
  const split = contentHtml.split(footnotesMarker)

  console.log(split[1])

  const postHtml = split[0]

  var footnotesHtml = null
  if (split.length == 2) {
    footnotesHtml = footnotesMarker + split[1]
  }

  return {
    id,
    postHtml,
    footnotesHtml,
    ...matterResult.data,
  }
}
