import { mathAiFeaturedPost, mathAiAdditionalPosts } from "../content";

export function BlogPosts({ idPrefix }: { idPrefix: string }) {
  return (
    <>
      {[mathAiFeaturedPost, ...mathAiAdditionalPosts].map((post, index) => (
        <section className="math-ai-entry math-ai-blog" key={post.url} aria-labelledby={`${idPrefix}-${index}`}>
          <header className="math-ai-blog-heading">
            <h2 id={`${idPrefix}-${index}`}><a href={post.url}>{post.title}</a></h2>
            {post.subtitle && <p className="page-description">{post.subtitle}</p>}
          </header>
          <p>{post.description}</p>
        </section>
      ))}
    </>
  );
}
