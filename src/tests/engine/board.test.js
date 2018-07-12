import { Board, addToPartOfMap } from '../../engine/board.js'
import { Structure } from '../../engine/structure.js'

let partsOfMap = [
	[],
	[],
	[]
];
const struct = new Structure();

it('addToPartOfMap divide map(0)', () => {
	struct.createStruct(30, 30, 0, 100);
	addToPartOfMap(partsOfMap, struct, 1500)

  expect(
		partsOfMap[0].length	
	).toBe(1)
})

it('addToPartOfMap divide map(1)', () => {
	struct.createStruct(30, 30, 1110, 100);
	addToPartOfMap(partsOfMap, struct, 3000)

	expect(
		partsOfMap[1].length	
	).toBe(1)
})

it('addToPartOfMap divide map(2)', () => {
	struct.createStruct(30, 30, 900, 100);
	addToPartOfMap(partsOfMap, struct, 1200)

  expect(
		partsOfMap[2].length	
	).toBe(1)
})

const boards = [
	{
		"name":"testBoard",
		"checked":true,
		"player":{"x":40,"y":70},
		"board":
		{
			"width":2100,
			"height":900
		},
		"gainPoints":
		[
			{"x":700,"y":240},
			{"x":975,"y":280}
		],
		"endPoint":
		{
			"x":1170,
			"y":492
		},"ladders":
		[
			{
				"x":1105,
				"y":60,
				"height":440
			}
		],
		"structures":
		[
			{"width":50,"height":30,"x":780,"y":320}
		]
	}
];

const board = new Board(0, boards)

it ('Board class lvl property', () => {
	expect(board.level).toBe(0)
})

it ('Board class quentityOfLevels property', () => {
	expect(board.quantityOfLvls).toBe(1)
})

it ('Board class requiredPoints property', () => {
	expect(board.requiredPoints).toBe(2)
})

it ('Board class endPoint property', () => {
	expect(board.endPoint).toBe(boards[0].endPoint)
})

it ('Board class width property', () => {
	expect(board.width).toBe(2100)
})

it ('Board class height property', () => {
	expect(board.height).toBe(900)
})