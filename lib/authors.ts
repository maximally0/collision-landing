export type Author = {
  id: string;
  name: string;
  role: string;
  bio: string;
  url?: string;
};

export const authors: Record<string, Author> = {
  "collision-team": {
    id: "collision-team",
    name: "Collision Team",
    role: "Collision Labs",
    bio: "Collision Team writes from inside the product — the same growth intelligence founders talk to every day. Posts are grounded in what we see running growth for our own site and for the founders we work with: what gets cited in AI search, what actually moves LinkedIn reach, and what breaks when a growth stack is stitched together from ten disconnected tools.",
    url: "https://www.usecollision.com",
  },
};

export function getAuthor(id: string): Author {
  return authors[id] ?? authors["collision-team"];
}
