# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- `moment-holiday.d.ts` typescript typings.

## [1.5.1] - 2017-08-03
### Removed
- `xo` as a dependency 😑.


## [1.5.0] - 2017-08-03
### Added
- Argentina, Denmark, and India locales.
- `modifyHolidays.load` function.
- gulp build tasks.
- Table of Contents to readme.

### Changed
- Fixed bug where getting the weekday on or before/after a certain date would fail if the next specific weekday is 6 days away.
- Holiday names are now checked the same as keywords (using only words that are 3 characters or more).
- A date string can now be passed back to the parser from a parser extension.
- The holiday keyword finder will now return multiple holidays in the case of a keyword points tie rather than just false.
- `holiday` function will now return false is the current holiday set is empty and the holiday parameter is set to null.
- Made `test.js` more dynamic for all locales.
- `us` locale is now `United States` and is no longer built-in to `moment-holiday.js` by default (You can still get the one with `United States` built-in by using `build/moment-holiday-us.js`).
- When loading locale files, spaces are now converted to underscores.


## [1.4.2] - 2017-07-26
### Added
- [Added Croatia locale](https://github.com/kodie/moment-holiday/pull/1) (Thanks [@diomed](https://github.com/diomed)!).
- Some more keywords to bower and NPM.

### Changed
- Updated some keywords for locales to make them easier to find.
- Internal function `findHoliday` will now skip keyword search if the string matches the holiday name exactly (case-insensitive).
- Fixed a bug where `npm test` would fail on holidays with matching keywords.


## [1.4.1] - 2017-07-24
### Changed
- Changed internal function `merge` dynamic parameters to static ones for older node version support.
- Internal function `findHoliday` will now skip keyword search if the string matches the holiday name exactly.


## [1.4.0] - 2017-07-24
### Added
- Ash Wednesday, Lent, Holy Saturday, Easter Monday, Ascension Day, Pentecost Sunday, Whit Monday, and Corpus Christi to Easter locale.
- Valentine's Day, Islander Day, Louis Riel Day, Saint Patrick's Day, Good Friday, Easter Sunday, Aboriginal Day, St. Jean Baptiste Day, Canada Day, Halloween, Remembrance Day, and Thanksgiving Day to Canada locale.
- Finland and Germany locales.
- Specifics parameter to `modifyHolidays.set` and `modifyHolidays.add` functions for cherry-picking specific holidays to use from a locale.
- Support for locale regions.
- `modifyHolidays.undo` function.
- Easter Sunday and Good Friday to actual US locale so that they get added back when using `modifyHolidays.set('US')`.

### Changed
- Fixed bug where using the `modifyHolidays.set` function would modify the original locale object.
- Default parser will now skip a date if it doesn't start with a number or `(` character.
- `isHoliday` function will now return an array of holiday names if not checking for a specific holiday in the case of multiple holidays on the same day.
- Parser will continue to run through all parser extensions even after one has returned false. If the date is still false after all extensions, the parser will return false.
- `test.js` now handles dynamic holiday counts and indexes.
- Changed some keywords into regex keywords for better accuracy.
- Changed active holiday object from `holidayObject` to `moment.holidays.active` to make it public.
- Cleaned up some code.


## [1.3.1] - 2017-07-19
### Changed
- Fixed bug with Labor Day keywords.


## [1.3.0] - 2017-07-19
### Added
- Support for holidays that span multiple days.
- Support for "The [Weekday] on or before/after [Day]".
- Support for year specific holidays.
- Locale functionality.
- Easter and Canadian locales.
- Documentation on `modifyHolidays.extendParser` function.

### Changed
- `moment().modifyHolidays` to `moment.modifyHolidays`.
- Made `moment.modifyHolidays` functions chainable.


## [1.2.0] - 2017-07-17
### Added
- `modifyHolidays.extendParser` function.


## [1.1.1] - 2017-07-17
### Changed
- `previousHoliday` and `nextHoliday` functions will return a single moment object if `count` is set to `1`.


## [1.1.0] - 2017-07-17
### Added
- `previousHoliday` and `nextHoliday` functions.
- `holidays` alias function for `holiday`.

### Changed
- Moved holidays object from `moment.fn.holidays` to `moment.holidays`.
- Fixed bug where `holidaysBetween` function would only return holidays for the start year.
- `holidaysBetween` function now returns an array of moment objects rather than an object.
- `isHoliday` now accepts a `holidays` parameter to get a `true` response.


## 1.0.0 - 2017-07-16
### Added
- Initial release.

[Unreleased]: https://github.com/kodie/moment-holiday/compare/v1.0.0...HEAD
[1.5.0]: https://github.com/kodie/moment-holiday/compare/v1.4.2...v1.5.0
[1.4.2]: https://github.com/kodie/moment-holiday/compare/v1.4.1...v1.4.2
[1.4.1]: https://github.com/kodie/moment-holiday/compare/v1.4.0...v1.4.1
[1.4.0]: https://github.com/kodie/moment-holiday/compare/v1.3.1...v1.4.0
[1.3.1]: https://github.com/kodie/moment-holiday/compare/v1.3.0...v1.3.1
[1.3.0]: https://github.com/kodie/moment-holiday/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/kodie/moment-holiday/compare/v1.1.1...v1.2.0
[1.1.1]: https://github.com/kodie/moment-holiday/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/kodie/moment-holiday/compare/v1.0.0...v1.1.0
