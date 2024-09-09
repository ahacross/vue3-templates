import { sortFn } from './libs/sort.js'

export const cmnUtils = {
  delay: (time) => new Promise((resolve) => setTimeout(resolve, time)),

  setStorage: (key, value) => sessionStorage.setItem(key, JSON.stringify(value)),
  getStorage: (key) => JSON.parse(sessionStorage.getItem(key)),
  delStorage: (key) => sessionStorage.removeItem(key),

  randomKey: (length = 7) =>
    Math.random()
      .toString(36)
      .substring(2, 2 + length),

  sort: sortFn
}

export { cmnDate } from './libs/date.js'
