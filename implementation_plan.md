# Plano — conversão e prova concreta no site Betinhos

## Assumido

- Preservar o visual editorial atual e todas as alterações locais existentes.
- Usar somente dados e imagens já presentes no projeto.
- Não publicar modelos de veículos, capacidades, avaliações ou comodidades sem fonte real.
- Manter o WhatsApp `+55 12 99723-6961` como canal de conversão.

## Escopo

### [MODIFY] `site/index.html`

1. Transformar a vitrine atual em seletor acessível de categorias:
   - Executivo
   - Blindado
   - Grupos
   - Cada categoria terá descrição operacional real e CTA contextual.
2. Acrescentar CTA em cada serviço com mensagem de WhatsApp específica.
3. Criar bloco compacto de solicitação:
   - serviço;
   - data;
   - origem;
   - destino;
   - passageiros;
   - envio do briefing pelo WhatsApp, sem backend ou armazenamento.
4. Reforçar prova concreta existente:
   - 40 anos;
   - operação 24/7;
   - três idiomas;
   - clientes corporativos já publicados.

### [MODIFY] `site/assets/index-D7fnJsCl.css`

1. Estilizar seletor de frota, CTAs contextuais e formulário no sistema visual atual.
2. Adicionar estados `hover`, `focus-visible` e `active`.
3. Animar somente `transform` e `opacity`, respeitando `prefers-reduced-motion`.
4. Manter responsividade desktop/mobile.

## Fora do escopo por falta de evidência

- Modelos e especificações individuais da frota.
- Avaliações de clientes.
- Comodidades de bordo.
- Novas páginas SEO.
- Integração com CRM/backend.

## Critérios de sucesso

1. Nenhum dado fictício.
2. Categoria selecionada atualiza conteúdo e CTA.
3. Formulário abre WhatsApp com briefing preenchido e validado.
4. Navegação funciona por teclado e possui foco visível.
5. Layout permanece utilizável em 1440 px e 390 px.
6. `npm run dev` inicia sem erro e página não registra erro de console.
7. Diff restrito a `site/index.html` e CSS, além deste plano.
