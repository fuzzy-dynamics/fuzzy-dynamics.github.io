import { FooterSection } from '@/components/FooterSection';
import { TopBar } from '@/components/TopBar';
import BlogCard from '@/components/BlogCard';
import { blogPosts } from '@/data/blogs';

const Blog = () => {
  // const featuredPosts = blogPosts.filter(post => post.featured);
  // const regularPosts = blogPosts.filter(post => !post.featured);
  const allPosts = blogPosts;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopBar />
      
      {/* Hero Section */}
      <div className="flex-grow flex flex-col">
        <div className="pt-24">
          <div className="container mx-auto px-8 sm:px-16 w-full">
            <div className="mb-16">
              <div className="tech-mono mb-3 sm:mb-4 text-sm sm:text-sm">
                BLOG / WRITINGS & UPDATES
              </div>
              <h1 className="text-4xl font-bold mb-4 text-primary text-left">Blog</h1>
              <p className="text-lg text-muted-foreground text-left max-w-3xl">
                Writings and updates on AI-powered discovery, human-AI collaboration, 
                and the future of engineering and research workflows.
              </p>
            </div>
          </div>
        </div>

        {/* Blog Content */}
        <div className="flex-grow pb-16">
          <div className="container mx-auto px-8 sm:px-16 w-full">
            
            {/* Featured Posts - Commented out for now */}
            {/* {featuredPosts.length > 0 && (
              <div className="mb-12">
                <h2 className="text-xl font-semibold mb-6 text-foreground">Featured</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredPosts.map((post) => (
                    <BlogCard key={post.id} blog={post} featured={true} />
                  ))}
                </div>
              </div>
            )} */}

            {/* All Posts */}
            <div>
              {/* <h2 className="text-xl font-semibold mb-6 text-foreground">All posts</h2> */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allPosts.map((post) => (
                  <BlogCard key={post.id} blog={post} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <FooterSection />
    </div>
  );
};

export default Blog;