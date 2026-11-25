# Aula 02 — orquestração

Este arquivo diz **como** a aula 02 é montada. Ele não tem conteúdo: todo o conteúdo mora
em [`docs/`](docs/). Se algo aqui contradiz `docs/`, vale `docs/`.

Regras gerais do repositório (slides, design system, armadilhas do Slidev, estrutura de
`referencias/`): [`AGENTS.md`](../../AGENTS.md) da raiz.

## Alvos

| | |
|---|---|
| Deck | `aulas/aula-02-como-uma-bicicleta-se-equilibra.md` |
| Conteúdo | `referencias/aula-02/docs/` — ponto de entrada: [`docs/index.md`](docs/index.md) |
| Apoio citável | `referencias/aula-02/externos/` |
| Apoio só para consulta | `referencias/aula-02/privados/` (não versionado) |

## Ordem de leitura

Leia `docs/` nesta ordem antes de mexer no deck. Mantenha a lista em dia quando um artigo for
criado, renomeado ou dividido em pasta.

1. [`docs/index.md`](docs/index.md)
2. [`docs/01-o-mito-do-giroscopio.md`](docs/01-o-mito-do-giroscopio.md)

## Roteiro da aula

Cada linha é um bloco da aula: de onde vem o conteúdo e como ele vira slide. A coluna
"Layout" usa os layouts de `docs/design-system.md`.

| # | Bloco | Fonte em `docs/` | Layout / componentes | Observação |
|---|---|---|---|---|
| 1 | Abertura | `index.md` | `capa` | |
| 2 | O mito | `01-o-mito-do-giroscopio.md` | `destaque` | |
| 3 | O que de fato segura | `01-o-mito-do-giroscopio.md` | `Grade` | |

## Como montar

1. Ler `docs/` na ordem acima. Não inventar conteúdo que não esteja lá — se faltar, apontar o
   que falta em vez de preencher.
2. Seguir o roteiro, bloco a bloco, no deck `aulas/aula-02-como-uma-bicicleta-se-equilibra.md`.
3. Imagens vão em `aulas/public/`; créditos e fontes vêm de `docs/` ou `externos/`.
4. Rodar `npm run lint` e conferir com `npm run dev -- 02`.

## Regras de fonte

- `externos/`: pode ser citado e referenciado nos slides e em `docs/`, sempre com a fonte.
- `privados/`: material com direitos autorais. Serve para consulta e para embasar o texto
  autoral; **nunca** copiar trechos, imagens ou tabelas para `docs/`, para o deck ou para
  qualquer arquivo versionado.
