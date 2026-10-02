// ---- EDIT YOUR CONTENT HERE ----

// Sample weather shown until live data loads (icon: storm | rain | cloud | clear; dir = wind degrees)
export const WX_DEFAULT = { temp: 4, cond: 'Thunderstorm', icon: 'storm', humidity: 89, pressure: 750, wind: 41, dir: 200, pollution: 'Moderate', visibility: 3 };
// Optional fixed location, used only if the viewer blocks location access
export const WX_LAT = null;
export const WX_LON = null;

// Your CCNA exam day (YYYY-MM-DD)
export const EXAM_DATE = '2027-01-15';

export const SKILLS = [
  'IPv4/IPv6 addressing', 'Subnetting/VLSM', 'VLANs/STP', 'OSPF/static routing', 'ACLs/NAT',
  'DHCP/DNS', 'Wireless basics', 'Network security basics', 'Automation intro',
];

export const ROADMAP = [
  ['Done', 'Networking fundamentals, subnetting'],
  ['Now', 'Routing, switching, ACLs'],
  ['Next', 'CCNA 200-301 exam, then CCNP ENCOR'],
];

// ---- Network map ----
export const NODES = {
  R1: { x: 250, y: 40, s: 'r', d: 'Router R1 – gateway, 192.168.0.1/24 on Gi0/0, OSPF area 0, NAT to ISP.' },
  SW1: { x: 130, y: 130, s: 's', d: 'Switch SW1 – VLAN 10 (Staff), trunk to R1 on Gi0/1.' },
  SW2: { x: 370, y: 130, s: 's', d: 'Switch SW2 – VLAN 20 (Servers), VLAN 30 (Guest), trunk to R1.' },
  PC1: { x: 60, y: 215, s: 'p', d: 'PC1 – 192.168.10.11/24, VLAN 10, gateway 192.168.10.1.' },
  PC2: { x: 200, y: 215, s: 'p', d: 'PC2 – 192.168.10.12/24, VLAN 10.' },
  SRV: { x: 320, y: 215, s: 'p', d: 'Server – 192.168.20.10/24, VLAN 20, runs DHCP and DNS.' },
  AP: { x: 440, y: 215, s: 'p', d: 'Wireless AP – VLAN 30 guest SSID, WPA2.' },
};
export const LINKS = [['R1', 'SW1'], ['R1', 'SW2'], ['SW1', 'PC1'], ['SW1', 'PC2'], ['SW2', 'SRV'], ['SW2', 'AP']];

// ---- IOS terminal ----
export const CMD = {
  help: 'Commands: show ip interface brief, show vlan brief, show ip route, show version, ping 192.168.10.1, whoami, clear',
  'show ip interface brief': 'Interface      IP-Address      Status  Protocol\nGi0/0          192.168.0.1     up      up\nGi0/1.10       192.168.10.1    up      up\nGi0/1.20       192.168.20.1    up      up',
  'show vlan brief': 'VLAN Name     Status  Ports\n10   Staff    active  Fa0/1-12\n20   Servers  active  Fa0/13-20\n30   Guest    active  Fa0/21-24',
  'show ip route': 'O  192.168.30.0/24 [110/2] via 192.168.0.2\nC  192.168.10.0/24 is directly connected, Gi0/1.10\nC  192.168.20.0/24 is directly connected, Gi0/1.20\nS* 0.0.0.0/0 via 203.0.113.1',
  'show version': 'Cisco IOS Software (simulated)\nUptime: 42 days\nCertification status: CCNA in progress',
  'ping 192.168.10.1': '!!!!!\nSuccess rate is 100 percent (5/5)',
  whoami: 'your_handle – network engineer in training',
};

// ---- Cisco certification info ----
export const CI = {
  CCNA: [['Level', 'Associate'], ['Exam', '200-301 CCNA v1.1 (one exam)'], ['Format', '120 minutes, about 100-120 questions'], ['Cost', '$300 USD plus tax'], ['Passing score', 'Cisco does not publish it; about 825/1000 is commonly reported'], ['Topics', 'Network fundamentals, network access, IP connectivity, IP services, security fundamentals, automation and programmability'], ['Prerequisites', 'None required'], ['Valid for', '3 years; renew with Continuing Education credits or a qualifying exam'], ['Retake', 'Wait 5 calendar days after a fail; full fee again'], ['Next step', 'CCNP']],
  CCNP: [['Level', 'Professional'], ['Exams', '2: one core exam plus one concentration exam of your choice'], ['Core exam (Enterprise)', '350-401 ENCOR'], ['Cost', 'About $400 core + $300 concentration = about $700'], ['Tracks', 'Enterprise, Data Center, Security, Service Provider, Automation (renamed from DevNet Professional on Feb 3, 2026)'], ['Prerequisites', 'None formally required; Cisco recommends solid enterprise experience'], ['Valid for', '3 years'], ['Bonus', 'The core exam also counts as the written exam for the matching CCIE'], ['Next step', 'CCIE']],
  CCIE: [['Level', 'Expert (highest Cisco level)'], ['Exams', '2: a core (written) exam plus a hands-on lab exam'], ['Core exam', 'About $400, 120 minutes; same core as CCNP'], ['Lab exam', '8 hours building and troubleshooting a live network'], ['Lab cost', '$1,600 at a test center or BYOD mobile lab; $1,900 mobile lab with Cisco kit'], ['Fees (2026)', 'Lab vouchers were retired in Feb 2026 and replaced by Cisco Learning Credits (about $100 each); rescheduling reportedly costs $500'], ['Tracks', 'Enterprise Infrastructure, Enterprise Wireless, Security, Data Center, Service Provider, Automation'], ['Prerequisites', 'Pass the core exam first; several years of hands-on experience typical'], ['Valid for', '3 years']],
};

// ---- Loadout (CPU / GPU / RAM / PSU) ----
export const L = {
  CPU: ['Frequency GHz', 'Cores count', 'Vulnerability %', 'Power consuming kW'],
  GPU: ['Power PFLOPS', 'Memory TB', 'Vulnerability %', 'Power consuming kW'],
  RAM: ['Frequency GHz', 'Memory TB', 'Vulnerability %'],
  PSU: ['Power kW', 'Protection %', 'Vulnerability %'],
};
export const D = {
  CPU: [['M-Mate J12-40', 7.2, 8, 0, 0.6], ['Quanta X9-20', 4.8, 4, 2, 0.4], ['Helix R16-80', 9.1, 16, 1, 1.1]],
  GPU: [['OmniPix 23.2', 0.88, 1, 0, 1.2], ['PixCore 11', 0.4, 0.5, 1, 0.7], ['Vortex 40', 1.6, 2, 0, 2.1]],
  RAM: [['Emerald H2S9', 0.77, 4, 0], ['Jade L4', 0.5, 2, 1], ['Onyx X7', 1.1, 8, 0]],
  PSU: [['1Y Series 1550 2kW', 2, 5, 0], ['2Z Series 900 1kW', 1, 3, 1], ['3X Series 2400 3kW', 3, 7, 0]],
};
