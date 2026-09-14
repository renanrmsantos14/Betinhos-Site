# Graph Report - Site  (2026-08-18)

## Corpus Check
- 15 files · ~12,758 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 57 nodes · 48 edges · 16 communities (13 shown, 3 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Frota de veículos
- BetinhosAnniversary
- service-fleet.js
- careers-textarea.js
- history-carousel.js
- i18n.js
- mobile-navigation.js
- office-carousel.js
- performance.js

## God Nodes (most connected - your core abstractions)
1. `BetinhosAnniversary` - 5 edges
2. `Frota de veículos` - 5 edges
3. `Q: Por que o grafo quase nao representa a frota?` - 4 edges
4. `Q: Por que o grafo quase nao representa a frota?` - 4 edges
5. `Jeep Commander` - 3 edges
6. `Mercedes-Benz Sprinter` - 3 edges
7. `Categoria Executivos` - 3 edges
8. `createElement()` - 2 edges
9. `Volkswagen Virtus` - 2 edges
10. `Toyota Corolla` - 2 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (16 total, 3 thin omitted)

### Community 0 - "Frota de veículos"
Cohesion: 0.33
Nodes (9): Categoria Blindados, Categoria Executivos, Categoria Vans, Frota de veículos, Jeep Commander, Mercedes-Benz Sprinter, Renault Master, Toyota Corolla (+1 more)

### Community 1 - "BetinhosAnniversary"
Cohesion: 0.36
Nodes (3): ANNIVERSARY_ATTRIBUTES, BetinhosAnniversary, createElement()

### Community 2 - "service-fleet.js"
Cohesion: 0.29
Nodes (5): anniversaryWords, languageButtons, requestedLanguage, savedLanguage, translations

### Community 3 - "careers-textarea.js"
Cohesion: 0.29
Nodes (5): buttons, labels, requestedLanguage, savedLanguage, translations

### Community 4 - "history-carousel.js"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: Por que o grafo quase nao representa a frota?, Source Nodes

### Community 5 - "i18n.js"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: Por que o grafo quase nao representa a frota?, Source Nodes

## Knowledge Gaps
- **21 isolated node(s):** `sources`, `css`, `translations`, `anniversaryWords`, `languageButtons` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What connects `sources`, `css`, `translations` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._