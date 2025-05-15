import { ArticleRenderer } from '@/app/components/ArticleRenderer'
import { notFound } from 'next/navigation'
import fs from 'fs'
import path from 'path'
import { Metadata } from 'next'
import matter from 'gray-matter'
import { use } from 'react'

export const dynamic = 'force-dynamic'
export const revalidate = 3600 // Revalidate every hour

interface ArticleMetadata {
  title: string
  description: string
  author: string
  date: string
  tags: string[]
  difficulty: string
  readingTime: string
}

async function getArticleContent(slug: string): Promise<{ content: string; metadata: ArticleMetadata } | null> {
  const articlesDirectory = path.join(process.cwd(), 'content/articles')
  const filePath = path.join(articlesDirectory, `${slug}.md`)

  try {
    const fileContent = await fs.promises.readFile(filePath, 'utf8')
    const { data, content } = matter(fileContent)
    
    return {
      content,
      metadata: {
        title: data.title || '',
        description: data.description || '',
        author: data.author || '',
        date: data.date || '',
        tags: Array.isArray(data.tags) ? data.tags : [],
        difficulty: data.difficulty || '',
        readingTime: data.readingTime || ''
      }
    }
  } catch (error) {
    console.error(`Error reading article ${slug}:`, error)
    return null
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleContent(slug)
  
  if (!article) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.'
    }
  }

  return {
    title: article.metadata.title,
    description: article.metadata.description,
    authors: [{ name: article.metadata.author }],
    keywords: article.metadata.tags,
    openGraph: {
      title: article.metadata.title,
      description: article.metadata.description,
      type: 'article',
      publishedTime: article.metadata.date,
      authors: [article.metadata.author],
      tags: article.metadata.tags
    }
  }
}

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const article = use(getArticleContent(slug))

  if (!article) {
    notFound()
  }

  return <ArticleRenderer content={article.content} />
} 