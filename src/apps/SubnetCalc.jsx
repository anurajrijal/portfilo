import { useMemo, useState } from 'react';
import { calcSubnet } from '../lib/subnet';
import { Rows, inputCls } from '../components/ui';

export default function SubnetCalc() {
  const [value, setValue] = useState('192.168.10.37/26');
  const result = useMemo(() => calcSubnet(value), [value]);

  return (
    <>
      <p>Practice subnetting: enter an IPv4 address with a prefix length.</p>
      <input
        aria-label="IPv4 address with prefix"
        autoComplete="off"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={inputCls}
      />
      <div>
        {result.error ? <p className="text-warn">{result.error}</p> : <Rows rows={result.rows} />}
      </div>
    </>
  );
}
