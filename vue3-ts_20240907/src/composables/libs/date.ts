import type {ManipulateType} from 'dayjs'
import dayjs, {Dayjs} from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import advancedFormat from 'dayjs/plugin/advancedFormat'

dayjs.extend(isoWeek)
dayjs.extend(advancedFormat)

type dateType = string | number | Date | Dayjs

const makeDate = (date?: dateType, format?: string): Dayjs => {
  if (date) {
    if (typeof date === 'string' && format) {
      return dayjs(date, format)
    } else {
      return dayjs(date)
    }
  } else {
    return dayjs()
  }
}

const dateFormat = (date: dateType, pattern: string) => makeDate(date).format(pattern)

export const cmnDate = {
  makeDate,
  dateFormat,
  plus: (amount: number, unit: ManipulateType, date: dateType): Dayjs =>
    makeDate(date).add(amount, unit),
  minus: (amount: number, unit: ManipulateType, date: dateType): Dayjs =>
    makeDate(date).subtract(amount, unit)
}
