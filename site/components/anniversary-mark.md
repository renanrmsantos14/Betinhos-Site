# Betinhos Anniversary Mark

Componente nativo reutilizável para assinaturas comemorativas.

## Dependências

```html
<link rel="stylesheet" href="/anniversary-mark.css" />
<script src="/anniversary-mark.js" defer></script>
```

## Uso

```html
<betinhos-anniversary
  years="40"
  label="Anos"
  tone="dark"
  size="lg"
  variant="panel"
></betinhos-anniversary>
```

## API

| Atributo | Valores | Função |
| --- | --- | --- |
| `years` | número de 1 a 4 dígitos | Número principal; padrão `40` |
| `label` | texto | Legenda sobreposta ao número |
| `message` | texto | Mensagem de apoio opcional |
| `since` | texto | Assinatura histórica opcional |
| `values` | texto | Valores institucionais opcionais |
| `href` | URL/âncora | Destino do link opcional |
| `link-label` | texto | Rótulo do link opcional |
| `tone` | `dark`, `light`, `transparent` | Contraste da superfície |
| `size` | `sm`, `md`, `lg` | Escala do número |
| `variant` | `panel`, `hero` | Composição pronta |
| `compact` | booleano | Exibe somente número e legenda |

As variáveis `--anniversary-background`, `--anniversary-outline`,
`--anniversary-label`, `--anniversary-text` e `--anniversary-border` permitem
ajuste contextual sem alterar a estrutura.

Showcase visual: `/components/anniversary-mark.html`.
