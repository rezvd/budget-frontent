# Project Rules

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
