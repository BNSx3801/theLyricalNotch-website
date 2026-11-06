import { GitHubMark } from "@/components/icons";
import { Laptop } from "@/components/Laptop";
import { Nav } from "@/components/Nav";
import { links } from "@/lib/site";

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col">
      <Nav />

      <section className="flex flex-1 flex-col items-center justify-center px-5 pt-[30px] pb-[26px]">
        <Laptop />

        <p className="mt-[10px] text-center text-[18px] leading-[24px] sm:text-[22px] sm:leading-[28px]">
          A &quot;<em className="font-semibold">lyrical addition</em>&quot; to the{" "}
          <a
            href={links.boringNotch}
            target="_blank"
            rel="noreferrer"
            className="link-underline"
          >
            Boring Notch
          </a>
          !
        </p>

        <div className="mt-[11px] flex flex-wrap items-center justify-center gap-5 text-[14px] leading-[18px]">
          <a
            href={links.pr}
            target="_blank"
            rel="noreferrer"
            className="button-ink inline-flex items-center gap-[10px] rounded-[8px] border border-ink/70 py-[3px] pr-[9px] pl-[6px] opacity-60 transition-opacity hover:opacity-100 focus-visible:opacity-100"
          >
            <GitHubMark className="h-7 w-7" />
            View the PR
          </a>
          <a
            href={links.maker}
            target="_blank"
            rel="noreferrer"
            className="link-underline opacity-60 transition-opacity hover:opacity-100 focus-visible:opacity-100"
          >
            Meet the Maker
          </a>
        </div>
      </section>
    </main>
  );
}
