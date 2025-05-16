import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import moment from 'moment'
import { Header } from "../components/Header";



interface Article {
  slug: string
  title: string
  description: string
  author: string
  date: string
  tags: string[]
  difficulty: string
  readingTime: string
}

async function getArticles(): Promise<Article[]> {
  const articlesDirectory = path.join(process.cwd(), 'content/articles')
  const files = await fs.promises.readdir(articlesDirectory)

  const articles = await Promise.all(
    files
      .filter(file => file.endsWith('.md'))
      .map(async file => {
        const filePath = path.join(articlesDirectory, file)
        const fileContent = await fs.promises.readFile(filePath, 'utf8')
        const { data } = matter(fileContent)
        const slug = file.replace(/\.md$/, '')

        return {
          slug,
          title: data.title || '',
          description: data.description || '',
          author: data.author || '',
          date: data.date || '',
          tags: Array.isArray(data.tags) ? data.tags : [],
          difficulty: data.difficulty || '',
          readingTime: data.readingTime || ''
        }
      })
  )

  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export default async function ExplorePage() {
  const articles = await getArticles()

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
         <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Explore Articles
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Discover our collection of Computer Science articles
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4 justify-center">
          <button className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors">
            All
          </button>
          <button className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            Algorithms
          </button>
          <button className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            Data Structures
          </button>
          <button className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            Programming
          </button>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  {article.difficulty && (
                    <span className="px-3 py-1 text-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full">
                      {article.difficulty}
                    </span>
                  )}
                  {article.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  {article.title}
                </h2>

                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {article.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{article.readingTime} min read</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
