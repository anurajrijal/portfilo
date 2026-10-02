// Small shared building blocks.
import { forwardRef } from 'react';

export const inputCls =
  'w-full rounded-md border border-line bg-well px-2.5 py-2 text-ink focus:outline focus:outline-1 focus:outline-hi max-[700px]:text-base';

const swCls = 'rounded-md border border-line bg-panel px-2.5 py-1 text-xs text-hi';

export const Tag = ({ children }) => (
  <span className="mb-1.5 mr-1.5 inline-block rounded border border-line px-2 py-px text-xs text-warn">{children}</span>
);

export const Rows = ({ rows }) => (
  <table className="mt-2.5 w-full border-collapse text-[13px]">
    <tbody>
      {rows.map(([a, b]) => (
        <tr key={a}>
          <td className="border-b border-line px-2 py-1 text-dim">{a}</td>
          <td className="border-b border-line px-2 py-1 text-ink">{b}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export const Tabs = ({ children }) => <div className="mb-2.5 flex gap-2">{children}</div>;

export const TabButton = ({ active, onClick, children }) => (
  <button
    type="button"
    aria-pressed={active}
    onClick={onClick}
    className={swCls + ' aria-pressed:bg-hi aria-pressed:text-[#06121b]'}
  >
    {children}
  </button>
);

export const SmallButton = ({ className = '', ...props }) => (
  <button type="button" className={swCls + ' ' + className} {...props} />
);

export const Pre = forwardRef(function Pre({ className = '', ...props }, ref) {
  return <pre ref={ref} className={'m-0 whitespace-pre-wrap [word-break:break-word] ' + className} {...props} />;
});
