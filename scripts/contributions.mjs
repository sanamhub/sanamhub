// Writes assets/contributions-light.svg and assets/contributions-dark.svg: the last year of
// contributions, drawn in the README's own palette. A daily workflow runs it, so the graph is
// never more than a day old and no third-party card service sits in the page.
// Run: GITHUB_TOKEN=$(gh auth token) node scripts/contributions.mjs

import { writeFileSync } from 'node:fs';

const login = 'sanamhub';
const token = process.env.GITHUB_TOKEN;
if (!token) throw new Error('GITHUB_TOKEN is not set');

const query = `query($login: String!) { user(login: $login) { contributionsCollection { contributionCalendar {
  totalContributions weeks { contributionDays { date contributionCount weekday } } } } } }`;
const res = await fetch('https://api.github.com/graphql', {
  method: 'POST',
  headers: { Authorization: `bearer ${token}`, 'Content-Type': 'application/json', 'User-Agent': 'sanamhub-readme' },
  body: JSON.stringify({ query, variables: { login } }),
});
if (!res.ok) throw new Error(`GitHub GraphQL returned ${res.status}`);
const { data, errors } = await res.json();
if (errors) throw new Error(errors.map((e) => e.message).join('; '));
const cal = data.user.contributionsCollection.contributionCalendar;

const days = cal.weeks.flatMap((w) => w.contributionDays);
// Longest and current streaks, counted in days with at least one contribution.
let longest = 0, run = 0;
for (const d of days) { run = d.contributionCount ? run + 1 : 0; longest = Math.max(longest, run); }
let current = 0;
for (let i = days.length - 1; i >= 0; i--) {
  if (days[i].contributionCount) current++;
  else if (i === days.length - 1) continue; // today may not have a commit yet
  else break;
}
const busiest = days.reduce((a, b) => (b.contributionCount > a.contributionCount ? b : a));

// The palette of sanam.me. No fill behind the graph: it sits on GitHub's page colour in each theme.
const themes = {
  light: { line: '#d6d3cd', ink: '#18181b', muted: '#52525b', levels: ['#ece9e2', '#f6d9a8', '#eeb35e', '#d4861f', '#b45309'] },
  dark: { line: '#30363d', ink: '#fafafa', muted: '#a1a1aa', levels: ['#161b22', '#4a3410', '#8a5a14', '#d1901c', '#fbbf24'] },
};
// Quartiles of the non-zero days decide the levels, so one huge day does not flatten the rest.
const nz = days.map((d) => d.contributionCount).filter(Boolean).sort((a, b) => a - b);
const q = (p) => nz[Math.min(nz.length - 1, Math.floor(p * nz.length))] ?? 1;
const cuts = [q(0.25), q(0.5), q(0.75)];
const level = (n) => (n === 0 ? 0 : n <= cuts[0] ? 1 : n <= cuts[1] ? 2 : n <= cuts[2] ? 3 : 4);

const CELL = 13, GAP = 3, X0 = 40, Y0 = 92;
const fmt = new Intl.NumberFormat('en-US');
const monthFmt = new Intl.DateTimeFormat('en-US', { month: 'short', timeZone: 'UTC' });
const longFmt = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

function svg(t) {
  const width = X0 + cal.weeks.length * (CELL + GAP) + 24;
  const height = Y0 + 7 * (CELL + GAP) + 44;
  let cells = '', months = '', lastMonth = -1;
  cal.weeks.forEach((w, wi) => {
    const x = X0 + wi * (CELL + GAP);
    const first = new Date(w.contributionDays[0].date + 'T00:00:00Z');
    if (first.getUTCMonth() !== lastMonth && first.getUTCDate() <= 7) {
      months += `<text class="m" x="${x}" y="${Y0 - 10}">${monthFmt.format(first)}</text>`;
      lastMonth = first.getUTCMonth();
    }
    for (const d of w.contributionDays) {
      const y = Y0 + d.weekday * (CELL + GAP);
      const n = d.contributionCount;
      cells += `<rect x="${x}" y="${y}" width="${CELL}" height="${CELL}" rx="3" fill="${t.levels[level(n)]}" style="animation-delay:${(wi * 18)}ms"><title>${n} on ${d.date}</title></rect>`;
    }
  });
  const legendX = width - 24 - 5 * (CELL + GAP) - 70;
  const legend = t.levels.map((c, i) => `<rect x="${legendX + 38 + i * (CELL + GAP)}" y="${height - 30}" width="${CELL}" height="${CELL}" rx="3" fill="${c}"/>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="t">
  <title id="t">${fmt.format(cal.totalContributions)} GitHub contributions in the last year</title>
  <style>
    text { font-family: Inter, "Segoe UI", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif; }
    .big { font-size: 26px; font-weight: 700; fill: ${t.ink}; }
    .s { font-size: 14px; fill: ${t.muted}; }
    .k { font-size: 14px; font-weight: 600; fill: ${t.ink}; }
    .m, .l { font-size: 12px; fill: ${t.muted}; }
    rect[style] { animation: in .5s ease-out both; }
    @keyframes in { from { opacity: 0; transform: translateY(4px); } }
    @media (prefers-reduced-motion: reduce) { rect[style] { animation: none; } }
  </style>
  <rect x=".5" y=".5" width="${width - 1}" height="${height - 1}" rx="16" fill="none" stroke="${t.line}"/>
  <text class="big" x="${X0}" y="46">${fmt.format(cal.totalContributions)}</text>
  <text class="s" x="${X0}" y="66">contributions in the last year</text>
  <text class="s" x="${width - 24}" y="40" text-anchor="end">Longest streak <tspan class="k">${longest} days</tspan>   ·   Current <tspan class="k">${current} days</tspan></text>
  <text class="s" x="${width - 24}" y="62" text-anchor="end">Busiest day <tspan class="k">${busiest.contributionCount}</tspan> on ${longFmt.format(new Date(busiest.date + 'T00:00:00Z'))}</text>
  ${months}
  <text class="l" x="12" y="${Y0 + 1 * (CELL + GAP) + 10}">Mon</text>
  <text class="l" x="12" y="${Y0 + 3 * (CELL + GAP) + 10}">Wed</text>
  <text class="l" x="12" y="${Y0 + 5 * (CELL + GAP) + 10}">Fri</text>
  ${cells}
  <text class="l" x="${legendX}" y="${height - 19}">Less</text>${legend}<text class="l" x="${legendX + 38 + 5 * (CELL + GAP) + 4}" y="${height - 19}">More</text>
</svg>
`;
}

for (const [name, t] of Object.entries(themes)) {
  writeFileSync(new URL(`../assets/contributions-${name}.svg`, import.meta.url), svg(t));
}
console.log(`${cal.totalContributions} contributions; longest streak ${longest}, current ${current}`);
