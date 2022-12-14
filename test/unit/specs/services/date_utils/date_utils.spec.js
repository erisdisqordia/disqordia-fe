import * as DateUtils from 'src/services/date_utils/date_utils.js'

describe('DateUtils', () => {
  describe('relativeTime', () => {
    it('returns now with low enough amount of seconds', () => {
      const futureTime = Date.now() + 20 * DateUtils.SECOND
      const pastTime = Date.now() - 20 * DateUtils.SECOND
      expect(DateUtils.relativeTime(futureTime, 30)).to.eql({ num: 0, key: 'time.now', direction: '' })
      expect(DateUtils.relativeTime(pastTime, 30)).to.eql({ num: 0, key: 'time.now', direction: '' })
    })

    it('rounds down for past', () => {
      const time = Date.now() - 1.8 * DateUtils.HOUR
      expect(DateUtils.relativeTime(time)).to.eql({ num: 1, key: 'time.unit.hours', direction: 'time.in_past' })
    })

    it('rounds up for future', () => {
      const time = Date.now() + 1.8 * DateUtils.HOUR
      expect(DateUtils.relativeTime(time)).to.eql({ num: 2, key: 'time.unit.hours', direction: 'time.in_future' })
    })

    it('uses plural when necessary', () => {
      const time = Date.now() - 3.8 * DateUtils.WEEK
      expect(DateUtils.relativeTime(time)).to.eql({ num: 3, key: 'time.unit.weeks', direction: 'time.in_past' })
    })

    it('works with date string', () => {
      const time = Date.now() - 4 * DateUtils.MONTH
      const dateString = new Date(time).toISOString()
      expect(DateUtils.relativeTime(dateString)).to.eql({ num: 4, key: 'time.unit.months', direction: 'time.in_past' })
    })
  })

  describe('relativeTimeShort', () => {
    it('returns the short version of the same relative time', () => {
      const time = Date.now() + 2 * DateUtils.YEAR
      expect(DateUtils.relativeTimeShort(time)).to.eql({ num: 2, key: 'time.unit.years_short', direction: 'time.in_future' })
    })
  })
})
