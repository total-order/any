:clown_face: [total-order](https://total-order.github.io/any)
==

A total order for all JavaScript values.
See [docs](https://total-order.github.io/any/index.html).

> :warning: The code requires `regeneratorRuntime` to be defined, for instance by importing
> [regenerator-runtime/runtime](https://www.npmjs.com/package/regenerator-runtime).

```js
import totalOrder from 'total-order'
[
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
 NaN
].sort(totalOrder)
// [
//  0,
//  NaN,
//  null,
//  [],
//  [1, 2, 3],
//  new Date(0),
//  new Date(1),
//  {},
//  {x: 1},
//  /abc/,
//  'abc',
//  undefined,
// ]
```

[![License](https://img.shields.io/github/license/total-order/any.svg)](https://raw.githubusercontent.com/total-order/any/main/LICENSE)
[![Version](https://img.shields.io/npm/v/total-order.svg)](https://www.npmjs.org/package/total-order)
[![Tests](https://img.shields.io/github/workflow/status/total-order/any/ci:test?event=push&label=tests)](https://github.com/total-order/any/actions/workflows/ci:test.yml?query=branch:main)
[![Dependencies](https://img.shields.io/librariesio/github/total-order/any.svg)](https://github.com/total-order/any/network/dependencies)
[![GitHub issues](https://img.shields.io/github/issues/total-order/any.svg)](https://github.com/total-order/any/issues)
[![Downloads](https://img.shields.io/npm/dm/total-order.svg)](https://www.npmjs.org/package/total-order)

[![Code issues](https://img.shields.io/codeclimate/issues/total-order/any.svg)](https://codeclimate.com/github/total-order/any/issues)
[![Code maintainability](https://img.shields.io/codeclimate/maintainability/total-order/any.svg)](https://codeclimate.com/github/total-order/any/trends/churn)
[![Code coverage (cov)](https://img.shields.io/codecov/c/gh/total-order/any/main.svg)](https://codecov.io/gh/total-order/any)
[![Code technical debt](https://img.shields.io/codeclimate/tech-debt/total-order/any.svg)](https://codeclimate.com/github/total-order/any/trends/technical_debt)
[![Documentation](https://total-order.github.io/any/badge.svg)](https://total-order.github.io/any/source.html)
[![Package size](https://img.shields.io/bundlephobia/minzip/total-order)](https://bundlephobia.com/result?p=total-order)
