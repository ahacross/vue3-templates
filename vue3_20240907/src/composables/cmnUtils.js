export { cmnSort } from './libs/sort'
export { cmnDate } from './libs/date'

export const cmnUtil = {
  delay: (time) => new Promise((resolve) => setTimeout(resolve, time)),

  setStorage: (key, value) => sessionStorage.setItem(key, JSON.stringify(value)),
  getStorage: (key) => {
    const item = sessionStorage.getItem(key)
    return item ? JSON.parse(item) : null
  },
  delStorage: (key) => sessionStorage.removeItem(key),

  randomKey: (length = 7) =>
    Math.random()
      .toString(36)
      .substring(2, 2 + length)
}
