import { thesis } from "../content";

export function ThesisEntry() {
  return (
    <>
      <h3 className="entry-title"><a href={thesis.url}>{thesis.title}</a></h3>
      <p className="supporting-text">
        <span className="author-names">{thesis.author}</span><br />
        {thesis.degree}, {thesis.institution}, {thesis.year}.
      </p>
      <p className="supporting-text">
        Supervised by <a href="https://en.wikipedia.org/wiki/Robin_Cockett">{thesis.supervisor}</a>.
      </p>
      <p className="thesis-nomination"><em>{thesis.nomination}</em></p>
      <p className="resource-links"><a href={thesis.url}>Thesis PDF</a></p>
    </>
  );
}
