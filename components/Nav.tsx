import Link from "next/link";
import { links } from "@/lib/site";
import { BarsToSmile } from "./BarsToSmile";
import { SoundToggle } from "./SoundToggle";

export function Nav() {
  return (
    <header className="relative z-10 flex items-start justify-between px-5 pt-4 xl:h-0 xl:px-0 xl:pt-0">
      <Link
        href="/"
        aria-label="The Lyrical Notch, home"
        className="block shrink-0 xl:absolute xl:top-[15px] xl:left-[49px]"
      >
        <BarsToSmile className="h-auto w-[92px] overflow-visible xl:w-[132px]" />
      </Link>

      <nav
        aria-label="Primary"
        className="flex items-center gap-[14px] pt-[14px] text-[14px] leading-[18px] xl:absolute xl:top-[34px] xl:right-[44px] xl:pt-0"
      >
        <a href={links.maker} target="_blank" rel="noreferrer" className="link-underline text-ink-muted">
          Meet the Maker
        </a>
        <SoundToggle />
      </nav>
    </header>
  );
}
