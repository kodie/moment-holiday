import test from 'ava';
import moment from '.';


test('holiday_1', function(t){
  var w = moment().holiday('New Years');
  t.true(moment.isMoment(w));
  t.true(w.isSame(w.startOf('year'), 'day'));
});

test('holiday_2', function(t){
  var w = moment('2010-03-25').holiday(['Turkey Day', 'Christmas']);
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
  var w = moment().holiday();
  t.is(typeof w, 'object');
  t.is(Object.keys(w).length, Object.keys(moment.fn.holidays).length);
});

test('holiday_5', function(t){
  var w = moment('2017-07-10').holiday('Dad Day', true);
  t.true(moment.isMoment(w));
  t.true(w.isSame('2017-06-19', 'day'));
});

test('isHoliday_1', function(t){
  var w = moment('2012-10-31').isHoliday();
  t.is(w, 'Halloween');
});

test('isHoliday_2', function(t){
  var w = moment('2011-04-17').isHoliday();
  t.false(w);
});

test('isHoliday_3', function(t){
  var w = moment('2018-11-12').isHoliday(true);
  t.is(w, "Veteran's Day");
});

test('holidaysBetween_1', function(t){
  var w = moment('2011-11-01').holidaysBetween('2011-12-31');
  t.is(typeof w, 'object');
  t.is(Object.keys(w).length, 6);
  t.is(w[Object.keys(w)[4]].isHoliday(), 'Christmas Day');
});

test('holidaysBetween_2', function(t){
  var w = moment('2010-10-03').holidaysBetween('2010-10-10');
  t.false(w);
});

test('holidaysBetween_3', function(t){
  var w = moment('2011-11-01').holidaysBetween('2011-12-31', true);
  t.is(typeof w, 'object');
  t.is(Object.keys(w).length, 6);
  t.true(w[Object.keys(w)[5]].isSame('2011-12-30', 'day'));
});

test('modifyHolidays_set_1', function(t){
  moment().modifyHolidays.set(['New Years Day', 'Memorial Day', 'Thanksgiving']);
  var w = moment().holiday();
  t.is(typeof w, 'object');
  t.is(Object.keys(w).length, 3);
});

test('modifyHolidays_set_2', function(t){
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

  var w = moment().holiday();
  t.is(typeof w, 'object');
  t.is(Object.keys(w).length, 2);
});

test('modifyHolidays_add', function(t){
  moment().modifyHolidays.add({
    "Inauguration Day": {
      date: '1/20',
      keywords_y: ['inauguration']
    }
  });

  var w = moment('2006-07-07').holiday('Inauguration');
  t.true(moment.isMoment(w));
  t.true(w.isSame('2006-01-20', 'day'));
});

test('modifyHolidays_remove', function(t){
  moment().modifyHolidays.remove('Christmas');
  var w = moment().holiday('Christmas');
  t.false(w);
});
