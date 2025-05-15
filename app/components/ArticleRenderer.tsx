"use client"

import { useEffect, useState } from 'react'
import matter from 'gray-matter'
import moment from 'moment'
import { PencilIcon } from '@heroicons/react/24/outline'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'

interface ArticleRendererProps {
  content: string
}

interface ArticleMetadata {
  title: string
  description: string
  author: string
  date: string
  tags: string[]
  difficulty: string
  readingTime: string
  contributors: string[]
  lastUpdated: string
}

export function ArticleRenderer({ content }: ArticleRendererProps) {
  const [markdownContent, setMarkdownContent] = useState('')
  const [metadata, setMetadata] = useState<ArticleMetadata | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const { data, content: markdownContent } = matter(content)
      
      const tags = typeof data.tags === 'string' 
        ? data.tags.split(',').map(tag => tag.trim())
        : Array.isArray(data.tags) 
          ? data.tags 
          : []

      setMetadata({
        title: data.title || '',
        description: data.description || '',
        author: data.author || '',
        date: data.date || '',
        tags: tags,
        difficulty: data.difficulty || '',
        readingTime: data.readingTime || '',
        contributors: Array.isArray(data.contributors) ? data.contributors : [],
        lastUpdated: data.lastUpdated || data.date || ''
      })

      setMarkdownContent(markdownContent)
    } catch (error) {
      console.error('Error processing content:', error)
      setError(error instanceof Error ? error.message : 'Unknown error occurred')
      setMetadata({
        title: 'Error Loading Article',
        description: 'There was an error loading this article.',
        author: '',
        date: '',
        tags: [],
        difficulty: '',
        readingTime: '',
        contributors: [],
        lastUpdated: ''
      })
    }
  }, [content])

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
          <h2 className="text-red-800 dark:text-red-200 font-semibold">Error Loading Article</h2>
          <p className="text-red-600 dark:text-red-300 mt-2">{error}</p>
        </div>
      </div>
    )
  }

  if (!metadata) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-8"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {metadata.author}
            </span>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {moment(metadata.date).format('MMMM D, YYYY')}
            </span>
          </div>
          <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <PencilIcon className="h-5 w-5" />
          </button>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {metadata.title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          {metadata.description}
        </p>
      </header>

      <div className="markdown-body dark:bg-gray-900">
        <ReactMarkdown
          rehypePlugins={[
            rehypeRaw,
            rehypeSanitize,
            rehypeHighlight
          ]}
          components={{
            h1: ({ node, ...props }) => <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white" {...props} />,
            h2: ({ node, ...props }) => <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white mt-8" {...props} />,
            h3: ({ node, ...props }) => <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white mt-6" {...props} />,
            p: ({ node, ...props }) => <p className="mb-4 text-gray-600 dark:text-gray-300 leading-relaxed" {...props} />,
            ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300" {...props} />,
            ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4 text-gray-600 dark:text-gray-300" {...props} />,
            li: ({ node, ...props }) => <li className="mb-2" {...props} />,
            code: ({ node, className, children, ...props }) => {
              const match = /language-(\w+)/.exec(className || '')
              return match ? (
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4">
                  <pre className="m-0">
                    <code className={`language-${match[1]}`} {...props}>
                      {children}
                    </code>
                  </pre>
                </div>
              ) : (
                <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm" {...props}>
                  {children}
                </code>
              )
            },
            blockquote: ({ node, ...props }) => (
              <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-4 text-gray-600 dark:text-gray-300" {...props} />
            ),
            a: ({ node, ...props }) => (
              <a className="text-blue-600 dark:text-blue-400 hover:underline" {...props} />
            ),
          }}
        >
          {markdownContent}
        </ReactMarkdown>
      </div>

      <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {metadata.readingTime} min read
            </span>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {metadata.difficulty}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            {metadata.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <a
            href={`https://github.com/your-repo/edit/main/content/articles/${metadata.title.toLowerCase().replace(/\s+/g, '-')}.md`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
          >
            <PencilIcon className="w-4 h-4 mr-2" />
            Edit this article
          </a>
        </div>
      </footer>
    </article>
  )
} 