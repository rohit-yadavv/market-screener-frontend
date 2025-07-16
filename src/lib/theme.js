export const setTheme = (themeName) => {
  localStorage.setItem("theme", themeName)
  document.documentElement.className = themeName
}

export const initTheme = () => {
  const theme = localStorage.getItem("theme") || "default-light"
  document.documentElement.className = theme
}
