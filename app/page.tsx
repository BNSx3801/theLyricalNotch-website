import { GitHubMark } from "@/components/icons";
import { Nav } from "@/components/Nav";
import { TiltedDemo } from "@/components/TiltedDemo";
import { links } from "@/lib/site";

export default function Home() {
  return (
    <main className="relative flex min-h-dvh flex-col overflow-x-clip">
      <Nav />

      <section className="relative flex flex-1 flex-col items-center gap-12 px-5 pt-10 pb-12 xl:block xl:p-0">
        <div className="hero-copy w-full max-w-[520px] text-left xl:absolute xl:top-[438.5px] xl:left-[85px] xl:w-auto xl:max-w-none">
          <h1 className="text-[26px] leading-[32px] font-bold">The Lyrical Notch</h1>
          <p className="mt-[6px] text-[18px] leading-[22px] text-ink-muted">
            A &apos;<em className="font-bold italic">lyrical addition</em>&apos; to the ever-greatest{" "}
            <a href={links.boringNotch} target="_blank" rel="noreferrer" className="link-underline">
              Boring Notch
            </a>
            !
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-6 text-[16px] leading-[20px]">
            <a
              href={links.download}
              className="inline-flex h-[44px] w-[115px] items-center justify-center rounded-[36px] bg-accent font-semibold text-white transition-colors duration-200 hover:bg-accent-hover focus-visible:bg-accent-hover"
            >
              Download
            </a>
            <a
              href={links.pr}
              target="_blank"
              rel="noreferrer"
              className="link-underline inline-flex items-center gap-[9px] text-accent"
            >
              <GitHubMark className="h-6 w-6 shrink-0" />
              View the PR
            </a>
          </div>
        </div>

        <TiltedDemo />
      </section>
    </main>
  );
}
