# Evidências

## Escopo auditado

- Bloco `#seguranca` em `site/index.html`.
- Estilos entre `.protocol.security-journey` e as regras responsivas em `site/assets/index-D7fnJsCl.css`.
- Animação em `site/performance.js`.
- Copy PT, EN e ES em `site/i18n.js`.
- Três recortes fornecidos pelo usuário.

## Estrutura e comportamento

- Zero controles interativos no bloco.
- Quatro eventos cronológicos e cinco headings.
- A versão auditada usava linha, quatro nós, marcador automotivo, moldura, selo superior e três selos inferiores.
- `is-complete` era ativado em JavaScript sem consumidor em CSS.
- Os estados eram gerados por quatro timers; não havia integração com rastreamento ou dados reais.

## Visual e conteúdo

- Dez valores de cor eram usados nos três pequenos conjuntos ornamentais.
- O rodapé usava texto de 10 px, abaixo do mínimo de 11 px do Design System.
- A moldura e as linhas de baixa opacidade tinham contraste inferido inferior a 3:1.
- `RASTREAMENTO ATIVO`, `FROTA CONTROLADA` e `CONCIERGE 24/7` não exibiam dado, fonte ou ação.
- `CENÁRIO ILUSTRATIVO` reduzia o risco de interpretação, mas contradizia a aparência de painel ativo.

## Peso após a simplificação

- 32 descendentes, 18 strings visíveis, quatro eventos, zero controles e zero mídia.
- Zero animações contínuas em repouso.
- Uma sequência automática de quatro etapas, com suporte a `prefers-reduced-motion`.
- JS local inicial medido: 64.379 bytes. O bloco não adiciona biblioteca.

## Lacunas

- Não foi executado Lighthouse com CPU e rede simuladas.
- Claims operacionais não foram validados contra SLA ou telemetria.
- Acessibilidade interativa não se aplica ao escopo, pois não há controles.
