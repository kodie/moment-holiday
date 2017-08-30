import * as moment from 'moment';

declare module 'moment' {
    interface Moment extends Object {
        holiday(
            holidays?: Array<string> | string,
            adjust?: boolean): Moment | false | { [holidayName: string]: Moment }

        holidays(
            holidays?: Array<string> | string,
            adjust?: boolean): Moment | false | { [holidayName: string]: Moment }

        isHoliday(
            holidays?: Array<string> | string | null,
            adjust?: boolean): boolean | string | Array<string>

        previousHoliday(count?: number, adjust?: boolean): Array<Moment> | Moment;

        previousHolidays(count?: number, adjust?: boolean): Array<Moment> | Moment;

        nextHoliday(count?: number, adjust?: boolean): Array<Moment> | Moment;

        nextHolidays(count?: number, adjust?: boolean): Array<Moment> | Moment;

        holidaysBetween(m: Moment, adjust?: boolean): Array<Moment> | false;
    }

    interface IHolidayDefinition {
        date: string;
        keywords?: Array<string>;
        keywords_y?: Array<string>;
        keywords_n?: Array<string>;
        regions?: Array<string>;
        regions_n?: Array<string>;
    }

    interface IHolidaysMapping {
        [holidayName: string]: IHolidayDefinition;
    }

    interface IHolidays {
        active: IHolidaysMapping;
        active_last: IHolidaysMapping;
    }

    interface IHolidayModifier {
        set(
            holidays: IHolidaysMapping | string | Array<string>,
            specifics?: any): IHolidayModifier;

        add(
            holidays: IHolidaysMapping | string,
            specifics?: any): IHolidayModifier;

        remove(holidays: string | Array<string>): IHolidayModifier;

        undo(): IHolidayModifier;

        load(locales: string | Array<string>): IHolidayModifier;

        extendParser(parserFunc: (m: Moment, date: string) => moment.Moment | Array<moment.Moment> | false | void): IHolidayModifier;
    }

    export var holidays: IHolidays;
    export var modifyHolidays: IHolidayModifier;
}