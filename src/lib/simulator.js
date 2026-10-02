// Pure logic for the basic network lab (PC1, PC2, SW1, R1).
// State shape: { dev: { R1, SW1, PC1, PC2 }, lab: [0|1, 0|1, 0|1] }
// Functions mutate the state object they are given; the caller clones first.

export const BAD = '% Invalid input detected. Type ? for help.';

const IPV = (x) => /^(\d{1,3}\.){3}\d{1,3}$/.test(x);
const I4 = (x) => x.split('.').reduce((a, o) => a * 256 + +o, 0);
const SAME = (a, m, b) => (I4(a) & I4(m)) === (I4(b) & I4(m));

export const HELP = {
  r: 'enable | configure terminal | hostname NAME | interface g0/0 | ip address IP MASK | no shutdown | shutdown | show ip interface brief | show running-config | ping IP | exit | end',
  s: 'enable | configure terminal | hostname NAME | vlan 10 | name NAME | interface f0/1 | switchport mode access | switchport access vlan 10 | show vlan brief | show running-config | ping IP | exit | end',
};
const PCH =
  'ip ADDRESS MASK [GATEWAY]   set the PC address\nipconfig                   show the address\nping IP                    test connectivity\nclear                      clear the screen';

export const LAB_TEXT = [
  'Give PC1 and PC2 addresses in one subnet (e.g. 192.168.10.x /24) and ping each other',
  'Configure R1 g0/0 as 192.168.10.1 255.255.255.0, bring it up, and ping it from a PC',
  'Put both PC ports (f0/1, f0/2) in VLAN 10 on SW1, then ping PC to PC again',
];

export function createSim() {
  const pc = () => ({ t: 'p', ip: '', mk: '', gw: '', log: '' });
  return {
    dev: {
      R1: { t: 'r', h: 'R1', m: 'user', cur: '', ifs: { 'g0/0': { ip: '', mk: '', up: false } }, log: '' },
      SW1: { t: 's', h: 'SW1', m: 'user', cur: '', cv: '', vl: { 1: 'default' }, pv: { 'f0/1': 1, 'f0/2': 1, 'f0/3': 1 }, log: '' },
      PC1: pc(),
      PC2: pc(),
    },
    lab: [0, 0, 0],
  };
}

const addr = (S, k) => {
  const d = S.dev[k];
  if (d.t === 'p') return [d.ip, d.mk];
  const i = d.ifs['g0/0'];
  return i.up ? [i.ip, i.mk] : ['', ''];
};

const vlanOf = (S, k) => S.dev.SW1.pv[k === 'PC1' ? 'f0/1' : k === 'PC2' ? 'f0/2' : 'f0/3'];

function owner(S, ip) {
  for (const k in S.dev) {
    const d = S.dev[k];
    if (d.t === 'p' && d.ip === ip) return k;
    if (d.t === 'r' && d.ifs['g0/0'].up && d.ifs['g0/0'].ip === ip) return k;
  }
}

function labs(S, a, b) {
  const q = [a, b].sort().join();
  if (q === 'PC1,PC2') {
    S.lab[0] = 1;
    if (S.dev.SW1.pv['f0/1'] === 10 && S.dev.SW1.pv['f0/2'] === 10) S.lab[2] = 1;
  }
  if (q === 'PC1,R1' || q === 'PC2,R1') S.lab[1] = 1;
}

function ping(S, k, ip) {
  const pcs = S.dev[k].t === 'p';
  const FAIL = '.....\nSuccess rate is 0 percent (0/5)';
  if (!IPV(ip)) return pcs ? 'Invalid address.' : '% Unrecognized host or address.';
  const [sip, smk] = addr(S, k);
  if (!sip) return pcs ? 'No IP set on ' + k + '. Use: ip <address> <mask>' : '% Interface has no IP address or is down.';
  if (!SAME(sip, smk, ip)) return pcs ? 'Destination host unreachable (different subnet; this lab has no routing)' : FAIL;
  const dst = owner(S, ip);
  if (dst === k || (dst && vlanOf(S, k) === vlanOf(S, dst))) {
    if (dst !== k) labs(S, k, dst);
    return pcs
      ? [1, 2, 3, 4].map(() => 'Reply from ' + ip + ': bytes=32 time<1ms TTL=128').join('\n')
      : '!!!!!\nSuccess rate is 100 percent (5/5)';
  }
  return pcs ? 'Request timed out.\nRequest timed out.\nRequest timed out.\nRequest timed out.' : FAIL;
}

const portOf = (r) =>
  r.replace(/\s+/g, '').replace(/^fastethernet/, 'f').replace(/^gigabitethernet/, 'g').replace(/^fa/, 'f').replace(/^gi/, 'g');

function dev(S, k, c) {
  const d = S.dev[k];
  const w = c.trim().split(/\s+/);
  const a = (w[0] || '').toLowerCase();
  const r = w.slice(1).join(' ').toLowerCase();
  const M = d.m;
  const is = (x, f, n) => x && x.length >= (n || 1) && f.startsWith(x);

  if (!c.trim()) return '';
  if (a === '?' || a === 'help') return HELP[d.t];
  if (is(a, 'ping', 2) && (M === 'user' || M === 'priv')) return ping(S, k, w[1] || '');
  if (a === 'end' && M !== 'user' && M !== 'priv') { d.m = 'priv'; return ''; }
  if (is(a, 'exit', 2)) { d.m = M === 'if' || M === 'vlan' ? 'cfg' : M === 'cfg' ? 'priv' : M; return ''; }

  if ((M === 'user' || M === 'priv') && is(a, 'show', 2)) {
    if (d.t === 'r' && /^ip int\w* br\w*$/.test(r)) {
      const i = d.ifs['g0/0'];
      return (
        'Interface           IP-Address      Status                Protocol\nGigabitEthernet0/0  ' +
        (i.ip || 'unassigned').padEnd(15) + ' ' +
        (i.up ? 'up' : 'administratively down').padEnd(21) + ' ' +
        (i.up ? 'up' : 'down')
      );
    }
    if (d.t === 's' && /^vlan( br\w*)?$/.test(r)) {
      return (
        'VLAN Name       Ports\n' +
        Object.keys(d.vl)
          .map((v) => v.padEnd(5) + d.vl[v].padEnd(11) + Object.keys(d.pv).filter((p) => d.pv[p] == v).map((p) => 'Fa' + p.slice(1)).join(', '))
          .join('\n')
      );
    }
    if (M === 'priv' && /^run\w*$/.test(r)) {
      return (
        'hostname ' + d.h + '\n!\n' +
        (d.t === 'r'
          ? 'interface GigabitEthernet0/0\n ' +
            (d.ifs['g0/0'].ip ? 'ip address ' + d.ifs['g0/0'].ip + ' ' + d.ifs['g0/0'].mk : 'no ip address') +
            '\n ' + (d.ifs['g0/0'].up ? 'no shutdown' : 'shutdown')
          : Object.keys(d.pv)
              .map((p) => 'interface FastEthernet' + p.slice(1) + (d.pv[p] !== 1 ? '\n switchport mode access\n switchport access vlan ' + d.pv[p] : ''))
              .join('\n!\n'))
      );
    }
    return BAD;
  }

  if (M === 'user') { if (is(a, 'enable', 2)) { d.m = 'priv'; return ''; } return BAD; }

  if (M === 'priv') {
    if (is(a, 'configure', 4) && /^t/.test(r)) { d.m = 'cfg'; return 'Enter configuration commands, one per line. End with CNTL/Z.'; }
    if (is(a, 'disable', 3)) { d.m = 'user'; return ''; }
    return BAD;
  }

  if (M === 'cfg') {
    if (a === 'hostname' && w[1]) { d.h = w[1]; return ''; }
    if (is(a, 'interface', 3)) {
      const p = portOf(r);
      if (d.t === 'r' ? p === 'g0/0' : d.pv[p] !== undefined) { d.cur = p; d.m = 'if'; return ''; }
      return BAD;
    }
    if (d.t === 's' && a === 'vlan' && /^\d+$/.test(w[1] || '')) {
      d.vl[w[1]] = d.vl[w[1]] || 'VLAN' + ('000' + w[1]).slice(-4);
      d.cv = w[1];
      d.m = 'vlan';
      return '';
    }
    return BAD;
  }

  if (M === 'vlan') {
    if (a === 'name' && w[1]) { d.vl[d.cv] = w[1]; return ''; }
    return BAD;
  }

  if (M === 'if') {
    if (d.t === 'r') {
      const i = d.ifs[d.cur];
      if (a === 'ip' && is(w[1], 'address', 1) && IPV(w[2] || '') && IPV(w[3] || '')) { i.ip = w[2]; i.mk = w[3]; return ''; }
      if (is(a, 'shutdown', 2)) { i.up = false; return '%LINK-5-CHANGED: Interface GigabitEthernet0/0, changed state to administratively down'; }
      if (a === 'no' && is(w[1], 'shutdown', 2)) { i.up = true; return '%LINK-5-CHANGED: Interface GigabitEthernet0/0, changed state to up'; }
    } else {
      if (a === 'switchport' && w[1] === 'mode' && w[2] === 'access') return '';
      if (a === 'switchport' && w[1] === 'access' && w[2] === 'vlan' && /^\d+$/.test(w[3] || '')) {
        let o = '';
        if (!d.vl[w[3]]) {
          d.vl[w[3]] = 'VLAN' + ('000' + w[3]).slice(-4);
          o = '% Access VLAN does not exist. Creating vlan ' + w[3];
        }
        d.pv[d.cur] = +w[3];
        return o;
      }
    }
    return BAD;
  }
  return BAD;
}

function pcCmd(S, k, c) {
  const d = S.dev[k];
  const w = c.trim().split(/\s+/);
  const a = (w[0] || '').toLowerCase();
  if (!c.trim()) return '';
  if (a === 'ip' && IPV(w[1] || '') && IPV(w[2] || '')) {
    d.ip = w[1]; d.mk = w[2]; d.gw = w[3] || '';
    return 'Address set: ' + w[1] + ' ' + w[2];
  }
  if (a === 'ipconfig') {
    return 'IPv4 Address . . . : ' + (d.ip || 'not set') + '\nSubnet Mask  . . . : ' + (d.mk || 'not set') + '\nDefault Gateway  . : ' + (d.gw || 'not set');
  }
  if (a === 'ping') return ping(S, k, w[1] || '');
  if (a === 'help' || a === '?') return PCH;
  return 'Unknown command. Type help.';
}

/** The CLI prompt for a device, e.g. "R1(config-if)# " or "PC1> ". */
export function prompt(S, k) {
  const d = S.dev[k];
  if (d.t === 'p') return k + '> ';
  return d.h + { user: '>', priv: '#', cfg: '(config)#', if: '(config-if)#', vlan: '(config-vlan)#' }[d.m] + ' ';
}

/** Run one command line on device k, appending to its log. */
export function runCommand(S, k, c) {
  const d = S.dev[k];
  if (c.trim() === 'clear') { d.log = ''; return; }
  const q = prompt(S, k);
  const o = d.t === 'p' ? pcCmd(S, k, c) : dev(S, k, c);
  d.log += q + c + '\n' + (o ? o + '\n' : '');
}

export const labsDone = (S) => S.lab.filter(Boolean).length;
