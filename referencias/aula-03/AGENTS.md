# Aula 03 — orquestração

Este arquivo diz **como** a aula 03 é montada. Ele não tem conteúdo: todo o conteúdo mora
em [`docs/`](docs/). Se algo aqui contradiz `docs/`, vale `docs/`.

Regras gerais do repositório (slides, design system, armadilhas do Slidev, estrutura de
`referencias/`): [`AGENTS.md`](../../AGENTS.md) da raiz.

## Alvos

| | |
|---|---|
| Deck | `aulas/aula-03-fermentacao-pao-cerveja-e-queijo.md` |
| Conteúdo | `referencias/aula-03/docs/` — ponto de entrada: [`docs/index.md`](docs/index.md) |
| Apoio citável | `referencias/aula-03/externos/` |
| Apoio só para consulta | `referencias/aula-03/privados/` (não versionado) |

## Ordem de leitura

Leia `docs/` nesta ordem antes de mexer no deck. Mantenha a lista em dia quando um artigo for
criado, renomeado ou dividido em pasta.

1. [`docs/index.md`](docs/index.md)
2. [`docs/01-o-que-e-fermentacao.md`](docs/01-o-que-e-fermentacao.md)

## Roteiro da aula

Cada linha é um bloco da aula: de onde vem o conteúdo e como ele vira slide. A coluna
"Layout" usa os layouts de `docs/design-system.md`.

| # | Bloco | Fonte em `docs/` | Layout / componentes | Observação |
|---|---|---|---|---|
| 1 | Abertura | `index.md` | `capa` | |
| 2 | Definição | `01-o-que-e-fermentacao.md` | `destaque` | |
| 3 | Três alimentos | `01-o-que-e-fermentacao.md` | tabela | termos em `externos/glossario.csv` |

## Como montar

1. Ler `docs/` na ordem acima. Não inventar conteúdo que não esteja lá — se faltar, apontar o
   que falta em vez de preencher.
2. Seguir o roteiro, bloco a bloco, no deck `aulas/aula-03-fermentacao-pao-cerveja-e-queijo.md`.
3. Imagens vão em `aulas/public/`; créditos e fontes vêm de `docs/` ou `externos/`.
4. Rodar `npm run lint` e conferir com `npm run dev -- 03`.

## Regras de fonte

- `externos/`: pode ser citado e referenciado nos slides e em `docs/`, sempre com a fonte.
- `privados/`: material com direitos autorais. Serve para consulta e para embasar o texto
  autoral; **nunca** copiar trechos, imagens ou tabelas para `docs/`, para o deck ou para
  qualquer arquivo versionado.
