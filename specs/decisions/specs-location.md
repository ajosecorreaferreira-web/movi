# Decisión — Las specs viven en `specs/` en la raíz

**Fecha:** 2026-11-23
**Estado:** aceptada

## Contexto

La plantilla del método SDD propone `docs/specs/` y `docs/decisions/`. En Movi las specs ya existían en `specs/` (foundations, tokens, components, onboarding) y `docs/` ya contiene documentación de producto y marca, que no son specs.

## Decisión

- Specs: `specs/` en la raíz. No se crea `docs/specs/`.
- Decisiones transversales: `specs/decisions/`.
- `docs/` queda para contexto (producto, flujos, voz, marca). No es una fuente de specs.

## Consecuencias

- Cualquier skill, agente o plantilla que diga `docs/specs/` se lee como `specs/`.
- Specs de feature: `specs/<feature>/requirements.md · design.md · tasks.md`, igual que `specs/onboarding/`.
