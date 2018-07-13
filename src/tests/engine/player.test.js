import { Player, checkGainedPoints } from '../../engine/player.js'
import { GainPoint } from '../../engine/gainPoint.js'


const player = new Player
const gainPoint = new GainPoint
player.createStruct(20, 40, 100, 200)

it ('Player: clearGainedPoints method', () => {
  player.gainedPoints = [0, 4, 6, 1]
  player.clearGainedPoints()

  expect(player.gainedPoints).toEqual([])
})

it ('Player: checkGainedPoints method', () => {
	player.gainedPoints = [0]
  expect(checkGainedPoints(player, gainPoint)).toBe(true)
})

it ('Char: move method (Example 1)', () => {
	player.move(0, player, 5)
  expect(player.A).toEqual([95, 240])
})

it ('Char: move method (Example 2)', () => {
	player.move(1, player, 10)
  expect(player.A).toEqual([105, 240])
})