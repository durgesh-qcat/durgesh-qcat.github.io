import { outreach, profile } from "../content";
import { BlogPosts } from "../components/blog-posts";
import { sectionMetadata } from "../site-metadata";

export const metadata = sectionMetadata(
  "Outreach & teaching",
  "Expository writing on category theory, quantum foundations, and AI, alongside teaching in applied category theory.",
);

export default function OutreachTeachingPage() {
  return (
    <article>
      <header className="page-heading"><h1>Outreach &amp; teaching</h1></header>
      {outreach.map((entry) => (
        <section className="content-section" key={entry.id}>
          <p className="entry-meta">{entry.context} · {entry.date}</p>
          <h2 className="entry-title"><a href={entry.url}>{entry.title}</a></h2>
          <p>{entry.description}</p>
          {"authors" in entry && entry.authors && (
            <p className="supporting-text"><span className="author-names">{entry.authors}</span></p>
          )}
          <p className="resource-links">
            <a href={entry.url}>{"linkLabel" in entry && entry.linkLabel ? entry.linkLabel : "Read the post"}</a>
          </p>
        </section>
      ))}
      <BlogPosts idPrefix="outreach-blog-title" />
      <p className="cv-note">
        My <a href={profile.cvUrl}>full CV</a> includes further teaching experience,
        including graduate teaching assistantships at the University of Calgary.
      </p>
    </article>
  );
}
