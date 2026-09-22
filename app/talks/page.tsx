import { talks } from "../content";
import { sectionMetadata } from "../site-metadata";

export const metadata = sectionMetadata(
  "Talks",
  "Seminar talks, conference presentations, and a research poster.",
);

export default function TalksPage() {
  return (
    <article>
      <header className="page-heading">
        <h1>Talks</h1>
        <p className="page-description">Seminars, conference presentations, and posters.</p>
      </header>
      <ul className="talk-list">
        {talks.map((talk) => (
          <li key={talk.id}>
            <span className="talk-date">{talk.date}</span>
            <div>
              <h2>{talk.title}</h2>
              <p>{"websiteEvent" in talk && talk.websiteEvent ? talk.websiteEvent : talk.event} · {talk.location}</p>
              {talk.kind !== "Talk" && <p className="talk-kind">{talk.kind}</p>}
              {"links" in talk && talk.links && (
                <p className="resource-links">
                  {talk.links.map((link) => (
                    <a key={link.url} href={link.url}>
                      {link.label}
                    </a>
                  ))}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}
