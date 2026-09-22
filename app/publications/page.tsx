import { publications, workInProgress } from "../content";
import { PublicationEntry } from "../components/publication-entry";
import { ThesisEntry } from "../components/thesis-entry";
import { sectionMetadata } from "../site-metadata";

export const metadata = sectionMetadata(
  "Publications",
  "Publications in category theory, with a separate section for the master's thesis.",
);

export default function PublicationsPage() {
  return (
    <article>
      <header className="page-heading"><h1>Publications</h1></header>
      <div className="publication-list">
        {publications.map((paper) => (
          <PublicationEntry key={paper.id} paper={paper} />
        ))}
      </div>
      <section className="content-section thesis-section" aria-labelledby="thesis-heading">
        <h2 id="thesis-heading">Thesis</h2>
        <ThesisEntry />
      </section>
      <section className="content-section" aria-labelledby="work-in-progress-heading">
        <h2 id="work-in-progress-heading">Work in progress</h2>
        <p>{workInProgress.map((part) => part.text).join("")}</p>
      </section>
    </article>
  );
}
