//! moment-holiday.js locale configuration
//! locale : Finland
//! author : Kodie Grantham : https://github.com/kodie

(function() {
  var moment = require('moment');

  moment.holidays.finland = {
    "Uudenvuodenpäivä": {
      date: '1/1',
      keywords: ['uudenvuodenpaiva', 'new', 'year']
    },
    "Loppiainen": {
      date: '1/6'
    },
    "Vappu": {
      date: '5/1'
    },
    "Juhannuspäivä": {
      date: '6/(6,[21])',
      keywords: ['juhannuspaiva']
    },
    "Pyhäinpäivä": {
      date: '11/(6,[1])',
      keywords: ['pyhainpaiva']
    },
    "Joulupäivä": {
      date: '12/25',
      keywords: ['joulupaiva', 'christmas']
    },
    "Tapaninpäivä": {
      date: '12/26',
      keywords: ['tapaninpaiva']
    },
    "Pitkäperjantai": {
      date: 'easter-2',
      keywords: ['pitkaperjantai', 'good', 'friday']
    },
    "Pääsiäispäivä": {
      date: 'easter',
      keywords: ['paasiaispaiva', 'easter'],
      keywords_n: ['toinen', 'monday']
    },
    "Toinen Pääsiäispäivä": {
      date: 'easter+1',
      keywords: ['paasiaispaiva', 'easter', 'monday'],
      keywords_y: ['toinen']
    },
    "Helatorstai": {
      date: 'easter+39',
      keywords: ['ascension']
    }
  };

  if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) { module.exports = moment; }
}).call(this);
