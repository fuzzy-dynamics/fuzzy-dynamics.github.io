import { useParams, Link } from 'react-router-dom';
import { FooterSection } from '@/components/FooterSection';
import { TopBar } from '@/components/TopBar';
import { blogPosts, BlogPost as BlogPostType } from '@/data/blogs';
import { useMarkdownContent } from '@/hooks/useMarkdownContent';
import ReactMarkdown from 'react-markdown';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const blog = blogPosts.find(post => post.id === Number(id));

  // Load markdown content seamlessly without intermediate loading states
  const blogContent = useMarkdownContent(
    `/blogs/blog-${id}.md`,
    'Content will be added soon...'
  );

  if (!blog) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <TopBar />
        <div className="flex-grow flex items-center justify-center">
          <div className="pt-24 pb-16">
            <div className="container mx-auto px-8 sm:px-16">
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-4 text-primary">Blog Post Not Found</h1>
                <Link to="/blog" className="text-primary hover:underline text-lg">
                  ← Back to Blog
                </Link>
              </div>
            </div>
          </div>
        </div>
        <FooterSection />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopBar />
      
      {/* Content Section - matches standard page pattern */}
      <div className="flex-grow">
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-8 sm:px-16">
            {/* Blog Header - Full Width */}
            <div className="max-w-4xl mb-8">
              <div className="tech-mono mb-3 sm:mb-4 text-sm sm:text-sm">
                BLOG / #{blog.id}
              </div>
              <h1 className="text-4xl font-bold mb-4 text-primary text-left">
                {blog.title}
              </h1>
              <p className="text-lg text-muted-foreground text-left mb-6">
                {blog.excerpt}
              </p>
              <div className="space-y-1 text-muted-foreground text-sm">
                <div>Posted by {blog.author}</div>
                <div>
                  {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
              </div>
            </div>

            {/* Blog Content - Constrained Width */}
            <article className="max-w-3xl mx-auto">
              <div className="space-y-8">
                <ReactMarkdown
                  components={{
                    h1: ({children}) => <h1 className="text-3xl font-bold mb-6 text-foreground">{children}</h1>,
                    h2: ({children}) => <h2 className="text-2xl font-semibold mb-4 text-foreground mt-8">{children}</h2>,
                    h3: ({children}) => <h3 className="text-lg font-medium mb-3 text-foreground mt-6">{children}</h3>,
                    p: ({children}) => <p className="text-lg text-foreground leading-relaxed mb-4">{children}</p>,
                    ul: ({children}) => <ul className="list-square list-outside pl-6 space-y-2 mb-4 ml-4 marker:text-primary">{children}</ul>,
                    li: ({children}) => <li className="text-lg text-foreground leading-relaxed">{children}</li>,
                    strong: ({children}) => <strong className="font-semibold text-foreground">{children}</strong>,
                    code: ({children}) => <code className="bg-muted px-2 py-1 rounded text-sm font-mono">{children}</code>,
                    a: ({href, children}) => <a href={href} className="text-primary hover:underline">{children}</a>,
                  }}
                >
                  {blogContent}
                </ReactMarkdown>
              </div>
            </article>

            {/* Back Button - styled like Join Early Access */}
            <div className="max-w-3xl mx-auto mt-12">
              <div className="flex flex-col gap-3 sm:gap-4 justify-start items-start">
                <Link 
                  to="/blog" 
                  className="group inline-flex items-center gap-2 text-lg sm:text-xl font-semibold text-foreground hover:text-primary transition-colors duration-300 cursor-pointer bg-transparent border-none p-0"
                >
                  <span className="text-xl group-hover:-translate-x-1 transition-transform duration-300">←</span>
                  <span className="border-b-2 border-foreground group-hover:border-primary transition-colors duration-300">
                    Back to Blog
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <FooterSection />
    </div>
  );
};

export default BlogPost;