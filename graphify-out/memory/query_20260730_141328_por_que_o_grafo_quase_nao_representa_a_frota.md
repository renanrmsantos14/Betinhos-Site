---
type: "query"
date: "2026-07-30T14:13:28.193962+00:00"
question: "Por que o grafo quase nao representa a frota?"
contributor: "graphify"
outcome: "useful"
source_nodes: ["service-fleet.js", "FLEET_VEHICLE_ORDER", "initializeServiceFleet()"]
---

# Q: Por que o grafo quase nao representa a frota?

## Answer

Expanded from original query via graph vocab: [fleet, vehicle, order, initialize, service]. O site guarda conteudo da frota em HTML e imagens, excluidos do modo code-only; service-fleet.js agora expoe FLEET_VEHICLE_ORDER e initializeServiceFleet para extracao AST.

## Outcome

- Signal: useful

## Source Nodes

- service-fleet.js
- FLEET_VEHICLE_ORDER
- initializeServiceFleet()