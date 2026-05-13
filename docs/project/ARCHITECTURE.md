# Architecture

Pipeline:

Tool intake -> Firecrawl/source research -> DataForSEO keyword/SERP research -> five page briefs -> approval -> MDX drafts -> claim/content/affiliate gates -> Vercel Preview -> approval -> production/indexing.

Default routes:

- `/tools/<tool>/`
- `/tools/<tool>/review/`
- `/tools/<tool>/pricing/`
- `/tools/<tool>/alternatives/`
- `/compare/<tool-a>-vs-<tool-b>/`
- `/best/<category>/`
- `/categories/<category>/`
- `/guides/<use-case>/`

State lives in `data/` and `evidence/`, not in Hermes memory.
