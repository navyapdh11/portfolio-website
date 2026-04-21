# WikiLLM Schema (2026)

## Entity Types
- **Service:** Cleaning services offered (Residential, Commercial, etc.)
- **Task:** AI training microtasks for cleaning models.
- **Project:** Portfolio projects or open-source contributions.
- **Agent:** AI agents (Librarian, Optimizer) active in the ecosystem.

## Relationship Mapping (PathRAG)
- `Task` -> `trains` -> `Agent`
- `Service` -> `provides_data_for` -> `Task`
- `Agent` -> `optimizes` -> `Project`
