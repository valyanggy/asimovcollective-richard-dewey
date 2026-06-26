"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { ThemeToggle } from "@/components/controls/theme-toggle";
import { cn } from "@/lib/utils";

type Topic = "finance" | "investing" | "macro" | "culture";
type TopicFilter = Topic | null;
type YearSort = "new-old" | "old-new";
type ViewMode = "timeline" | "platform";

type WorkItemData = {
  type: string;
  topic: Topic;
  year: string;
  title: string;
  research: string;
  published?: string;
  summary?: string;
  unpublished?: boolean;
  links: string[];
};

type PlatformArticle = {
  title: string;
  date: string;
  topic: Topic;
};

type PlatformData = {
  name: string;
  role?: string;
  tenure?: string;
  logo: {
    alt: string;
    className?: string;
    darkSrc?: string;
    height: number;
    src: string;
    width: number;
  };
  articles: PlatformArticle[];
};

const topics: Topic[] = ["finance", "investing", "macro", "culture"];
const years = [
  "2026",
  "2025",
  "2024",
  "2023",
  "2022",
  "2021",
  "2020",
  "2019",
  "2018",
  "2017",
  "2016",
  "2015",
  "2014",
  "2013",
  "2012",
  "2011",
  "2010",
  "2009",
  "2008",
  "2007",
  "2006",
  "2005",
  "2004",
  "2003",
  "2002",
  "2001",
  "2000",
];

const workItems: WorkItemData[] = [
  {
    type: "Research Paper",
    topic: "finance",
    year: "2026",
    title:
      "Rational Decision-Making under Uncertainty: Observed Betting Patterns on a Biased Coin",
    research: "Bloomberg",
    published: "25 Oct, 2016",
    summary:
      "Lorem ipsum dolor sit amet consectetur. Nulla ullamcorper sit faucibus quisque ante non mi sagittis mauris. Et lacinia cras nibh mauris. Varius faucibus lacus aliquet non. Proin duis placerat vitae risus.",
    links: ["PDF", "Read on Bloomberg"],
  },
  {
    type: "Research Paper",
    topic: "finance",
    year: "2025",
    title:
      "Rational Decision-Making under Uncertainty: Observed Betting Patterns on a Biased Coin",
    research: "Unpublished",
    summary:
      "Lorem ipsum dolor sit amet consectetur. Nulla ullamcorper sit faucibus quisque ante non mi sagittis mauris. Et lacinia cras nibh mauris. Varius faucibus lacus aliquet non. Proin duis placerat vitae risus.",
    unpublished: true,
    links: [],
  },
  {
    type: "Research Paper",
    topic: "finance",
    year: "2024",
    title:
      "Rational Decision-Making under Uncertainty: Observed Betting Patterns on a Biased Coin",
    research: "Bloomberg",
    published: "25 Oct, 2016",
    links: ["PDF", "Read on Bloomberg"],
  },
  {
    type: "Research Paper",
    topic: "finance",
    year: "2023",
    title:
      "Rational Decision-Making under Uncertainty: Observed Betting Patterns on a Biased Coin",
    research: "Bloomberg",
    published: "25 Oct, 2016",
    links: ["PDF", "Read on Bloomberg"],
  },
  {
    type: "Research Paper",
    topic: "finance",
    year: "2022",
    title:
      "Rational Decision-Making under Uncertainty: Observed Betting Patterns on a Biased Coin",
    research: "Bloomberg",
    published: "25 Oct, 2016",
    links: ["PDF", "Read on Bloomberg"],
  },
  {
    type: "Research Paper",
    topic: "finance",
    year: "2021",
    title:
      "Rational Decision-Making under Uncertainty: Observed Betting Patterns on a Biased Coin",
    research: "Bloomberg",
    published: "14 Jul, 2021",
    summary:
      "Lorem ipsum dolor sit amet consectetur. Nulla ullamcorper sit faucibus quisque ante non mi sagittis mauris. Et lacinia cras nibh mauris.",
    links: ["PDF", "Read on Bloomberg"],
  },
  {
    type: "Research Paper",
    topic: "finance",
    year: "2020",
    title:
      "Rational Decision-Making under Uncertainty: Observed Betting Patterns on a Biased Coin",
    research: "Bloomberg",
    published: "9 Nov, 2020",
    links: ["PDF", "Read on Bloomberg"],
  },
  {
    type: "Research Paper",
    topic: "finance",
    year: "2019",
    title:
      "Rational Decision-Making under Uncertainty: Observed Betting Patterns on a Biased Coin",
    research: "Bloomberg",
    published: "3 May, 2019",
    links: ["PDF", "Read on Bloomberg"],
  },
  {
    type: "Research Paper",
    topic: "finance",
    year: "2018",
    title:
      "Rational Decision-Making under Uncertainty: Observed Betting Patterns on a Biased Coin",
    research: "Bloomberg",
    published: "18 Sep, 2018",
    links: ["PDF", "Read on Bloomberg"],
  },
];

const platformGroups: PlatformData[] = [
  {
    name: "Bloomberg",
    role: "Managing Partner",
    tenure: "Since 2017",
    logo: {
      alt: "Bloomberg",
      className: "h-[57px] w-[308px] dark:invert",
      height: 58,
      src: "/assets/bloomberg.png",
      width: 308,
    },
    articles: [
      {
        title: "The Games Wall Street Plays Have Taught Them How to Win",
        date: "5 Dec, 2025",
        topic: "finance",
      },
      {
        title: "The Games Wall Street Plays Have Taught Them How to Win",
        date: "25 Oct, 2016",
        topic: "finance",
      },
      {
        title: "The Games Wall Street Plays Have Taught Them How to Win",
        date: "17 Jun, 2015",
        topic: "investing",
      },
      {
        title: "The Games Wall Street Plays Have Taught Them How to Win",
        date: "2 Feb, 2014",
        topic: "macro",
      },
      {
        title: "The Games Wall Street Plays Have Taught Them How to Win",
        date: "11 Sep, 2013",
        topic: "culture",
      },
      {
        title: "The Games Wall Street Plays Have Taught Them How to Win",
        date: "8 May, 2012",
        topic: "finance",
      },
      {
        title: "The Games Wall Street Plays Have Taught Them How to Win",
        date: "12 Mar, 2011",
        topic: "investing",
      },
      {
        title: "The Games Wall Street Plays Have Taught Them How to Win",
        date: "19 Jan, 2010",
        topic: "macro",
      },
      {
        title: "The Games Wall Street Plays Have Taught Them How to Win",
        date: "4 Aug, 2009",
        topic: "culture",
      },
      {
        title: "The Games Wall Street Plays Have Taught Them How to Win",
        date: "6 Apr, 2008",
        topic: "finance",
      },
    ],
  },
  {
    name: "Rolling Stone",
    role: "Reporter",
    tenure: "Since 2007",
    logo: {
      alt: "Rolling Stone",
      className: "h-[60px] w-[308px]",
      darkSrc: "/assets/rolling-stone-red.png",
      height: 60,
      src: "/assets/rolling-stone.png",
      width: 308,
    },
    articles: [
      {
        title: "The Games Wall Street Plays Have Taught Them How to Win",
        date: "5 Dec, 2025",
        topic: "culture",
      },
      {
        title: "The Games Wall Street Plays Have Taught Them How to Win",
        date: "25 Oct, 2016",
        topic: "culture",
      },
      {
        title: "The Games Wall Street Plays Have Taught Them How to Win",
        date: "17 Jun, 2015",
        topic: "investing",
      },
      {
        title: "The Games Wall Street Plays Have Taught Them How to Win",
        date: "2 Feb, 2014",
        topic: "macro",
      },
      {
        title: "The Games Wall Street Plays Have Taught Them How to Win",
        date: "11 Sep, 2013",
        topic: "finance",
      },
      {
        title: "The Games Wall Street Plays Have Taught Them How to Win",
        date: "8 May, 2012",
        topic: "culture",
      },
      {
        title: "The Games Wall Street Plays Have Taught Them How to Win",
        date: "12 Mar, 2011",
        topic: "investing",
      },
      {
        title: "The Games Wall Street Plays Have Taught Them How to Win",
        date: "19 Jan, 2010",
        topic: "finance",
      },
      {
        title: "The Games Wall Street Plays Have Taught Them How to Win",
        date: "4 Aug, 2009",
        topic: "macro",
      },
      {
        title: "The Games Wall Street Plays Have Taught Them How to Win",
        date: "6 Apr, 2008",
        topic: "culture",
      },
    ],
  },
  {
    name: "City Journal",
    logo: {
      alt: "City Journal",
      className: "h-9 w-[308px] dark:invert",
      height: 36,
      src: "/assets/city-journal.png",
      width: 308,
    },
    articles: [
      {
        title: "The Games Wall Street Plays Have Taught Them How to Win",
        date: "25 Oct, 2016",
        topic: "culture",
      },
    ],
  },
  {
    name: "The Gradient",
    logo: {
      alt: "The Gradient",
      className: "h-[89px] w-[308px] dark:invert",
      height: 89,
      src: "/assets/the-gradient.png",
      width: 308,
    },
    articles: [
      {
        title: "The Games Wall Street Plays Have Taught Them How to Win",
        date: "25 Oct, 2016",
        topic: "investing",
      },
    ],
  },
  {
    name: "Financial Times",
    logo: {
      alt: "Financial Times",
      className: "h-[103px] w-[308px]",
      height: 103,
      src: "/assets/financial-times.png",
      width: 308,
    },
    articles: [
      {
        title: "The Games Wall Street Plays Have Taught Them How to Win",
        date: "25 Oct, 2016",
        topic: "finance",
      },
    ],
  },
  {
    name: "Pirate Wires",
    logo: {
      alt: "Pirate Wires",
      className: "h-[154px] w-[308px]",
      height: 154,
      src: "/assets/pirate-wires.png",
      width: 308,
    },
    articles: [
      {
        title: "The Games Wall Street Plays Have Taught Them How to Win",
        date: "25 Oct, 2016",
        topic: "culture",
      },
    ],
  },
  {
    name: "The Diff",
    logo: {
      alt: "The Diff",
      className: "h-[183px] w-[308px]",
      height: 183,
      src: "/assets/the-diff.png",
      width: 308,
    },
    articles: [
      {
        title: "The Games Wall Street Plays Have Taught Them How to Win",
        date: "25 Oct, 2016",
        topic: "investing",
      },
    ],
  },
  {
    name: "The Economist",
    logo: {
      alt: "The Economist",
      className: "h-[154px] w-[308px]",
      height: 154,
      src: "/assets/the-economist.png",
      width: 308,
    },
    articles: [
      {
        title: "The Games Wall Street Plays Have Taught Them How to Win",
        date: "25 Oct, 2016",
        topic: "macro",
      },
    ],
  },
  {
    name: "Wilmott",
    logo: {
      alt: "Wilmott",
      className: "h-[95px] w-[308px] dark:invert",
      height: 95,
      src: "/assets/wilmott.png",
      width: 308,
    },
    articles: [
      {
        title: "The Games Wall Street Plays Have Taught Them How to Win",
        date: "25 Oct, 2016",
        topic: "investing",
      },
    ],
  },
];

function Highlight({ children }: { children: ReactNode }) {
  return <span className="bg-accent px-[2px] text-black">{children}</span>;
}

function Chip({
  active,
  children,
  onClick,
  onRemove,
  removable = false,
}: {
  active?: boolean;
  children: ReactNode;
  onClick?: () => void;
  onRemove?: () => void;
  removable?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-[19px] items-center gap-1 px-[2px] uppercase leading-[1.2] text-ink",
        active && "bg-accent text-black",
      )}
    >
      <button type="button" className="uppercase" onClick={onClick}>
        {children}
      </button>
      {removable ? (
        <button
          type="button"
          className="uppercase"
          aria-label={`Remove ${children} filter`}
          onClick={onRemove}
        >
          X
        </button>
      ) : null}
    </span>
  );
}

function Arrow() {
  return <span aria-hidden="true">-&gt;</span>;
}

function ExternalLink({ children }: { children: ReactNode }) {
  return (
    <a href="#" className="underline underline-offset-2">
      [{children} <span className="inline-block -rotate-45">-&gt;</span>]
    </a>
  );
}

function FilterGroup({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex min-w-[150px] flex-col gap-1", className)}>
      <div className="flex h-[19px] items-center gap-1 px-[2px] text-ink/50">
        <span>{label}</span>
      </div>
      <div className="flex flex-wrap items-center gap-1">{children}</div>
    </div>
  );
}

function Timeline({
  activeYear,
  className,
  mode = "desktop",
  onOpenChange,
  onSelectYear,
  timelineYears,
}: {
  activeYear: string;
  className?: string;
  mode?: "desktop" | "mobile";
  onOpenChange?: (open: boolean) => void;
  onSelectYear: (year: string) => void;
  timelineYears: string[];
}) {
  const mobile = mode === "mobile";
  const draggingRef = useRef(false);
  const leaveDelayRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [timelineOpen, setTimelineOpen] = useState(false);
  const [hoveredYearIndex, setHoveredYearIndex] = useState<number | null>(null);
  const activeYearIndex = Math.max(timelineYears.indexOf(activeYear), 0);
  const markerYearIndex = hoveredYearIndex ?? activeYearIndex;

  const openTimeline = useCallback(() => {
    if (leaveDelayRef.current) {
      clearTimeout(leaveDelayRef.current);
      leaveDelayRef.current = null;
    }

    setTimelineOpen(true);
    onOpenChange?.(true);
  }, [onOpenChange]);

  const closeTimelineImmediately = useCallback(() => {
    if (leaveDelayRef.current) {
      clearTimeout(leaveDelayRef.current);
      leaveDelayRef.current = null;
    }

    draggingRef.current = false;
    setHoveredYearIndex(null);
    setTimelineOpen(false);
    onOpenChange?.(false);
  }, [onOpenChange]);

  const closeTimeline = useCallback(() => {
    if (leaveDelayRef.current) {
      clearTimeout(leaveDelayRef.current);
    }

    leaveDelayRef.current = setTimeout(() => {
      draggingRef.current = false;
      setHoveredYearIndex(null);
      setTimelineOpen(false);
      onOpenChange?.(false);
    }, 240);
  }, [onOpenChange]);

  const selectYearFromPointer = useCallback(
    (clientY: number, element: HTMLElement) => {
      const options = Array.from(
        element.querySelectorAll<HTMLElement>("[data-timeline-year]"),
      );

      if (options.length === 0) {
        return;
      }

      const nearest = options.reduce(
        (best, option) => {
          const rect = option.getBoundingClientRect();
          const distance = Math.abs(clientY - (rect.top + rect.height / 2));
          return distance < best.distance ? { distance, option } : best;
        },
        { distance: Number.POSITIVE_INFINITY, option: options[0] },
      );

      const year = nearest.option.dataset.timelineYear;
      const index = Number(nearest.option.dataset.timelineIndex);

      if (Number.isFinite(index)) {
        setHoveredYearIndex(index);
      }

      if (year) {
        onSelectYear(year);
      }
    },
    [onSelectYear],
  );

  if (timelineYears.length === 0) {
    return null;
  }

  return (
    <aside
      className={cn(
        "relative h-[19px] text-[10px] leading-[1.2] tracking-none md:sticky md:top-[282px] md:h-[260px]",
        className,
      )}
      onPointerEnter={mobile ? undefined : openTimeline}
      onFocus={mobile ? undefined : openTimeline}
      onPointerLeave={mobile ? undefined : closeTimeline}
      onBlur={mobile ? undefined : closeTimeline}
    >
      <div
        className={cn(
          "flex h-[14px] items-start gap-[6px] transition-opacity duration-150",
          mobile && "cursor-pointer",
          timelineOpen && "opacity-0",
        )}
        onClick={mobile ? openTimeline : undefined}
      >
        <span
          className={cn(
            "mt-[6px] h-px bg-line/30 transition-[width] duration-200",
            timelineOpen ? "w-[18px]" : "w-[4px]",
          )}
        />
        <button
          type="button"
          className="h-[14px] leading-[1.2]"
          onClick={mobile ? openTimeline : () => onSelectYear(activeYear)}
        >
          {activeYear}
        </button>
      </div>

      <div
        className={cn(
          "absolute left-0 top-0 h-[260px] transition-opacity duration-200",
          timelineOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
        onPointerDown={(event) => {
          if (mobile && !timelineOpen) {
            return;
          }

          draggingRef.current = true;
          event.currentTarget.setPointerCapture(event.pointerId);
          selectYearFromPointer(event.clientY, event.currentTarget);
        }}
        onPointerMove={(event) => {
          if (!draggingRef.current) {
            return;
          }

          selectYearFromPointer(event.clientY, event.currentTarget);
        }}
        onPointerUp={(event) => {
          draggingRef.current = false;
          event.currentTarget.releasePointerCapture(event.pointerId);
        }}
        onPointerCancel={() => {
          draggingRef.current = false;
        }}
      >
        {mobile ? (
          <button
            type="button"
            className="absolute right-0 top-0 h-[19px] px-[2px] uppercase leading-[1.2] text-ink/50"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              closeTimelineImmediately();
            }}
          >
            [ CLOSE]
          </button>
        ) : null}
        <span
          className={cn(
            "absolute left-0 h-px bg-line/30 transition-[top,width] duration-200",
            timelineOpen ? "w-[18px]" : "w-[4px]",
          )}
          style={{ top: `${markerYearIndex * 26 + 6}px` }}
        />
        <div className="ml-[30px] flex cursor-ns-resize select-none flex-col gap-[12px] text-[10px]">
          {timelineYears.map((year, index) => (
            <button
              key={year}
              type="button"
              data-timeline-year={year}
              data-timeline-index={index}
              className={cn(
                "h-[14px] text-left leading-[1.2] transition-[opacity,transform] duration-200",
                timelineOpen
                  ? "translate-x-0 opacity-100"
                  : "translate-x-[-8px] opacity-0",
                year === activeYear
                  ? "text-[10px] text-ink"
                  : index <= 4
                    ? "text-ink/25 hover:text-ink/70"
                    : "text-ink/10 hover:text-ink/50",
              )}
              style={{ transitionDelay: `${index * 28}ms` }}
              onPointerEnter={() => setHoveredYearIndex(index)}
              onClick={() => onSelectYear(year)}
            >
              {year}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

function BioLine({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "max-w-[660px] leading-[1.2] tracking-none text-ink",
        className,
      )}
    >
      {children}
    </p>
  );
}

function WorkItem({
  item,
  expanded,
}: {
  item: WorkItemData;
  expanded: boolean;
}) {
  return (
    <article className="flex w-full flex-col items-start gap-10">
      <p className="w-full text-[10px] leading-[1.2] tracking-none">
        {item.type}
      </p>

      <div className="flex w-full flex-col gap-2 pb-8">
        <p className="text-ink/50">Title:</p>
        <h2 className="text-[20px] font-bold leading-[1.2] tracking-none">
          {item.title}
        </h2>
      </div>

      {expanded && item.summary ? (
        <div className="flex w-full flex-col gap-2 pb-8">
          <p className="text-ink/50">Summary:</p>
          <p className="leading-[1.2]">{item.summary}</p>
        </div>
      ) : null}

      <div className="flex w-full flex-col gap-10">
        <div className="grid w-full grid-cols-1 gap-10 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <p className="text-ink/50">Research:</p>
            <p
              className={cn(
                item.research === "Bloomberg" && "text-[20px] font-bold",
              )}
            >
              {item.research}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className={cn("text-ink/50", !item.published && "opacity-0")}>
              Published:
            </p>
            {item.published ? <p>{item.published}</p> : null}
          </div>
        </div>

        {item.unpublished ? (
          <p className="text-[#f28082]">[UNPUBLISHED]</p>
        ) : (
          <div className="flex flex-col gap-2">
            <p className="text-ink/50">Read:</p>
            <div className="flex flex-wrap items-start gap-x-3 gap-y-1">
              <span>SSRN</span>
              {item.links.map((link) => (
                <ExternalLink key={link}>{link}</ExternalLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

function PlatformLogo({ platform }: { platform: PlatformData }) {
  if (platform.logo.darkSrc) {
    return (
      <div className="relative flex w-[308px] items-center">
        <Image
          alt={platform.logo.alt}
          className={cn(
            "object-contain object-left dark:hidden",
            platform.logo.className,
          )}
          height={platform.logo.height}
          src={platform.logo.src}
          width={platform.logo.width}
        />
        <Image
          alt=""
          aria-hidden="true"
          className={cn(
            "hidden object-contain object-left dark:block",
            platform.logo.className,
          )}
          height={72}
          src={platform.logo.darkSrc}
          width={platform.logo.width}
        />
      </div>
    );
  }

  return (
    <Image
      alt={platform.logo.alt}
      className={cn("object-contain object-left", platform.logo.className)}
      height={platform.logo.height}
      src={platform.logo.src}
      width={platform.logo.width}
    />
  );
}

function PlatformBreaker({ platform }: { platform: PlatformData }) {
  return (
    <div className="mx-auto flex w-full max-w-[658px] flex-col gap-5 sm:flex-row sm:items-center sm:gap-10">
      <PlatformLogo platform={platform} />
      <div className="flex flex-col gap-2 py-1">
        <p className="text-[14px] leading-[1.2] tracking-none">
          {platform.name}
        </p>
        {platform.role || platform.tenure ? (
          <div className="flex gap-[3px] whitespace-nowrap text-ink/40">
            {platform.role ? <span>{platform.role}</span> : null}
            {platform.role && platform.tenure ? <span>·</span> : null}
            {platform.tenure ? <span>{platform.tenure}</span> : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function PlatformArticleCard({ article }: { article: PlatformArticle }) {
  return (
    <article className="flex min-h-[122px] flex-col items-start gap-12">
      <h2 className="max-w-[273px] text-[16px] font-bold leading-[1.2] tracking-none text-ink/80">
        {article.title}
      </h2>
      <p className="text-ink/50">{article.date}</p>
    </article>
  );
}

function PlatformIndexRow({
  active,
  children,
  onOpen,
  platform,
}: {
  active: boolean;
  children?: ReactNode;
  onOpen: () => void;
  platform: PlatformData;
}) {
  const articleCount = platform.articles.length;

  return (
    <div className="flex w-full flex-col">
      <button
        type="button"
        aria-expanded={active}
        className={cn(
          "group flex h-[29px] w-full items-start justify-between border-b border-line/30 text-left transition-colors",
          active ? "text-ink" : "text-ink/20 hover:text-ink",
        )}
        onClick={onOpen}
      >
        <span className="pt-1 text-[14px] leading-[1.2] tracking-none">
          {platform.name}
        </span>
        <span
          className={cn(
            "flex h-[19px] items-center px-[2px] pt-[3px] text-ink/20 group-hover:text-ink",
            active && "text-ink",
          )}
        >
          {active ? (
            <span>- CLOSE&nbsp;</span>
          ) : (
            <span className="hidden group-hover:inline">+ OPEN&nbsp;</span>
          )}
          [{articleCount}]
        </span>
      </button>
      {children}
    </div>
  );
}

function PlatformExpandedPanel({
  platform,
  sort,
}: {
  platform: PlatformData;
  sort: YearSort;
}) {
  const sortedArticles =
    sort === "old-new" ? [...platform.articles].reverse() : platform.articles;

  return (
    <div className="flex flex-col gap-40 pb-[160px] pt-[152px]">
      <PlatformBreaker platform={platform} />
      <div className="grid grid-cols-1 gap-x-[42px] gap-y-[100px] border-b border-line/30 pb-[100px] sm:grid-cols-2 lg:grid-cols-4">
        {sortedArticles.map((article, index) => (
          <PlatformArticleCard
            key={`${platform.name}-${article.date}-${index}`}
            article={article}
          />
        ))}
      </div>
    </div>
  );
}

function PlatformView({
  selectedPlatformName,
  setSelectedPlatformName,
  sort,
}: {
  selectedPlatformName: string | null;
  setSelectedPlatformName: (name: string | null) => void;
  sort: YearSort;
}) {
  return (
    <section
      id="work"
      className="mx-auto flex w-[calc(100%-var(--px-section)*2)] flex-col pb-[220px] pt-2"
    >
      <div className="flex w-full flex-col gap-[10px]">
        {platformGroups.map((platform) => {
          const active = platform.name === selectedPlatformName;

          return (
            <PlatformIndexRow
              key={platform.name}
              active={active}
              platform={platform}
              onOpen={() =>
                setSelectedPlatformName(active ? null : platform.name)
              }
            >
              {active ? (
                <PlatformExpandedPanel platform={platform} sort={sort} />
              ) : null}
            </PlatformIndexRow>
          );
        })}
      </div>
    </section>
  );
}

export function HomePage() {
  const [bioOpen, setBioOpen] = useState(false);
  const [sortingOpen, setSortingOpen] = useState(false);
  const [timelineOpen, setTimelineOpen] = useState(false);
  const [topic, setTopic] = useState<TopicFilter>("finance");
  const [sort, setSort] = useState<YearSort>("new-old");
  const [view, setView] = useState<ViewMode>("platform");
  const [activeTimelineYear, setActiveTimelineYear] = useState("");
  const [selectedPlatformName, setSelectedPlatformName] = useState<
    string | null
  >(null);
  const timelineYearRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const visibleItems = useMemo(() => {
    const filtered = workItems.filter((item) => {
      const topicMatch = topic === null || item.topic === topic;
      return topicMatch;
    });

    return sort === "old-new" ? [...filtered].reverse() : filtered;
  }, [sort, topic]);
  const timelineYears = useMemo(
    () => Array.from(new Set(visibleItems.map((item) => item.year))),
    [visibleItems],
  );

  useEffect(() => {
    if (timelineYears.length === 0) {
      setActiveTimelineYear("");
      return;
    }

    setActiveTimelineYear((currentYear) =>
      timelineYears.includes(currentYear) ? currentYear : timelineYears[0],
    );
  }, [timelineYears]);

  useEffect(() => {
    if (view !== "timeline" || timelineYears.length === 0) {
      return;
    }

    const updateActiveYear = () => {
      const targetY = 188;
      const nextYear = timelineYears.reduce(
        (best, year) => {
          const element = timelineYearRefs.current[year];

          if (!element) {
            return best;
          }

          const distance = Math.abs(
            element.getBoundingClientRect().top - targetY,
          );
          return distance < best.distance ? { distance, year } : best;
        },
        { distance: Number.POSITIVE_INFINITY, year: timelineYears[0] },
      ).year;

      setActiveTimelineYear(nextYear);
    };

    updateActiveYear();
    window.addEventListener("scroll", updateActiveYear, { passive: true });
    window.addEventListener("resize", updateActiveYear);

    return () => {
      window.removeEventListener("scroll", updateActiveYear);
      window.removeEventListener("resize", updateActiveYear);
    };
  }, [timelineYears, view]);

  const scrollToTimelineYear = useCallback((year: string) => {
    const element = timelineYearRefs.current[year];

    if (!element) {
      return;
    }

    setActiveTimelineYear(year);
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);
  const renderedTimelineYears = new Set<string>();

  return (
    <main className="min-h-screen bg-canvas font-mono text-[10px] leading-[1.2] tracking-none text-ink">
      <header className="sticky top-0 z-30 bg-canvas px-section pt-[20px]">
        <div className="mx-auto flex w-full flex-col">
          <div className="flex items-start justify-between gap-4 border-b border-line/30 pb-5">
            <div className={cn("flex w-full max-w-[660px] flex-col gap-0")}>
              <button
                type="button"
                aria-expanded={bioOpen}
                className="text-left leading-[1.2] tracking-none"
                onClick={() => setBioOpen((value) => !value)}
              >
                Richard Dewey is the founder of{" "}
                <span className="underline underline-offset-2">
                  Revenant Partners
                </span>
                , a venture fund focused on early-stage startups at the
                intersection of technology, engineering, and long-term economic
                transformation.
                <Highlight>
                  {bioOpen ? "[ - Hide]" : "[ + Read more]"}
                </Highlight>
              </button>

              <div
                className={cn(
                  "overflow-hidden transition-[max-height,opacity] duration-300 ease-out",
                  bioOpen ? "max-h-[280px] opacity-100" : "max-h-0 opacity-0",
                )}
              >
                <div className="flex flex-col gap-[37px] pt-10">
                  <BioLine>
                    Previously, he has been affiliated with leading investment
                    institutions including{" "}
                    <span className="underline underline-offset-2">PIMCO</span>,{" "}
                    <span className="underline underline-offset-2">
                      Elm Partners
                    </span>
                    , and{" "}
                    <span className="underline underline-offset-2">
                      Royal Bridge Capital
                    </span>
                    . He is a two-time founder backed by Naval Ravikant and
                    Balaji Srinivasan, and an investor in category-defining
                    companies such as SpaceX and Stripe.
                  </BioLine>
                  <BioLine>
                    Richard&apos;s background spans both technical and
                    historical inquiry, with formal training in Engineering at
                    Columbia University and Economic History at the London
                    School of Economics. He is a contributor to{" "}
                    <Highlight>Bloomberg</Highlight>,{" "}
                    <span className="underline underline-offset-2">
                      Rolling Stone
                    </span>{" "}
                    and to peer-reviewed academic journals.
                  </BioLine>
                  <div className="flex items-center gap-1">
                    <a
                      href="#"
                      aria-label="LinkedIn"
                      className="inline-flex size-4 items-center justify-center"
                    >
                      <Image
                        alt=""
                        aria-hidden="true"
                        className="size-full dark:invert"
                        height={16}
                        src="/assets/lineicons-linkedin.svg"
                        width={16}
                      />
                    </a>
                    <a
                      href="#"
                      aria-label="X"
                      className="inline-flex size-4 items-center justify-center"
                    >
                      <Image
                        alt=""
                        aria-hidden="true"
                        className="size-full dark:invert"
                        height={16}
                        src="/assets/x-twitter-logo-block.svg"
                        width={16}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <ThemeToggle />
          </div>

          <div className="grid gap-0 border-b border-line/30 py-1 md:grid-cols-12 md:gap-10 md:py-0 md:pb-1">
            <div className="flex flex-wrap items-center justify-between gap-[30px] md:col-span-6 md:items-start">
              <span className="flex h-[19px] items-center px-[2px] uppercase leading-[1.2]">
                RESEARCH
              </span>
              <button
                type="button"
                className="flex h-[19px] items-center px-[2px] uppercase leading-[1.2] text-ink/50 md:hidden"
                aria-expanded={sortingOpen}
                onClick={() => setSortingOpen((value) => !value)}
              >
                {sortingOpen ? "[ - SORTING]" : "[ + SORTING]"}
              </button>
            </div>

            <div
              className={cn(
                "grid gap-y-[12px] overflow-hidden transition-[max-height,opacity] duration-200 md:col-span-6 md:max-h-none md:overflow-visible md:opacity-100 xl:grid-cols-6 xl:gap-x-10 xl:gap-y-0",
                sortingOpen
                  ? "max-h-[240px] opacity-100"
                  : "max-h-0 opacity-0 md:max-h-none",
              )}
            >
              <FilterGroup label="TOPIC" className="xl:col-span-2">
                {topics.map((option) => (
                  <Chip
                    key={option}
                    active={topic === option}
                    removable={topic === option}
                    onClick={() => setTopic(option)}
                    onRemove={() => setTopic(null)}
                  >
                    {option}
                  </Chip>
                ))}
              </FilterGroup>

              <FilterGroup label="YEAR" className="xl:col-span-2">
                <Chip
                  active={sort === "new-old"}
                  removable={sort === "new-old"}
                  onClick={() => setSort("new-old")}
                  onRemove={() => setSort("old-new")}
                >
                  NEW <Arrow /> OLD
                </Chip>
                <Chip
                  active={sort === "old-new"}
                  removable={sort === "old-new"}
                  onClick={() => setSort("old-new")}
                  onRemove={() => setSort("new-old")}
                >
                  OLD <Arrow /> NEW
                </Chip>
              </FilterGroup>

              <FilterGroup label="VIEW" className="xl:col-span-2">
                <Chip
                  active={view === "timeline"}
                  removable={view === "timeline"}
                  onClick={() => setView("timeline")}
                  onRemove={() => setView("platform")}
                >
                  TIMELINE
                </Chip>
                <Chip
                  active={view === "platform"}
                  removable={view === "platform"}
                  onClick={() => setView("platform")}
                  onRemove={() => setView("timeline")}
                >
                  PLATFORM
                </Chip>
              </FilterGroup>
            </div>
          </div>

          {view === "timeline" ? (
            <div
              className={cn(
                "border-b border-line/30 bg-canvas py-1 md:hidden",
                timelineOpen && "h-[260px]",
              )}
            >
              <Timeline
                activeYear={activeTimelineYear || timelineYears[0] || ""}
                className={cn("w-full", timelineOpen && "h-[260px]")}
                mode="mobile"
                onOpenChange={setTimelineOpen}
                timelineYears={timelineYears}
                onSelectYear={scrollToTimelineYear}
              />
            </div>
          ) : null}
        </div>
      </header>

      {view === "platform" ? (
        <PlatformView
          selectedPlatformName={selectedPlatformName}
          setSelectedPlatformName={setSelectedPlatformName}
          sort={sort}
        />
      ) : (
        <section
          id="work"
          className={cn(
            "mx-auto grid w-[calc(100%-var(--px-section)*2)] grid-cols-1 pb-[200px] transition-[padding-top] duration-300 ease-out md:grid-cols-12 md:gap-x-10",
            bioOpen ? "pt-[180px] md:pt-[207px]" : "pt-[10px] md:pt-[117px]",
          )}
        >
          <div
            className={cn(
              "col-start-1 hidden h-[19px] w-[58px] transition-[width] duration-200 md:col-span-1 md:col-start-2 md:block md:h-auto md:w-auto",
              timelineOpen && "h-[260px] w-[96px]",
            )}
          >
            <Timeline
              activeYear={activeTimelineYear || timelineYears[0] || ""}
              onOpenChange={setTimelineOpen}
              timelineYears={timelineYears}
              onSelectYear={scrollToTimelineYear}
            />
          </div>

          <div
            className={cn(
              "col-start-1 flex w-full min-w-0 max-w-[660px] flex-col items-start gap-[200px] md:col-span-6 md:col-start-4 md:justify-self-center",
            )}
          >
            {visibleItems.map((item, index) => {
              const firstItemForYear = !renderedTimelineYears.has(item.year);
              renderedTimelineYears.add(item.year);

              return (
                <div
                  key={`${item.title}-${item.topic}-${item.year}-${index}`}
                  ref={(element) => {
                    if (firstItemForYear) {
                      timelineYearRefs.current[item.year] = element;
                    }
                  }}
                  className="w-full scroll-mt-[180px]"
                >
                  <WorkItem item={item} expanded={bioOpen} />
                </div>
              );
            })}
          </div>
        </section>
      )}

      <footer className="mx-auto flex min-h-[360px] w-[calc(100%-var(--px-section)*2)] items-center justify-center pb-[160px] pt-[120px] text-center leading-[1.2] tracking-none text-ink">
        <p>&copy;2026 Copyright Richard Dewey. All rights reserved</p>
      </footer>
    </main>
  );
}
