import { DOCK_ICONS } from './Icons';

const ITEMS = [
  ['about', 'About'],
  ['map', 'Network map'],
  ['term', 'IOS terminal'],
  ['sim', 'Network simulator'],
  ['load', 'Loadout'],
  ['weather', 'Weather'],
  ['contact', 'Contact'],
];

export default function Dock({ onOpen }) {
  return (
    <nav
      aria-label="Quick launch"
      style={{ bottom: 'calc(14px + env(safe-area-inset-bottom, 0px))' }}
      className="fixed left-1/2 flex -translate-x-1/2 gap-2.5 rounded-xl border border-line bg-[#0a1320ee] p-2.5 max-[420px]:gap-1.5 max-[420px]:p-2"
    >
      {ITEMS.map(([id, label]) => (
        <button
          key={id}
          type="button"
          data-hover
          aria-label={label}
          title={label}
          onClick={(e) => onOpen(id, e.currentTarget)}
          className="grid h-11 min-w-[44px] place-items-center rounded-lg border border-line bg-panel px-2.5 text-[13px] text-hi hover:border-hi focus-visible:border-hi max-[420px]:min-w-[38px] max-[420px]:px-1.5"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-6 w-6 fill-none stroke-current stroke-[1.6] [stroke-linecap:round] [stroke-linejoin:round]"
          >
            {DOCK_ICONS[id]}
          </svg>
        </button>
      ))}
    </nav>
  );
}
