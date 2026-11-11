// Writes assets/header-light.svg and assets/header-dark.svg, the banner at the top of the profile
// README. Run once after editing: node scripts/header.mjs. The SVGs animate with CSS and SMIL, which
// GitHub keeps when it serves a repository image; reduced motion stops them.

import { writeFileSync } from 'node:fs';

// The palette of sanam.me. No background: the banner sits on GitHub's own page colour in each theme.
const themes = {
  light: { ink: '#18181b', muted: '#52525b', line: '#d6d3cd', accent: '#b45309', hill: '#ece7dd', hill2: '#e2dbcd', city: '#d9d4c9', stupa: '#b9ae9b', snow: '#ffffff', eye: '#ffffff' },
  dark: { ink: '#fafafa', muted: '#a1a1aa', line: '#30363d', accent: '#fbbf24', hill: '#161b22', hill2: '#1c232d', city: '#222b36', stupa: '#3c4756', snow: '#c9d1d9', eye: '#0d1117' },
};

// The wave under the site's header: one period is 48 units. The amber part is the "you are here".
const wave = (from, to) => `M${from} 291 ` + Array.from({ length: (to - from) / 24 }, (_, i) => `q12 ${i % 2 ? 7 : -7} 24 0`).join(' ');

function svg(t) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="300" viewBox="0 0 1200 300" role="img" aria-labelledby="title desc">
  <title id="title">Sanam Pakuwal</title>
  <desc id="desc">Technical Lead. Nepal and Singapore, a packet travelling the link between the two.</desc>
  <style>
    .name { font: 700 64px Inter, "Segoe UI", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif; letter-spacing: -1.5px; fill: ${t.ink}; }
    .role { font: 500 22px Inter, "Segoe UI", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif; fill: ${t.muted}; }
    .tag { font: 600 20px ui-monospace, SFMono-Regular, Consolas, Menlo, monospace; fill: ${t.accent}; }
    .city { font: 600 13px Inter, "Segoe UI", -apple-system, BlinkMacSystemFont, Arial, sans-serif; fill: ${t.muted}; letter-spacing: .4px; }
    .link { fill: none; stroke: ${t.accent}; stroke-width: 2; stroke-dasharray: 2 8; stroke-linecap: round; animation: flow 1.6s linear infinite; }
    .star { fill: ${t.accent}; opacity: .0; animation: twinkle 5s ease-in-out infinite; }
    .cloud { fill: ${t.hill2}; animation: drift 38s linear infinite; }
    @keyframes flow { to { stroke-dashoffset: -20; } }
    @keyframes twinkle { 50% { opacity: .55; } }
    @keyframes drift { from { transform: translateX(-60px); } to { transform: translateX(60px); } }
    @media (prefers-reduced-motion: reduce) { .link, .star, .cloud { animation: none; } .packet { display: none; } }
  </style>
  <path d="${wave(0, 1200)}" fill="none" stroke="${t.line}" stroke-width="1.5"/>
  <path d="${wave(0, 432)}" fill="none" stroke="${t.accent}" stroke-width="2" stroke-linecap="round"/>

  <!-- Name and role -->
  <text class="tag" x="64" y="88">&lt;/&gt;</text>
  <text class="name" x="60" y="156">Sanam Pakuwal</text>
  <text class="role" x="64" y="196">Software Engineer · Technical Lead</text>
  <text class="role" x="64" y="228" style="font-size:18px">Distributed systems at work, my own products the rest of the time.</text>

  <!-- Scene: Nepal (hills, Himalaya, a stupa) and Singapore (waterfront towers), one link -->
  <g transform="translate(700 0)">
    <g class="cloud"><ellipse cx="140" cy="70" rx="34" ry="9"/><ellipse cx="380" cy="52" rx="26" ry="7"/></g>
    <circle class="star" cx="300" cy="40" r="2" style="animation-delay:-1s"/>
    <circle class="star" cx="420" cy="88" r="1.6" style="animation-delay:-3s"/>
    <circle class="star" cx="60" cy="46" r="1.6" style="animation-delay:-2s"/>

    <!-- Himalaya, far back -->
    <path d="M-10 214 L40 168 L62 184 L98 132 L132 178 L158 160 L206 214 Z" fill="${t.hill2}" opacity=".8"/>
    <path d="M86 147 L98 132 L110 149 L103 145 L98 151 L92 145 Z" fill="${t.snow}" opacity=".9"/>
    <path d="M-10 236 C40 214 90 214 136 226 C170 236 200 232 236 222 L236 262 L-10 262 Z" fill="${t.hill}"/>
    <!-- Prayer flags from the spire down to the hill -->
    <path d="M95 168 Q150 186 206 214" fill="none" stroke="${t.stupa}" stroke-width="1"/>
    <g opacity=".85">
      <path d="M110 172 l6 1 l-2 7 z" fill="#3b82c4"/><path d="M124 177 l6 1.4 l-2.4 6.8 z" fill="#f2f2f2" stroke="${t.stupa}" stroke-width=".5"/>
      <path d="M138 182 l6 1.8 l-2.8 6.6 z" fill="#d9483b"/><path d="M152 188 l6 2.2 l-3.2 6.4 z" fill="#3f9d55"/>
      <path d="M166 194 l6 2.6 l-3.6 6.2 z" fill="#e8b631"/><path d="M180 201 l6 3 l-4 6 z" fill="#3b82c4"/>
    </g>
    <!-- Stupa: plinth, dome, harmika with eyes, spire -->
    <g fill="${t.stupa}">
      <rect x="60" y="222" width="70" height="9" rx="2"/>
      <path d="M68 223 Q95 182 122 223 Z"/>
      <rect x="87" y="186" width="16" height="12" rx="1.5"/>
      <path d="M89 187 L95 160 L101 187 Z"/>
    </g>
    <path d="M90 192 q2 -2 4 0 M96 192 q2 -2 4 0" stroke="${t.eye}" stroke-width="1.2" fill="none"/>
    <text class="city" x="44" y="276">NEPAL</text>

    <!-- Singapore waterfront: towers and a three-tower hotel with a deck, generic shapes -->
    <g fill="${t.city}">
      <rect x="318" y="150" width="20" height="86"/>
      <rect x="342" y="130" width="18" height="106"/>
      <rect x="364" y="164" width="16" height="72"/>
      <rect x="392" y="170" width="12" height="66"/>
      <rect x="410" y="168" width="12" height="68"/>
      <rect x="428" y="166" width="12" height="70"/>
      <rect x="386" y="160" width="60" height="7" rx="3"/>
      <rect x="452" y="186" width="22" height="50"/>
    </g>
    <path d="M300 238 C350 232 420 232 480 238 L480 262 L300 262 Z" fill="${t.hill}"/>
    <text class="city" x="350" y="276">SINGAPORE</text>

    <!-- The link -->
    <path id="route" class="link" d="M95 158 C170 40 300 40 351 128"/>
    <circle class="packet" r="5" cx="0" cy="0" fill="${t.accent}">
      <animateMotion dur="3.2s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines=".45 0 .55 1">
        <mpath href="#route"/>
      </animateMotion>
    </circle>
    <circle class="packet" r="3.5" fill="${t.accent}" opacity=".55">
      <animateMotion dur="3.2s" begin="-1.6s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="spline" keySplines=".45 0 .55 1">
        <mpath href="#route"/>
      </animateMotion>
    </circle>
  </g>
</svg>
`;
}

for (const [name, t] of Object.entries(themes)) {
  writeFileSync(new URL(`../assets/header-${name}.svg`, import.meta.url), svg(t));
}
console.log('wrote assets/header-light.svg and assets/header-dark.svg');
