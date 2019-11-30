//! moment-holiday.js locale configuration
//! locale : Croatia / Hrvatska
//! author : diomed : https://github.com/diomed

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('moment')) :
  typeof define === 'function' && define.amd ? define(['moment'], factory) :
  (global = global || self, factory(global.moment)); // jshint ignore:line
}(this, (function (moment) {

  moment = moment && moment.hasOwnProperty('default') ? moment['default'] : moment;

  moment.holidays.croatia = {
    "Nova Godina": {
      date: '1/1',
      keywords: ['new', 'year']
    },
    "Bogojavljenje": {
      date: '1/6',
      keywords: ['tri kralja']
    },
    "Uskrs": {
      date: 'easter',
      keywords: ['easter'],
      keywords_n: ['monday']
    },
    "Uskrsni ponedjeljak": {
      date: 'easter+1',
      keywords: ['uskršnji', 'easter', 'monday']
    },
    "Praznik rada": {
      date: '5/1'
    },
    "Tijelovo": {
      date: 'easter+60',
      keywords: ['corpus', 'christi']
    },
    "Dan antifašističke borbe": {
      date: '6/22',
      keywords: ['antifasisticke']
    },
    "Dan državnosti": {
      date: '6/25',
      keywords: ['drzavnost', 'domovinske', 'domovinska']
    },
    "Dan zahvalnosti": {
      date: '8/5',
      keywords: ['domovinske', 'thanksgiving']
    },
    "Velika Gospa": {
      date: '8/15'
    },
    "Dan neovisnosti": {
      date: '10/8',
      keywords: ['nezavisnosti', 'independence']
    },
    "Dan svih svetih": {
      date: '11/1',
      keywords: ['svi sveti', 'sesvete', 'sisvete']
    },
    "Božić": {
      date: '12/25',
      keywords: ['bozic', 'christmas']
    },
    "Sveti Stjepan": {
      date: '12/26',
      keywords: ['sv[\\s\\.]']
    }
  };

  return moment;

})));
