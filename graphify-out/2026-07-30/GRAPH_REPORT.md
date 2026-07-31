# Graph Report - .  (2026-07-30)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 27 nodes · 24 edges · 10 communities (9 shown, 1 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `cd6e5b08`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Frota de veículos|Frota de veículos]]
- [[_COMMUNITY_BetinhosAnniversary|BetinhosAnniversary]]
- [[_COMMUNITY_service-fleet.js|service-fleet.js]]

## God Nodes (most connected - your core abstractions)
1. `BetinhosAnniversary` - 5 edges
2. `Frota de veículos` - 5 edges
3. `Jeep Commander` - 3 edges
4. `Mercedes-Benz Sprinter` - 3 edges
5. `Categoria Executivos` - 3 edges
6. `createElement()` - 2 edges
7. `Volkswagen Virtus` - 2 edges
8. `Toyota Corolla` - 2 edges
9. `Renault Master` - 2 edges
10. `Categoria Blindados` - 2 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (10 total, 1 thin omitted)

### Community 0 - "Frota de veículos"
Cohesion: 0.33
Nodes (9): Categoria Blindados, Categoria Executivos, Categoria Vans, Frota de veículos, Jeep Commander, Mercedes-Benz Sprinter, Renault Master, Toyota Corolla (+1 more)

### Community 1 - "BetinhosAnniversary"
Cohesion: 0.36
Nodes (3): ANNIVERSARY_ATTRIBUTES, BetinhosAnniversary, createElement()

## Knowledge Gaps
- **2 isolated node(s):** `ANNIVERSARY_ATTRIBUTES`, `FLEET_VEHICLE_ORDER`
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What connects `ANNIVERSARY_ATTRIBUTES`, `FLEET_VEHICLE_ORDER` to the rest of the system?**
  _2 weakly-connected nodes found - possible documentation gaps or missing edges._