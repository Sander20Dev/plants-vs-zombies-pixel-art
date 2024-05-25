export const ui = document.querySelector('#ui')!

export function setUpUI() {
  ui.className = ''
}
export function clearUI() {
  ui.innerHTML = ''
  ui.className = 'disabled'
}
