import test from 'ava';
import moment from './moment-holiday.js';

var emsgs = [
  'holiday() function should return a single moment object or an object of moment objects when holidays are found.',
  'holiday() function should return false when no holidays are found.',
  'holiday() function should return all available holidays when there is no holiday specified.',
  'holiday() function should never return any holidays on a Saturday or a Sunday if adjust parameter is set to true.',
  'isHoliday() function should return a string with the name of the holiday if a holiday is found on the specified date and holiday parameter is set to null.',
  'isHoliday() function should return true if the specified date matches the date of the holiday specified in the holiday parameter.',
  'isHoliday() function should return false is the specified date does not match the date of the holiday specified in the holiday parameter.',
  'isHoliday() function should return false if the specified date is a Saturday or Sunday and the adjust paremter is set to true.',
  'nextHoliday() and previousHoliday() functions should return a single moment object if count parameter is set to null or 1.',
  'nextHoliday() and previousHoliday() functions should return an array of moment objects if count parameter is set to a number higher than 1.',
  'nextHoliday() and previousHoliday() functions should never return any holidays on a Saturday or Sunday if adjust parameter is set to true.',
  'holidaysBetween() function should return an array of moment objects if holidays are found between the specified dates.',
  'holidaysBetween() function should return false if no holidays are found between the specified dates.',
  'holidaysBetween() function should never return any holidays on a Saturday or Sunday if adjust parameter is set to true.',
  'modifyHolidays.set() function should set the current holiday set to the specified object if passed an object as the first parameter.',
  'modifyHolidays.set() function should cherry-pick holidays from the current holiday set if passed an array as the first parameter.',
  'modifyHolidays.set() function should set the current holiday set to the specified locale if passed a string as the first parameter.',
  'modifyHolidays.set() function should cherry-pick holidays from the specified locale if passed a string (the locale) as the first parameter and either a string or an array as the second parameter (the holidays).',
  'modifyHolidays.add() function should merge the specified object with the current holiday set object if passed an object as the first parameter.',
  'modifyHolidays.add() function should merge the specified locale object with the current holiday set object is passed a string as the first parameter.',
  'modifyHolidays.add() function should cherry-pick the speicified holidays from the specified locale object to be merged with the current holiday set object if passed a string as the first parameter (the locale) and a string or array as the second parameter (the holidays).',
  'modifyHolidays.remove() function should remove specified holidays from the current holiday set object.',
  'modifyHolidays.undo() function should set the current holiday set object back to the way it was before it was last changed.',
  'Built-in parser should return date for current year and specified month and date when passed M/D.',
  'Built-in parser should return date for specified year, month, and date when passed M/D/YYYY.',
  'Built-in parser should return date for specified month on specified weekday using a positive index when passed M/(Weekday,Index).',
  'Built-in parser should return date for specified month on specified weekday using a negative index when passed M/(Weekday,-Index).',
  'Built-in parser should return all instances of specified weekday for the specified month using no index when passed M/(Weekday).',
  'Built-in parser should return all instances of specified weekday for the specified year using no index when passed (Weekday)/YYYY.',
  'Built-in parser should return date for specified month and year on specified weekday using a positive index when passed M/(Weekday,Index)/YYYY.',
  'Built-in parser should return date for specified month and year on specified weekday using a negative index when passed M/(Weekday,-Index)/YYYY.',
  'Built-in parser should return date for specified month on specified weekday on or after specified date when passed M/(Weekday,[Date])',
  'Built-in parser should return date for specified month on specified weekday on or before specified date when passed M/(Weekday,[-Date])',
  'Built-in parser should return an array of dates ranging between the specified dates seperated by a vertical bar using the normal built-in parser rules.',
  'Easter parser should return the date of Easter Sunday for the current year when passed easter',
  'Easter parser should return the date of n-days after Easter Sunday when passed easter+n',
  'Easter parser should return the date of n-days before Easter Sunday when passed easter-n'
];

var locales = [];
var localePath = require('path').join(__dirname, 'locale');
require('fs').readdirSync(localePath).forEach(function(file){
  var locale = file.substring(0, file.lastIndexOf('.'));
  moment.modifyHolidays.load(locale);
  locales.push(locale);
});

function ll(func) {
  locales.forEach(function(locale){
    moment.modifyHolidays.set(locale);
    func(locale);
    moment.modifyHolidays.undo();
  });
}

function randomHolidays(count) {
  var d = [];
  var h = Object.keys(moment.holidays.active);
  if (count > h.length) { count = h.length; }
  for (var i = 0; i < count; i++) {
    var r = Math.floor(Math.random() * h.length);
    if (!~d.indexOf(h[r])) { d.push(h[r]); } else { i--; }
  }
  if (d.length === 1) { return d[0]; }
  return d;
}

function e(message, locale) {
  if (locale) { message = "Locale: " + locale + " / Message: " + message; }
  return message;
}


test('holiday_1', function(t){
  var em = emsgs[0];

  ll(l => {
    var h = randomHolidays(1);
    var w = moment().holiday(h);
    if (!w.length && !moment.isMoment(w)) { t.fail(e(em, l)); }
    if (w.length && !moment.isMoment(w[0])) { t.fail(e(em, l)); }
  });

  t.pass();
});

test('holiday_2', function(t){
  var em = emsgs[0];

  ll(l => {
    var h = randomHolidays(2);
    var w = moment('2010-03-25').holidays(h);
    var k = Object.keys(w);
    t.is(typeof w, 'object', e(l, em));
    k.forEach(function(m){
      if (!w[m].length && !moment.isMoment(w[m])) { t.fail(e(em, l)); }
      if (w[m].length && !moment.isMoment(w[m][0])) { t.fail(e(em, l)); }
    });
  });

  t.pass();
});

test('holiday_3', function(t){
  var em = emsgs[1];

  ll(l => {
    var w = moment('2009-05-10').holiday('__INVALID__');
    if (w) { t.fail(e(em, l)); }
  });

  t.pass();
});

test('holiday_4', function(t){
  var em = emsgs[2];

  ll(l => {
    var w = moment().holidays();
    t.is(typeof w, 'object', e(em, l));
    t.is(Object.keys(w).length, Object.keys(moment.holidays[l]).length, e(em, l));
  });

  t.pass();
});

test('holiday_5', function(t){
  var em = emsgs[3];

  ll(l => {
    var h = randomHolidays(10);
    var w = moment('2017-07-10').holidays(h, true);
    var k = Object.keys(w);
    t.is(typeof w, 'object', e(em, l));
    k.forEach(function(m){
      if (!w[m].length && !moment.isMoment(w[m]) && w[m].day() !== 0 && w[m].day() !== 6) { t.fail(e(em, l)); }
      if (w[m].length && !moment.isMoment(w[m][0]) && w[m][0].day() !== 0 && w[m][0].day() !== 6) { t.fail(e(em, l)); }
    });
  });

  t.pass();
});

test('isHoliday_1', function(t){
  var em = emsgs[4];

  ll(l => {
    var h = randomHolidays(1);
    var r = moment('2012-10-31').holiday(h);
    var m = (moment.isMoment(r) ? r : r[0]);
    var w = m.isHoliday();
    if (!~w.indexOf(h)) { t.fail(e(em, l)); }
  });

  t.pass();
});

test('isHoliday_2', function(t){
  var em = emsgs[5];

  ll(l => {
    var h = randomHolidays(1);
    var r = moment('2018-11-12').holiday(h);
    var m = (moment.isMoment(r) ? r : r[0]);
    var w = m.isHoliday(h);
    t.true(w, e(em, l));
  });

  t.pass();
});

test('isHoliday_3', function(t){
  var em = emsgs[6];

  ll(l => {
    var w = moment('2018-03-17').isHoliday('__INVALID__');
    t.false(w, e(em, l));
  });

  t.pass();
});

test('isHoliday_4', function(t){
  var em = emsgs[7];

  ll(l => {
    var w = moment('2011-01-01').isHoliday(null, true);
    t.false(w, e(em, l));
  });

  t.pass();
});

test('previousHoliday_1', function(t){
  var em = emsgs[8];

  ll(l => {
    var w = moment('2002-06-15').previousHoliday();
    t.true(moment.isMoment(w), e(em, l));
  });

  t.pass();
});

test('previousHoliday_2', function(t){
  var em1 = emsgs[9];
  var em2 = emsgs[10];

  ll(l => {
    var w = moment('2011-01-06').previousHolidays(7, true);
    t.is(w.constructor, Array, e(em1, l));
    w.forEach(function(m){
      if (m.day() === 0 || m.day() === 6) { t.fail(e(em2, l)); }
    });
  });

  t.pass();
});

test('nextHoliday_1', function(t){
  var em = emsgs[8];

  ll(l => {
    var w = moment('2005-03-11').nextHoliday();
    t.true(moment.isMoment(w), e(em, l));
  });

  t.pass();
});

test('nextHoliday_2', function(t){
  var em1 = emsgs[9];
  var em2 = emsgs[10];

  ll(l => {
    var w = moment('2010-12-24').nextHolidays(8, true);
    t.is(w.constructor, Array, e(em1, l));
    w.forEach(function(m){
      if (m.day() === 0 || m.day() === 6) { t.fail(e(em2, l)); }
    });
  });

  t.pass();
});

test('holidaysBetween_1', function(t){
  var em1 = emsgs[11];
  var em2 = emsgs[13];

  ll(l => {
    var w = moment('2011-11-01').holidaysBetween('2012-05-15', true);
    if (!w.length && w !== false) { t.fail(e(em1, l)); }
    w.forEach(function(m){
      if (m.day() === 0 || m.day() === 6) { t.fail(e(em2, l)); }
    });
  });

  t.pass();
});

test('holidaysBetween_2', function(t){
  moment.modifyHolidays.set({});
  var w = moment('2010-10-03').holidaysBetween('2010-10-10');
  t.false(w, e(emsgs[12]));
  moment.modifyHolidays.undo();
});

test('modifyHolidays_set_1', function(t){
  var em = emsgs[14];

  moment.modifyHolidays.set({
    "My Birthday": {
      date: '11/17',
      keywords: ['my', 'birthday']
    },
    "Last Friday of the year": {
      date: '12/(5,-1)',
      keywords_y: ['friday']
    },
    "Awesome Day": {
      date: '9/3',
      keywords: ['awesome']
    }
  });

  var w = moment().holidays();
  t.is(typeof w, 'object', e(em));
  t.is(Object.keys(w).length, 3, e(em));

  moment.modifyHolidays.undo();
});

test('modifyHolidays_set_2', function(t){
  var em = emsgs[15];
  moment.modifyHolidays.set('United States').set(['Christmas', 'Thanksgiving']);
  var w = moment().holidays();
  t.is(typeof w, 'object', e(em));
  t.is(Object.keys(w).length, 2, e(em));
  t.true(moment('2020-12-25').isHoliday('Christmas'), e(em));
  moment.modifyHolidays.undo();
});

test('modifyHolidays_set_3', function(t){
  var em = emsgs[16];
  moment.modifyHolidays.set('Germany');
  var w = moment().holidays();
  t.is(typeof w, 'object', e(em));
  t.is(Object.keys(w).length, Object.keys(moment.holidays.germany).length, e(em));
  t.true(moment('2015-08-15').isHoliday('Mariä Himmelfahrt'), e(em));
  moment.modifyHolidays.undo();
});

test('modifyHolidays_set_4', function(t){
  var em = emsgs[17];
  moment.modifyHolidays.set('Canada', ['Canada Day', 'Boxing Day']);
  var w = moment().holidays();
  t.is(typeof w, 'object', e(em));
  t.is(Object.keys(w).length, 2, e(em));
  t.true(moment('2011-12-26').isHoliday('Boxing Day'), e(em));
  moment.modifyHolidays.undo();
});

test('modifyHolidays_add_1', function(t){
  var em = emsgs[18];

  moment.modifyHolidays.add({
    "Inauguration Day": {
      date: '1/20',
      keywords_y: ['inauguration']
    }
  });

  var w = moment('2006-07-07').holiday('Inauguration');
  t.true(moment.isMoment(w), e(em));
  t.true(w.isSame('2006-01-20', 'day'), e(em));

  moment.modifyHolidays.undo();
});

test('modifyHolidays_add_2', function(t){
  var em = emsgs[19];
  moment.modifyHolidays.set('United States').add('Easter');
  var w = moment('2001-12-21').holiday('Ash Wednesday');
  t.true(moment.isMoment(w), e(em));
  t.true(w.isSame('2001-02-28', 'day'), e(em));
  moment.modifyHolidays.undo();
});

test('modifyHolidays_add_3', function(t){
  var em = emsgs[20];
  moment.modifyHolidays.set('United States').add('Denmark', ['Første maj', 'Juleaften']);
  var w = moment('1999-05-17').holiday('Første maj');
  t.true(moment.isMoment(w), e(em));
  t.true(w.isSame('1999-05-01', 'day'), e(em));
  t.false(moment().holiday('Anden juledag'), e(em));
  moment.modifyHolidays.undo();
});

test('modifyHolidays_remove', function(t){
  moment.modifyHolidays.set('United States').remove('Christmas');
  var w = moment().holiday('Christmas');
  t.false(w, e(emsgs[21]));
  moment.modifyHolidays.undo();
});

test('modifyHolidays_undo', function(t){
  moment.modifyHolidays.set('United States').set('Finland').undo();
  var w = moment().holiday('Presidents Day');
  t.true(moment.isMoment(w), e(emsgs[22]));
  moment.modifyHolidays.undo();
});

test('parser_1', function(t){
  var em = emsgs[23];
  moment.modifyHolidays.set({ 'test': { date: '10/5', keywords: ['test'] } });
  var w = moment().holiday('test');
  t.true(moment.isMoment(w), e(em));
  t.true(w.isSame(moment().month(9).date(5), 'day'), e(em));
  moment.modifyHolidays.undo();
});

test('parser_2', function(t){
  var em = emsgs[24];
  moment.modifyHolidays.set({ 'test': { date: '8/16/2001', keywords: ['test'] } });
  var w = moment().holiday('test');
  t.true(moment.isMoment(w), e(em));
  t.true(w.isSame(moment('2001-08-16'), 'day'), e(em));
  moment.modifyHolidays.undo();
});

test('parser_3', function(t){
  var em = emsgs[25];
  moment.modifyHolidays.set({ 'test': { date: '8/(2,1)', keywords: ['test'] } });
  var w = moment('2009-10-18').holiday('test');
  t.true(moment.isMoment(w), e(em));
  t.true(w.isSame(moment('2009-08-04'), 'day'), e(em));
  moment.modifyHolidays.undo();
});

test('parser_4', function(t){
  var em = emsgs[26];
  moment.modifyHolidays.set({ 'test': { date: '2/(5,-2)', keywords: ['test'] } });
  var w = moment('2002-06-02').holiday('test');
  t.true(moment.isMoment(w), e(em));
  t.true(w.isSame(moment('2002-02-15'), 'day'), e(em));
  moment.modifyHolidays.undo();
});

test('parser_5', function(t){
  var em = emsgs[27];
  moment.modifyHolidays.set({ 'test': { date: '6/(3)', keywords: ['test'] } });
  var w = moment('2005-04-12').holiday('test');
  t.is(w.constructor, Array, e(em));
  t.is(w.length, 5, e(em));
  t.true(w[4].isSame('2005-06-29', 'day'), e(em));
  moment.modifyHolidays.undo();
});

test('parser_6', function(t){
  var em = emsgs[28];
  moment.modifyHolidays.set({ 'test': { date: '(4)/2010', keywords: ['test'] } });
  var w = moment().holiday('test');
  t.is(w.constructor, Array, e(em));
  t.is(w.length, 52, e(em));
  t.true(w[21].isSame('2010-06-03', 'day'), e(em));
  moment.modifyHolidays.undo();
});

test('parser_7', function(t){
  var em = emsgs[29];
  moment.modifyHolidays.set({ 'test': { date: '4/(5,2)/2003', keywords: ['test'] } });
  var w = moment().holiday('test');
  t.true(moment.isMoment(w), e(em));
  t.true(w.isSame(moment('2003-04-11'), 'day'), e(em));
  moment.modifyHolidays.undo();
});

test('parser_8', function(t){
  var em = emsgs[30];
  moment.modifyHolidays.set({ 'test': { date: '12/(0,-1)/2008', keywords: ['test'] } });
  var w = moment().holiday('test');
  t.true(moment.isMoment(w), e(em));
  t.true(w.isSame(moment('2008-12-28'), 'day'), e(em));
  moment.modifyHolidays.undo();
});

test('parser_9', function(t){
  var em = emsgs[31];
  moment.modifyHolidays.set({ 'test': { date: '2/14|3/1', keywords: ['test'] } });
  var w = moment().holiday('test');
  t.is(w.constructor, Array, e(em));
  t.is(w.length, 16, e(em));
  t.true(w[9].isSame(moment().month(1).date(23), 'day'), e(em));
  moment.modifyHolidays.undo();
});

test('parser_10', function(t){
  var em = emsgs[31];
  moment.modifyHolidays.set({ 'test': { date: '4/(1,1)|4/(5,-1)', keywords: ['test'] } });
  var w = moment('2005-11-09').holiday('test');
  t.is(w.constructor, Array, e(em));
  t.is(w.length, 26, e(em));
  t.true(w[11].isSame(moment('2005-04-15'), 'day'), e(em));
  moment.modifyHolidays.undo();
});

test('parser_11', function(t){
  var em = emsgs[32];
  moment.modifyHolidays.set({ 'test': { date: '10/(3,[11])', keywords: ['test'] } });
  var w = moment('2008-06-16').holiday('test');
  t.true(moment.isMoment(w), e(em));
  t.true(w.isSame(moment('2008-10-15'), 'day'), e(em));
  moment.modifyHolidays.undo();
});

test('parser_12', function(t){
  var em = emsgs[33];
  moment.modifyHolidays.set({ 'test': { date: '12/(5,[-23])', keywords: ['test'] } });
  var w = moment('2014-02-20').holiday('test');
  t.true(moment.isMoment(w), e(em));
  t.true(w.isSame(moment('2014-12-19'), 'day'), e(em));
  moment.modifyHolidays.undo();
});

test('parser_13', function(t){
  var em = emsgs[31];
  moment.modifyHolidays.set({ 'test': { date: '03/(2,[-16])|3/(5,-1)', keywords: ['test'] } });
  var w = moment('2012-04-25').holiday('test');
  t.is(w.constructor, Array, e(em));
  t.is(w.length, 18, e(em));
  t.true(w[7].isSame(moment('2012-03-20'), 'day'), e(em));
  moment.modifyHolidays.undo();
});

test('easter_parser_1', function(t){
  var em = emsgs[34];
  moment.modifyHolidays.set({ 'test': { date: 'easter', keywords: ['test'] } });
  var w = moment('2001-07-12').holiday('test');
  t.true(moment.isMoment(w), e(em));
  t.true(w.isSame(moment('2001-04-15'), 'day'), e(em));
  moment.modifyHolidays.undo();
});

test('easter_parser_2', function(t){
  var em = emsgs[35];
  moment.modifyHolidays.set({ 'test': { date: 'easter+6', keywords: ['test'] } });
  var w = moment('1996-07-12').holiday('test');
  t.true(moment.isMoment(w), e(em));
  t.true(w.isSame(moment('1996-04-13'), 'day'), e(em));
  moment.modifyHolidays.undo();
});

test('easter_parser_3', function(t){
  var em = emsgs[36];
  moment.modifyHolidays.set({ 'test': { date: 'easter-3', keywords: ['test'] } });
  var w = moment('2006-01-22').holiday('test');
  t.true(moment.isMoment(w), e(em));
  t.true(w.isSame(moment('2006-04-13'), 'day'), e(em));
  moment.modifyHolidays.undo();
});
