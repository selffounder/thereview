import { ArticleRenderer } from '@/app/components/ArticleRenderer'
import { notFound } from 'next/navigation'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'

async function getArticleContent(slug: string) {
  const articlesDirectory = path.join(process.cwd(), 'content/articles')
  const filePath = path.join(articlesDirectory, `${slug}.md`)

  try {
    const fileContent = await fs.promises.readFile(filePath, 'utf8')
    return fileContent
  } catch (error) {
    return null
  }
}

export default async function ArticlePage({
  params,
}: {
  params: { slug: string }
}) {
  const content = await getArticleContent(params.slug)

  if (!content) {
    notFound()
  }

  return <ArticleRenderer content={content} />
} 