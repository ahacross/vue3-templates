type SortOrder = 'asc' | 'desc'
type SortType = 'number' | 'date'

interface SortOptions {
  type?: SortType
  key?: string
}

const asc = (a: any, b: any): number => (a === b ? 0 : a > b ? 1 : -1)
const desc = (a: any, b: any): number => (a === b ? 0 : a < b ? 1 : -1)

const getTime = (date: string | number | Date): number => Number(cmnDate.dateFormat(date, 'x'))

const firstUpper = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1)

const sortMap = new Map<string, (a: any, b: any) => number>()
sortMap.set('asc', asc)
sortMap.set('desc', desc)
sortMap.set('ascNumber', (a: any, b: any) => asc(Number(a), Number(b)))
sortMap.set('descNumber', (a: any, b: any) => desc(Number(a), Number(b)))
sortMap.set('ascDate', (a: any, b: any) => asc(getTime(a), getTime(b)))
sortMap.set('descDate', (a: any, b: any) => desc(getTime(a), getTime(b)))

const getData = (data: Record<string, any>, key: string): any => data[key]

const sortKey =
  ({ mapKey, key }: { mapKey: string; key: string }) =>
  (a: Record<string, any>, b: Record<string, any>) =>
    sortMap.get(mapKey)!(getData(a, key), getData(b, key))

/**
 * 정렬 함수.
 *
 * @param {String} orderBy - 정렬 방향을 결정합니다. 'asc'는 오름차순, 'desc'는 내림차순입니다.
 * @param {Object} options - 정렬에 대한 옵션입니다.
 * @param {String} options.type - 정렬에 대한 데이터 타입입니다. 'number'는 숫자 정렬, 'date'는 날짜시간 정렬입니다.
 * @param {String} options.key - 정렬할 객체의 키입니다.
 */
export const cmnSort = (orderBy: SortOrder, options: SortOptions) => {
  const mapKey = `${orderBy}${options.type ? firstUpper(options.type) : ''}`
  const key = options.key
  if (key) {
    return sortKey({ key, mapKey })
  } else {
    return sortMap.get(mapKey)
  }
}
