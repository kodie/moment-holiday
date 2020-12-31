//! moment-holiday.js locale configuration
//! locale : United States
//! author : Kodie Grantham : https://github.com/kodie

(function() {
  var moment = (typeof require !== 'undefined' && require !== null) && !require.amd ? require('moment') : this.moment;

  moment.holidays.united_states = {
    "New Year's Day": {
      date: '1/1',
      keywords_n: ['eve']
    },
    "Martin Luther King Jr. Day": {
      date: '1/(1,3)',
      keywords: ['mlk']
    },
    "Valentine's Day": {
      date: '2/14'
    },
    "Washington's Birthday": {
      date: '2/(1,3)',
      keywords: ['george', 'president', 'day']
    },
    "Saint Patrick's Day": {
      date: '3/17',
      keywords: ['st[\\s\\.]', 'paddy', 'patty']
    },
    "Good Friday": {
      date: 'easter-2',
      keywords_y: ['good', 'friday']
    },
    "Easter Sunday": {
      date: 'easter',
      keywords_y: ['easter'],
      keywords: ['sunday']
    },
    "Memorial Day": {
      date: '5/(1,-1)'
    },
    "Mother's Day": {
      date: '5/(0,2)',
      keywords: ['mom']
    },
    "Father's Day": {
      date: '6/(0,3)',
      keywords: ['dad']
    },
    "Juneteenth": {
      date: '6/19',
      keywords: ['emancipation', 'freedom', 'jubilee', 'liberation']
    },
    "Independence Day": {
      date: '7/4',
      keywords: ['4th', 'fourth', 'july']
    },
    "Labor Day": {
      date: '9/(1,1)',
      keywords: ['labour']
    },
    "Columbus Day": {
      date: '10/(1,2)',
      keywords: ['christopher']
    },
    "Halloween": {
      date: '10/31'
    },
    "Veteran's Day": {
      date: '11/11',
      keywords: ['vet']
    },
    "Thanksgiving Day": {
      date: '11/(4,4)',
      keywords: ['thanks', 'turkey'],
      keywords_n: ['after']
    },
    "Day after Thanksgiving": {
      date: '11/(5,4)',
      keywords: ['thanks', 'turkey'],
      keywords_y: ['after']
    },
    "Christmas Eve": {
      date: '12/24',
      keywords: ['christ', 'x-?mas'],
      keywords_y: ['eve']
    },
    "Christmas Day": {
      date: '12/25',
      keywords: ['christ', 'x-?mas'],
      keywords_n: ['eve']
    },
    "New Year's Eve": {
      date: '12/31',
      keywords_y: ['year', 'eve']
    }
  };

  if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) { module.exports = moment; }
}).call(this);
