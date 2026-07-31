# Betinhos Site — instruções locais

## Fonte visual

- A identidade visual deste site é a implementação publicada em `site/`: marca, tipografia, paleta, composição, motion e componentes já existentes.
- Não aplique o design system do repositório pai a este projeto. Ele não é a fonte de verdade visual deste site.
- Antes de mudar UI, inspecione os estilos e componentes locais; preserve a identidade do site e os contratos de markup, links e comportamento.

## Internacionalização

- O site suporta `pt`, `en` e `es`. O seletor de idioma é funcional e obrigatório em desktop e mobile.
- Português (`pt`) é a fonte de verdade de todo texto. Qualquer criação, alteração ou remoção de texto em `pt` exige espelho equivalente traduzido em `en` e `es`, na mesma mudança.
- Todo texto visível, `title`, `aria-label`, `alt`, placeholder, metadado e mensagem de ação deve ter traduções completas em `site/i18n.js` para os três idiomas. Não introduza texto fixo em um único idioma.
- Use a mesma chave de tradução em todos os idiomas e conecte-a ao DOM. Conteúdo dinâmico, links de WhatsApp, formulários e estados de interface devem respeitar o idioma ativo.
- Preserve a sincronização entre `lang` na URL, `localStorage`, `document.documentElement.lang` e os dois seletores de idioma.
- Ao alterar o seletor, valide troca nos três idiomas, persistência após recarregar, navegação voltar/avançar e acessibilidade (`aria-pressed`, rótulos e foco).
