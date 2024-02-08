import test from 'ava';

import deepCompare from '../../src/index.js';

const macro = (t, a, b, expected) => {
	const result = deepCompare(a, b);
	t.is(expected, result);
	const reversedResult = deepCompare(b, a);
	t.is(-expected || 0, reversedResult);
};

const repr = (x) => {
	if (x instanceof RegExp) return x.toString();
	if (x instanceof Date) return `Date(${x.getTime()})`;
	if (x instanceof Function) return x.toString();
	if (typeof x === 'bigint') return `${x.toString()}n`;
	if (typeof x === 'number') return x.toString();
	return JSON.stringify(x);
};

const expectedSymbol = (expected) => {
	return expected < 0 ? '<' : expected > 0 ? '>' : '=';
};

macro.title = (title, a, b, expected) =>
	title || `${repr(a)} ${expectedSymbol(expected)} ${repr(b)}`;

test(macro, true, true, 0);
test(macro, true, false, 1);
test(macro, false, true, -1);
test(macro, false, false, 0);
test(macro, true, 1, -1);
test(macro, true, 0, -1);
test(macro, false, 1, -1);
test(macro, false, 0, -1);
test(macro, Number.NaN, Number.NaN, 0);
test(macro, Number.NaN, 0, 1);
test(macro, Number.NaN, 1, 1);
test(macro, Number.NaN, -1, 1);
test(macro, Number.NaN, Number.POSITIVE_INFINITY, 1);
test(macro, Number.NaN, Number.NEGATIVE_INFINITY, 1);
test(macro, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, 0);
test(macro, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, 0);
test(macro, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, -1);
test(macro, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, 1);
test(macro, 1, Number.POSITIVE_INFINITY, -1);
test(macro, -1, Number.NEGATIVE_INFINITY, 1);
test(macro, -1, Number.POSITIVE_INFINITY, -1);
test(macro, 1, Number.NEGATIVE_INFINITY, 1);
test(macro, 1, true, 1);
test(macro, 1, false, 1);
test(macro, 0, true, 1);
test(macro, 0, false, 1);
test(macro, 1, 1, 0);
test(macro, 0, 1, -1);
test(macro, 1, 0, 1);
test(macro, 1, '', -1);
test(macro, '', 1, 1);
test(macro, '', '', 0);
test(macro, '', 'a', -1);
test(macro, 'a', '', 1);
test(macro, 'a', 'a', 0);
test(macro, 'a', undefined, -1);
test(macro, undefined, 'a', 1);
test(macro, undefined, undefined, 0);
test(macro, [undefined], [undefined], 0);
test(macro, null, null, 0);
test(macro, null, undefined, -1);
test(macro, undefined, null, 1);
test(macro, undefined, {}, 1);
test(macro, {}, undefined, -1);
test(macro, null, {}, -1);
test(macro, {}, {}, 0);
test(macro, {}, {a: 1}, -1);
test(macro, {a: 1}, {}, 1);
test(macro, {a: 1}, {a: 1}, 0);
test(macro, {a: 1}, {b: 1}, -1);
test(macro, {a: 1, b: 2}, {b: 2, a: 1}, 0);
test(macro, {c: {a: 1, b: 2}}, {c: {b: 2, a: 1}}, 0);
test(macro, /s/, /s/, 0);
test(macro, /s/, /sa/, -1);
test(macro, /sa/, /s/, 1);
test(macro, new Date(0), new Date(0), 0);
test(macro, new Date(0), new Date(1), -1);
test(macro, new Date(1), new Date(0), 1);
test(macro, new Date(1), /s/, -1);
test(macro, /s/, new Date(1), 1);
test(macro, [], [], 0);
test(macro, [], [1], -1);
test(macro, [], [-1], -1);
test(macro, [1, 2, 3], [1, 2, 3], 0);
test(macro, [3, 2, 1], [1, 2, 3], 1);
test(macro, [1, 2, 3, 4], [1, 2, 3], 1);
test(macro, [1, 2, 3, 4], [7, 8, 9], 1);
test(
	macro,
	() => undefined,
	() => undefined,
	0,
);
test(
	macro,
	() => undefined,
	() => 1,
	1,
);
test(
	macro,
	() => 1,
	() => undefined,
	-1,
);
test(
	macro,
	() => 1,
	() => 1,
	0,
);
// Test(macro, function () { return 1 }, () => 1, ?); // babel duplicate

test('circular x = {x: x}', (t) => {
	const x = {};
	x.x = x;
	t.is(deepCompare(x, x), 0);
});

test('circular x = y', (t) => {
	const x = {};
	x.x = x;
	const y = {};
	y.x = y;
	t.is(deepCompare(x, y), 0);
	t.is(deepCompare(y, x), 0);
});

test('circular x < z', (t) => {
	const x = {x: 0, z: 0};
	x.y = x;
	const z = {x: 0, z: 1};
	z.y = z;
	t.is(deepCompare(x, z), -1);
	t.is(deepCompare(z, x), 1);
});

test('circular x = z', (t) => {
	const x = {x: 0, z: 0};
	x.y = x;
	const z = {x: 0, z: 0};
	z.y = z;
	t.is(deepCompare(x, z), 0);
	t.is(deepCompare(z, x), 0);
});

test('circular a = b', (t) => {
	const a = [1, 2, 3];
	const b = [1, 2, 3];
	a[1] = b;
	b[1] = a;
	t.is(deepCompare(a, b), 0);
	t.is(deepCompare(b, a), 0);
});

test('circular a < b', (t) => {
	const a = [1, 2, 3];
	const b = [1, 2, 4];
	a[1] = b;
	b[1] = a;
	t.is(deepCompare(a, b), -1);
	t.is(deepCompare(b, a), 1);
});

test('README', (t) => {
	const values = [
		[1, 2, 3],
		0,
		undefined,
		{x: 1},
		new Date(1),
		null,
		{},
		/abc/,
		new Date(0),
		'abc',
		[],
		Number.NaN,
	];
	const sorted = [
		0,
		Number.NaN,
		null,
		[],
		[1, 2, 3],
		new Date(0),
		new Date(1),
		{},
		{x: 1},
		/abc/,
		'abc',
		undefined,
	];
	const result = values.slice().sort(deepCompare);
	t.deepEqual(sorted, result);
});
