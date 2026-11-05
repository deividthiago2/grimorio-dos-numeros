# O Grimório dos Números

RPG de matemática para estudantes do 1º ao 6º ano. Cada conta certa é um feitiço: atravesse as constelações, vença os guardiões e devolva a luz à Coroa Astral.

## Como jogar

1. Abra `index.html` no navegador.
2. Escolha o ano escolar. O grimório ajusta as contas ao ano e ao ritmo do jogador.
3. Avance pela Trilha das Constelações e responda às contas para derrotar cada guardião.
4. Use as teclas `1`–`4` ou toque nas respostas. A poção restaura vida durante a batalha.
5. O progresso fica salvo no próprio navegador (`localStorage`).

## Estrutura

- `index.html` — telas e marcação do jogo.
- `game.js` — lógica das batalhas, geração das contas, progressão e contrato com o portal.
- `style.css` — visual do grimório, com temas claro e escuro.
- `manifest.json` — dados do jogo para o portal.
- `cover.svg` — capa 16:9.
- `README.md` — este arquivo.

## Contrato com o portal (Jogos VR)

O jogo já segue o contrato do modelo:

- Envia `{ type: "vrgame:ready" }` quando carrega.
- Envia `{ type: "vrgame:finish", score, maxScore, timeMs, detail }` ao fim de **cada batalha** (vitória ou derrota). O `detail` inclui ano, selo, guardião, acertos, erros, precisão, XP e se a campanha foi concluída.
- Responde a `{ type: "vrgame:theme", theme }` alternando entre `light` e `dark`.
- Responde a `{ type: "vrgame:fullscreen", fullscreen }`.
- Informa a altura da página com `{ type: "vrgame:resize", height }`.

O jogo não usa links externos, bibliotecas da internet nem coleta dados. As fontes são do próprio sistema para respeitar essa regra.

## Publicar no portal

1. Renomeie a pasta para `grimorio-dos-numeros`, igual ao `slug` do `manifest.json`.
2. Confira os dados de autor e turma no `manifest.json`.
3. Teste no computador e no celular.
4. Compacte a pasta em `.zip` e entregue ao professor.
