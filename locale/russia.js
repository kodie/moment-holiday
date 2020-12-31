//! moment-holiday.js locale configuration
//! locale : Russa
//! author : Vasilii Vakhtin : https://github.com/Vasil11

(function() {
  var moment = require('moment');

  moment.holidays.russia = {
    "New Year and Christmas Holidays": {
      date: '1/1 | 1/8',
      keywords: ['new', 'year', 'christmas']
    },
    "Defender's Day": {
      date: '2/23',
      keywords: ['defender\'s day', '23 of February']
    },
    "Women's Day": {
      date: '3/8',
      keywords: ['women\'s day', '8 of March']
    },
    "May Day": {
      date: '5/1',
      keywords: ['may day', 'Labour', 'spring']
    },
    "Victory Day": {
      date: '5/9',
      keywords: ['victory day']
    },
    "Russia Day": {
      date: '6/12',
      keywords: ['russia day']
    },
    "National Unity Day": {
      date: '11/4',
      keywords: ['national unity day']
    },
    "New Year": {
    date: '12/31',
    keywords: ['new', 'year']
    }
  };

  if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) { module.exports = moment; }
}).call(this);
