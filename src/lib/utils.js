export const cols = size => [...new Array(size)].map(() => false);

export const createGrid = size => cols(size).map((_x, _i, row) => row.slice());

export const createRandomGrid = size =>
	createGrid(size).map(row => row.map(() => Math.random() >= 0.8));

export const sleep = ms => new Promise(r => setTimeout(r, ms));
