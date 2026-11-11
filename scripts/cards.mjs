// Writes the stat strip, the project cards and the divider of the profile README, each in a light
// and a dark version, in the look of sanam.me. Run after editing: node scripts/cards.mjs.
// A card carries its picture inside the SVG as a data URI, because an SVG shown through <img>
// may not load other files.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const themes = {
  light: { card: '#fbfaf7', ink: '#18181b', muted: '#52525b', line: '#d6d3cd', accent: '#b45309', soft: '#f4ebe4' },
  dark: { card: '#11161d', ink: '#fafafa', muted: '#a1a1aa', line: '#30363d', accent: '#fbbf24', soft: '#2a2113' },
};
const tones = { live: '#22c55e', beta: '#f59e0b', building: '#60a5fa', client: '#a1a1aa' };
const FONT = 'Inter, "Segoe UI", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif';
const MONO = 'ui-monospace, SFMono-Regular, Consolas, Menlo, monospace';

const asset = (path) => new URL(`../assets/${path}`, import.meta.url);
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const dataUri = (path, type) => `data:${type};base64,${readFileSync(asset(path)).toString('base64')}`;

/** Breaks text into lines of about `width` units; a letter averages a little over half its size. */
function wrap(text, width, size) {
  const max = Math.floor(width / (size * 0.53));
  const lines = [''];
  for (const word of text.split(' ')) {
    const line = lines.at(-1);
    if (line && line.length + word.length + 1 > max) lines.push(word);
    else lines[lines.length - 1] = line ? `${line} ${word}` : word;
  }
  return lines;
}
const lines = (text, x, y, width, size, gap, cls) =>
  wrap(text, width, size).map((l, i) => `<text class="${cls}" x="${x}" y="${y + i * gap}">${esc(l)}</text>`).join('');

const style = (t) => `<style>
    text { font-family: ${FONT}; }
    .name { font-size: 27px; font-weight: 700; letter-spacing: -.4px; fill: ${t.ink}; }
    .kick { font-size: 16px; font-weight: 600; fill: ${t.accent}; }
    .status { font-size: 16px; fill: ${t.muted}; }
    .body { font-size: 18px; fill: ${t.muted}; }
    .tech { font-family: ${MONO}; font-size: 14.5px; fill: ${t.accent}; }
    .num { font-size: 34px; font-weight: 700; letter-spacing: -.6px; fill: ${t.ink}; }
    .lab { font-size: 15px; fill: ${t.muted}; }
  </style>`;

const projects = [
  {
    id: 'nepdate', wide: true, kick: 'The NepDate family', name: 'NepDate', tone: 'beta', status: '1.0 release candidate',
    text: 'Bikram Sambat, the Nepali calendar, wherever software needs it. One dataset and one spec, so every language gives the same day for the same date. I wrote the ports for 13 languages and co-maintain the C# original by Raju Prasai.',
    tech: 'C# · TypeScript · Python · PHP · Java · Dart · Kotlin · Go · Swift · C++ · C · Rust · Ruby · Zig',
  },
  {
    id: 'patro', name: 'NepDate Patro', logo: 'patro.svg', tone: 'live', status: 'Live',
    text: 'The Nepali calendar in a browser: every month from BS 1901 to 2199, with tithi, holidays and events, in Nepali and English.',
    tech: 'Astro · TypeScript · Cloudflare Workers',
  },
  {
    id: 'mitibar', name: 'MitiBar', logo: 'mitibar.webp', tone: 'live', status: 'v1.1.0 for Windows, macOS and Linux',
    text: 'The Nepali date on your desktop: in the tray or menu bar, in a bar above the Windows taskbar, the whole month one click away.',
    tech: 'Rust',
  },
  {
    id: 'mobile', name: 'Patro for Android and iPhone', logo: 'patro.svg', tone: 'beta', status: 'Android in closed beta, iPhone in progress',
    text: 'A calendar app with home and lock screen widgets, a festival list and a date converter. No ads, no account, no network permission.',
    tech: 'Kotlin · Jetpack Compose · Swift · SwiftUI',
  },
  {
    id: 'sluice', name: 'Sluice', logo: 'sluice.svg', tone: 'building', status: 'v0.1.0, working toward 1.0',
    text: 'Send big files straight to another computer. Every block is checked as it lands, transfers resume, and nothing is stored in between.',
    tech: 'Rust · QUIC · BLAKE3',
  },
  {
    id: 'curioflux', name: 'Curioflux', logo: 'curioflux.svg', tone: 'beta', status: 'In daily use, open source later',
    text: 'A self-hosted knowledge base. Send a link from your phone; it archives the page, links it to what you saved, and answers coding agents over MCP.',
    tech: 'C# · SQLite FTS5 · React · MCP',
  },
  {
    id: 'batosathi', name: 'Batosathi', logo: 'batosathi.svg', tone: 'beta', status: 'Closed beta',
    text: 'Road and weather alerts for a trip across Nepal. It watches your route and dates, and messages you when the answer changes.',
    tech: 'C# · ASP.NET Core · PostgreSQL',
  },
  {
    id: 'rsservice', name: 'RsService', tone: 'client', status: 'Client work',
    text: 'Service centre platform: service requests, customers, RMA, warranty and revenue reports.',
    tech: 'C# · ASP.NET Core · SQL Server',
  },
  {
    id: 'lms', name: 'LMS', tone: 'client', status: 'Client work',
    text: 'Learning management system with protected video and S3 storage.',
    tech: 'C# · ASP.NET Core · PostgreSQL · Redis · S3 · Docker',
  },
];

const logoType = (file) => (file.endsWith('.svg') ? 'image/svg+xml' : 'image/webp');

function card(p, t, theme) {
  const W = 600, H = 560, IMG = 315;
  const shot = dataUri(`projects/${p.id}-${theme}.webp`, 'image/webp');
  const nameX = p.logo ? 62 : 28;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="t d">
  <title id="t">${esc(p.name)}</title>
  <desc id="d">${esc(`${p.status}. ${p.text} ${p.tech}`)}</desc>
  ${style(t)}
  <clipPath id="c"><rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="18"/></clipPath>
  <rect x=".75" y=".75" width="${W - 1.5}" height="${H - 1.5}" rx="18" fill="${t.card}"/>
  <image href="${shot}" x="0" y="0" width="${W}" height="${IMG}" preserveAspectRatio="xMidYMin slice" clip-path="url(#c)"/>
  <path d="M0 ${IMG}H${W}" stroke="${t.line}"/>
  ${p.logo ? `<image href="${dataUri(`logos/${p.logo}`, logoType(p.logo))}" x="28" y="${IMG + 22}" width="26" height="26"/>` : ''}
  <text class="name" x="${nameX}" y="${IMG + 44}">${esc(p.name)}</text>
  <circle cx="34" cy="${IMG + 72}" r="5" fill="${tones[p.tone]}"/>
  <text class="status" x="48" y="${IMG + 78}">${esc(p.status)}</text>
  ${lines(p.text, 28, IMG + 114, W - 56, 18, 27, 'body')}
  <text class="tech" x="28" y="${H - 26}">${esc(p.tech)}</text>
  <rect x=".75" y=".75" width="${W - 1.5}" height="${H - 1.5}" rx="18" fill="none" stroke="${t.line}" stroke-width="1.5"/>
</svg>
`;
}

function wideCard(p, t, theme) {
  const W = 1220, H = 400, IMGX = 610;
  const shot = dataUri(`projects/${p.id}-${theme}.webp`, 'image/webp');
  const text = wrap(p.text, IMGX - 96, 18);
  const techY = 166 + text.length * 27 + 16;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="t d">
  <title id="t">${esc(p.name)}</title>
  <desc id="d">${esc(`${p.status}. ${p.text} ${p.tech}`)}</desc>
  ${style(t)}
  <clipPath id="c"><rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="18"/></clipPath>
  <rect x=".75" y=".75" width="${W - 1.5}" height="${H - 1.5}" rx="18" fill="${t.card}"/>
  <image href="${shot}" x="${IMGX}" y="0" width="${W - IMGX}" height="${H}" preserveAspectRatio="xMinYMin slice" clip-path="url(#c)"/>
  <path d="M${IMGX} 0V${H}" stroke="${t.line}"/>
  <text class="kick" x="48" y="62">${esc(p.kick)}</text>
  <image href="${dataUri('logos/nepdate.svg', 'image/svg+xml')}" x="48" y="80" width="34" height="34"/>
  <text class="name" x="94" y="108" style="font-size:36px">${esc(p.name)}</text>
  <circle cx="54" cy="134" r="5" fill="${tones[p.tone]}"/>
  <text class="status" x="68" y="140">${esc(p.status)}</text>
  ${text.map((l, i) => `<text class="body" x="48" y="${176 + i * 27}">${esc(l)}</text>`).join('')}
  ${lines(p.tech, 48, techY + 10, IMGX - 96, 14.5, 23, 'tech')}
  <rect x=".75" y=".75" width="${W - 1.5}" height="${H - 1.5}" rx="18" fill="none" stroke="${t.line}" stroke-width="1.5"/>
</svg>
`;
}

// The same four numbers as the hero of sanam.me. The contribution count comes from the graph's
// own data, so the two never disagree.
function stats(t, total) {
  const items = [
    ['7 yrs', 'building and running', 'production systems'],
    ['13', 'languages I have', 'written NepDate in'],
    ['60', 'open source', 'repositories'],
    [total, 'contributions on GitHub', 'in the last year'],
  ];
  const W = 1220, H = 150, col = W / items.length;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="t">
  <title id="t">${esc(items.map((i) => `${i[0]} ${i[1]} ${i[2]}`).join('. '))}</title>
  ${style(t)}
  <path d="M0 1H${W}M0 ${H - 1}H${W}" stroke="${t.line}"/>
  ${items.map(([n, a, b], i) => `${i ? `<path d="M${i * col} 28V${H - 28}" stroke="${t.line}"/>` : ''}
  <text class="num" x="${i * col + (i ? 36 : 4)}" y="62">${esc(n)}</text>
  <text class="lab" x="${i * col + (i ? 36 : 4)}" y="92">${a}</text>
  <text class="lab" x="${i * col + (i ? 36 : 4)}" y="113">${b}</text>`).join('')}
</svg>
`;
}

// The wave under the site's header, as the rule above the sign-off.
function divider(t) {
  const wave = (from, to) => `M${from} 10 ` + Array.from({ length: (to - from) / 24 }, (_, i) => `q12 ${i % 2 ? 7 : -7} 24 0`).join(' ');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="20" viewBox="0 0 1200 20" role="presentation">
  <path d="${wave(0, 1200)}" fill="none" stroke="${t.line}" stroke-width="1.5"/>
  <path d="${wave(384, 816)}" fill="none" stroke="${t.accent}" stroke-width="2" stroke-linecap="round"/>
</svg>
`;
}

// "What I work with" on sanam.me: three groups that carry the work, then the rest of the toolbox.
// Icons drawn in one dark colour are inverted on the dark version, as the site does.
const tech = {
  csharp: 'C#', dotnet: '.NET', redis: 'Redis', rabbitmq: 'RabbitMQ', docker: 'Docker', sqlserver: 'SQL Server', postgresql: 'PostgreSQL',
  opensearch: 'OpenSearch', rust: 'Rust', typescript: 'TypeScript', kotlin: 'Kotlin', swift: 'Swift', astro: 'Astro', javascript: 'JavaScript',
  react: 'React', nextjs: 'Next.js', tailwind: 'Tailwind CSS', html: 'HTML', css: 'CSS', shadcn: 'shadcn/ui', python: 'Python', go: 'Go',
  elasticsearch: 'Elasticsearch', opentelemetry: 'OpenTelemetry', grafana: 'Grafana', nginx: 'Nginx', linux: 'Linux', windows: 'Windows',
  azure: 'Azure', cloudflare: 'Cloudflare', githubactions: 'GitHub Actions', git: 'Git', playwright: 'Playwright', stripe: 'Stripe',
  sqlite: 'SQLite', visualstudio: 'Visual Studio', libreoffice: 'LibreOffice',
};
const mono = new Set(['rust', 'astro', 'linux', 'shadcn']);
const groups = [
  { title: 'Backend and distributed systems', note: 'Multi-region architecture, caching and message queues that keep a platform running.', keys: ['csharp', 'dotnet', 'redis', 'rabbitmq', 'docker'] },
  { title: 'Databases and search', note: 'Schema, indexes and query plans first; a search engine when the database is the wrong tool.', keys: ['sqlserver', 'postgresql', 'opensearch'] },
  { title: 'Products of my own', note: 'Native where it matters, the web where it fits, and tests that run on every change.', keys: ['rust', 'typescript', 'kotlin', 'swift', 'astro'] },
];
const primary = new Set(groups.flatMap((g) => g.keys));
const toolbox = Object.keys(tech).filter((k) => !primary.has(k));

/** Chips laid out left to right from (x, y), wrapping at `width`. Returns the markup and the height used. */
function chips(keys, x, y, width, t, theme) {
  const H = 38, GAP = 10;
  let cx = x, cy = y, out = '';
  for (const k of keys) {
    const w = Math.round(46 + tech[k].length * 8.7 + 14);
    if (cx + w > x + width) { cx = x; cy += H + GAP; }
    const invert = theme === 'dark' && mono.has(k) ? ' style="filter:invert(1)"' : '';
    out += `<rect x="${cx}" y="${cy}" width="${w}" height="${H}" rx="19" fill="${t.soft}" stroke="${t.line}"/>` +
      `<image href="${dataUri(`icons/${k}.svg`, 'image/svg+xml')}" x="${cx + 13}" y="${cy + 9}" width="20" height="20"${invert}/>` +
      `<text class="chip" x="${cx + 41}" y="${cy + 24.5}">${esc(tech[k])}</text>`;
    cx += w + GAP;
  }
  return { out, height: cy + H - y };
}

function stack(t, theme) {
  const W = 1220, GAP = 20, col = (W - 2 * GAP) / 3, PAD = 26;
  const cards = groups.map((g, i) => {
    const x = i * (col + GAP);
    const note = wrap(g.note, col - 2 * PAD, 15.5);
    const top = 78 + note.length * 23 + 8;
    const c = chips(g.keys, x + PAD, top, col - 2 * PAD, t, theme);
    return { x, g, note, c, height: top + c.height + PAD };
  });
  const cardH = Math.max(...cards.map((c) => c.height));
  const more = chips(toolbox, 0, cardH + 62, W, t, theme);
  const H = cardH + 62 + more.height + 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="t">
  <title id="t">${esc(groups.map((g) => `${g.title}: ${g.keys.map((k) => tech[k]).join(', ')}`).join('. '))}. Also: ${esc(toolbox.map((k) => tech[k]).join(', '))}.</title>
  ${style(t)}
  <style>.chip { font-size: 15.5px; font-weight: 600; fill: ${t.ink}; } .gt { font-size: 19px; font-weight: 700; fill: ${t.ink}; } .note { font-size: 15.5px; fill: ${t.muted}; }</style>
  ${cards.map(({ x, g, note, c }) => `<rect x="${x + 0.75}" y=".75" width="${col - 1.5}" height="${cardH - 1.5}" rx="18" fill="${t.card}" stroke="${t.line}" stroke-width="1.5"/>
  <text class="gt" x="${x + PAD}" y="44">${esc(g.title)}</text>
  ${note.map((l, i) => `<text class="note" x="${x + PAD}" y="${72 + i * 23}">${esc(l)}</text>`).join('')}
  ${c.out}`).join('\n  ')}
  <text class="lab" x="2" y="${cardH + 42}">Also in the toolbox</text>
  ${more.out}
</svg>
`;
}

const total = /<title id="t">([\d,]+) GitHub/.exec(readFileSync(asset('contributions-dark.svg'), 'utf8'))?.[1] ?? '';
mkdirSync(asset('cards/'), { recursive: true });
for (const [theme, t] of Object.entries(themes)) {
  for (const p of projects) writeFileSync(asset(`cards/${p.id}-${theme}.svg`), (p.wide ? wideCard : card)(p, t, theme));
  writeFileSync(asset(`stats-${theme}.svg`), stats(t, total));
  writeFileSync(asset(`divider-${theme}.svg`), divider(t));
  writeFileSync(asset(`stack-${theme}.svg`), stack(t, theme));
}
console.log(`wrote ${projects.length} cards, the stat strip, the stack and the divider, light and dark`);
