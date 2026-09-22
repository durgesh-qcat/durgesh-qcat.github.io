import type { Publication } from "../content";

export function PublicationEntry({
  paper,
  headingLevel = 2,
}: {
  paper: Publication;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="publication-entry">
      <p className="publication-meta">{paper.venue}</p>
      <Heading><a href={paper.url}>{paper.title}</a></Heading>
      <p className="publication-authors"><span className="author-names">{paper.authors}</span></p>
      <p className="publication-summary">{paper.status}</p>
      <p className="resource-links">
        <a href={paper.url}>Paper</a>
        <a href={paper.venueUrl}>Conference listing</a>
      </p>
    </article>
  );
}
