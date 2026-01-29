import { type SiteDataProps } from "../types/configDataTypes";

// Update this file with your site specific information
const siteData: SiteDataProps = {
  name: "CCAT",
  // Your website's title and description (meta fields)
  title: "CCAT - The Chinese Community Association of Tasmania",
  description:
    "Aims to share and celebrate Chinese heritage culture community",

  // used on contact page and footer
  contact: {
    address1: "7 Burnett Place, North Hobart, Tasmania 7000",
    address2: "",
    phone: "",
    email: "contact@ccat.au",
  },

  // Your information for blog post purposes
  author: {
    name: "CCAT",
    email: "contact@ccat.au",
    twitter: "CCAT",
  },

  // default image for meta tags if the page doesn't have an image already
  defaultImage: {
    src: "/images/cosmic-themes-logo.jpg",
    alt: "Cosmic Themes logo",
  },
};

export default siteData;
