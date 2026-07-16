# GLP-1 PeriOp — SAHISC

App simples (React Native + Expo) que orienta médicos sobre suspensão de agonistas do
receptor GLP-1 / coagonistas GLP-1/GIP no perioperatório, jejum e dieta pré-operatória —
com base exclusivamente na **Nota SBA C.SBA-01744/2026** (15/05/2026).

100% local: nenhuma resposta do questionário sai do celular, não há backend, login ou
coleta de dados.

## Rodando pela primeira vez

Este projeto foi criado sem rodar `npm install`, então o primeiro passo é instalar as
dependências.

1. **Instalar Node.js** (se ainda não tiver):
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   brew install node
   ```
2. **Instalar as dependências do projeto:**
   ```bash
   cd ~/Desktop/App-GLP1-Perioperatorio
   npm install
   ```
3. **Corrigir versões para o SDK do Expo instalado** (as versões no `package.json` foram
   escritas à mão — esse comando garante que tudo fique compatível):
   ```bash
   npx expo install --fix
   ```
4. **Rodar o app:**
   ```bash
   npx expo start
   ```
   Escaneie o QR code com o app **Expo Go** (disponível na App Store e no Google Play) no
   seu celular para testar imediatamente, sem precisar de Mac com Xcode ou Android Studio.

## Estrutura do projeto

- `app/` — telas (expo-router, roteamento por arquivo)
  - `index.tsx` — tela inicial (escolha paciente/médico)
  - `questionario/medicamento.tsx` — medicamento, tempo de uso, escalonamento de dose
  - `questionario/sintomas-risco.tsx` — sintomas e fatores de risco
  - `questionario/cirurgia.tsx` — data da cirurgia e disponibilidade de POCUS gástrico
  - `resultado.tsx` — recomendação final, com opção de gerar PDF resumo (via `expo-print` + `expo-sharing`, para salvar/enviar)
  - `bibliografia.tsx` — referências completas do protocolo
- `src/logic/regras.ts` — **motor de decisão**, único lugar que implementa a lógica
  clínica do fluxograma da SBA. Se o protocolo for atualizado, é aqui (e em
  `src/data/medicamentos.ts` / `src/data/fatoresRisco.ts`) que as mudanças entram.
- `src/data/` — medicamentos, fatores de risco e referências bibliográficas
- `src/state/QuestionarioContext.tsx` — guarda as respostas do usuário durante o fluxo

## Escopo do que o app decide (e o que não decide)

O app calcula os **Passos 1 a 4** do fluxograma da SBA:
- Se deve manter ou suspender o medicamento, e a partir de que data
- O preparo pré-operatório universal (dieta líquida 24h + jejum 8-12h)

O app **não** decide o Passo 5 em diante (avaliação por POCUS gástrico no dia da
cirurgia, uso de procinético, técnica de intubação) — isso é responsabilidade da equipe
de anestesia no momento do procedimento, com base em achados que só existem no dia. O
app apenas informa que essa etapa existe.

## Publicando na App Store e Google Play

Quando o app estiver pronto para publicar (fora do MVP de teste via Expo Go), o caminho
mais simples e barato é o **EAS Build** da própria Expo:

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --platform ios
eas build --platform android
```

Antes de submeter:
- Trocar `bundleIdentifier` (iOS) e `package` (Android) no `app.json` para um identificador
  próprio (ex.: `com.seunome.glp1perioperatorio`)
- Criar ícone (`assets/icon.png`, 1024x1024) e splash screen — não incluídos neste MVP
- Conta de desenvolvedor Apple (~US$99/ano) e Google Play (~US$25 taxa única)
- `eas submit` para enviar o build às lojas

## Aviso

Este aplicativo não é um dispositivo médico e não substitui o julgamento do médico
anestesiologista responsável pelo caso. A recomendação é gerada exclusivamente a partir
do protocolo carregado em `src/data/` e `src/logic/regras.ts`.
