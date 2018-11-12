//! moment-holiday.js locale configuration
//! locale : Ghana
//! author : Emmanuel Zidafamor : https://github.com/e-zidaf
/* Cities :
       Accra
       Kumasi
       Tamale
       Secondi-Takoradi
       Sunyani
       Cape-Coast
       Bayelsa
       Obuasi
       Teshie
       Tema
       Koforidua
*/

(function() {
  var moment = require("moment");

  moment.holidays.ghana = {
    "New Year's Day": {
      date: '1/1',
      keywords: ['New Year'],
    },
    "New Year's Holiday":{
        date: '1/2',
        keywords: ['Public Holiday'],
    },
    "Valentine's Day": {
      date: '2/14'
    },
    "Independence Day": {
      date: '3/6',
      keywords: ['Independence'],
    },
    "Good Friday": {
      date: 'easter-2',
      keywords_y: ['good', 'friday'],
      regions_n: ['qc']
    },
    "Easter Sunday": {
      date: 'easter',
    },
//! Monday's precceding Easter Sundays
    "Easter Monday": {
        date: 'easter-3',
        keywords: ['easter monday'],
    },
    "African Unity Day": {
      date: '5/25',
      keywords: ['unity day'],
    },
    "Eid ul-Fitr": {
      date: '6/26',
      keywords: ['end of ramadan'],
    },
    "Republic Day": {
      date: '7/3',
      keywords: ['ghana republic'],
    },
    "Eidul-Adha": {
      date: '9/1',
      keywords: ['Eid'],
    },
    "Founders Day": {
      date: '9/21',
      keywords: ['birthday of Ghana first president, Kwame Nkrumah'],
    },
    "Farmer's Day": {
      date: '12/1',
      keywords: ['farmers day, first friday of december'],
    },
    "Christmas Day": {
      date: '12/25',
      keywords: ['christ', 'x-?mas'],
      keywords_n: ['eve']
    },
    "Boxing Day": {
      date: '12/26',
      keywords: ['box'],
      regions: ['on']
    }
  };

  if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) { module.exports = moment; }
}).call(this);
