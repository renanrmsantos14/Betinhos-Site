# Evidências

## Estrutura

- `site/index.html:439-494`: zero controles; quatro eventos repetem `time + h3 + p`.
- Profundidade máxima: sete níveis no evento de mudança de destino.
- `is-alert` e `is-success` não possuem consumidor visual atual.
- `site/performance.js:86-124`: quatro etapas são ativadas por timers, não por dados operacionais.

## Visual

- `site/assets/index-D7fnJsCl.css:768-910`: escala de espaçamento observada de 8, 16, 18, 24, 28, 48, 64, 96, 112 e 136 px.
- Escala tipográfica observada de 10, 11, 12, 15, 34 e 66 px.
- Nove cores ou variações alpha no bloco; contraste mínimo de texto medido em aproximadamente 7,74:1.
- `site/assets/index-D7fnJsCl.css:1949-1952`: regra fora de breakpoint força uma coluna também no desktop.
- `site/assets/index-D7fnJsCl.css:1994-2024`: movimento reduzido desativa as transições.

## Copy e honestidade

- `site/index.html:444-489`: o bloco atual descreve um exemplo de quatro eventos, não o processo completo.
- “EXEMPLO DE ACOMPANHAMENTO” reduz a chance de interpretar os eventos como dados reais.
- “Mantém comunicação até a chegada” pode sugerir contato contínuo sem explicar frequência ou canal.
- A proposta de sete etapas não contém superlativos nem garantia de resultado.
- Termos internos como “briefing” e “planejamento operacional” precisam de descrições em linguagem simples.

## Peso e atenção

- JS local inicial medido: 62.806 bytes brutos, sem contar Trustindex e scripts inline.
- 31 requests no Vite; projeção de 29 em produção.
- Proxy até `load`: mediana de 217 ms em localhost, sem throttle.
- Zero loops em repouso; uma sequência automática com quatro timers.
- Zero badges, notificações ou modais no bloco.

## Lacunas

- Sem protocolo público que comprove checklist, margem operacional, frequência de contato ou registro de chegada.
- Sem Lighthouse ou Web Vitals de produção.
- O bloco não possui controles; estados de foco e disabled não se aplicam.
