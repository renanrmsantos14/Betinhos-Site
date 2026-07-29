# Handoff

```text
/make-plan Refine o bloco #seguranca com base em uma auditoria Dieter Rams de 20/30.

Verdict:
O bloco já abandonou o painel artificial e possui uma base editorial coerente, mas precisa trocar o exemplo de quatro eventos por um processo completo, corrigir o desktop e retirar os sinais de status automático.

Keep:
- Princípio #7, 3/3: fundo sólido, tipografia e regras simples. Regressão: confirmar ausência de cards, glows, badges e trilhos.
- Princípio #9, 3/3: JS local abaixo de 100 KB e reduced motion. Regressão: verificar bundle e prefers-reduced-motion.

Fix:
1. Princípio #2 - Utilidade: apresentar as sete etapas solicitadas, do agendamento ao encerramento. Evidência: site/index.html:460-491.
2. Princípio #8 - Detalhe: corrigir a regra que força uma coluna no desktop. Evidência: site/assets/index-D7fnJsCl.css:1949-1952.
3. Princípio #6 - Honestidade: representar etapas habituais, não estados concluídos por timer. Evidência: site/performance.js:86-124.
4. Princípio #10 - Mínimo: remover horários ilustrativos e a troca de destino. Evidência: site/index.html:462-489.
5. Princípio #4 - Clareza: explicar termos operacionais em frases simples. Evidência: site/i18n.js:96-109.

Out of scope:
- Alterações fora de #seguranca.
- Novos cards, ícones, imagens, controles ou bibliotecas.

Deliverables:
- Mudanças exatas em HTML, CSS, JS e i18n.
- Duas colunas no desktop, uma no mobile.
- Stagger curto de leitura e reduced motion.
- QA desktop/mobile, console e build.
```
