import { ArticleRenderer } from '@/app/components/ArticleRenderer'
import fs from 'fs'
import path from 'path'

interface PageProps {
  params: {
    slug: string
  }
}

export default function ArticlePage({ params }: PageProps) {
  // Read the markdown file
  const filePath = path.join(process.cwd(), 'content/articles', `${params.slug}.md`)
  const content = fs.readFileSync(filePath, 'utf8')

  // For debugging
  console.log('Content loaded:', content.substring(0, 200)) // Log first 200 chars

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <ArticleRenderer content={content} />
    </div>
  )
} 