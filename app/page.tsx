import Image from "next/image";
import { profile, publications, outreach } from "./content";
import { AboutStatement } from "./components/about-statement";
import { PublicationEntry } from "./components/publication-entry";
import { ThesisEntry } from "./components/thesis-entry";

export default function AboutPage() {
  return (
    <article className="about-page">
      <header className="page-heading">
        <h1>{profile.name}</h1>
      </header>
      <section className="biography" aria-label="About">
        <figure className="profile-photo-block">
          <a className="profile-photo-link" href={profile.photo.src} aria-label="View full photograph of Durgesh Kumar">
            <Image
              className="profile-photo"
              src={profile.photo.src}
              width={profile.photo.width}
              height={profile.photo.height}
              alt={profile.photo.alt}
              loading="eager"
              unoptimized
            />
          </a>
          <figcaption>
            <a
              className="scholar-icon-link"
              href={profile.scholar}
              aria-label="Google Scholar profile"
              title="Google Scholar"
            >
              <span className="scholar-cap" aria-hidden="true">
                <span className="scholar-cap-base" />
                <span className="scholar-cap-board" />
                <span className="scholar-cap-tassel" />
              </span>
            </a>
          </figcaption>
        </figure>
        <AboutStatement />
        <p className="contact-line">
          <a href={"mailto:" + profile.email}>Email</a>
          <span aria-hidden="true"> · </span>
          <a href={profile.github}>GitHub</a>
          <span aria-hidden="true"> · </span>
          <a href={profile.cvUrl}>Curriculum vitae (PDF)</a>
        </p>
      </section>
      <section className="home-section" aria-labelledby="publications-heading">
        <div className="section-heading">
          <h2 id="publications-heading">Publications</h2>
        </div>
        {publications.map((paper) => (
          <PublicationEntry key={paper.id} paper={paper} headingLevel={3} />
        ))}
      </section>
      <section className="home-section thesis-section" aria-labelledby="thesis-heading">
        <h2 id="thesis-heading">Thesis</h2>
        <ThesisEntry />
      </section>
      <section className="home-section" aria-labelledby="outreach-heading">
        <div className="section-heading">
          <h2 id="outreach-heading">Outreach &amp; teaching</h2>
        </div>
        <ul className="highlight-list">
          <li>
            We wrote an <a href={outreach[0].url}>expository blog post on linear actegories</a> as part of the ACT Adjoint School.
          </li>
          <li>
            I designed and co-taught a <a href={outreach[1].url}>study module
            in applied category theory</a> at Ashoka University.
          </li>
        </ul>
        <p className="supporting-text">
          Further teaching experience and activities are in my <a href={profile.cvUrl}>CV</a>.
        </p>
      </section>
    </article>
  );
}
