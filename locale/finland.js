//! moment-holiday.js locale configuration
//! locale : Finland
//! author : Kodie Grantham : https://github.com/kodie

(function() {
  var moment = (typeof require !== 'undefined' && require !== null) && !require.amd ? require('moment') : this.moment;

  moment.holidays.finland = {
    "Uudenvuodenpäivä": {
      date: '1/1',
      keywords: ['uudenvuodenpäivä', 'uudenvuodenpaiva', 'new', 'year']
    },
    "Loppiainen": {
      date: '1/6',
      keywords: ['loppiainen']
    },
    "Vappu": {
      date: '5/1',
      keywords: ['vappu']
    },
    "Juhannuspäivä": {
      date: '6/(6,[21])',
      keywords: ['juhannuspäivä', 'juhannuspaiva']
    },
    "Pyhäinpäivä": {
      date: '11/(6,[1])',
      keywords: ['pyhäinpäivä', 'pyhainpaiva']
    },
    "Joulupäivä": {
      date: '12/25',
      keywords: ['joulupäivä', 'joulupaiva', 'christmas']
    },
    "Tapaninpäivä": {
      date: '12/26',
      keywords: ['tapaninpäivä', 'tapaninpaiva']
    },
    "Pitkäperjantai": {
      date: 'goodfriday',
      keywords: ['pitkäperjantai', 'pitkaperjantai', 'good', 'friday']
    },
    "Pääsiäispäivä": {
      date: 'easter',
      keywords: ['pääsiäispäivä', 'paasiaispaiva', 'easter'],
      keywords_n: ['toinen', 'monday']
    },
    "Toinen Pääsiäispäivä": {
      date: 'eastermonday',
      keywords: ['pääsiäispäivä', 'paasiaispaiva', 'easter', 'monday'],
      keywords_y: ['toinen']
    },
    "Helatorstai": {
      date: 'ascension',
      keywords: ['helatorstai', 'ascension']
    }
  };

  if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) { module.exports = moment; }
}).call(this);
