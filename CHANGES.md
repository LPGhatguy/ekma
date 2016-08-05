# ekma Changes

## 0.3.1
- Fixed escaping of `$html` values in `$if`

## 0.3.0
- Added `$join` method for an automatic `safeInHTML` version of `Array#join`
- `$each` and `$times` now correctly handle `safeInHTML` values
	- This feature requires that all results are marked `safeInHTML`!
- Relaxed type declarations on all iterators, they now default to `any` instead of `{}`.

## 0.2.2
- Fixed error in `$html` with null values in substitutions

## 0.2.1
- Fixed typings issue and added documentation

## 0.2.0
- Template escaping is now enabled by default in `$html`
- Removed `escapeQuotes` method, using traditional escaping is safe for quotes
- `$html` now returns an object with `#toString()` instead of a string

## 0.1.0
- Initial release
- Sourced from internal templating library with low overhead
- Developed alongside [Armature](https://github.com/LPGhatguy/armature)