// Tema padrão do VitePress, com a cor de destaque das aulas (aulas/styles/tokens.css).
// O glob não quebra se o design system local for removido: aí fica o azul do VitePress.
import DefaultTheme from 'vitepress/theme'
import './custom.css'

import.meta.glob('../../../aulas/styles/tokens.css', { eager: true })

export default DefaultTheme
