import { permanentRedirect } from "next/navigation";
import { thesis } from "../content";

export default function ThesisPage() {
  // Static hosting needs an HTML redirect that also works without JavaScript.
  if (process.env.GITHUB_PAGES === "true") {
    return (
      <>
        <meta httpEquiv="refresh" content={`0;url=${thesis.url}`} />
        <p><a href={thesis.url}>Thesis PDF</a></p>
      </>
    );
  }

  permanentRedirect(thesis.url);
}
