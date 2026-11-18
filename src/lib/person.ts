// Why: the same person runs victorsaly.com, the blog, the skills site and this one. Saying so once, with every place
// he is, lets search engines join the sites into one author instead of four strangers.
export const person = {
  '@type': 'Person',
  name: 'Victor Saly',
  url: 'https://victorsaly.com',
  sameAs: [
    'https://blog.victorsaly.com',
    'https://skills.victorsaly.com',
    'https://apps.victorsaly.com',
    'https://www.linkedin.com/in/victorsaly',
    'https://github.com/victorsaly',
  ],
} as const;
