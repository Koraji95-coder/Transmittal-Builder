# Framework Extraction — Document Index

This directory contains the planning documents for extracting shared scaffolding
from **Transmittal Builder** into the separate
[`kc-framework`](https://github.com/Koraji95-coder/kc-framework) repository.

**No code is moved yet.**  These docs are the blueprint that makes the eventual
migration mechanical and reversible.

---

## Documents

| File | Purpose |
|---|---|
| [INVENTORY.md](./INVENTORY.md) | Comprehensive catalog of every file/module that should move to `kc-framework`, grouped by category with justification and inversion notes. |
| [PROPOSED_LAYOUT.md](./PROPOSED_LAYOUT.md) | Proposed top-level directory structure of the future `kc-framework` repo with rationale for each split. |
| [CONSUMPTION.md](./CONSUMPTION.md) | Exactly how Transmittal Builder will consume the framework after extraction — dependency strings, recommended JS distribution strategy, and a full before/after import table. |
| [MIGRATION_PLAN.md](./MIGRATION_PLAN.md) | A numbered, executable checklist including the exact `git filter-repo` commands to copy files while preserving Git history, reorganization `mv` commands, and rollback notes. |

---

## Background

A previous PR (#60) was merged empty.  This PR retries the deliverable with real
file paths walked from the source tree.

See also:

- [CONTRIBUTING.md](../../CONTRIBUTING.md) — multi-repo architecture overview
- [RELEASING.md](../../RELEASING.md) — release workflow
- [`kc-framework` repo](https://github.com/Koraji95-coder/kc-framework) — the future
  home for all shared scaffolding
