import { ArticleRenderer } from '@/app/components/ArticleRenderer'
import { notFound } from 'next/navigation'
import fs from 'fs'
import path from 'path'
import { Metadata } from 'next'
import matter from 'gray-matter'
import { use } from 'react'
import moment from 'moment'
import Link from 'next/link'

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
  contributors: string[]
}

function ArticleHeader({ metadata }: { metadata: ArticleMetadata }) {
  const formatDate = (dateString: string) => {
    const date = moment(dateString)
    if (!date.isValid()) return dateString
    return date.format('MMMM D, YYYY')
  }

  // Format authors and contributors
  const allAuthors = [metadata.author, ...(metadata.contributors || [])]
    .filter(Boolean)
    .map(author => author.trim())
    .filter(author => author.length > 0)
  const formattedAuthors = allAuthors.length > 0 
    ? allAuthors.join(' & ')
    : 'Anonymous'

  return (
    <div className="bg-black">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center space-x-2 text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-green-400 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/explore" className="hover:text-green-400 transition-colors">
            Articles
          </Link>
          <span>/</span>
          <span className="text-gray-200">{metadata.title}</span>
        </div>

        <header className="mb-12">
          <div className="flex items-center space-x-4 mb-6">
            {metadata.difficulty && (
              <span className="px-3 py-1 text-sm font-medium bg-green-900/50 text-green-300 rounded-full">
                {metadata.difficulty}
              </span>
            )}
            {metadata.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm font-medium bg-gray-800 text-gray-300 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
            {metadata.title}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-4 sm:space-y-0 mb-8">
            {/* Authors/Contributors Section */}
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-lg font-medium text-gray-200">
                {formattedAuthors}
              </span>
            </div>

            {/* Reading Time Section */}
            {metadata.readingTime && (
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-lg font-medium text-gray-200">
                  {metadata.readingTime} min read
                </span>
              </div>
            )}

            {/* Date Section */}
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" />
              </svg>
              <span className="text-lg font-medium text-gray-200">
                {formatDate(metadata.date)}
              </span>
            </div>
          </div>

          <p className="text-xl text-gray-300 leading-relaxed">
            {metadata.description}
          </p>
        </header>
      </div>
    </div>
  )
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
        readingTime: data.readingTime || '',
        contributors: Array.isArray(data.contributors) ? data.contributors : []
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

  return (
    <div className="min-h-screen bg-black">
      <ArticleHeader metadata={article.metadata} />
      <ArticleRenderer content={article.content} />
    </div>
  )
} 