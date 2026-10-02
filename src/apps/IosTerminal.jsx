import { useEffect, useRef, useState } from 'react';
import { CMD } from '../data';
import { snd } from '../lib/audio';
import { Pre, inputCls } from '../components/ui';

export default function IosTerminal() {
  const [lines, setLines] = useState([{ kind: 'hint' }]);
  const [value, setValue] = useState('');
  const outRef = useRef(null);

  useEffect(() => {
    outRef.current.scrollTop = outRef.current.scrollHeight;
  }, [lines]);

  const onKeyDown = (e) => {
    if (e.key !== 'Enter') return;
    const c = value.trim().toLowerCase();
    setValue('');
    snd(660, 0.05);
    if (c === 'clear') {
      setLines([]);
      return;
    }
    const out = Object.hasOwn(CMD, c) ? CMD[c] : '% Invalid input. Type help.';
    setLines((l) => [...l, { kind: 'cmd', text: 'R1#' + c }, { kind: 'out', text: out }]);
  };

  return (
    <>
      <div
        ref={outRef}
        className="mb-2 h-[260px] overflow-auto rounded-md border border-line bg-well p-2.5 text-[13px]"
      >
        {lines.map((l, i) =>
          l.kind === 'hint' ? (
            <Pre key={i}>Type <b>help</b> to see commands.</Pre>
          ) : (
            <Pre key={i} className={l.kind === 'cmd' ? 'text-ok' : ''}>{l.text}</Pre>
          )
        )}
      </div>
      <input
        aria-label="IOS command"
        placeholder="R1# type a command"
        autoComplete="off"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        className={inputCls}
      />
    </>
  );
}
