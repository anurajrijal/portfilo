import { useState } from 'react';
import { D, L } from '../data';
import { zzt } from '../lib/audio';
import { inputCls } from '../components/ui';

const KEYS = ['CPU', 'GPU', 'RAM', 'PSU'];
const fx = (x) => +x.toFixed(2);

const SEG_COLORS = {
  '': ['border-hi', 'bg-hi'],
  r: ['border-[#e5584f]', 'bg-[#e5584f]'],
  y: ['border-[#f2c14e]', 'bg-[#f2c14e]'],
};

/** 30-cell usage bar. variant: '' (cyan) | 'y' (yellow) | 'r' (red / over capacity) */
function Segments({ used, avail, variant }) {
  const filled = Math.min(30, Math.round((used / avail) * 30));
  const [border, fill] = SEG_COLORS[variant];
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 30 }, (_, i) => (
        <i key={i} className={`h-4 flex-1 border ${border} ${i < filled ? fill : ''}`} />
      ))}
    </div>
  );
}

function UsageRow({ label, used, avail, unit, base }) {
  const over = used > avail;
  const color = over ? '#e5584f' : base === 'y' ? '#f2c14e' : '#7fc4d6';
  return (
    <div className="grid grid-cols-[130px_1fr_150px] items-center gap-2.5 border-b border-dashed border-line py-[9px] text-xs max-[620px]:grid-cols-1">
      <span className="text-dim">{label}</span>
      <Segments used={Math.min(used, avail)} avail={avail} variant={over ? 'r' : base} />
      <b>
        <span style={{ color }}>
          {fx(used)} / {fx(avail)}
        </span>{' '}
        {unit}
      </b>
    </div>
  );
}

const changeCls =
  'h-full text-[13px] text-hi [clip-path:polygon(0_0,84%_0,100%_28%,100%_100%,0_100%)]';

function PartCard({ k, part, children }) {
  return (
    <div className="mb-2.5 rounded-md border border-line bg-panel2 text-xs">
      <div className="grid min-h-[44px] grid-cols-[62px_1fr_128px] items-center border-b border-line">
        <b className="flex h-full items-center border-r border-line pl-2.5 text-lg font-bold text-dim">{k}</b>
        <span className="pl-3 text-sm font-bold text-white">{part[0]}</span>
        {children}
      </div>
      <div className="grid grid-cols-[1fr_128px]">
        <div className="px-2.5 py-2">
          {L[k].map((label, i) => (
            <div key={label} className="flex justify-between leading-[1.7] text-[#cfe0e6]">
              <span>{label}</span>
              <span>{part[i + 1]}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-start gap-2 border-l border-line p-2.5 font-bold text-white">
          &#9432; Info
        </div>
      </div>
    </div>
  );
}

function RackIllustration() {
  return (
    <svg
      viewBox="0 0 150 230"
      role="img"
      aria-label="Server rack"
      className="h-auto w-full border border-line max-[620px]:hidden"
    >
      <rect x="0" y="0" width="150" height="230" fill="#0a1320" />
      <text x="8" y="16" fill="#6a8794" fontSize="8">MODEL SERVER 48 473 432</text>
      {Array.from({ length: 4 }, (_, y) =>
        Array.from({ length: 8 }, (_, x) => (
          <rect key={x + ',' + y} x={10 + x * 16.5} y={30 + y * 40} width="9" height="30" fill="#8cc4d4" />
        ))
      )}
      <rect x="8" y="196" width="134" height="22" fill="#1b2b3a" stroke="#1f4256" />
    </svg>
  );
}

/** Pick-a-part dialog for one category (CPU/GPU/RAM/PSU). */
function PartPicker({ k, current, onPick, onClose }) {
  const [q, setQ] = useState('');
  const needle = q.toLowerCase();

  return (
    <div
      className="fixed inset-0 z-[60] grid items-start justify-items-center bg-[#000a] px-3 py-20"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-[min(430px,100%)] rounded-[10px] border border-line bg-[#0b1522] p-3.5">
        <div className="mb-2.5 flex justify-between text-base font-bold text-white">
          <span>&#8853; ADD {k}</span>
          <button type="button" aria-label="Close" onClick={onClose} className="text-xl text-white">
            &times;
          </button>
        </div>
        <input
          autoFocus
          placeholder="Search..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className={inputCls + ' mb-2.5'}
        />
        {D[k].map((part, i) =>
          part[0].toLowerCase().includes(needle) ? (
            <PartCard key={part[0]} k={k} part={part}>
              <button
                type="button"
                onClick={() => current !== i && onPick(i)}
                className={changeCls + (current === i ? ' bg-[#3a5b66]' : ' bg-[#2c4a56]')}
              >
                {current === i ? 'CURRENT' : 'SELECT'}
              </button>
            </PartCard>
          ) : null
        )}
      </div>
    </div>
  );
}

/** sel: { CPU: 0, GPU: 0, ... } selected part index per category (owned by <App/>). */
export default function Loadout({ sel, onSelect }) {
  const [picking, setPicking] = useState(null);
  const c = D.CPU[sel.CPU];
  const g = D.GPU[sel.GPU];
  const r = D.RAM[sel.RAM];
  const p = D.PSU[sel.PSU];

  return (
    <div>
      <div className="grid grid-cols-[150px_1fr] gap-3.5 max-[620px]:grid-cols-1">
        <RackIllustration />
        <div>
          {KEYS.map((k) => (
            <PartCard key={k} k={k} part={D[k][sel[k]]}>
              <button type="button" onClick={() => setPicking(k)} className={changeCls + ' bg-[#2c4a56]'}>
                &#8644; CHANGE
              </button>
            </PartCard>
          ))}
        </div>
      </div>

      <div className="mt-1.5 border-t border-line">
        <div className="flex justify-between py-2.5 font-bold text-white">
          <span>Type</span>
          <span>Usage / Available</span>
        </div>
        <UsageRow label="CPU FREQUENCY" used={5.8} avail={c[1]} unit="GHZ" base="y" />
        <UsageRow label="CPU CORES" used={2} avail={c[2]} unit="COUNT" base="" />
        <UsageRow label="GPU POWER" used={0.56} avail={g[1]} unit="PF" base="" />
        <UsageRow label="GPU MEMORY" used={0.7} avail={g[2]} unit="TB" base="" />
        <UsageRow label="RAM MEMORY" used={2.9} avail={r[2]} unit="TB" base="" />
        <UsageRow label="PSU POWER" used={c[4] + g[4]} avail={p[1]} unit="KW" base="" />
      </div>

      {picking && (
        <PartPicker
          k={picking}
          current={sel[picking]}
          onPick={(i) => {
            onSelect(picking, i);
            zzt();
            setPicking(null);
          }}
          onClose={() => setPicking(null)}
        />
      )}
    </div>
  );
}
