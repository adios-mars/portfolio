import { LINK } from "@/constants/links";
import { getBaseUrl } from "@/constants/url";

export const USER = {
  address: {
    country: "Ethiopia",
    locality: "Addis Ababa",
  },
  avatar: "https://avatars.githubusercontent.com/u/250560417?v=4",
  company: "Open Source",
  email: LINK.EMAIL,
  firstName: "Ruth",
  jobTitle: "Software Engineer",
  lastName: "Yeneneh",
  roles: ["Software Engineer", "Systems & Full Stack Developer"],
  username: "adios-mars",
  website: getBaseUrl(),
};

export const NAME = `${USER.firstName} ${USER.lastName}`;
