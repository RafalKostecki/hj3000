import { GainPoint, destroy } from '../../engine/gainPoint.js'

const gainPoint = new GainPoint
const gainPoint1 = new GainPoint
gainPoint.create(30, 20)
gainPoint1.create(15, 550)

it('GainPoint: create method and left&top properties', () => {
	expect(gainPoint.left).toBe(30);
  expect(gainPoint.top).toBe(20);
})

it('GainPoint: id property (Example 1)', () => {
    expect(gainPoint.id).toBe(0)
})

it('GainPoint: id property (Example 2)', () => {
	expect(gainPoint1.id).toBe(1)
})

it('GainPoint: gained property', () => {
	expect(gainPoint.gained).toBe(0)
})