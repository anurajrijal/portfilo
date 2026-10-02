import { ROADMAP, SKILLS } from "./data";
import { Rows, Tag } from "./components/ui";

/**
 * Every "file" on the desktop.
 *   id    – key used by the dock / windows
 *   name  – file name shown on the desktop and in the window title bar
 *   title – heading inside the window
 *   icon  – optional icon override (cloud | txt | pdf | net | cli); otherwise taken from the extension
 *   hide  – not shown on the desktop (opened from elsewhere)
 *   view  – static content component; apps (map, sim, weather…) are rendered in App.jsx
 *   width – optional window width
 */
export const FILES = [
  {
    id: "about",
    name: "about.txt",
    title: "About me",
    view: () => (
      <>
        <p>
          I&apos;m Anuraj Rijal, studying for the Cisco CCNA (200-301). I build
          and troubleshoot networks in labs: VLANs, routing, ACLs, and wireless.
        </p>
        <p>Replace this with your story and goals.</p>
      </>
    ),
  },
  { id: "map", name: "network_map.app", title: "Lab topology", icon: "net" },
  {
    id: "cisco",
    name: "cisco_certs.info",
    title: "Cisco certifications",
    hide: true,
  },
  {
    id: "sim",
    name: "network_sim.app",
    title: "Network simulator",
    icon: "net",
    width: "min(700px,96vw)",
  },
  { id: "weather", name: "weather.app", title: "Weather", icon: "cloud" },
  {
    id: "load",
    name: "loadout.app",
    title: "Loadout",
    icon: "cli",
    width: "min(880px,96vw)",
  },
  { id: "term", name: "ios_terminal.app", title: "IOS terminal", icon: "cli" },
  {
    id: "subnet",
    name: "subnet_calc.app",
    title: "Subnet calculator",
    icon: "net",
  },
  {
    id: "lab1",
    name: "vlan_lab.pkt",
    title: "VLANs and trunking",
    view: () => (
      <>
        <p>
          Segmented a small office into 3 VLANs, set up 802.1Q trunks and
          inter-VLAN routing (router-on-a-stick).
        </p>
        <Tag>VLAN</Tag>
        <Tag>802.1Q</Tag>
        <Tag>Packet Tracer</Tag>
      </>
    ),
  },
  {
    id: "lab2",
    name: "ospf_lab.pkt",
    title: "OSPF multi-area",
    view: () => (
      <>
        <p>
          Configured single-area OSPF across 4 routers and verified neighbors,
          DR/BDR election and routes.
        </p>
        <Tag>OSPFv2</Tag>
        <Tag>show ip route</Tag>
      </>
    ),
  },
  {
    id: "lab3",
    name: "acl_nat_lab.pkt",
    title: "ACLs and NAT",
    view: () => (
      <>
        <p>
          Wrote standard and extended ACLs, then added PAT so the LAN reaches
          the internet through one public IP.
        </p>
        <Tag>ACL</Tag>
        <Tag>NAT/PAT</Tag>
      </>
    ),
  },
  {
    id: "skills",
    name: "skills.txt",
    title: "CCNA skills",
    view: () => SKILLS.map((s) => <Tag key={s}>{s}</Tag>),
  },
  {
    id: "cert",
    name: "roadmap.pdf",
    title: "Cert roadmap",
    icon: "pdf",
    view: () => <Rows rows={ROADMAP} />,
  },
  {
    id: "contact",
    name: "contact.txt",
    title: "Contact",
    view: () => (
      <>
        <p>
          Email: <a href="anurajrijal78@gmail.com">anurajrijal78@gmail.com</a>
        </p>
        <p>
          <a href="https://www.linkedin.com/in/anurajrijal/?isSelfProfile=true">
            LinkedIn
          </a>{" "}
          &nbsp; <a href="https://github.com/anurajrijal">GitHub</a>
        </p>
      </>
    ),
  },
];

export const FILE_BY_ID = Object.fromEntries(FILES.map((f) => [f.id, f]));
