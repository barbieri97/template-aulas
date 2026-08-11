/**
 * Resolve um caminho de `aulas/public/` contra a base do site.
 *
 * POR QUE ISSO EXISTE (e por que ignorar quebra o deploy):
 *
 * No GitHub Pages o site não fica na raiz do domínio — cada aula é publicada sob
 * `/<repo>/<slug>/`. O Vite reescreve caminhos absolutos para essa base, mas só quando
 * consegue vê-los no HTML em tempo de build: `![](/foto.png)` no markdown, ou
 * `<img src="/foto.png">` escrito literalmente no template.
 *
 * Um caminho que chega por PROP (`<Pessoa foto="/foto.png">`, `src` no frontmatter de um
 * layout) é só uma string em tempo de execução. O Vite não a enxerga, não reescreve nada, e
 * o navegador pede `https://usuario.github.io/foto.png` — 404. Localmente, onde a base é
 * `/`, o mesmo código funciona: o erro só aparece depois de publicado.
 *
 * `import.meta.env.BASE_URL` é a base que o Vite recebeu no build (`--base`). Todo
 * componente ou layout que aceite caminho de imagem por prop precisa passar por aqui.
 */
export function asset (caminho?: string): string | undefined {
  if (!caminho) return caminho
  // Só caminho absoluto de dentro do projeto precisa de base. URL externa ("https://…",
  // "//cdn…") e caminho relativo ficam como estão.
  if (!caminho.startsWith('/') || caminho.startsWith('//')) return caminho
  return import.meta.env.BASE_URL.replace(/\/$/, '') + caminho
}
