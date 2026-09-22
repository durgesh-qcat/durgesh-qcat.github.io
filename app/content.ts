import academicProfile from "../content/academic-profile.json";

/** Shared source for the website and the downloadable academic CV. */
export const {
  profile,
  about,
  publications,
  thesis,
  outreach,
  talks,
  mathAiIntro,
  mathAiFeaturedPost,
  mathAi,
  mathAiOngoing,
  workInProgress,
} = academicProfile;

export type Publication = (typeof publications)[number];
