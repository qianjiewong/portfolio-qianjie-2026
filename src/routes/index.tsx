import { createFileRoute } from "@tanstack/react-router";
import { PortfolioIsland } from "../components/island/PortfolioIsland";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Qian Jie Wong — Software Engineer & AI Developer" },
      { name: "description", content: "Explore Qian Jie Wong's software engineering projects, skills, and story." },
      { property: "og:title", content: "Qian Jie Wong — Software Engineer & AI Developer" },
      { property: "og:description", content: "Selected software projects, skills, and experience." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PortfolioIsland,
});
