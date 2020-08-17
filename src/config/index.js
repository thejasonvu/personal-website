module.exports = {
  author: "@thejasonvu",
  siteTitle: "Jason Vu Portfolio",
  siteShortTitle: "Jason Vu", // Used as logo text in header, footer, and splash screen
  siteDescription: "",
  siteUrl: "https://gatsby-starter-portfolio-minimal.netlify.app/",
  siteLanguage: "en_US",
  siteIcon: "src/content/favicon.png", // Relative to gatsby-config file

  splashScreen: false, // Set this to true if you want to use the splash screen

  // You can create your own Medium feed with this rss to json converter: https://rss2json.com/
  // To access your Medium RSS feed, just replace this url with your username: https://medium.com/feed/@{yourname}
  mediumRssFeed: "https://dev.to/api/articles?username=study_web_dev",
  shownArticles: 3,

  // There are icons available for the following platforms:
  // Medium, GitHub, LinkedIn, XING, Behance
  socialMedia: [
    {
      name: "Linkedin",
      url: "https://www.linkedin.com/in/konstantin-muenster/",
    },
    {
      name: "Medium",
      url: "https://medium.com/@konstantin.muenster",
    },
    {
      name: "Github",
      url:
        "https://github.com/konstantinmuenster/gatsby-starter-portfolio-minimal",
    },
    {
      name: "Behance",
      url: "https://www.behance.net/konstanmnster",
    },
  ],

  navLinks: {
    menu: [
      {
        name: "About Me",
        url: "/#about",
      },
      {
        name: "Features",
        url: "/#projects",
      },
      {
        name: "Articles",
        url: "/#articles",
      },
    ],
    button: {
      name: "Resume",
      url: "/resume.pdf",
    },
  },

  footerLinks: [
    {
      name: "Privacy",
      url: "/privacy",
    },
    {
      name: "Imprint",
      url: "/imprint",
    },
  ],
}
