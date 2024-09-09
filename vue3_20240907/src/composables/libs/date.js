import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import advancedFormat from 'dayjs/plugin/advancedFormat'

dayjs.extend(isoWeek)
dayjs.extend(advancedFormat)

const makeDate = (date, format) => {
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

const dateFormat = (date, pattern) => makeDate(date).format(pattern)

export const cmnDate = {
  makeDate,
  dateFormat,
  plus: (amount, unit, date) => makeDate(date).add(amount, unit),
  minus: (amount, unit, date) => makeDate(date).subtract(amount, unit)
}
