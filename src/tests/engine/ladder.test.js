import { Ladder } from '../../engine/ladder.js'

const ladder = new Ladder();
ladder.createLadder(100, 50, 300); //x, y, height

it('Ladder: top getter', () => {
    expect(ladder.top).toBe(50)
})

it('Ladder: left getter', () => {
    expect(ladder.left).toBe(100)
})

it('Ladder: bottom getter', () => {
    expect(ladder.bottom).toBe(350)
})
