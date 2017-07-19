//! moment-holiday.js locale configuration
//! locale : Canada
//! author : Kodie Grantham : https://github.com/kodie

(function() {
  var moment = (typeof require !== 'undefined' && require !== null) && !require.amd ? require('moment') : this.moment;

  moment.holidays.canada = {
    "New Year's Day": {
      date: '1/1',
      keywords: ['new'],
      keywords_y: ['year'],
      keywords_n: ['eve']
    },
    "Family Day": {
      date: '2/(1,3)',
      keywords_y: ['family']
    },
    "Mother's Day": {
      date: '5/(0,2)',
      keywords: ['mother', 'mom']
    },
    "Father's Day": {
      date: '6/(0,3)',
      keywords: ['father', 'dad']
    },
    "Victoria Day": {
      date: '5/(1,[-24])',
      keywords_y: ['victoria']
    },
    "Civic Day": {
      date: '8/(1,1)',
      keywords_y: ['civic']
    },
    "Labour Day": {
      date: '9/(1,1)',
      keywords: ['labour', 'labor']
    },
    "Christmas Day": {
      date: '12/25',
      keywords: ['christmas', 'christ', 'xmas', 'x-mas'],
      keywords_n: ['eve']
    },
    "Boxing Day": {
      date: '12/26',
      keywords: ['box', 'boxing']
    }
  };

  if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) { module.exports = moment; }
}).call(this);
