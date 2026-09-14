# Auditoria SEO — primeira onda SJC

Data: 14/09/2026. Base de código: `origin/develop` (`eb24b2f`).

## Evidências verificadas

- Home publicada em `https://betinhos.com.br/` com H1 institucional, `Organization`, `Service` e `WebSite`.
- Produção e repositório expunham slugs legados (`/osservicos`, `/contato`, `/tradicao`, `/missaovisaoevalores`) sem redirecionamento; `.htaccess` agora cobre os quatro em um salto.
- O FTP da Locaweb enviava toda a pasta `site`, incluindo `dist/` e protótipos HTML. O workflow agora publica apenas o pacote allowlistado.
- Não foram encontrados IDs de GTM/GA4 no repositório; eventos foram preparados no `dataLayer` com consentimento negado por padrão, sem PII.
- Não há acesso fornecido nesta execução a GSC, GA4/GTM, GBP, CWV de campo ou consultas orgânicas. Não há pontuação nem metas percentuais.

## Riscos abertos

Confirmar no GSC o inventário de URLs antigas e cobertura; confirmar no GBP NAP, endereço, horários e coordenadas antes de adicionar `LocalBusiness`; configurar o container GTM/GA4 existente; validar HTTP e CWV após publicação.
