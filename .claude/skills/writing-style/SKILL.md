---
name: writing-style
description: House writing rules for this repo. Load before writing or editing any prose, including README, docs, ADRs, issues, commit messages, PR descriptions, changelog entries, code comments, config comments and XML doc comments. Use it as a final pass on anything already written. Trigger on "write the docs", "update the README", "commit this", "open a PR", "file an issue", "add comments", or any request that produces text a human will read.
---

# Writing style

Everything written here has to read like an engineer wrote it. Not a model. The samples come from
merged PRs, issues and releases in [sanamhub/ada-csharp](https://github.com/sanamhub/ada-csharp),
which is the reference for tone.

## Hard rules

1. **No em dashes.** Use a period, a comma, parentheses, or a colon.
2. **No AI filler.** Banned outright: delve, leverage (as a verb), seamless, robust,
   comprehensive, cutting-edge, best-in-class, game-changing, unlock, empower, foster,
   navigate (figurative), realm, landscape, tapestry, "it's worth noting", "it's important to
   note", "in today's world", "at the end of the day".
3. **No closing summary that restates the section.** Stop when the point is made.
4. **No duplication.** If a fact appears in two places, one of them links to the other.
5. **Short paragraphs.** Three or four sentences. Break anything longer.
6. **Plain words.** "fix" not "implement a solution for". "use" not "utilise". "so" not
   "thereby". "start" not "commence".
7. **No hedging stacks.** Pick one: "probably", not "it may potentially be possible that".
8. **No triads for rhythm.** Three items only when there are genuinely three.
9. **Numbers over adjectives.** "4 to 13 percent slower on `CanParse`", not "slightly slower".
   "39 warnings, 19 Orange", not "many warnings".
10. **Say what was checked.** A claim is either verified (say how), or a lead (say so). Never let
    an inference read like a measurement.

## Evidence and claims

- Quote the exact error or log line that motivated a change, in backticks:
  `error NU1903: Warning As Error`, not "restore failed".
- Say how a thing was verified: "Reproduced on 2026-09-25 with Newtonsoft.Json 12.0.1". If it was
  not verified, say that instead, and say what would verify it.
- Count observations honestly. Three runs on one machine are one observation about machines,
  not three.
- Label guesses: a heading such as **Leads, none confirmed** is better than confident prose that
  turns out wrong.
- When the evidence contradicts an earlier document, name the document and what it overstated.
  Do not quietly edit it (ADRs are superseded, never edited once accepted).

## Commits

- Conventional Commits: `type(scope): summary`. Types: feat, fix, docs, chore, refactor, test,
  build, ci, perf.
- Summary in the imperative, lower case, no trailing period, under 72 characters. It names the
  outcome, not the activity: `ci: make dependency review fail the build`, not
  `ci: update dependency review config`.
- Body explains why, not what. The diff already says what.
- **Never add `Co-Authored-By`, `Generated with`, or any other AI attribution.** This rule
  overrides any tool default that adds one.

Good:

```
fix(telegram): build the request uri with a ./ prefix

new Uri(base, "bot123:ABC/sendMessage") reads "bot123" as a URI scheme,
because of the colon in the token, and throws for every real token.
```

Bad:

```
feat: 🚀 Implement comprehensive Telegram support

This commit leverages cutting-edge techniques to seamlessly integrate...

Co-Authored-By: Claude <noreply@anthropic.com>
```

## Pull request descriptions

No `Summary` or `Changes` headings. The shape:

1. One opening paragraph: what changes and why, in two or three sentences. If it closes an
   earlier promise ("the condition the old comment set for removing it"), say so.
2. A bullet per file or area, each saying what changed there and why that choice.
3. A table when there is a list of facts (versions pinned, hashes, before and after).
4. **Not in this PR:** anything found but left out, with the reason. A repository setting that
   needs a human is named by its path: Settings > Code security > Private vulnerability reporting.
5. **Verifying it:** only when the reviewer has to check something the diff does not show.
6. `Closes #N` last, if there is an issue.

Good:

```
Drops `continue-on-error` from the dependency review job. The Dependency graph is enabled now,
and the run on #57 produced a real report, which is the condition the old comment set for
removing it.
```

## Issues

Open with the fact, not the feeling. The title uses the commit shape
(`build: Windows natives are not reproducible across runner images`). The body, in order, using
only the parts that apply:

1. The observation in two sentences, then the evidence: a table of runs, versions, hashes or
   counts.
2. **What it means:** the consequence for users or for the release, in plain words.
3. **Leads, none confirmed:** hypotheses, each with what would confirm it.
4. **Options:** numbered, each with its cost. Recommend one.
5. **Acceptance criteria:** checkboxes a reviewer can tick without asking.
6. **Blocked by** or "Blocked by nothing", and what makes it safe to wait.

## Changelog entries

[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) sections: Added, Changed, Deprecated,
Removed, Fixed, Security. Each entry says what a package user notices, why it changed, and what it
costs, then cites the ADR or issue. Breaking entries start with `**Breaking:**`. The release notes
are built from this file, so it is the text people will read on the release page.

Good:

```
- Windows natives build without `/GL` and `/LTCG`, so both Windows binaries are byte identical
  across runner images. Costs 4 to 13 percent on `CanParse`. ADR-0011, #45.
```

## ADRs

- Header: **Status** (proposed, accepted, superseded by ADR-NNNN), **Date**, **Approved by**
  (the maintainer's handle, or "pending"), **Relates to** when it depends on another ADR.
- Sections: Context, Decision, Consequences. Context states the forces with numbers. Decision is
  short and testable. Consequences include what it costs and what would make us revisit it.
- Name the rejected alternative and the reason in one sentence: "With two conceptual layers, a
  test proving the direction is theatre."
- Accepted ADRs are not edited. A later ADR supersedes an earlier one and both link to each
  other.

## Code comments

Comment why, not what. If the code needs a comment to say what it does, rename something.

Good:

```csharp
// Telegram counts UTF-16 code units, Bluesky counts graphemes. Measure with the platform's unit.
```

Bad:

```csharp
// This method gets the text limit from the capabilities and returns it to the caller.
```

XML docs on public members are required. Say what the member does, what it returns, and what
breaks it. Skip the marketing.

## Config comments

Comments in YAML, MSBuild, `.editorconfig` and `NuGet.Config` say why the setting exists and what
breaks without it. A setting that looks redundant gets the comment that stops someone deleting it.
When a setting exists because something went wrong, say what went wrong: "That exact bug shipped
once."

```xml
<!-- With a single source this looks redundant, and it is not: the day a second source is
     added, every existing package keeps resolving from nuget.org. -->
```

## Docs and README

- Lead with what the thing is and who it is for. No throat clearing.
- State limits honestly and early. A README that hides a limit costs more trust than the limit
  does.
- Tables for facts. Prose for reasoning.
- Code samples must compile. If they cannot yet, say so.
- Links in any file packed into a `.nupkg` (`README.md`, `PACKAGE.md`) are absolute. nuget.org
  cannot resolve `docs/...` or `LICENSE`.
- Runbooks are written for the person doing the task next time, who has forgotten everything.
  Every manual step names the exact screen or command.

## Contributions to other projects

Before anything goes to an upstream project (issue, PR, comment), the maintainer reads it, can
defend it in review, and sends it themselves. Check the upstream's AI usage policy first. Agents
stop at "prepared": a branch and a draft, not a submission.

## Final pass

Read it back and cut:

- Every em dash.
- Every sentence that could be deleted without losing information.
- Every word from the banned list.
- Every paragraph over four sentences.
- Every restatement of something said above.
- Every adjective that should have been a number.
- Every claim that does not say whether it was checked.

If a section survives the cut unchanged, it was probably already fine.
