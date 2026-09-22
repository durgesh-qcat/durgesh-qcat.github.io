import { Fragment } from "react";
import { mathAi, mathAiIntro, mathAiFeaturedPost, mathAiOngoing } from "../content";
import { sectionMetadata } from "../site-metadata";

export const metadata = sectionMetadata(
  "Math–AI",
  "Writing and ongoing work in AI for mathematics, verification in Lean, and AI safety.",
);

export default function MathAiPage() {
  return (
    <article className="math-ai-page">
      <header className="page-heading">
        <h1>Math–AI</h1>
      </header>
      {mathAiIntro.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      <div className="math-ai-sections">
        <section className="math-ai-entry math-ai-blog" aria-labelledby="math-ai-blog-title">
          <header className="math-ai-blog-heading">
            <h2 id="math-ai-blog-title"><a href={mathAiFeaturedPost.url}>{mathAiFeaturedPost.title}</a></h2>
            {mathAiFeaturedPost.subtitle && <p className="page-description">{mathAiFeaturedPost.subtitle}</p>}
          </header>
          <p>{mathAiFeaturedPost.description}</p>
        </section>
        {mathAi.map((entry) => (
          <section className="math-ai-entry math-ai-project" key={entry.id}>
            <h2>{entry.url ? <a href={entry.url}>{entry.title}</a> : entry.title}</h2>
            <p>{entry.description}</p>
            {"authors" in entry && entry.authors && <p className="supporting-text"><span className="author-names">{entry.authors}</span></p>}
            {entry.links.length > 0 && (
              <p className="resource-links">
                {entry.links.map((link) => <a key={link.url} href={link.url}>{link.label}</a>)}
              </p>
            )}
          </section>
        ))}
        <section className="math-ai-entry" aria-labelledby="math-ai-ongoing-heading">
          <h2 id="math-ai-ongoing-heading">Ongoing work</h2>
          <p>
            {mathAiOngoing.map((entry, entryIndex) => (
              <Fragment key={entry.id}>
                {entryIndex > 0 && " "}
                {entry.parts.map((part, index) => part.href
                  ? <a key={index} href={part.href}>{part.text}</a>
                  : part.text)}
              </Fragment>
            ))}
          </p>
        </section>
      </div>
    </article>
  );
}
