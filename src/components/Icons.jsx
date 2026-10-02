// Desktop file icons (46x54) and dock icons (24x24).

const FILE_PATHS = {
  cloud: (
    <>
      <path d="M12 40a9 9 0 0 1 2-17 13 13 0 0 1 25 3 8 8 0 0 1-1 14z" />
      <path d="M16 46l-3 5M24 46l-3 5M32 46l-3 5" />
    </>
  ),
  txt: (
    <>
      <path d="M8 3h22l9 9v39H8z" />
      <path d="M14 22h20M14 30h20M14 38h20" />
    </>
  ),
  pdf: (
    <>
      <path d="M8 3h22l9 9v39H8z" />
      <path d="M30 3v9h9" />
      <path d="M14 30h14M14 38h20" />
    </>
  ),
  net: (
    <>
      <circle cx="23" cy="12" r="5" />
      <circle cx="9" cy="40" r="5" />
      <circle cx="37" cy="40" r="5" />
      <path d="M20 16L11 36M26 16l9 20M14 40h18" />
    </>
  ),
  cli: (
    <>
      <rect x="5" y="10" width="36" height="32" />
      <path d="M11 20l7 6-7 6M22 33h10" />
    </>
  ),
};

export function FileIcon({ type }) {
  return (
    <svg
      viewBox="0 0 46 54"
      aria-hidden="true"
      className="mx-auto mb-1.5 block h-[54px] w-[46px] fill-none stroke-hi stroke-[1.5]"
    >
      {FILE_PATHS[type] || FILE_PATHS.txt}
    </svg>
  );
}

export const DOCK_ICONS = {
  about: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
    </>
  ),
  map: (
    <>
      <circle cx="12" cy="5" r="2.5" />
      <circle cx="5" cy="19" r="2.5" />
      <circle cx="19" cy="19" r="2.5" />
      <path d="M11 7.5L6 16.5M13 7.5l5 9M8 19h8" />
    </>
  ),
  term: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="M7 10l3 2-3 2M12 15h5" />
    </>
  ),
  sim: (
    <>
      <rect x="3" y="13" width="18" height="6" rx="1" />
      <path d="M7 16h.01M11 16h.01M7 13V7M17 13V7" />
    </>
  ),
  load: (
    <>
      <rect x="2" y="7" width="17" height="10" rx="1" />
      <circle cx="9" cy="12" r="3" />
      <path d="M19 9h3v6h-3M5 17v3M13 10h4M13 14h4" />
    </>
  ),
  weather: (
    <>
      <circle cx="16" cy="8" r="3" />
      <path d="M16 2v1.5M21.5 8H23M20 4l1-1M7 20a4 4 0 0 1 0-8 5 5 0 0 1 9.5 1.5A3.2 3.2 0 0 1 16 20z" />
    </>
  ),
  contact: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
};
