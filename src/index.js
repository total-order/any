import assert from 'assert';
import {prop} from '@total-order/key';
import {quasilexicographical} from '@total-order/lex';
import {increasing as compare} from '@total-order/primitive';
import {MemoryEfficientPairs as Pairs} from '@collection-abstraction/pairs';

const deepCompare = (a, b) => {
	if (a === b) return 0;

	const left = [[a]];
	const right = [[b]];
	const pos = [0];
	const pendingOrChecked = Pairs.from([]);

	while (left.length > 0) {
		assert(left.length === right.length);
		assert(left.length === pos.length);

		const last = left.length - 1;
		const array_a = left[last];
		const array_b = right[last];
		const i = pos[last];

		assert(array_a.length === array_b.length);
		assert(i >= 0 && i <= array_a.length);
		if (i === array_a.length) {
			left.pop();
			right.pop();
			pos.pop();
			continue;
		}

		++pos[last];

		const _a = array_a[i];
		const _b = array_b[i];
		const typeof_a = typeof _a;
		const typeof_b = typeof _b;

		const delta_type = compare(typeof_a, typeof_b);
		if (delta_type !== 0) return delta_type;

		if (typeof_a !== 'object') {
			const delta_primitive = comparePrimitives(typeof_a, _a, _b);
			if (delta_primitive !== 0) return delta_primitive;
			continue;
		}

		assert(typeof_a === 'object');

		if (_a === null) {
			if (_b === null) continue;
			return -1;
		}

		if (_b === null) {
			return 1;
		}

		if (pendingOrChecked.has([_a, _b])) continue;
		pendingOrChecked.add([_a, _b]);
		pendingOrChecked.add([_b, _a]);

		const constructor_a = a.constructor;
		const constructor_b = b.constructor;

		if (constructor_a !== constructor_b)
			return compare(constructor_a.name, constructor_b.name);

		// TODO typed arrays
		// TODO other built-ins, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects
		switch (constructor_a) {
			case RegExp:
				const delta_regexp = compare(_a.toString(), _b.toString());
				if (delta_regexp !== 0) return delta_regexp;
				continue;
			case Date:
				const delta_date = compare(_a.getTime(), _b.getTime());
				if (delta_date !== 0) return delta_date;
				continue;
			case Array:
				if (_a.length !== _b.length) return _a.length - _b.length;
				left.push(_a);
				right.push(_b);
				pos.push(0);
				continue;
			case Object:
				const keys_a = Object.keys(_a).sort(compare);
				const keys_b = Object.keys(_b).sort(compare);

				const delta_keys = compareStringArrays(keys_a, keys_b);
				if (delta_keys !== 0) return delta_keys;

				const values_a = Object.entries(_a)
					.sort(compareEntries)
					.map((x) => x[1]);
				const values_b = Object.entries(_b)
					.sort(compareEntries)
					.map((x) => x[1]);

				left.push(values_a);
				right.push(values_b);
				pos.push(0);
				continue;
			default:
				throw new Error(
					`deepCompare: unhandled constructor '${constructor_a.name}'`,
				);
		}
	}

	return 0;
};

const comparePrimitives = (kind, _a, _b) => {
	assert(kind !== 'object');
	switch (kind) {
		case 'number':
			if (Number.isNaN(_a)) {
				if (Number.isNaN(_b)) return 0;
				return 1;
			}

			if (Number.isNaN(_b)) {
				return -1;
			}

		case 'boolean':
		case 'string':
		case 'bigint':
			return compare(_a, _b);
		case 'function':
			return compare(_a.toString(), _b.toString());
		default:
			throw new Error(`deepCompare: unhandled primitive type '${kind}'`);
	}
};

const compareEntries = prop(compare, 0);
// Const compareArrays = quasilexicographical(deepCompare);
const compareStringArrays = quasilexicographical(compare);
// Const compareObjects = (a, b) => {
// const keys_a = Object.keys(a).sort(compare);
// const keys_b = Object.keys(b).sort(compare);

// const delta_keys = compareStringArrays(keys_a, keys_b);
// if (delta_keys !== 0) return delta_keys;

// const values_a = Object.entries(a)
// .sort(compareEntries)
// .map((x) => x[1]);
// const values_b = Object.entries(b)
// .sort(compareEntries)
// .map((x) => x[1]);

// return compareArrays(values_a, values_b);
// };

export default deepCompare;
