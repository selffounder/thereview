"use client"

import { useEffect, useState } from 'react'
import matter from 'gray-matter'
import { PencilIcon } from '@heroicons/react/24/outline'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'

interface ArticleRendererProps {
  content: string
}

export function ArticleRenderer({ content }: ArticleRendererProps) {
  const [markdownContent, setMarkdownContent] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const { content: markdownContent } = matter(content)
      setMarkdownContent(markdownContent)
    } catch (error) {
      console.error('Error processing content:', error)
      setError(error instanceof Error ? error.message : 'Unknown error occurred')
    }
  }, [content])

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl shadow-sm">
          <h2 className="text-red-800 dark:text-red-200 font-semibold text-xl">Error Loading Article</h2>
          <p className="text-red-600 dark:text-red-300 mt-3">{error}</p>
        </div>
      </div>
    )
  }

  if (!markdownContent) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="animate-pulse space-y-6">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4"></div>
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/2"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-5/6"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <div className="prose dark:prose-invert max-w-none">
        <ReactMarkdown
          rehypePlugins={[
            rehypeRaw,
            rehypeSanitize,
            rehypeHighlight
          ]}
          components={{
            h1: ({ node, ...props }) => (
              <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-4" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white mt-12 border-b border-gray-200 dark:border-gray-700 pb-3" {...props} />
            ),
            h3: ({ node, ...props }) => (
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white mt-10" {...props} />
            ),
            p: ({ node, ...props }) => (
              <p className="mb-6 text-gray-600 dark:text-gray-300 leading-relaxed text-lg" {...props} />
            ),
            ul: ({ node, ...props }) => (
              <ul className="list-disc pl-6 mb-6 text-gray-600 dark:text-gray-300 space-y-3 text-lg" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="list-decimal pl-6 mb-6 text-gray-600 dark:text-gray-300 space-y-3 text-lg" {...props} />
            ),
            li: ({ node, ...props }) => (
              <li className="mb-2" {...props} />
            ),
            code: ({ node, className, children, ...props }) => {
              const match = /language-(\w+)/.exec(className || '')
              return match ? (
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl overflow-x-auto mb-6 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {match[1]}
                    </span>
                    <button 
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                      onClick={() => {
                        navigator.clipboard.writeText(String(children))
                      }}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                    </button>
                  </div>
                  <pre className="m-0">
                    <code className={`language-${match[1]}`} {...props}>
                      {children}
                    </code>
                  </pre>
                </div>
              ) : (
                <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md text-sm font-mono" {...props}>
                  {children}
                </code>
              )
            },
            blockquote: ({ node, ...props }) => (
              <blockquote className="border-l-4 border-green-500 dark:border-green-400 pl-6 italic my-8 text-gray-600 dark:text-gray-300 text-lg bg-green-50 dark:bg-green-900/20 py-4 px-6 rounded-r-lg" {...props} />
            ),
            a: ({ node, ...props }) => (
              <a className="text-green-600 dark:text-green-400 hover:underline font-medium" {...props} />
            ),
            img: ({ node, ...props }) => (
              <div className="my-8">
                <img className="rounded-lg shadow-md" {...props} />
              </div>
            ),
            table: ({ node, ...props }) => (
              <div className="overflow-x-auto my-8">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700" {...props} />
              </div>
            ),
            th: ({ node, ...props }) => (
              <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" {...props} />
            ),
            td: ({ node, ...props }) => (
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300" {...props} />
            ),
          }}
        >
          {markdownContent}
        </ReactMarkdown>
      </div>
    </article>
  )
} 