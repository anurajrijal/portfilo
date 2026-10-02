import { useEffect, useRef } from 'react';

export default function Window({ title, heading, width, onClose, children }) {
  const bodyRef = useRef(null);
  const closeRef = useRef(null);

  // Focus the first input in the window, otherwise the close button.
  useEffect(() => {
    const input = bodyRef.current.querySelector('input');
    (input || closeRef.current).focus();
  }, []);

  // Escape closes the window.
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="wt"
      style={{ width: width || 'min(620px,94vw)' }}
      className="fixed inset-x-0 bottom-[90px] top-[70px] m-auto h-fit max-h-[calc(100%-170px)] overflow-auto rounded-[10px] border border-hi bg-night2 shadow-win"
    >
      <div className="sticky top-0 z-[2] flex items-center justify-between border-b border-line bg-night2 px-3.5 py-2.5">
        <span id="wt">{title}</span>
        <button
          ref={closeRef}
          type="button"
          aria-label="Close window"
          onClick={onClose}
          className="text-[22px] leading-none text-ink"
        >
          ×
        </button>
      </div>
      <div ref={bodyRef} className="px-[18px] pb-5 pt-4 [&_a]:text-hi [&_p]:mb-3 [&_p]:max-w-[62ch]">
        <h2 className="mb-2 text-xl text-hi">{heading}</h2>
        {children}
      </div>
    </div>
  );
}
