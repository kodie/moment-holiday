/// <reference path="../moment-holiday.d.ts" />
import * as moment from 'moment';

let holidayResult: moment.Moment | false | { [holidayName: string]: moment.Moment };
holidayResult = moment().holiday([]);
holidayResult = moment().holiday([], false);
holidayResult = moment().holiday([], true);
holidayResult = moment().holiday('string');
holidayResult = moment().holiday('string', false);
holidayResult = moment().holiday('string', true);
holidayResult = moment().holiday(['array', 'of', 'strings']);
holidayResult = moment().holiday(['array', 'of', 'strings'], false);
holidayResult = moment().holiday(['array', 'of', 'strings'], true);

holidayResult = moment().holidays([]);
holidayResult = moment().holidays([], false);
holidayResult = moment().holidays([], true);
holidayResult = moment().holidays('string');
holidayResult = moment().holidays('string', false);
holidayResult = moment().holidays('string', true);
holidayResult = moment().holidays(['array', 'of', 'strings']);
holidayResult = moment().holidays(['array', 'of', 'strings'], false);
holidayResult = moment().holidays(['array', 'of', 'strings'], true);

let isHolidayResult: boolean | string | Array<string>;
isHolidayResult = moment().isHoliday();
isHolidayResult = moment().isHoliday([]);
isHolidayResult = moment().isHoliday([], false);
isHolidayResult = moment().isHoliday([], true);
isHolidayResult = moment().isHoliday(['array', 'of', 'strings']);
isHolidayResult = moment().isHoliday(['array', 'of', 'strings'], false);
isHolidayResult = moment().isHoliday(['array', 'of', 'strings'], true);
isHolidayResult = moment().isHoliday('string');
isHolidayResult = moment().isHoliday('string', false);
isHolidayResult = moment().isHoliday('string', true);
isHolidayResult = moment().isHoliday(null);
isHolidayResult = moment().isHoliday(null, false);
isHolidayResult = moment().isHoliday(null, true);

let previousHolidayResult: Array<moment.Moment> | moment.Moment;
previousHolidayResult = moment().previousHoliday();
previousHolidayResult = moment().previousHoliday(1);
previousHolidayResult = moment().previousHoliday(1, false);
previousHolidayResult = moment().previousHoliday(1, true);
previousHolidayResult = moment().previousHolidays();
previousHolidayResult = moment().previousHolidays(1);
previousHolidayResult = moment().previousHolidays(1, false);
previousHolidayResult = moment().previousHolidays(1, true);

let nextHolidayResult: Array<moment.Moment> | moment.Moment;
nextHolidayResult = moment().nextHoliday();
nextHolidayResult = moment().nextHoliday(1);
nextHolidayResult = moment().nextHoliday(1, false);
nextHolidayResult = moment().nextHoliday(1, true);
nextHolidayResult = moment().nextHolidays();
nextHolidayResult = moment().nextHolidays(1);
nextHolidayResult = moment().nextHolidays(1, false);
nextHolidayResult = moment().nextHolidays(1, true);

let holidaysBetweenResult: Array<moment.Moment> | false;
holidaysBetweenResult = moment().holidaysBetween(moment());
holidaysBetweenResult = moment().holidaysBetween(moment(), false);
holidaysBetweenResult = moment().holidaysBetween(moment(), true);

let h: moment.IHolidays = moment.holidays;
let a: any = moment.holidays.active;
let al: any = moment.holidays.active_last;

let mh: moment.IHolidayModifier = moment.modifyHolidays;
mh = mh.set({});
mh = mh.set({}, {});
mh = mh.add({});
mh = mh.add({}, {});
mh = mh.remove({});
mh = mh.undo();
mh = mh.load({});
mh = mh.extendParser((m: moment.Moment, d: string): any => {
});