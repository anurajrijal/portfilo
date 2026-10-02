/** Parse "a.b.c.d/p" and return { rows } or { error }. */
export function calcSubnet(value) {
  const m = value.trim().match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\/(\d{1,2})$/);
  if (!m) return { error: 'Enter an address like 192.168.10.37/26' };
  const o = m.slice(1, 5).map(Number);
  const p = +m[5];
  if (o.some((x) => x > 255) || p > 32) return { error: 'Octets must be 0-255 and prefix 0-32.' };

  const ip = ((o[0] << 24) | (o[1] << 16) | (o[2] << 8) | o[3]) >>> 0;
  const mask = p ? (0xffffffff << (32 - p)) >>> 0 : 0;
  const net = (ip & mask) >>> 0;
  const bc = (net | ~mask) >>> 0;
  const d = (n) => [n >>> 24, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join('.');
  const hosts = p >= 31 ? (p === 32 ? 1 : 2) : Math.pow(2, 32 - p) - 2;

  return {
    rows: [
      ['Network', d(net) + '/' + p],
      ['Mask', d(mask)],
      ['Broadcast', d(bc)],
      ['First host', p < 31 ? d(net + 1) : '-'],
      ['Last host', p < 31 ? d(bc - 1) : '-'],
      ['Usable hosts', hosts],
    ],
  };
}
