# moment-holiday [![npm version](https://badge.fury.io/js/moment-holiday.svg)](https://badge.fury.io/js/moment-holiday) [![Build Status](https://travis-ci.org/kodie/moment-holiday.svg?branch=master)](https://travis-ci.org/kodie/moment-holiday)

A [Moment.js](https://github.com/moment/moment) plugin for handling holidays.

## Requirements
* [moment.js](https://github.com/moment/moment) v2.0.0 or higher

## Installation
### Node.js
```
npm install --save moment-holiday
```

```javascript
var moment = require('moment-holiday');
moment().holiday('Christmas');
```

### Browser
```html
<script src="moment.js"></script>
<script src="moment-holiday.js"></script>
<script>
  moment().isHoliday();
</script>
```

### Bower
```
bower install --save moment-holiday
```

## Examples

### holiday(holidays, adjust)
```javascript
moment().holiday('Memorial Day');
//moment("2017-05-29T00:00:00.000")

moment().holiday('Totally not a holiday');
//false

moment().holiday(['Dad Day']);
//{ 'Father\'s Day': moment("2017-06-18T00:00:00.000") }

moment().holiday(['Turkey Day', 'New Years Eve']);
//{ 'Thanksgiving Day': moment("2017-11-23T00:00:00.000"),
//  'New Year\'s Eve': moment("2017-12-31T00:00:00.000") }

moment().holiday(['Not actually a holiday', 'Mothers Day']);
//{ 'Mother\'s Day': moment("2017-05-14T00:00:00.000") }

moment('2018-01-01').holiday('Veterans Day');
//moment("2018-11-11T00:00:00.000")

moment('2018-01-01').holiday('Veterans Day', true);
//moment("2018-11-12T00:00:00.000")

moment().holiday();
//Returns all holidays
```

### isHoliday(adjust)
```javascript
moment('2017-12-25').isHoliday();
//Christmas Day

moment('2005-03-15').isHoliday();
//false

moment('2017-12-31').isHoliday();
//New Year's Eve

moment('2017-12-31').isHoliday(true);
//false
```

### holidaysBetween(date, adjust)
```javascript
moment().holidaysBetween(moment().endOf('year'));
//{ 'Labor Day': moment("2017-09-04T00:00:00.000"),
//  'Columbus Day': moment("2017-10-09T00:00:00.000"),
//  Halloween: moment("2017-10-31T00:00:00.000"),
//  'Veteran\'s Day': moment("2017-11-11T00:00:00.000"),
//  'Thanksgiving Day': moment("2017-11-23T00:00:00.000"),
//  'Day after Thanksgiving': moment("2017-11-24T00:00:00.000"),
//  'Christmas Eve': moment("2017-12-24T00:00:00.000"),
//  'Christmas Day': moment("2017-12-25T00:00:00.000"),
//  'New Year\'s Eve': moment("2017-12-31T00:00:00.000") }

moment('2011-11-01').holidaysBetween('2011-12-31');
//{ 'Veteran\'s Day': moment("2011-11-11T00:00:00.000"),
//  'Thanksgiving Day': moment("2011-11-24T00:00:00.000"),
//  'Day after Thanksgiving': moment("2011-11-25T00:00:00.000"),
//  'Christmas Eve': moment("2011-12-24T00:00:00.000"),
//  'Christmas Day': moment("2011-12-25T00:00:00.000"),
//  'New Year\'s Eve': moment("2011-12-31T00:00:00.000") }

moment('2011-11-01').holidaysBetween('2011-12-31', true);
//{ 'Veteran\'s Day': moment("2011-11-11T00:00:00.000"),
//  'Thanksgiving Day': moment("2011-11-24T00:00:00.000"),
//  'Day after Thanksgiving': moment("2011-11-25T00:00:00.000"),
//  'Christmas Eve': moment("2011-12-23T00:00:00.000"),
//  'Christmas Day': moment("2011-12-26T00:00:00.000"),
//  'New Year\'s Eve': moment("2011-12-30T00:00:00.000") }

moment('2017-01-01').holidaysBetween();
//{ 'New Year\'s Day': moment("2017-01-01T00:00:00.000"),
//  'Martin Luther King Jr. Day': moment("2017-01-16T00:00:00.000"),
//  'Valentine\'s Day': moment("2017-02-14T00:00:00.000"),
//  'Washington\'s Birthday': moment("2017-02-20T00:00:00.000"),
//  'Saint Patrick\'s Day': moment("2017-03-17T00:00:00.000"),
//  'Memorial Day': moment("2017-05-29T00:00:00.000"),
//  'Mother\'s Day': moment("2017-05-14T00:00:00.000"),
//  'Father\'s Day': moment("2017-06-18T00:00:00.000"),
//  'Independence Day': moment("2017-07-04T00:00:00.000") }
```

#### Parameters
* **holidays** (`holiday` function only) - The holiday(s) you would like to find. Can be a string to return a single moment object, or an array of strings to return an object of moment objects with the holiday names as keys. Defaults to all holidays.
* **date** (`holidaysBetween` function only) - The end date range to find holidays in. Accepts a moment object or a string that moment would accept. Defaults to today.
* **adjust** - Set to `true` to make all holidays that land on a Saturday go to the prior Friday and all holidays that land on a Sunday go to the following Monday. Defaults to `false`.

All parameters are optional.

## The Holidays
The following holidays are built-in:

* New Year's Day
* Martin Luther King Jr. Day
* Valentine's Day
* Washington's Birthday
* Saint Patrick's Day
* Memorial Day
* Mother's Day
* Father's Day
* Independence Day
* Labor Day
* Columbus Day
* Halloween
* Veteran's Day
* Thanksgiving Day
* Day after Thanksgiving
* Christmas Eve
* Christmas Day
* New Year's Eve

### Modifying Holidays
You can add and remove holidays by using the following helper functions:

#### modifyHolidays.set
```javascript
moment().modifyHolidays.set(['New Years Day', 'Memorial Day', 'Thanksgiving']);

moment().holiday(); // Returns all holidays
//{ 'New Year\'s Day': moment("2017-01-01T00:00:00.000"),
//  'Memorial Day': moment("2017-05-29T00:00:00.000"),
//  'Thanksgiving Day': moment("2017-11-23T00:00:00.000") }

moment().modifyHolidays.set({
  "My Birthday": {
    date: '11/17',
    keywords: ['my', 'birthday']
  },
  "Last Friday of the year": {
    date: '12/(5,-1)',
    keywords_y: ['friday']
  }
});

moment().holiday(); // Returns all holidays
//{ 'My Birthday': moment("2017-11-17T00:00:00.000"),
//  'Last Friday of the year': moment("2017-12-29T00:00:00.000") }
```

#### modifyHolidays.add
```javascript
moment().modifyHolidays.add({
  "Inauguration Day": {
    date: '1/20',
    keywords_y: ['inauguration']
  }
});

moment().holiday('Inauguration');
//moment("2017-01-20T00:00:00.000")
```

#### modifyHolidays.remove
```javascript
moment().modifyHolidays.remove('Christmas');

moment().modifyHolidays.remove(['Dad Day', 'Mom Day', 'Saint Paddys Day']);
```

Holiday objects accept the following options:

* **date** *(Required)* - The date of the holiday in the format of `Month/Day`. A day wrapped in parentheses means a specific day of the week and expects two values separated by a comma. The first part is the day of the week as recognized by [moment().day()](https://momentjs.com/docs/#/get-set/day/) (0=Sunday, 6=Saturday). The second part is the 1-indexed index of that day of week.

  Examples:
  * `5/20` - The 20th of May.
  * `7/(1,3)` - The third Monday of July.
  * `3/(4,-1)` - The last Thursday of March.

* **keywords** - An array of optional keywords.
* **keywords_y** - An array of required keywords.
* **keywords_n** - An array of banned keywords.

View the source of [moment-holiday.js](moment-holiday.js) for a better look at how the keywords work.

## License
MIT. See the License file for more info.
