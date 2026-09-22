import { about } from "../content";

export function AboutStatement() {
  return (
    <div className="about-statement">
      {about.map((paragraph, index) => (
        <p key={index}>
          {paragraph.map((part, partIndex) =>
            "href" in part && part.href ? (
              <a key={partIndex} href={part.href}>{part.text}</a>
            ) : (
              <span key={partIndex}>{part.text}</span>
            ),
          )}
        </p>
      ))}
    </div>
  );
}
