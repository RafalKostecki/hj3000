import { Structure } from '../../engine/structure.js'

const structure = new Structure;
const structure1 = new Structure;
const structure2 = new Structure;
structure.createStruct(100, 30, 200, 300); //width, height, x, y

it('Structure: id property (Example 1', () => {
    expect(structure.id).toBe(0);
})

it('Structure: id property (Example 2', () => {
    expect(structure1.id).toBe(1);
})

it('Structure: id property (Example 3', () => {
    expect(structure2.id).toBe(2);
})

it('Structure: vector property (Example 1)', () => {
    expect(structure.vector).toBe(1);
})

it('Structure: vector property (Example 2', () => {
    expect(structure1.vector).toBe(1);
})

it('Structure: oldVector property', () => {
    expect(structure.oldVector).toBe(null);
})

it('Structure: A getter', () => {
    expect(structure.A).toEqual([200, 330]);
})

it('Structure: B getter', () => {
    expect(structure.B).toEqual([300, 330]);
})

it('Structure: C getter', () => {
    expect(structure.C).toEqual([300, 300]);
})

it('Structure: D getter', () => {
    expect(structure.D).toEqual([200, 300]);
})

it('Structure: width getter', () => {
    expect(structure.width).toBe(100);
})

it('Structure: height getter', () => {
    expect(structure.height).toBe(30);
})

