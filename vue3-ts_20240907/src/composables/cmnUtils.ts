export { cmnDate } from './libs/date'
export { cmnSort } from './libs/sort'

export const cmnUtil = {
  delay: (time: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, time)),

  setStorage: (key: string, value: any): void => sessionStorage.setItem(key, JSON.stringify(value)),
  getStorage: (key: string): any | null => {
    const item = sessionStorage.getItem(key)
    return item ? JSON.parse(item) : null
  },
  delStorage: (key: string): void => sessionStorage.removeItem(key),

  randomKey: (length: number = 7) =>
    Math.random()
      .toString(36)
      .substring(2, 2 + length)
}
