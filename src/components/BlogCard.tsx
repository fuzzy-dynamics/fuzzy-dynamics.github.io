import { Link } from 'react-router-dom';
import { BlogPost } from '@/data/blogs';

interface BlogCardProps {
  blog: BlogPost;
  featured?: boolean;
}

const BlogCard = ({ blog, featured = false }: BlogCardProps) => {
  return (
    <Link 
      to={`/blog/${blog.id}`}
      className={`
        group cursor-pointer transition-all duration-200 
        bg-card border border-border rounded-lg p-6 
        hover:border-border/70 hover:shadow-md hover:scale-[1.02]
        block
        ${featured ? 'col-span-full md:col-span-2' : ''}
      `}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="tech-mono text-xs text-muted-foreground">
            BLOG / #{blog.id}
          </div>
          <h3 className={`font-semibold text-foreground group-hover:text-primary transition-colors ${featured ? 'text-xl' : 'text-lg'}`}>
            {blog.title}
          </h3>
        </div>
        
        <p className="text-muted-foreground text-sm overflow-hidden" style={{ 
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical' as const
        }}>
          {blog.excerpt}
        </p>
        
        <div className="pt-2">
          <div className="space-y-1 text-xs text-muted-foreground">
            <div>Posted by {blog.author}</div>
            <div>
              {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;