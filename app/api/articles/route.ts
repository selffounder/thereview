import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { NextResponse } from 'next/server'

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

export async function GET() {
  try {
    const articles = await getArticles()
    return NextResponse.json(articles)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 })
  }
} 