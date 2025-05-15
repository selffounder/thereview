# EduVibe - NIS Computer Science Learning Platform

A modern learning platform for NIS students to master Computer Science concepts through well-structured articles and interactive examples.

## Contributing Articles

We welcome contributions from the community! Here's how you can contribute an article:

### Article Structure

1. Create a new markdown file in `content/articles/` with the following format:
   ```markdown
   ---
   title: "Your Article Title"
   description: "A brief description of what readers will learn"
   author: "Your Name"
   date: "YYYY-MM-DD"
   tags: ["tag1", "tag2", "tag3"]
   difficulty: "beginner|intermediate|advanced"
   readingTime: "X min"
   contributors: ["Contributor1", "Contributor2"]
   lastUpdated: "YYYY-MM-DD"
   ---

   # Your Article Title

   Your content here...
   ```

### Writing Guidelines

1. **Structure**:
   - Start with a clear introduction
   - Use headings to organize content
   - Include practical examples
   - End with a summary or next steps

2. **Code Examples**:
   ```python
   # Use proper code blocks with language specification
   def example():
       return "Hello World"
   ```

3. **Formatting**:
   - Use proper markdown syntax
   - Include images in `/public/images/`
   - Link to related articles
   - Use blockquotes for important notes

4. **Best Practices**:
   - Keep paragraphs short and focused
   - Use bullet points for lists
   - Include interactive examples
   - Add debugging tips
   - Provide practice problems

### Article Types

1. **Tutorials**:
   - Step-by-step guides
   - Clear learning objectives
   - Practical examples
   - Common pitfalls

2. **Concept Explanations**:
   - Clear definitions
   - Visual aids
   - Real-world applications
   - Practice problems

3. **Problem-Solving**:
   - Problem statement
   - Solution approach
   - Code implementation
   - Time/space complexity

### Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/eduvibe.git
   cd eduvibe
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Create your article in `content/articles/`

5. Preview your changes at `http://localhost:3000/articles/your-article-slug`

### Pull Request Process

1. Create a new branch:
   ```bash
   git checkout -b feature/your-article-name
   ```

2. Add your article and commit:
   ```bash
   git add content/articles/your-article.md
   git commit -m "Add article: Your Article Title"
   ```

3. Push and create a pull request:
   ```bash
   git push origin feature/your-article-name
   ```

4. Wait for review and feedback

### Review Process

1. Technical review:
   - Code examples accuracy
   - Technical content correctness
   - Best practices adherence

2. Content review:
   - Clarity and readability
   - Structure and flow
   - Examples quality
   - Practice problems

3. Style review:
   - Markdown formatting
   - Image quality
   - Link validity
   - Metadata completeness

### Resources

- [Markdown Guide](https://www.markdownguide.org/)
- [Code Style Guide](https://google.github.io/styleguide/)
- [Image Guidelines](https://example.com/image-guidelines)
- [Article Templates](https://example.com/templates)

### Need Help?

- Open an issue for questions
- Join our Discord community
- Check existing articles for examples
- Review the contribution guidelines

---

Thank you for contributing to EduVibe! Your articles help students learn and grow.
