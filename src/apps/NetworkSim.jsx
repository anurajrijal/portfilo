import { useEffect, useRef, useState } from 'react';
import { LAB_TEXT, prompt } from '../lib/simulator';
import { tick } from '../lib/audio';
import { Pre, SmallButton, TabButton, Tabs, inputCls } from '../components/ui';

export default function NetworkSim({ sim, onCommand, onReset }) {
  const [cur, setCur] = useState('PC1');
  const [value, setValue] = useState('');
  const inputRef = useRef(null);
  const outRef = useRef(null);
  const d = sim.dev[cur];

  // After every redraw: scroll output to the bottom and keep the input focused.
  useEffect(() => {
    outRef.current.scrollTop = 1e6;
    inputRef.current.focus();
  }, [sim, cur]);

  const onKeyDown = (e) => {
    if (e.key !== 'Enter') return;
    const c = value;
    setValue('');
    tick(0.06, 1500);
    onCommand(cur, c);
  };

  return (
    <>
      <p>
        Basic lab: PC1 and PC2 connect to switch SW1 (ports f0/1 and f0/2). Router R1 connects to SW1 (f0/3). Pick a
        device and type commands.
      </p>

      <Tabs>
        {Object.keys(sim.dev).map((k) => (
          <TabButton key={k} active={k === cur} onClick={() => setCur(k)}>
            {k}
          </TabButton>
        ))}
      </Tabs>

      <Pre
        ref={outRef}
        className="mb-2 h-60 overflow-auto rounded-md border border-line bg-[#050a14] p-2.5 text-[13px]"
      >
        {d.log || 'Type help to see commands for ' + cur + '.'}
      </Pre>

      <div className="flex items-center gap-2">
        <span className="whitespace-nowrap text-ok">{prompt(sim, cur)}</span>
        <input
          ref={inputRef}
          aria-label="Device command"
          autoComplete="off"
          spellCheck={false}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          className={inputCls + ' min-w-0'}
        />
      </div>

      <div className="mt-3">
        {LAB_TEXT.map((t, i) => (
          <div key={i} className="my-1.5 flex gap-2 text-[13px]">
            <b className={sim.lab[i] ? 'text-ok' : 'text-dim'}>{sim.lab[i] ? '✓' : '○'}</b>
            <span>
              Lab {i + 1}: {t}
            </span>
          </div>
        ))}
      </div>

      <SmallButton className="mt-1.5" onClick={onReset}>
        Reset lab
      </SmallButton>
    </>
  );
}
