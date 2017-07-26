import test from 'ava';
import moment from '.';


moment.modifyHolidays.set('US');

var localePath = require('path').join(__dirname, 'locale');
require('fs').readdirSync(localePath).forEach(function(file){
  var locale = file.substring(0, file.lastIndexOf('.'));
  moment.modifyHolidays.add(locale);
});


test('holiday_1', function(t){
  moment.modifyHolidays.set('US');

  var w = moment().holiday('New Years');
  t.true(moment.isMoment(w));
  t.true(w.isSame(w.startOf('year'), 'day'));

  moment.modifyHolidays.undo();
});

test('holiday_2', function(t){
  var w = moment('2010-03-25').holidays(['Turkey Day', 'Christmas']);
  var k = Object.keys(w);
  t.is(typeof w, 'object');
  t.is(k.length, 2);
  t.true(w[k[0]].isSame('2010-11-25', 'day'));
  t.true(w[k[1]].isSame('2010-12-25', 'day'));
});

test('holiday_3', function(t){
  var w = moment('2009-05-10').holiday('Totally not a holiday');
  t.false(w);
});

test('holiday_4', function(t){
  var w = moment().holidays();
  t.is(typeof w, 'object');
});

test('holiday_5', function(t){
  var w = moment('2017-07-10').holiday('Dad Day', true);
  t.true(moment.isMoment(w));
  t.true(w.isSame('2017-06-19', 'day'));
});

test('isHoliday_1', function(t){
  var w = moment('2012-10-31').isHoliday();
  if (typeof w == 'string' || typeof w == 'object') {
    t.pass();
  } else { t.fail(); }
});

test('isHoliday_2', function(t){
  var w = moment('2018-11-12').isHoliday(null, true);
  if (typeof w == 'string' || typeof w == 'object') {
    t.pass();
  } else { t.fail(); }
});

test('isHoliday_3', function(t){
  var w = moment('2018-03-17').isHoliday('St Paddys Day');
  t.true(w);
});

test('previousHoliday_1', function(t){
  var w = moment('2002-06-15').previousHoliday(6);
  t.is(w.constructor, Array);
});

test('previousHoliday_2', function(t){
  var w = moment('2012-02-06').previousHolidays(7, true);
  t.is(w.constructor, Array);
});

test('nextHoliday_1', function(t){
  var w = moment('2001-04-20').nextHolidays(5);
  t.is(w.constructor, Array);
});

test('nextHoliday_2', function(t){
  var w = moment('2011-11-02').nextHoliday(8, true);
  t.is(w.constructor, Array);
});

test('holidaysBetween_1', function(t){
  var w = moment('2011-11-01').holidaysBetween('2012-05-15');
  t.is(w.constructor, Array);
});

test('holidaysBetween_2', function(t){
  var w = moment('2010-10-03').holidaysBetween('2010-10-10');
  t.is(w.constructor, Array);
});

test('holidaysBetween_3', function(t){
  var w = moment('2011-11-01').holidaysBetween('2011-12-31', true);
  t.is(w.constructor, Array);
});

test('modifyHolidays_set_1', function(t){
  moment.modifyHolidays.set(['New Years Day', 'Memorial Day', 'Thanksgiving']);

  var w = moment().holiday();
  t.is(typeof w, 'object');

  moment.modifyHolidays.undo();
});

test('modifyHolidays_set_2', function(t){
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

  var w = moment().holiday();
  t.is(typeof w, 'object');
  t.is(Object.keys(w).length, 2);

  moment.modifyHolidays.undo();
});

test('modifyHolidays_add', function(t){
  moment.modifyHolidays.add({
    "Inauguration Day": {
      date: '1/20',
      keywords_y: ['inauguration']
    }
  });

  var w = moment('2006-07-07').holiday('Inauguration');
  t.true(moment.isMoment(w));
  t.true(w.isSame('2006-01-20', 'day'));

  moment.modifyHolidays.undo();
});

test('modifyHolidays_remove', function(t){
  moment.modifyHolidays.set('US').remove('Christmas');

  var w = moment().holiday('Christmas');
  t.false(w);

  moment.modifyHolidays.undo();
});

test('modifyHolidays_cherry-pick', function(t){
  moment.modifyHolidays.set('Germany', ['Ostersonntag']);

  var w = moment('2015-05-20').holidays();
  var k = Object.keys(w);
  t.is(typeof w, 'object');
  t.is(k.length, 1);
  t.true(w[k[0]].isSame('2015-04-05', 'day'));

  moment.modifyHolidays.undo();
});

test('easter', function(t){
  moment.modifyHolidays.add('Easter');

  var w = moment('2016-10-20').holiday('Easter Sunday');
  t.true(moment.isMoment(w));
  t.true(w.isSame('2016-03-27', 'day'));

  moment.modifyHolidays.undo();
});

test('Canada', function(t){
  moment.modifyHolidays.set('Canada').add('Easter');

  var w = moment('2001-12-26').isHoliday('Boxing Day');
  t.true(w);

  moment.modifyHolidays.undo();
});

test('parser_1', function(t){
  moment.modifyHolidays.set({ 'test': { date: '10/5', keywords: ['test'] } });

  var w = moment().holiday('test');
  t.true(moment.isMoment(w));
  t.true(w.isSame(moment().month(9).date(5), 'day'));

  moment.modifyHolidays.undo();
});

test('parser_2', function(t){
  moment.modifyHolidays.set({ 'test': { date: '8/16/2001', keywords: ['test'] } });

  var w = moment().holiday('test');
  t.true(moment.isMoment(w));
  t.true(w.isSame(moment('2001-08-16'), 'day'));

  moment.modifyHolidays.undo();
});

test('parser_3', function(t){
  moment.modifyHolidays.set({ 'test': { date: '8/(2,1)', keywords: ['test'] } });

  var w = moment('2009-10-18').holiday('test');
  t.true(moment.isMoment(w));
  t.true(w.isSame(moment('2009-08-04'), 'day'));

  moment.modifyHolidays.undo();
});

test('parser_4', function(t){
  moment.modifyHolidays.set({ 'test': { date: '2/(5,-2)', keywords: ['test'] } });

  var w = moment('2002-06-02').holiday('test');
  t.true(moment.isMoment(w));
  t.true(w.isSame(moment('2002-02-15'), 'day'));

  moment.modifyHolidays.undo();
});

test('parser_5', function(t){
  moment.modifyHolidays.set({ 'test': { date: '6/(3)', keywords: ['test'] } });

  var w = moment('2005-04-12').holiday('test');
  t.is(w.constructor, Array);
  t.is(w.length, 5);
  t.true(w[4].isSame('2005-06-29', 'day'));

  moment.modifyHolidays.undo();
});

test('parser_6', function(t){
  moment.modifyHolidays.set({ 'test': { date: '(4)/2010', keywords: ['test'] } });

  var w = moment().holiday('test');
  t.is(w.constructor, Array);
  t.is(w.length, 52);
  t.true(w[21].isSame('2010-06-03', 'day'));

  moment.modifyHolidays.undo();
});

test('parser_7', function(t){
  moment.modifyHolidays.set({ 'test': { date: '4/(5,2)/2003', keywords: ['test'] } });

  var w = moment().holiday('test');
  t.true(moment.isMoment(w));
  t.true(w.isSame(moment('2003-04-11'), 'day'));

  moment.modifyHolidays.undo();
});

test('parser_8', function(t){
  moment.modifyHolidays.set({ 'test': { date: '12/(0,-1)/2008', keywords: ['test'] } });

  var w = moment().holiday('test');
  t.true(moment.isMoment(w));
  t.true(w.isSame(moment('2008-12-28'), 'day'));

  moment.modifyHolidays.undo();
});

test('parser_9', function(t){
  moment.modifyHolidays.set({ 'test': { date: '2/14|3/1', keywords: ['test'] } });

  var w = moment().holiday('test');
  t.is(w.constructor, Array);
  t.is(w.length, 16);
  t.true(w[9].isSame(moment().month(1).date(23), 'day'));

  moment.modifyHolidays.undo();
});

test('parser_10', function(t){
  moment.modifyHolidays.set({ 'test': { date: '4/(1,1)|4/(5,-1)', keywords: ['test'] } });

  var w = moment('2005-11-09').holiday('test');
  t.is(w.constructor, Array);
  t.is(w.length, 26);
  t.true(w[11].isSame(moment('2005-04-15'), 'day'));

  moment.modifyHolidays.undo();
});

test('parser_11', function(t){
  moment.modifyHolidays.set({ 'test': { date: '10/(3,[11])', keywords: ['test'] } });

  var w = moment('2008-06-16').holiday('test');
  t.true(moment.isMoment(w));
  t.true(w.isSame(moment('2008-10-15'), 'day'));

  moment.modifyHolidays.undo();
});

test('parser_12', function(t){
  moment.modifyHolidays.set({ 'test': { date: '12/(5,[-23])', keywords: ['test'] } });

  var w = moment('2014-02-20').holiday('test');
  t.true(moment.isMoment(w));
  t.true(w.isSame(moment('2014-12-19'), 'day'));

  moment.modifyHolidays.undo();
});

test('parser_13', function(t){
  moment.modifyHolidays.set({ 'test': { date: '03/(2,[-16])|3/(5,-1)', keywords: ['test'] } });

  var w = moment('2012-04-25').holiday('test');
  t.is(w.constructor, Array);
  t.is(w.length, 18);
  t.true(w[7].isSame(moment('2012-03-20'), 'day'));

  moment.modifyHolidays.undo();
});
