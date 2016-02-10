
jest.dontMock('../sum');

describe('sum', function() {
	it('add 1 + 2 = 3 ', function	() {
		var sum = require('../sum');
		expect(sum(1,2)).toBe(3);
	});
});
