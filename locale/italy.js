//! moment-holiday.js locale configuration
//! locale : Italy
//! author : Lorenzo Brutti : https://github.com/lbrutti
// based on Google Calendar of Italian Holidays : https://calendar.google.com/calendar/embed?src=it.italian%23holiday%40group.v.calendar.google.com&ctz=Europe%2FRome
const MOMENT = require('moment')

(function() {
  var moment = this.moment || MOMENT

  moment.holidays.italy = {
    "Assunzione / Ferragosto": {
      date: '08/15'
    },
    "Tutti i Santi": {
      date: '11/01'
    },
    "Immacolata": {
      date: '12/08'
    },
    "Natale": {
      date: '12/25'
    },
    "Santo Stefano": {
      date: '12/26'
    },
    "San Silvestro": {
      date: '12/31'
    },
    "Capodanno": {
      date: '01/01'
    },
    "Epifania": {
      date: '01/06'
    },
    "Pasqua": {
      date: 'easter'
    },
    "Lunedì di Pasquetta": {
      date: 'easter+1'
    },
    "Liberazione": {
      date: '04/25'
    },
    "Festa del Lavoro": {
      date: '05/01'
    },
    "Festa della Repubblica": {
      date: '06/02'
    }
  };

  if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) {
    module.exports = moment;
  }
}).call(this);
