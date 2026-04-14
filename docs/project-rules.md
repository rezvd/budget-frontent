# Project Rules

## Architecture
- The project must follow FSD (Feature-Sliced Design).
- Layers: `app`, `pages`, `widgets`, `features`, `entities`, `shared`.
- New code should be placed in the appropriate FSD layer, not in ad-hoc root folders.
- `app` layer must stay thin: app bootstrap, providers, top-level page composition only.
- `pages` layer must stay thin: page composition/layout only, without business/data logic.
- Business logic, data orchestration and stateful use-cases must be placed in `features`.
- Reusable UI blocks with their own presentation logic must be placed in `widgets`.
- Domain calculations and model-specific logic must be placed in `entities`.
- `shared` is for pure reusable primitives (formatters, low-level utils, ui-kit), not feature/business flows.

## Layered Models
- Models are split into two groups:
- external/source models (`Raw*` or `External*`)
- domain/app models (without special prefix)

## External Model Boundary
- External models can exist only in API layer files.
- External models must be stored in a separate models file.
- API layer must map external models to domain models.
- All non-API layers (pages, widgets, features, entities, shared) must use only domain models.

## Naming
- External model names must include `Raw` or `External`.
