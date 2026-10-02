import { useCallback, useEffect, useRef, useState } from 'react';
import TopBar from './components/TopBar';
import ProfileCard from './components/ProfileCard';
import Desktop from './components/Desktop';
import Dock from './components/Dock';
import Window from './components/Window';
import NetworkMap from './apps/NetworkMap';
import IosTerminal from './apps/IosTerminal';
import SubnetCalc from './apps/SubnetCalc';
import NetworkSim from './apps/NetworkSim';
import Weather from './apps/Weather';
import Loadout from './apps/Loadout';
import CiscoInfo from './apps/CiscoInfo';
import { FILES, FILE_BY_ID } from './content';
import { WX_DEFAULT } from './data';
import { createSim, labsDone, runCommand } from './lib/simulator';
import { setSound, tick, zzt } from './lib/audio';

export default function App() {
  const [openId, setOpenId] = useState(null);
  const lastFocus = useRef(null); // element to re-focus when the window closes

  // State that must survive closing/reopening a window lives here.
  const [sim, setSim] = useState(createSim);
  const [loadout, setLoadout] = useState({ CPU: 0, GPU: 0, RAM: 0, PSU: 0 });
  const [wx, setWx] = useState({ ...WX_DEFAULT, live: false });
  const [soundOn, setSoundOn] = useState(false);

  const open = useCallback((id, fromEl) => {
    lastFocus.current = fromEl;
    zzt();
    setOpenId(id);
  }, []);

  const close = useCallback(() => {
    setOpenId(null);
    lastFocus.current?.focus();
  }, []);

  const toggleSound = () => {
    const next = !soundOn;
    setSound(next); // must run inside the click handler (browser audio policy)
    setSoundOn(next);
  };

  const onCommand = useCallback(
    (device, line) =>
      setSim((prev) => {
        const next = structuredClone(prev);
        runCommand(next, device, line);
        return next;
      }),
    []
  );
  const resetSim = useCallback(() => setSim(createSim()), []);
  const selectPart = useCallback((k, i) => setLoadout((s) => ({ ...s, [k]: i })), []);

  // Global UI sounds: click tick on buttons / map nodes, hover tick on icons, dock and map nodes.
  useEffect(() => {
    const onClick = (e) => e.target.closest('button,[data-node]') && e.target.id !== 'snd' && tick(0.08, 1800);
    const onOver = (e) => e.target.closest('[data-hover]') && tick(0.02, 5000);
    document.addEventListener('click', onClick, true);
    document.addEventListener('mouseover', onOver);
    return () => {
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('mouseover', onOver);
    };
  }, []);

  const file = openId ? FILE_BY_ID[openId] : null;

  const renderBody = () => {
    switch (openId) {
      case 'map': return <NetworkMap />;
      case 'cisco': return <CiscoInfo />;
      case 'sim': return <NetworkSim sim={sim} onCommand={onCommand} onReset={resetSim} />;
      case 'weather': return <Weather wx={wx} setWx={setWx} />;
      case 'load': return <Loadout sel={loadout} onSelect={selectPart} />;
      case 'term': return <IosTerminal />;
      case 'subnet': return <SubnetCalc />;
      default: {
        const View = file.view;
        return <View />;
      }
    }
  };

  return (
    <>
      {/* CRT scanlines + vignette, and the slow moving scan bar */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-50 bg-crt" />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 -top-40 z-50 h-40 bg-scanbar motion-safe:animate-scan"
      />

      <TopBar soundOn={soundOn} onToggleSound={toggleSound} />
      <ProfileCard labsDone={labsDone(sim)} onInfo={(el) => open('cisco', el)} />
      <Desktop files={FILES.filter((f) => !f.hide)} onOpen={open} />

      {file && (
        <Window
          key={openId}
          title={file.name + (openId === 'weather' && !wx.live ? ' (sample data)' : '')}
          heading={file.title}
          width={file.width}
          onClose={close}
        >
          {renderBody()}
        </Window>
      )}

      <Dock onOpen={open} />
    </>
  );
}
