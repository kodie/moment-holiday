# moment-holiday
[![npm package version](https://img.shields.io/npm/v/moment-holiday.svg?style=flat-square)](https://www.npmjs.com/package/moment-holiday) [![Travis build status](https://img.shields.io/travis/kodie/moment-holiday.svg?style=flat-square)](https://travis-ci.org/kodie/moment-holiday) [![npm package downloads](https://img.shields.io/npm/dt/moment-holiday.svg?style=flat-square)](https://www.npmjs.com/package/moment-holiday) [![build/moment-holiday.min.js file size](https://img.shields.io/github/size/kodie/moment-holiday/build/moment-holiday.min.js.svg?style=flat-square)](build/moment-holiday.min.js) [![license](https://img.shields.io/github/license/kodie/moment-holiday.svg?style=flat-square)](LICENSE.md)

A [Moment.js](https://github.com/moment/moment) plugin for handling holidays.

## Table of Contents
* [Requirements](#requirements)
* [Installation](#installation)
  * [Node.js](#nodejs)
  * [Browser](#browser)
  * [Bower](#bower)
* [Building](#building)
  * [Custom Builds](#custom-builds)
* [Functions](#functions)
  * [holiday](#holiday)
  * [isHoliday](#isholiday)
  * [previousHoliday](#previousholiday)
  * [nextHoliday](#nextholiday)
  * [holidaysBetween](#holidaysbetween)
* [The Holidays](#the-holidays)
  * [Available Locales/Regions](#available-localesregions)
  * [Modifying Holidays](#modifying-holidays)
    * [modifyHolidays.set](#modifyholidaysset)
    * [modifyHolidays.add](#modifyholidaysadd)
    * [modifyHolidays.remove](#modifyholidaysremove)
    * [modifyHolidays.undo](#modifyholidaysundo)
    * [modifyHolidays.load](#modifyholidaysload)
    * [modifyHolidays.extendParser](#modifyholidaysextendparser)
  * [Locales](#locales)
* [License](#license)

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

## Building
`moment-holiday.js` does not come with any locales built-in by default. However, the following files are included for your convenience:

* `build/moment-holiday-pkg.min.js` - moment-holiday with all available locales built-in.
* `build/moment-holiday-us.min.js` - moment-holiday with the `United States` locale built-in.
* `build/moment-holiday.min.js` - Minified version of moment-holiday with no locales built-in.

You can generate the above files by running `gulp build`.

### Custom Builds
You can also generate your own custom builds of moment-holiday by using gulp with the following options:
* **name** - The name of the file to generate. (Defaults to `moment-holiday-custom.js`)
* **locale** - The locale(s) you would like included in the build. Pass this option multiple times to include multiple locales.
* **set** - The locale(s) to have set by default in the build. Pass this option multiple times to have multiple locales set by default.
* **min** - Pass this option if you would like the generated file to be minified.

For example:

```
gulp --name=moment-holiday-ar.js --locale=Argentina --locale=Easter --set=Argentina --min
```

Sourcemaps are automatically created for all minified builds.

## Functions

### holiday
*or `holidays`*

Searches for holiday(s) by keywords. Returns a single moment object, an object containing moment objects with the holiday names as keys, or `false` if no holidays were found.

#### Use
```javascript
moment().holiday(holidays, adjust);
//or
moment().holidays(holidays, adjust);
```

#### Parameters
* **holidays** - The holiday(s) to search for. Can be a string to search for a single holiday or an array to search for multiple. Defaults to all holidays.
* **adjust** - See [global parameters](#global-parameters).

#### Examples
```javascript
moment().holiday('Memorial Day');
//moment("2017-05-29T00:00:00.000")

moment().holiday('Totally not a holiday');
//false

moment().holiday(['Dad Day']);
//{ 'Father\'s Day': moment("2017-06-18T00:00:00.000") }

moment().holidays(['Turkey Day', 'New Years Eve']);
//{ 'Thanksgiving Day': moment("2017-11-23T00:00:00.000"),
//  'New Year\'s Eve': moment("2017-12-31T00:00:00.000") }

moment().holidays(['Not actually a holiday', 'Mothers Day']);
//{ 'Mother\'s Day': moment("2017-05-14T00:00:00.000") }

moment('2018-01-01').holiday('Veterans Day');
//moment("2018-11-11T00:00:00.000")

moment('2018-01-01').holiday('Veterans Day', true);
//moment("2018-11-12T00:00:00.000")

moment().holidays();
//Returns all holidays
```

### isHoliday

Returns the name of the holiday (or `true` if `holidays` parameter is used) if the given date is in fact a holiday or `false` if it isn't. Will return an array of holiday names if multiple holidays land on that same day.

#### Use
```javascript
moment().isHoliday(holidays, adjust);
```

#### Parameters
* **holidays** - Holidays to check for. Will cause function to return `true` if there is a match. Can be a string to compare with a single holiday or an array for multiple. Defaults to all holidays.
* **adjust** - See [global parameters](#global-parameters).

#### Examples
```javascript
moment('2017-12-25').isHoliday();
//Christmas Day

moment('2005-03-15').isHoliday();
//false

moment('2009-10-31').isHoliday('Halloween');
//true

moment('2017-12-31').isHoliday();
//New Year's Eve

moment('2017-12-31').isHoliday(null, true);
//false

moment('2017-04-17').isHoliday(null, true);
//[ 'Easter Sunday', 'Easter Monday' ]
```

### previousHoliday
*or `previousHolidays`*

Returns an array (or a moment object if `count` is set to `1`) containing the previous holidays before the given date.

#### Use
```javascript
moment().previousHoliday(count, adjust);
//or
moment().previousHolidays(count, adjust);
```

#### Parameters
* **count** - The number of previous holidays to fetch. Defaults to `1`.
* **adjust** - See [global parameters](#global-parameters).

#### Examples
```javascript
moment().previousHoliday();
//moment("2017-07-04T00:00:00.000")

moment('2001-02-14').previousHolidays(5);
//[ moment("2001-01-15T00:00:00.000"),
//  moment("2001-01-01T00:00:00.000"),
//  moment("2000-12-31T00:00:00.000"),
//  moment("2000-12-25T00:00:00.000"),
//  moment("2000-12-24T00:00:00.000") ]

moment('2001-02-14').previousHolidays(5, true);
//[ moment("2001-01-15T00:00:00.000"),
//  moment("2001-01-01T00:00:00.000"),
//  moment("2000-12-25T00:00:00.000"),
//  moment("2000-11-24T00:00:00.000"),
//  moment("2000-11-23T00:00:00.000") ]

moment().previousHoliday().isHoliday();
//Independence Day
```

### nextHoliday
*or `nextHolidays`*

Returns an array (or a moment object if `count` is set to `1`) containing the next holidays after the given date.

#### Use
```javascript
moment().nextHoliday(count, adjust);
//or
moment().nextHolidays(count, adjust);
```

#### Parameters
* **count** - The number of upcoming holidays to fetch. Defaults to `1`.
* **adjust** - See [global parameters](#global-parameters).

#### Examples
```javascript
moment().nextHoliday();
//moment("2017-09-04T00:00:00.000")

moment('2010-05-23').nextHolidays(5);
//[ moment("2010-05-31T00:00:00.000"),
//  moment("2010-06-20T00:00:00.000"),
//  moment("2010-07-04T00:00:00.000"),
//  moment("2010-09-06T00:00:00.000"),
//  moment("2010-10-11T00:00:00.000") ]

moment('2010-05-23').nextHolidays(5, true);
//[ moment("2010-05-31T00:00:00.000"),
//  moment("2010-06-21T00:00:00.000"),
//  moment("2010-07-05T00:00:00.000"),
//  moment("2010-09-06T00:00:00.000"),
//  moment("2010-10-11T00:00:00.000") ]

moment().nextHoliday().isHoliday();
//Labor Day
```

### holidaysBetween
Returns an array containing the holidays between the given date and the `date` parameter or `false` if no dates were found.

#### Use
```javascript
moment().holidaysBetween(date, adjust);
```

#### Parameters
* **date** - The end date range for holidays to get. Can be any string that moment accepts or a moment object. Defaults to today.
* **adjust** - See [global parameters](#global-parameters).

#### Examples
```javascript
moment().holidaysBetween(moment().endOf('year'));
//[ moment("2017-09-04T00:00:00.000"),
//  moment("2017-10-09T00:00:00.000"),
//  moment("2017-10-31T00:00:00.000"),
//  moment("2017-11-11T00:00:00.000"),
//  moment("2017-11-23T00:00:00.000"),
//  moment("2017-11-24T00:00:00.000"),
//  moment("2017-12-24T00:00:00.000"),
//  moment("2017-12-25T00:00:00.000") ]

moment('2011-11-01').holidaysBetween('2011-12-31');
//[ moment("2011-11-11T00:00:00.000"),
//  moment("2011-11-24T00:00:00.000"),
//  moment("2011-11-25T00:00:00.000"),
//  moment("2011-12-24T00:00:00.000"),
//  moment("2011-12-25T00:00:00.000") ]

moment('2011-11-01').holidaysBetween('2011-12-31', true);
//[ moment("2011-11-11T00:00:00.000"),
//  moment("2011-11-24T00:00:00.000"),
//  moment("2011-11-25T00:00:00.000"),
//  moment("2011-12-23T00:00:00.000"),
//  moment("2011-12-26T00:00:00.000"),
//  moment("2011-12-30T00:00:00.000") ]

moment('2017-01-01').holidaysBetween();
//[ moment("2017-01-16T00:00:00.000"),
//  moment("2017-02-14T00:00:00.000"),
//  moment("2017-02-20T00:00:00.000"),
//  moment("2017-03-17T00:00:00.000"),
//  moment("2017-05-14T00:00:00.000"),
//  moment("2017-05-29T00:00:00.000"),
//  moment("2017-06-18T00:00:00.000"),
//  moment("2017-07-04T00:00:00.000") ]
```

### Global Parameters
* **adjust** - Set to `true` to make all holidays that land on a Saturday go to the prior Friday and all holidays that land on a Sunday go to the following Monday. Defaults to `false`.

## The Holidays

### Available Locales/Regions
* [Argentina](locale/argentina.js)
* [Austria](locale/austria.js)
  * `Austria/B` - Burgenland
  * `Austria/K` - Kärnten
  * `Austria/NOE` - Niederösterreich
  * `Austria/OOE` - Oberösterreich
  * `Austria/S` - Salzburg
  * `Austria/ST` - Steiermark
  * `Austria/T` - Tirol
  * `Austria/V` - Vorarlberl
  * `Austria/W` - Wien
* [Canada](locale/canada.js)
  * `Canada/AB` - Alberta
  * `Canada/BC` - British Columbia
  * `Canada/MB` - Manitoba
  * `Canada/NB` - New Brunswick
  * `Canada/NL` - Newfoundland and Labrador
  * `Canada/NS` - Nova Scotia
  * `Canada/NT` - Northwest Territories
  * `Canada/NU` - Nunavut
  * `Canada/ON` - Ontario
  * `Canada/PE` - Prince Edward Island
  * `Canada/QC` - Quebec
  * `Canada/SK` - Saskatchewan
* [Croatia](locale/croatia.js)
* [Denmark](locale/denmark.js)
* [Easter](locale/easter.js) (Easter Related Holidays)
* [Finland](locale/finland.js)
* [Germany](locale/germany.js)
  * `Germany/BB` - Brandenburg
  * `Germany/BW` - Baden-Württemberg
  * `Germany/BY` - Bayern
  * `Germany/HE` - Hessen
  * `Germany/MV` - Mecklenburg-Vorpommern
  * `Germany/NW` - Nordrhein-Westfalen
  * `Germany/RP` - Rheinland-Pfalz
  * `Germany/SN` - Sachsen
  * `Germany/SL` - Saarland
  * `Germany/ST` - Sachsen-Anhalt
  * `Germany/TH` - Thüringen
* [India](locale/india.js)
* [Switzerland](locale/switzerland.js)
  * `Switzerland/AG` – Aargau
  * `Switzerland/AI` – Appenzell Innerrhoden
  * `Switzerland/AR` – Appenzell Ausserrhoden
  * `Switzerland/BE` – Bern
  * `Switzerland/BL` – Basel-Landschaft
  * `Switzerland/BS` – Basel-Stadt
  * `Switzerland/FR` – Freiburg
  * `Switzerland/GE` – Genf
  * `Switzerland/GL` – Glarus
  * `Switzerland/GR` – Graubünden
  * `Switzerland/JU` – Jura
  * `Switzerland/LU` – Luzern
  * `Switzerland/NE` – Neuenburg
  * `Switzerland/NW` – Nidwalden
  * `Switzerland/OW` – Obwalden
  * `Switzerland/SG` – St. Gallen
  * `Switzerland/SH` – Schaffhausen
  * `Switzerland/SO` – Solothurn
  * `Switzerland/SZ` – Schwyz
  * `Switzerland/TG` – Thurgau
  * `Switzerland/TI` – Tessin
  * `Switzerland/UR` – Uri
  * `Switzerland/VD` – Waadt
  * `Switzerland/VS` – Wallis
  * `Switzerland/ZG` – Zug
  * `Switzerland/ZH` – Zürich
* [United States](locale/united_states.js) (Default)

Rather than listing all of the holidays here, to see available holidays, view the source of the locale file.

Easter related holidays for any locale will only be available if the Easter locale has been added. It's automatically added if you are using Node. (You can still easily add them in even when not using Node. See: [Modifying Holidays](#modifying-holidays))

### Modifying Holidays
You can add and remove holidays by using the following helper functions:

*Note: Helper functions can be chained.*

#### modifyHolidays.set
Sets the holidays to be used.

```javascript
moment.modifyHolidays.set(['New Years Day', 'Memorial Day', 'Thanksgiving']);

moment().holidays(); // Returns all holidays
//{ 'New Year\'s Day': moment("2017-01-01T00:00:00.000"),
//  'Memorial Day': moment("2017-05-29T00:00:00.000"),
//  'Thanksgiving Day': moment("2017-11-23T00:00:00.000") }

moment.modifyHolidays.set({
  "My Birthday": {
    date: '11/17',
    keywords: ['my', 'birthday']
  },
  "Last Friday of the year": {
    date: '12/(5,-1)',
    keywords_y: ['friday']
  }
});

moment().holidays(); // Returns all holidays
//{ 'My Birthday': moment("2017-11-17T00:00:00.000"),
//  'Last Friday of the year': moment("2017-12-29T00:00:00.000") }
```

#### modifyHolidays.add
Adds holiday(s) to the holidays being used.

```javascript
moment.modifyHolidays.add({
  "Inauguration Day": {
    date: '1/20',
    keywords_y: ['inauguration']
  }
});

moment().holiday('Inauguration');
//moment("2017-01-20T00:00:00.000")
```

#### modifyHolidays.remove
Removes holiday(s) from the holidays being used.

```javascript
moment.modifyHolidays.remove('Christmas');

moment.modifyHolidays.remove(['Dad Day', 'Mom Day', 'Saint Paddys Day']);
```

#### modifyHolidays.undo
Sets the holidays being used back to the way they were before they were last changed.

```javascript
moment.modifyHolidays.set(['Christmas', 'Thanksgiving', 'Mothers Day', 'Fathers Day']);
moment().holidays();
//{ 'Mother\'s Day': moment("2017-05-14T00:00:00.000"),
//  'Father\'s Day': moment("2017-06-18T00:00:00.000"),
//  'Thanksgiving Day': moment("2017-11-23T00:00:00.000"),
//  'Christmas Day': moment("2017-12-25T00:00:00.000") }

moment.modifyHolidays.remove(['Thanksgiving', 'Christmas']);
moment().holidays();
//{ 'Mother\'s Day': moment("2017-05-14T00:00:00.000"),
//  'Father\'s Day': moment("2017-06-18T00:00:00.000") }

moment.modifyHolidays.undo();
moment().holidays();
//{ 'Mother\'s Day': moment("2017-05-14T00:00:00.000"),
//  'Father\'s Day': moment("2017-06-18T00:00:00.000"),
//  'Thanksgiving Day': moment("2017-11-23T00:00:00.000"),
//  'Christmas Day': moment("2017-12-25T00:00:00.000") }
```

#### modifyHolidays.load
Simply loads a locale file and makes it available without modifying the current holidays.

```javascript
moment.modifyHolidays.load('Argentina');

moment.modifyHolidays.load(['Canada', 'Easter']);
```

##### Adding/Setting Locales/Regions
You can also use these functions to set or add holidays from an available locale file:

```javascript
moment.modifyHolidays.set('Canada').add('Easter');
moment('2001-12-26').isHoliday('Boxing Day');
//true

moment.modifyHolidays.add('Easter').remove('Good Friday');
moment().holiday(['Easter Sunday', 'Good Friday']);
//{ 'Easter Sunday': moment("2017-04-16T00:00:00.000") }
```

You use these same functions to specify regions to add:

```javascript
moment.modifyHolidays.set('Germany/SN');
moment('2017-11-22').isHoliday();
//Buß- und Bettag

moment.modifyHolidays.set('Canada/QC/ON');
moment().holidays(['boxing', 'baptiste']);
//{ 'Boxing Day': moment("2017-12-26T00:00:00.000"),
//  'St. Jean Baptiste Day': moment("2017-06-24T00:00:00.000") }
```

You can also cherry-pick the holidays you want from a locale by passing a string or an array of strings as the second parameter:

```javascript
moment.modifyHolidays.add('Easter', ['ascension', 'pentecost']);
moment().holiday(['ascension', 'pentecost']);
//{ 'Ascension Day': moment("2017-05-25T00:00:00.000"),
//  'Pentecost Sunday': moment("2017-06-04T00:00:00.000") }

moment.modifyHolidays.add('Germany/BB', 'Ostersonntag');
moment('2001-09-14').isHoliday();
//[ 'Easter Sunday', 'Ostersonntag' ]
```

*Note: If you're not using Node (or anything that doesn't support the `require` function), you'll need to make sure that you include the locale file(s) that you're trying to use. For example:*

```html
<script src="./moment-holiday/locale/canada.js"></script>
<script src="./moment-holiday/locale/easter.js"></script>
<script>
  moment.modifyHolidays.set('Canada').add('Easter');
  moment('2001-12-26').isHoliday('Boxing Day');
  //true
</script>
```

##### Holiday Objects
Holiday objects accept the following options:

* **date** *(Required)* - The date of the holiday in the format of `Month/Day`. A day wrapped in parentheses `()` means a specific day of the week and expects two values separated by a comma `,`. The first part is the day of the week as recognized by [moment().day()](https://momentjs.com/docs/#/get-set/day/) (0=Sunday, 6=Saturday). The second part (optional) is the 1-indexed index of that day of week unless separated by brackets `[]` which means "The weekday on or before/after this day". Two dates separated by a vertical bar `|` means a date range. You may also specific a 4-digit year by adding an additional `/` after the day.

  Examples:
  * `5/20` - The 20th of May.
  * `7/(1,3)` - The third Monday of July.
  * `3/(4,-1)` - The last Thursday of March.
  * `6/(2,[16])` - The Tuesday on or after the 16th of June.
  * `11/(5,[-9])` - The Friday on or before the 9th of November.
  * `8/21|9/4` - The 21st of August through the 4th of September.
  * `11` - The 11th of every month of the year.
  * `(0)` - Every Sunday of the year.
  * `(6,-2)` - The second to last Friday of every month of the year.
  * `10/(3)` - Every Wednesday in October.
  * `12/7/2014` - December 7th, 2014.
  * `(6)/2014` - Every Saturday of the year 2014.
  * `2/(1,1)|5/(5,-1)` - The first Monday of February through the last Friday of May.
  * `4/(3,[-11])|5/(0,1)` - The Wednesday on or before the 11th of March through the first Sunday of May.

* **keywords** - An array of optional keywords.
* **keywords_y** - An array of required keywords.
* **keywords_n** - An array of banned keywords.
* **regions** - An array of region abbreviations that the holiday is celebrated in. Basically a white-list.
* **regions_n** - An array of region abbreviations that the holiday is NOT celebrated in. Basically a black-list.

RegEx can be used in keywords. For example, `st[\\s\\.]` will match `St Jean` and `St. Patrick`, but not `Christmas` and `x-?mas` will match `xmas` and `x-mas`.

View the source of [moment-holiday.js](moment-holiday.js) for a better look at how the keywords work.

#### modifyHolidays.extendParser
This is a handy little function that allows you to extend the functionality of the date parser. It accepts a single function as a variable that gets passed a moment object and the date string as variables. It can return a single moment object, an array of moment objects, `false` to bail on parsing, or nothing at all to continue with the default parser.

Example:
```javascript
moment.modifyHolidays.add({
  "Friday The Thirteenth": {
    date: 'fridaythethirteenth',
    keywords_y: ['friday'],
    keywords: ['thirteen', '13', 'the']
  }
}).extendParser(function(m, date){
  if (date === 'fridaythethirteenth') {
    var days = [];

    for (i = 0; i < 12; i++) {
      var d = moment(m).month(i).date(13);
      if (d.day() === 5) { days.push(moment(d)); }
    }

    if (!days.length) { return false; }
    return days;
  }
});

moment().holiday('Friday 13th');
//[ moment("2017-01-13T00:00:00.000"),
//  moment("2017-10-13T00:00:00.000") ]
```

You can also see how we take advantage of this by viewing the source of [locale/easter.js](locale/easter.js).

## Locales
Locale files are simply files that add holidays and special holiday parsing functionality for other countries. They are all located in the `locale/` folder.

Pull Requests will be accepted (and encouraged!) but must meet the following guidelines:
* Must contain a `moment.holidays.[locale]` object matching the filename all in lowercase (spaces are converted to underscores).
  * Example: `locale/japan.js` would need to have `moment.holidays.japan` in it.
  * Invalid: `local/Japan.js` or `moment.holidays.Japan`
* Must pass `npm test`.

See the source of [locale/canada.js](locale/canada.js) and [locale/easter.js](locale/easter.js) for good examples of locale files.

## License
MIT. See the License file for more info.
