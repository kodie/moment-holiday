import * as moment from 'moment';

declare module 'moment' {
    interface Moment extends Object {
        holiday(holidays?: Array<string> | string, adjust?: boolean): Moment | false | { [holidayName: string]: Moment }

        holidays(holidays?: Array<string> | string, adjust?: boolean): Moment | false | { [holidayName: string]: Moment }

        isHoliday(holidays?: Array<string> | string | null, adjust?: boolean): boolean | string | Array<string>

        previousHoliday(count?: number, adjust?: boolean): Array<Moment> | Moment;

        previousHolidays(count?: number, adjust?: boolean): Array<Moment> | Moment;

        nextHoliday(count?: number, adjust?: boolean): Array<Moment> | Moment;

        nextHolidays(count?: number, adjust?: boolean): Array<Moment> | Moment;

        holidaysBetween(m: Moment, adjust?: boolean): Array<Moment> | false;
    }

    interface IHolidays {
        active: any;
        active_last: any;
    }

    interface IHolidayModifier {
        set(holidays: any, specifics?: any): IHolidayModifier;

        add(holidays: any, specifics?: any): IHolidayModifier;

        remove(holidays: any): IHolidayModifier;

        undo(): IHolidayModifier;

        load(locales: any): IHolidayModifier;

        extendParser(parserFunc: (m: Moment, date: string) => any): IHolidayModifier;
    }

    export var holidays: IHolidays;
    export var modifyHolidays: IHolidayModifier;
}