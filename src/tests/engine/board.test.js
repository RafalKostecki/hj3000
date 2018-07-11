import { addToPartOfMap } from '../../engine/board.js'
import { Structure } from '../../engine/structure.js'

it('addToPartOfMap divide map(0)', () => {
	let partsOfMap = [
		[],
		[],
		[]
	];

	
	const struct = new Structure();
	struct.createStruct(30, 30, 0, 100);
	addToPartOfMap(partsOfMap, struct, 1500)

  expect(
		partsOfMap[0].length	
	).toBe(1)
	
})