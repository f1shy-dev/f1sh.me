import React from "react";
import {
  faGithub,
  faRedditAlien,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { Head } from "../components/Head";
import { IconLink } from "../components/IconLink";
export default function Home() {
  return (
    <div className="flex-center-col h-screen items-start">
      <div className="flex-center-col items-center text-center">
        <Head />
        <h1 className="text-8xl font-bold text-gradient font-mono tracking-wider">
          f1sh
        </h1>
        <div className="text-[#e2e8f0] m-4 max-w-xl font-light text-center text-base md:text-lg">
          👋&nbsp;I'm a self taught full stack developer, who works on
          open source projects, and likes working with web
          technologies. I also like anime, manga and games like{" "}
          <a href="https://minecraft.net">Minecraft</a> and{" "}
          <a href="https://beatsaber.com">
            Beat Saber<span className="font-norm">!</span>
          </a>
        </div>
        <div className="flex-row color-current text-[#e2e8f0] text-3xl space-x-4">
          <IconLink
            link="https://twitter.com/vishyfishy2"
            icon={faTwitter}
          />
          <IconLink
            link="https://github.com/f1shy-dev"
            icon={faGithub}
          />

          <IconLink
            link="https://www.reddit.com/user/vrish838"
            icon={faRedditAlien}
          />
          <IconLink
            link="https://www.youtube.com/channel/UC5MH3PWbisEknFNEmrhtTXg"
            icon={faYoutube}
          />
        </div>
      </div>
    </div>
  );
}
