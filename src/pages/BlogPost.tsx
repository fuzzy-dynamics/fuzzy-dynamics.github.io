import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FooterSection } from '@/components/FooterSection';
import { TopBar } from '@/components/TopBar';
import { blogPosts, BlogPost as BlogPostType } from '@/data/blogs';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [blogContent, setBlogContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  
  const blog = blogPosts.find(post => post.id === Number(id));

  useEffect(() => {
    const loadBlogContent = async () => {
      if (!blog) {
        setLoading(false);
        return;
      }

      try {
        // Load the markdown content
        const response = await fetch(`/blogs/blog-${id}.md`);
        if (response.ok) {
          const content = await response.text();
          setBlogContent(content);
        } else {
          setBlogContent('Content not available.');
        }
      } catch (error) {
        console.error('Error loading blog content:', error);
        setBlogContent('Content not available.');
      } finally {
        setLoading(false);
      }
    };

    loadBlogContent();
  }, [id, blog]);

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
              
              {/* Back Button - styled like Join Early Access */}
              <div className="flex flex-col gap-3 sm:gap-4 justify-start items-start mt-6">
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

            {/* Blog Content - Constrained Width */}
            <article className="max-w-3xl mx-auto">
              {loading ? (
                <div className="flex items-center justify-center py-16">
                  <div className="text-muted-foreground">Loading...</div>
                </div>
              ) : (
                <div className="whitespace-pre-wrap leading-relaxed text-foreground text-lg">
                  {blogContent || 'Content will be added soon...'}
                </div>
              )}
            </article>
          </div>
        </div>
      </div>
      
      <FooterSection />
    </div>
  );
};

export default BlogPost;