<!-- header: drawn by scripts/header.mjs -->
<p align="center">
  <a href="https://sanam.me">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="assets/header-dark.svg" />
      <img src="assets/header-light.svg" width="100%" alt="Sanam Pakuwal. Software Engineer and Technical Lead. Nepal and Singapore." />
    </picture>
  </a>
</p>

I design distributed systems, make databases fast, and lead the engineers who run them. Away from work I build my own products: a Nepali calendar in 14 programming languages, desktop and mobile apps, and tools I wanted to exist.

<p>
  <a href="https://sanam.me"><b>sanam.me</b></a> ·
  <a href="https://sanam.me/sanam-cv.pdf">CV</a> ·
  <a href="mailto:sanampakuwal27@gmail.com">Email</a> ·
  <a href="https://www.linkedin.com/in/sanampakuwal">LinkedIn</a> ·
  <a href="https://x.com/sanampakuwal">X</a> ·
  <a href="https://bsky.app/profile/sanam.me">Bluesky</a> ·
  <a href="https://www.instagram.com/sanampakuwal">Instagram</a> ·
  <a href="https://sanampakuwal.t.me">Telegram</a>
</p>

<!-- numbers: drawn by scripts/cards.mjs -->
<p><picture><source media="(prefers-color-scheme: dark)" srcset="assets/stats-dark.svg" /><img src="assets/stats-light.svg" width="100%" alt="7 years building and running production systems. NepDate written in 13 languages. 60 open source repositories." /></picture></p>

### Now

- **Building:** [Sluice](https://sluicedrop.com), a Rust tool that sends big files straight from one computer to another. 0.1.0 is out; the work now is the road to 1.0.
- **Shipping:** NepDate Patro for Android, in closed beta, with the iPhone app next. MitiBar 1.1.0 went out on 10 November 2026.
- **At work:** technical direction for a multi-region e-commerce platform, and how it adopts AI.
- **Using daily:** [Curioflux](https://curioflux.com), my self-hosted knowledge base, to keep what I read and hand it to coding agents over MCP.

<!-- contributions: redrawn daily by .github/workflows/refresh.yml -->
<p>
  <a href="https://github.com/sanamhub">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="assets/contributions-dark.svg" />
      <img src="assets/contributions-light.svg" width="100%" alt="GitHub contributions in the last year" />
    </picture>
  </a>
</p>

### Projects

What I build in my own time. Most of it started as something I needed, and a lot of it is for Nepal.

<!-- cards: drawn by scripts/cards.mjs -->
<p><a href="https://nepdate.com"><picture><source media="(prefers-color-scheme: dark)" srcset="assets/cards/nepdate-dark.svg" /><img src="assets/cards/nepdate-light.svg" width="100%" alt="NepDate, 1.0 release candidate. Bikram Sambat, the Nepali calendar, for 14 programming languages from one dataset and one spec. I wrote the ports for 13 of them and co-maintain the C# original by Raju Prasai." /></picture></a></p>

<p>
  <a href="https://patro.nepdate.com"><picture><source media="(prefers-color-scheme: dark)" srcset="assets/cards/patro-dark.svg" /><img src="assets/cards/patro-light.svg" width="49.5%" alt="NepDate Patro. Live. The Nepali calendar in a browser, every month from BS 1901 to 2199. Astro, TypeScript, Cloudflare Workers." /></picture></a>
  <a href="https://nepdate.com/mitibar/"><picture><source media="(prefers-color-scheme: dark)" srcset="assets/cards/mitibar-dark.svg" /><img src="assets/cards/mitibar-light.svg" width="49.5%" alt="MitiBar v1.1.0 for Windows, macOS and Linux. The Nepali date on your desktop. Rust." /></picture></a>
</p>
<p>
  <a href="https://github.com/sanamhub/nepdate-mobile"><picture><source media="(prefers-color-scheme: dark)" srcset="assets/cards/mobile-dark.svg" /><img src="assets/cards/mobile-light.svg" width="49.5%" alt="NepDate Patro for Android and iPhone. Android in closed beta, iPhone in progress. Kotlin, Jetpack Compose, Swift, SwiftUI." /></picture></a>
  <a href="https://sluicedrop.com"><picture><source media="(prefers-color-scheme: dark)" srcset="assets/cards/sluice-dark.svg" /><img src="assets/cards/sluice-light.svg" width="49.5%" alt="Sluice v0.1.0. Send big files straight to another computer over QUIC. Rust." /></picture></a>
</p>
<p>
  <a href="https://curioflux.com"><picture><source media="(prefers-color-scheme: dark)" srcset="assets/cards/curioflux-dark.svg" /><img src="assets/cards/curioflux-light.svg" width="49.5%" alt="Curioflux. A self-hosted knowledge base that answers coding agents over MCP. C#, SQLite FTS5, React." /></picture></a>
  <a href="https://batosathi.com"><picture><source media="(prefers-color-scheme: dark)" srcset="assets/cards/batosathi-dark.svg" /><img src="assets/cards/batosathi-light.svg" width="49.5%" alt="Batosathi, closed beta. Road and weather alerts for a trip across Nepal. C#, ASP.NET Core, PostgreSQL." /></picture></a>
</p>

<sub>Source: [nepdate](https://github.com/sanamhub/nepdate) · [mitibar](https://github.com/sanamhub/mitibar) · [nepdate-mobile](https://github.com/sanamhub/nepdate-mobile) · [sluice](https://github.com/sanamhub/sluice) (`brew install sanamhub/tap/sluice`)</sub>

#### Client work

<p>
  <picture><source media="(prefers-color-scheme: dark)" srcset="assets/cards/rsservice-dark.svg" /><img src="assets/cards/rsservice-light.svg" width="49.5%" alt="RsService, client work, in production. Service centre platform. C#, ASP.NET Core, SQL Server." /></picture>
  <picture><source media="(prefers-color-scheme: dark)" srcset="assets/cards/gymhub-dark.svg" /><img src="assets/cards/gymhub-light.svg" width="49.5%" alt="GymHub, client work, in production. Gym management app: members, attendance and admin workflows. C#, .NET MAUI, PostgreSQL, Docker." /></picture>
</p>

<sub>Also an LMS with protected video, and eAttendance, attendance tracking with per-site licensing. Experience, credentials and the rest are on [sanam.me](https://sanam.me).</sub>

### Libraries and tools

| Library | What it does | |
| --- | --- | --- |
| [postgresql-to-mssql](https://github.com/sanamhub/postgresql-to-mssql) | Stream PostgreSQL data into SQL Server on the fly, for migrations without downtime | ![stars](https://img.shields.io/github/stars/sanamhub/postgresql-to-mssql?style=flat-square&label=%E2%98%85&color=b45309) |
| [DotNetMapper](https://github.com/sanamhub/DotNetMapper) | The simplest .NET object mapper, at hand-written speed | ![stars](https://img.shields.io/github/stars/sanamhub/DotNetMapper?style=flat-square&label=%E2%98%85&color=b45309) ![NuGet](https://img.shields.io/nuget/dt/DotNetMapper?style=flat-square&label=NuGet&color=b45309) |
| [ada-csharp](https://github.com/sanamhub/ada-csharp) | Fast WHATWG-compliant URL parser for .NET, built on Ada | ![stars](https://img.shields.io/github/stars/sanamhub/ada-csharp?style=flat-square&label=%E2%98%85&color=b45309) ![NuGet](https://img.shields.io/nuget/dt/Ada.Url?style=flat-square&label=NuGet&color=b45309) |
| [mcp-nuget](https://github.com/sanamhub/mcp-nuget) | A sample Model Context Protocol server published as a NuGet tool | ![stars](https://img.shields.io/github/stars/sanamhub/mcp-nuget?style=flat-square&label=%E2%98%85&color=b45309) |
| [hulaki](https://github.com/sanamhub/hulaki) | One API for chat, push, email and social delivery, with an honest answer per recipient | ![stars](https://img.shields.io/github/stars/sanamhub/hulaki?style=flat-square&label=%E2%98%85&color=b45309) |
| [jharicast](https://github.com/sanamhub/jharicast) | Per-route, per-day weather and road rules for Nepal | ![stars](https://img.shields.io/github/stars/sanamhub/jharicast?style=flat-square&label=%E2%98%85&color=b45309) |
| [freetiermail](https://github.com/sanamhub/freetiermail) | Route email across provider free tiers, about 900 a day | ![stars](https://img.shields.io/github/stars/sanamhub/freetiermail?style=flat-square&label=%E2%98%85&color=b45309) |
| [typesafe-dotnet](https://github.com/sanamhub/typesafe-dotnet) | .NET client for the TypeSafe AI System One API | ![stars](https://img.shields.io/github/stars/sanamhub/typesafe-dotnet?style=flat-square&label=%E2%98%85&color=b45309) |
| [passgen](https://github.com/sanamhub/passgen) | Password generator with a public API | ![stars](https://img.shields.io/github/stars/sanamhub/passgen?style=flat-square&label=%E2%98%85&color=b45309) |

### Writing

<!-- posts:start -->
- [Rate limiting in ASP.NET Core](https://sanam.me/blog/rate-limiting-aspnetcore/) <sub>Oct 9, 2026</sub>
- [Cutting search latency from seconds to under 100ms](https://sanam.me/blog/search-latency-opensearch/) <sub>Sep 20, 2026</sub>
- [Taking a single-region app to multi-region with SQL Server](https://sanam.me/blog/multi-region-sql-server/) <sub>Aug 15, 2026</sub>
<!-- posts:end -->

[All posts](https://sanam.me/blog/) · [RSS](https://sanam.me/rss.xml)

### What I work with

<!-- stack: drawn by scripts/cards.mjs -->
<p><picture><source media="(prefers-color-scheme: dark)" srcset="assets/stack-dark.svg" /><img src="assets/stack-light.svg" width="100%" alt="Backend and distributed systems: C#, .NET, Redis, RabbitMQ, Docker. Databases and search: SQL Server, PostgreSQL, OpenSearch. Products of my own: Rust, TypeScript, Kotlin, Swift, Astro. Also JavaScript, React, Next.js, Tailwind CSS, Python, Go, Elasticsearch, OpenTelemetry, Grafana, Nginx, Linux, Azure, Cloudflare, GitHub Actions, Playwright and more." /></picture></p>

<!-- cat -->
<p align="center">
  <img src="https://media.giphy.com/media/WUlplcMpOCEmTGBtBW/giphy.gif" width="100" alt="A cat typing on a laptop" />
</p>

<!-- footer -->
<div align="center">
  <samp>
    ════ ⋆★⋆ ════
    <br/>
    धन्यवाद · thanks for stopping by
  </samp>
  <br/>
  <a href="https://sanam.me">sanam.me</a>
</div>
