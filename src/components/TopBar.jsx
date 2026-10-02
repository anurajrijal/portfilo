import { useEffect, useState } from "react";

const fmt = () =>
  "Local time: " +
  new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

const menuCls =
  "text-dim after:ml-2 after:inline-block after:border-4 after:border-transparent after:border-t-[5px] after:border-t-dim after:align-[-2px] after:content-['']";

export default function TopBar({ soundOn, onToggleSound }) {
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-6 pb-[38px] pt-3.5 text-sm text-ink max-[700px]:grid-cols-1">
      <div className="flex flex-wrap items-center gap-[22px]">
        {["File", "Edit", "Language", "Info"].map((m) => (
          <span key={m} className={menuCls}>
            {m}
          </span>
        ))}
        <span>{time}</span>
      </div>

      <div className="rounded-[22px] bg-hi px-[72px] py-2 text-xl font-bold tracking-[.35em] text-[#06121b] motion-safe:animate-logo max-[700px]:order-first max-[700px]:justify-self-center">
        ANURAJ RIJAL
      </div>

      <div className="flex flex-wrap items-center justify-end gap-[22px] max-[700px]:justify-start">
        <button
          id="snd"
          type="button"
          aria-label="Toggle sound"
          aria-pressed={soundOn}
          onClick={onToggleSound}
          className={
            "inline-flex items-center gap-2 p-0 text-hi " +
            (soundOn ? "" : "opacity-[.45]")
          }
        >
          <svg width="24" height="22" viewBox="0 0 24 22" fill="currentColor">
            <path d="M2 8h4l6-5v16l-6-5H2z" />
            <path
              d="M15 7q3 4 0 8M18 4q6 7 0 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            />
          </svg>
        </button>
        <span>Local Terminal: R1-CORE</span>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 p-0 text-ink"
        >
          Log Out
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M9 1v8M4.5 4a7 7 0 1 0 9 0" />
          </svg>
        </button>
      </div>

      <svg
        className="pointer-events-none absolute bottom-0 left-2.5 h-[30px] w-[calc(100%-20px)]"
        viewBox="0 0 1000 30"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 1H340C385 1 395 28 440 28H560C605 28 615 1 660 1H1000"
          fill="none"
          stroke="#1f4256"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </header>
  );
}
