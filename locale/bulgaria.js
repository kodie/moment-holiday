//! moment-holiday.js locale configuration
//! locale : Bulgaria
//! author : Nikolay Kovachev : https://github.com/plezzz
/* regions : All*/

(function() {
  var moment = (typeof require !== 'undefined' && require !== null) && !require.amd ? require('moment') : this.moment;

  moment.holidays.bulgaria = {
    "Нова Година": {
      date: '1/1',
      keywords: ['new', 'year']
    },
    "Ден на Освобождението на България от османско робство": {
      date: '3/3',
      keywords: ['Day of the Liberation of Bulgaria from Ottoman slavery', 'slavery', 'Liberation of Bulgaria']
    },
    "Разпети петък": {
      date: 'easter-2',
      keywords: ['good', 'friday']
    },
    "Великден": {
      date: 'easter',
      keywords: ['easter'],
    },
    "Велики понеделник": {
      date: 'easter+1',
      keywords: ['easter', 'monday']
    },
    "Ден на труда и на международната работническа солидарност": {
      date: '1/5',
      keywords: ['Labor Day and International Workers Solidarity'],
    },
    "Гергьовден, ден на храбростта и Българската армия": {
      date: '5/6',
      keywords: ['St. George Day, a day of courage and the Bulgarian army'],
    },
    "Ден на българската просвета и култура и на славянската писменост": {
      date: '5/24',
      keywords: ['Day of Bulgarian education and culture and of the Slavic script']
    },
    "Ден на Съединението": {
      date: '9/6',
      keywords: ['Unification Day'],
    },
    "Ден на независимостта на България": {
      date: '9/22',
      keywords: ['Independence Day of Bulgaria']
    },
    "Ден на народните будители": {
      date: '11/1',
      keywords: ['Day of National Leaders'],
    },
    "Бъдни вечер": {
      date: '12/24',
      keywords: ['christmas','eve']
    },
    "Рождество Христово": {
      date: '12/25',
      keywords: ['christmas']
    },
    "Коледа": {
      date: '12/26',
      keywords_y: ['christmas']
    }
  };

  if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) { module.exports = moment; }
}).call(this);
