//! moment-holiday.js locale configuration
//! locale : FR
//! locale-author : Benjamin Dequevauviller : https://github.com/blurp1478963
//
const MOMENT = require('moment')

(function() {
  var moment = this.moment || MOMENT

  moment.holidays.france = {
    "Jour de l'an": {
      date: '1/1'
    },
    "Fête du Travail": {
      date: '5/1',
    },
    "8 Mai 1945": {
      date: '5/8',
    },
    "Fête Nationale": {
      date: '7/14',
    },
    "Assomption": {
      date: '8/15',
    },
    "La Toussaint": {
      date: '11/1',
    },
    "Armistice": {
      date: '11/11',
    },
    "Noël": {
      date: '12/25',
    },
    "Vendredi Saint": {
      date: 'easter-2',
      keywords_y: ['good', 'friday'],
    },
    "Jeudi de l'Ascension": {
      date: 'easter+39',
      keywords_y: ['good', 'thursday'],
    },
    "Dimanche de Pâques": {
      date: 'easter',
      keywords_y: ['easter'],
      keywords: ['sunday']
    },
    "Lundi de Pâques": {
      date: 'easter+1',
      keywords_y: ['good', 'monday'],
    },
    "Lundi de Pentecôte": {
      date: 'easter+50',
      keywords_y: ['good', 'monday'],
    }
  };

  if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) {
    module.exports = moment;
  }
}).call(this);
