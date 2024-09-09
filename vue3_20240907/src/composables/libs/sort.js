const asc = (a, b) => (a === b ? 0 : a > b ? 1 : -1)
const desc = (a, b) => (a === b ? 0 : a < b ? 1 : -1)

const getTime = (date) => Number(cmnDate.dateFormat(date, 'x'))
const firstUpper = (str) => str.charAt(0).toUpperCase() + str.slice(1)

const sortMap = new Map()
sortMap.set('asc', asc)
sortMap.set('desc', desc)
sortMap.set('ascNumber', (a, b) => asc(Number(a), Number(b)))
sortMap.set('descNumber', (a, b) => desc(Number(a), Number(b)))
sortMap.set('ascDate', (a, b) => asc(getTime(a), getTime(b)))
sortMap.set('descDate', (a, b) => desc(getTime(a), getTime(b)))

const getData = (data, key) => data[key]
const sortKey =
  ({ mapKey, key }) =>
  (a, b) =>
    sortMap.get(mapKey)(getData(a, key), getData(b, key))

/**
 * 정렬 함수.
 *
 * @param {String} orderBy - 정렬 방향을 결정합니다. 'asc'는 오름차순, 'desc'는 내림차순입니다.
 * @param {Object} options - 정렬에 대한 옵션입니다.
 * @param {String} options.type - 정렬에 대한 데이터 타입입니다. 'number'는 숫자 정렬, 'date'는 날짜시간 정렬입니다.
 * @param {String} options.key - 정렬할 객체의 키입니다.
 */
export const sortFn = (orderBy, options) => {
  const mapKey = `${orderBy}${options.type ? firstUpper(options.type) : ''}`
  const key = options.key
  if (key) {
    return sortKey({ ...options, mapKey })
  } else {
    return sortMap.get(mapKey)
  }
}
