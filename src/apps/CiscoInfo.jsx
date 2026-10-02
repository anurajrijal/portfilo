import { useState } from 'react';
import { CI } from '../data';
import { Rows, TabButton, Tabs } from '../components/ui';

export default function CiscoInfo() {
  const [tab, setTab] = useState('CCNA');

  return (
    <>
      <Tabs>
        {Object.keys(CI).map((k) => (
          <TabButton key={k} active={k === tab} onClick={() => setTab(k)}>
            {k}
          </TabButton>
        ))}
      </Tabs>
      <Rows rows={CI[tab]} />
      <p className="mt-3 text-xs text-dim">
        Path: CCST (optional entry) → CCNA → CCNP → CCIE. Prices are from 2026 third-party reports; confirm on
        cisco.com/go/certifications before booking.
      </p>
    </>
  );
}
