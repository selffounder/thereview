export default function TestTypography() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h1>This is a Heading 1</h1>
        <h2>This is a Heading 2</h2>
        <h3>This is a Heading 3</h3>
        <p>This is a paragraph with some <strong>bold text</strong> and <em>italic text</em>.</p>
        <ul>
          <li>List item 1</li>
          <li>List item 2</li>
          <li>List item 3</li>
        </ul>
        <pre><code>const hello = "world";</code></pre>
        <blockquote>
          This is a blockquote with some important information.
        </blockquote>
      </div>
    </div>
  )
} 