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
 * Aliases file path
 */
const storedPath = localStorage.getItem('path')
export const path = writable(storedPath === 'null' ? null : storedPath)

path.subscribe((value) => {
  localStorage.setItem('path', value)
})

/**
 * Aliases
 */
export const aliases = writable([])
export const initialAliases = writable([])
