# Plano de medição

## Instrumentação

`site/analytics.js` cria `dataLayer`, aplica Consent Mode básico com armazenamento negado por padrão e emite:

- `generate_lead`: `channel`, `placement`, `service_category`, `page_path`, `language`;
- `career_application_submit`: `page_path`, `language`;
- `language_change`: `from_language`, `to_language`, `page_path`.

Nenhum nome, telefone, e-mail, origem, destino ou detalhe de itinerário é enviado.

## Configuração pendente

O ID do container GTM/GA4 existente não foi fornecido e não foi inventado no código. Após recebê-lo, configurar tags, triggers, consentimento e conversões no ambiente GTM.

## Verificação

Antes de publicar: Tag Assistant, DebugView, console, formulário, WhatsApp e troca de idioma em desktop/mobile. Após publicar: GSC URL Inspection, sitemap, cobertura, PSI/CrUX e conversões em janela de campo. Registrar data, propriedade e evidência de cada leitura.
