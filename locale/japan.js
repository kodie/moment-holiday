//! moment-holiday.js locale configuration
//! locale : Japan
//! author : garroadran : https://github.com/garroadran/

(function() {
  var moment = require("moment");

  moment.holidays.japan = {
    "Gantan": {
      date: '1/1',
      keywords: ['new', 'year']
    },
    "Seijin no hi": {
      date: '1/(1,2)',
      keywords: ['coming', 'age']
    },
    "Kenkoku kinen no hi": {
      date: '2/11',
      keywords: ['national', 'foundation'],
    },
    "Shunbun no hi": {
      date: '3/20',
      keywords: ['vernal', 'equinox']
    },
    "Showa no hi": {
      date: '4/29',
      keywords: ['emperor']
    },
    "Kenpou kinenbi" : {
      date: '5/3',
      keywords: ['constitution', 'memorial']
    },
    "Midori no hi": {
      date: '5/4',
      keywords: ['green', 'greenery']
    },
    "Kodomo no hi": {
      date: '5/5',
      keywords: ['kids', 'children']
    },
    "Umi no hi": {
      date: '7/(1,3)',
      keywords: ['marine', 'ocean', 'sea']
    },
    "Yama no hi": {
      date: '8/11',
      keywords: ['mountain']
    },
    "Keiro no hi": {
      date: '9/(1,3)',
      keywords: ['respect', 'aged', 'seniors']
    },
    "Shubun no hi": {
      date: '9/23',
      keywords: ['autumn', 'fall', 'autumnal', 'equinox']
    },
    "Taiiku no hi": {
      date: '10/(1,2)',
      keywords: ['health', 'sports']
    },
    "Bunka no hi": {
      date: '11/3',
      keywords: ['culture']
    },
    "Rodo kansha no hi": {
      date: '11/23',
      keywords: ['labor', 'appreciation']
    },
    "Tennou tanjoubi": {
      date: '12/23',
      keywords: ['emperor', 'birthday']
    }
  };

  if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) { module.exports = moment; }
}).call(this);
