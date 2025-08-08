# Blog Content Files

This directory contains the markdown files for individual blog posts.

## How it works

- Blog markdown files are stored here to be accessible via HTTP requests
- Each file follows the naming convention: `blog-{id}.md`
- The BlogPost component fetches these files to display content
- Blog metadata is still configured in `src/data/blogs.ts`

## Adding New Blogs

1. Create a new markdown file here: `blog-{id}.md`
2. Add the blog entry to `src/data/blogs.ts`
3. The blog will automatically appear on the blog page

## Current Blog Files

- `blog-1.md` - Single blog post
