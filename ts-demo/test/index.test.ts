import { add } from '../src'

it('Should add work fine', () => {
  expect(add(1, 2)).toBe(3)
  expect(add(3, 5)).toBe(8)
})
