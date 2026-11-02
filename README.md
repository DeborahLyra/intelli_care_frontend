# IntelliCare — demonstração do frontend

Painel de atendimento em Next.js, React e Tailwind. Funciona sem backend com dados fictícios persistidos no navegador.

## Executar

```bash
npm ci
npm run dev
```

Abra http://localhost:3000 e selecione **Entrar na demonstração**. A entrada cria uma sessão demonstrativa na aba; não representa autenticação real. O botão **Sair** encerra essa sessão sem apagar os cadastros locais.

## Funcionalidades

- Cadastros de clínicas, usuários, serviços, pacientes e equipe com busca, criação, edição, remoção e validação.
- Seleção de clínica; registros, conversas e canais separados por clínica. Clínicas com registros vinculados não podem ser removidas.
- Edição dos dados da clínica com confirmação de gravação.
- Agendamentos com criação, filtro, cancelamento persistido e validação de sobreposição. A demonstração considera uma agenda única por clínica.
- Indicadores calculados a partir dos agendamentos locais.
- Conversas com históricos individuais, filtro por status, transferência simulada entre bot e atendente, envio local, encerramento e reabertura.
- Canais com conexão/desconexão simulada. Não gera QR Code real nem conecta contas externas.
- Menu para celular, tabelas com rolagem horizontal, temas claro/escuro, navegação por teclado e estados de carregamento, erro e ausência de resultados.

Use apenas informações fictícias. Não há comunicação com WhatsApp, Instagram, IA ou sistemas de agendamento externos. Os papéis de usuário são dados da demonstração, sem autorização real. Senhas não são solicitadas nem armazenadas.

## Dados e futura API

`lib/demo.ts` define os modelos, exemplos e a interface assíncrona `DemoRepository`. Seu adaptador atual lê e grava `localStorage`, na chave `intellicare-demo-v1`. As telas usam o contexto em `components/demo/Provider.tsx`, que centraliza carregamento, gravação e notificações. `lib/appointments.ts` contém a validação de intervalos da agenda.

Quando o contrato do backend estiver disponível, substitua o adaptador por chamadas HTTP e ajuste os modelos ao contrato real. Autenticação, autorização por clínica/papel, validação definitiva de agenda e integrações externas devem ser implementadas no servidor. A sessão demonstrativa não é uma barreira de segurança.

As alterações ficam neste navegador e origem; não são sincronizadas entre dispositivos ou abas. Para reiniciar, remova a chave `intellicare-demo-v1` no armazenamento do navegador. Se os dados estiverem corrompidos, o aviso da aplicação oferece **Restaurar exemplos**, com confirmação.

## Verificar

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

Os testes verificam persistência, restauração, armazenamento corrompido/bloqueado e conflitos de agendamentos. As fontes usam alternativas locais do sistema, sem downloads durante o build. Caso o ambiente restrinja a abertura de portas internas do Turbopack, use `npm run build -- --webpack` para validar com Webpack.
