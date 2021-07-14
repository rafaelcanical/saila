import { writable } from 'svelte/store'

/**
 * Theme
 */
const storedTheme = localStorage.getItem('theme')
export const theme = writable(storedTheme)

theme.subscribe((value) => {
  localStorage.setItem('theme', value === 'dark' ? 'dark' : 'light')
})

/**
 * Aliases
 */
export const aliases = writable(window.aliases)
