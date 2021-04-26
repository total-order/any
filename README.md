:clown_face: [total-order](https://make-github-pseudonymous-again.github.io/js-total-order)
==

A total order for all JavaScript values.
See [docs](https://make-github-pseudonymous-again.github.io/js-total-order/index.html).

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

[![License](https://img.shields.io/github/license/make-github-pseudonymous-again/js-total-order.svg)](https://raw.githubusercontent.com/make-github-pseudonymous-again/js-total-order/main/LICENSE)
[![Version](https://img.shields.io/npm/v/total-order.svg)](https://www.npmjs.org/package/total-order)
[![Tests](https://img.shields.io/github/workflow/status/make-github-pseudonymous-again/js-total-order/ci:test?event=push&label=tests)](https://github.com/make-github-pseudonymous-again/js-total-order/actions/workflows/ci:test.yml?query=branch:main)
[![Dependencies](https://img.shields.io/david/make-github-pseudonymous-again/js-total-order.svg)](https://david-dm.org/make-github-pseudonymous-again/js-total-order)
[![Dev dependencies](https://img.shields.io/david/dev/make-github-pseudonymous-again/js-total-order.svg)](https://david-dm.org/make-github-pseudonymous-again/js-total-order?type=dev)
[![GitHub issues](https://img.shields.io/github/issues/make-github-pseudonymous-again/js-total-order.svg)](https://github.com/make-github-pseudonymous-again/js-total-order/issues)
[![Downloads](https://img.shields.io/npm/dm/total-order.svg)](https://www.npmjs.org/package/total-order)

[![Code issues](https://img.shields.io/codeclimate/issues/make-github-pseudonymous-again/js-total-order.svg)](https://codeclimate.com/github/make-github-pseudonymous-again/js-total-order/issues)
[![Code maintainability](https://img.shields.io/codeclimate/maintainability/make-github-pseudonymous-again/js-total-order.svg)](https://codeclimate.com/github/make-github-pseudonymous-again/js-total-order/trends/churn)
[![Code coverage (cov)](https://img.shields.io/codecov/c/gh/make-github-pseudonymous-again/js-total-order/main.svg)](https://codecov.io/gh/make-github-pseudonymous-again/js-total-order)
[![Code technical debt](https://img.shields.io/codeclimate/tech-debt/make-github-pseudonymous-again/js-total-order.svg)](https://codeclimate.com/github/make-github-pseudonymous-again/js-total-order/trends/technical_debt)
[![Documentation](https://make-github-pseudonymous-again.github.io/js-total-order/badge.svg)](https://make-github-pseudonymous-again.github.io/js-total-order/source.html)
[![Package size](https://img.shields.io/bundlephobia/minzip/total-order)](https://bundlephobia.com/result?p=total-order)
