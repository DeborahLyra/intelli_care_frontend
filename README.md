# Clínica App — protótipo de front-end

Telas alinhadas com o backend real (visto nos mocks do responsável pelo back):

- `/login` — login (sem sidebar)
- `/metricas` — Agendamentos / Métricas: economia de IA (respostas por regra, cache, IA, fallback) + painel de agendamentos com cancelamento
- `/conversas` — lista de conversas (filtros Todas/Bot/Aguardando/Humano) + chat com "Assumir atendimento"
- `/minha-clinica` — dados da clínica e base de conhecimento em texto/markdown usada pela IA
- `/servicos` — catálogo de serviços (preço/duração) usado pela IA
- `/canais` — status de Instagram e WhatsApp
- `/clinicas` — (admin) lista e criação de clínicas — sistema é multi-tenant
- `/usuarios` — (admin) lista e criação de usuários por clínica

Telas extras que eu tinha desenhado antes mas o backend ainda não expõe (deixei no menu, marcadas como "em desenho"):
- `/pacientes`, `/medicos`

## Como rodar

```bash
npm install
npm run dev
```

## Observações importantes

- **Integração com a Amigo: status incerto.** A clínica agenda pela Amigo, mas não está confirmado se o back já integrou. O painel "Agendamentos — painel provisório" (com status `confirmed`/`cancelled` e cancelamento manual) parece ser um controle temporário enquanto isso não sai — deixei um aviso visual na tela `/metricas` pra não passar a ideia de que é o sistema definitivo. **Preciso confirmar com o back**: (1) se a integração está planejada/em andamento, (2) o que muda na tela quando ela existir (provavelmente os agendamentos passam a vir da API da Amigo em vez dessa tabela manual).
- **É multi-clínica.** Existe um papel de admin que vê `/clinicas` e `/usuarios` de todo o sistema; um usuário comum ("preso a uma clínica") provavelmente não deveria ver essas duas telas — isso ainda precisa ser implementado como controle de acesso real (por enquanto está tudo visível no front).
- Os dados nas telas são mockados a partir do que apareceu nos prints — troque pelos endpoints reais quando o back expuser a API.
