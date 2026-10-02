import { useState } from 'react';
import { NODES, LINKS } from '../data';

const shape =
  'fill-panel stroke-hi stroke-[1.5] group-hover:fill-[#16324a] group-focus:fill-[#16324a]';

export default function NetworkMap() {
  const [info, setInfo] = useState(null);

  return (
    <>
      <svg
        viewBox="0 0 500 250"
        role="img"
        aria-label="Lab topology"
        className="h-auto w-full rounded-md border border-line bg-well"
      >
        {LINKS.map(([a, b]) => (
          <line
            key={a + b}
            className="stroke-line stroke-2"
            x1={NODES[a].x}
            y1={NODES[a].y + 14}
            x2={NODES[b].x}
            y2={NODES[b].y - 2}
          />
        ))}
        {Object.entries(NODES).map(([k, n]) => (
          <g
            key={k}
            className="group"
            tabIndex={0}
            role="button"
            data-node
            data-hover
            onClick={() => setInfo(n.d)}
            onKeyDown={(e) => e.key === 'Enter' && setInfo(n.d)}
          >
            {n.s === 'r' ? (
              <circle cx={n.x} cy={n.y + 10} r="20" className={shape} />
            ) : (
              <rect x={n.x - 24} y={n.y - 2} width="48" height="26" rx="4" className={shape} />
            )}
            <text x={n.x} y={n.y + 14} textAnchor="middle" className="fill-ink text-[11px]">
              {k}
            </text>
          </g>
        ))}
      </svg>
      <p className="mt-2.5 text-dim">{info ?? 'Select a device to see its config summary.'}</p>
    </>
  );
}
