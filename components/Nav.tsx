import Image from "next/image";
import Link from "next/link";
import tile from "@/public/assets/logo-tile.png";
import { links } from "@/lib/site";
import { SoundToggle } from "./SoundToggle";
import { ThemeToggle } from "./ThemeToggle";

export function Nav() {
  return (
    <header className="flex h-16 items-center justify-between px-5 sm:h-[78px] xl:pr-[82px] xl:pl-[90px]">
      <Link href="/" aria-label="The Lyrical Notch, home" className="flex items-center gap-2">
        <Image src={tile} alt="" priority className="logo-tile h-[38px] w-auto" />
        <span className="hidden text-[24px] leading-[28px] font-semibold tracking-[-0.01em] sm:inline">
          The Lyrical Notch
        </span>
      </Link>

      <div className="flex items-center gap-5">
        <SoundToggle />
        <ThemeToggle />
        <a
          href={links.download}
          className="button-ink flex h-[43px] w-[113px] items-center justify-center rounded-[8px] bg-pill-bg text-[16px] leading-[20px] font-semibold text-pill-fg"
        >
          Download
        </a>
      </div>
    </header>
  );
}
