// Rewrites the list between <!-- posts:start --> and <!-- posts:end --> in README.md with the three
// newest posts from https://sanam.me/rss.xml, so the README follows the blog without hand edits.

import { readFileSync, writeFileSync } from 'node:fs';

const res = await fetch('https://sanam.me/rss.xml', { headers: { 'User-Agent': 'sanamhub-readme' } });
if (!res.ok) throw new Error(`rss.xml returned ${res.status}`);
const xml = await res.text();
const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, item]) => ({
  title: item.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/)[1].trim(),
  link: item.match(/<link>([\s\S]*?)<\/link>/)[1].trim(),
  date: new Date(item.match(/<pubDate>([\s\S]*?)<\/pubDate>/)[1]),
}));
items.sort((a, b) => b.date - a.date);
const fmt = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
const list = items.slice(0, 3).map((p) => `- [${p.title}](${p.link}) <sub>${fmt.format(p.date)}</sub>`).join('\n');

const path = new URL('../README.md', import.meta.url);
const readme = readFileSync(path, 'utf8');
const next = readme.replace(/(<!-- posts:start -->)[\s\S]*?(<!-- posts:end -->)/, `$1\n${list}\n$2`);
if (next === readme) console.log('posts unchanged');
else { writeFileSync(path, next); console.log('posts updated'); }
