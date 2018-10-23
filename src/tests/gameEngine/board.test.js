import { Board, addToPartOfMap } from '../../gameEngine/board.js'
import { Structure } from '../../gameEngine/structure.js'


let partsOfMap = [
	[],
	[],
	[]
];
const struct = new Structure();

it('Board: addToPartOfMap divide map (Example 0)', () => {
	struct.createStruct(30, 30, 0, 100);
	addToPartOfMap(partsOfMap, struct, 1500)

  expect(
		partsOfMap[0].length	
	).toBe(1)
})

it('Board: addToPartOfMap divide map (Example 1)', () => {
	struct.createStruct(30, 30, 1110, 100);
	addToPartOfMap(partsOfMap, struct, 3000)

	expect(
		partsOfMap[1].length	
	).toBe(1)
})

it('Board: addToPartOfMap divide map (Example 2)', () => {
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
			"height":1000
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
	},
	{
		"name":"testBoard2",
		"checked":true,
		"player":{"x":40,"y":70},
		"board":
		{
			"width":2300,
			"height":900
		},
		"gainPoints": [],
		"endPoint": {},
		"ladders": [],
		"structures": []
	}
];

const board = new Board(0, boards)

it ('Board class: lvl property', () => {
	expect(board.level).toBe(0)
})

it ('Board class: quentityOfLevels property', () => {
	expect(board.quantityOfLvls).toBe(2)
})

it ('Board class: requiredPoints property', () => {
	expect(board.requiredPoints).toBe(2)
})

it ('Board class: endPoint property', () => {
	expect(board.endPoint).toBe(boards[0].endPoint)
})

it ('Board class: width property', () => {
	expect(board.width).toBe(2100)
})

it ('Board class: height property', () => {
	expect(board.height).toBe(1000)
})

it ('Board class: addStruct func and structs property', () => {
	board.addScruct(struct)
	expect(board.structs.length).toBe(1)
})

it ('Board class: addGainPoints func and gainPoints property', () => {
	board.addGainPoints(boards, false)
	expect(board.gainPoints.length).toBe(2)
})

it ('Board class: addLadders func and ladders property', () => {
	board.addLadders(boards, false)
	expect(board.ladders.length).toBe(1)
})

it ('Boards sizes (Example width)', () => {
	expect(Board.prototype.theSmallestSize(0, boards)).toBe(2100);
})

it ('Boards sizes (Example height)', () => {
	expect(Board.prototype.theSmallestSize(1, boards)).toBe(900);
})