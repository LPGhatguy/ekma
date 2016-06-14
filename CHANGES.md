# ekma Changes

## 0.2.0
- Template escaping is now enabled by default in `$html`
- Removed `escapeQuotes` method, using traditional escaping is safe for quotes
- `$html` now returns an object with `#toString()` instead of a string

## 0.1.0
- Initial release
- Sourced from internal templating library with low overhead
- Developed alongside [Armature](https://github.com/LPGhatguy/armature)