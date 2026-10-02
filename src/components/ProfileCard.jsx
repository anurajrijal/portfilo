import { useMemo } from "react";
import { EXAM_DATE } from "../data";

function examInfo() {
  const t = new Date(EXAM_DATE + "T00:00:00");
  const exd = isNaN(t)
    ? "--"
    : t.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
  const d = Math.ceil((t - new Date()) / 864e5);
  const cd = isNaN(d)
    ? "Set date in code"
    : d < 0
      ? "Exam date passed"
      : d === 0
        ? "Exam day"
        : d + " days left";
  return { exd, cd };
}

export default function ProfileCard({ labsDone, onInfo }) {
  const { exd, cd } = useMemo(examInfo, []);

  return (
    <aside className="fixed right-5 top-[84px] w-[340px] rounded-xl border border-line bg-card p-4 text-[13px] max-[900px]:static max-[900px]:mx-6 max-[900px]:w-auto max-[900px]:max-w-[360px]">
      <div className="flex items-center justify-between gap-3 text-dim">
        <div className="grid h-[52px] w-[52px] place-items-center rounded border border-line bg-[#1b2b3a] after:h-[22px] after:w-[22px] after:rounded-full after:border-2 after:border-[#9aa9b3] after:content-['']" />
        <div className="flex-1">
          <span>
            CCNA{" "}
            <button
              type="button"
              aria-label="Cisco certification details"
              onClick={(e) => onInfo(e.currentTarget)}
              className="ml-1.5 h-[18px] w-[18px] rounded-full border border-hi p-0 align-middle font-mono text-[11px] font-bold leading-none text-hi"
            >
              i
            </button>
          </span>
          <br />
          <b className="text-[15px] text-hi">anuraj-0001</b>
        </div>
        <div className="text-right">
          <span>LABS DONE</span>
          <br />
          <span className="rounded-[3px] bg-ok px-1.5 py-px text-[11px] font-bold text-[#06121b]">
            SIM
          </span>{" "}
          <span className="text-[15px] text-ok">{labsDone} / 3</span>
        </div>
      </div>

      <hr className="my-3 border-line" />

      <div className="flex justify-between text-dim">
        <span className="text-ink">CCNA PROGRESS</span>
        <span className="text-ink">[68/100]</span>
      </div>
      <div className="mb-3 mt-1.5 h-2.5 w-full border border-line bg-progress" />

      <hr className="my-3 border-line" />

      <div className="flex items-center justify-between text-dim">
        <span>
          TARGET EXAM
          <br />
          <span className="text-ink">CCNA 200-301</span>
        </span>
        <span className="text-right">
          EXAM DATE
          <br />
          <b className="text-ink">{exd}</b>
        </span>
      </div>
      <div className="mt-2.5 flex justify-between text-dim">
        <span>COUNTDOWN</span>
        <b className="text-hi">{cd}</b>
      </div>
    </aside>
  );
}
