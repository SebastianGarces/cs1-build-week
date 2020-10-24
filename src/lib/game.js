const newKey = size => key => {
	if (key === -1) {
		return size - 1;
	}
	if (key === size) {
		return 0;
	}
	return key;
};

const newKeys = (size, keys) => keys.map(newKey(size));

const getAdjecentCells = ({ y, x }) =>
	[-1, 0, 1].reduce(
		(acc, $y, _, offset) =>
			offset.reduce(
				(accB, $x) => ($x || $y ? [...accB, [y + $y, x + $x]] : accB),
				acc
			),
		[]
	);

const getValues = grid => position => {
	const getValue = ([y, x]) => grid[y][x];
	return getValue(newKeys(grid.length, position));
};

export const getNeighbors = (grid, position) => {
	const adjecentCells = getAdjecentCells(position);
	const aliveNeighbors = adjecentCells.filter(position =>
		Boolean(getValues(grid)(position))
	);

	return aliveNeighbors.length;
};

export const willLive = (isAlive, neighbours) =>
	isAlive ? neighbours >= 2 && neighbours <= 3 : neighbours === 3;

export const nextState = grid =>
	grid.map((row, y) =>
		row.map((column, x) =>
			willLive(Boolean(column), getNeighbors(grid, { y, x }))
		)
	);

export const toggleCell = ({ y, x }, current, grid) => {
	const $grid = grid.slice();
	grid[y][x] = !current;
	return $grid;
};
