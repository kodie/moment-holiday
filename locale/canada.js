//! moment-holiday.js locale configuration
//! locale : Canada
//! author : Kodie Grantham : https://github.com/kodie
/* regions :
      AB : Alberta
      BC : British Columbia
      MB : Manitoba
      NB : New Brunswick
      NL : Newfoundland and Labrador
      NS : Nova Scotia
      NT : Northwest Territories
      NU : Nunavut
      ON : Ontario
      PE : Prince Edward Island
      QC : Quebec
      SK : Saskatchewan
*/
const MOMENT = require('moment')

(function() {
  var moment = this.moment || MOMENT

  moment.holidays.canada = {
    "New Year's Day": {
      date: '1/1',
      keywords_n: ['eve'],
    },
    "Valentine's Day": {
      date: '2/14'
    },
    "Islander Day": {
      date: '2/(1,2)',
      keywords_y: ['island'],
      regions: ['pe']
    },
    "Family Day": {
      date: '2/(1,3)',
      regions: ['ab', 'bc', 'on', 'sk']
    },
    "Louis Riel Day": {
      date: '2/(1,3)',
      regions: ['mb']
    },
    "Saint Patrick's Day": {
      date: '3/17',
      keywords: ['st[\\s\\.]', 'paddy', 'patty']
    },
    "Good Friday": {
      date: 'easter-2',
      keywords_y: ['good', 'friday'],
      regions_n: ['qc']
    },
    "Easter Sunday": {
      date: 'easter',
    },
    "Victoria Day": {
      date: '5/(1,[-24])',
      regions_n: ['nb', 'nl', 'ns']
    },
    "Mother's Day": {
      date: '5/(0,2)',
      keywords: ['mom']
    },
    "Father's Day": {
      date: '6/(0,3)',
      keywords: ['dad']
    },
    "Aboriginal Day": {
      date: '6/21',
      regions: ['nt']
    },
    "Saint Jean Baptiste Day": {
      date: '6/24',
      keywords: ['st[\\s\\.]'],
      regions: ['qc']
    },
    "Canada Day": {
      date: '7/1',
    },
    "Civic Day": {
      date: '8/(1,1)',
      regions: ['ab', 'bc', 'nb', 'nu', 'on', 'sk']
    },
    "Labour Day": {
      date: '9/(1,1)',
      keywords: ['labor']
    },
    "Halloween": {
      date: '10/31',
    },
    "Remembrance Day": {
      date: '11/11',
      regions_n: ['mb', 'ns', 'on', 'qc']
    },
    "Thanksgiving Day": {
      date: '11/(4,4)',
      keywords: ['thanks', 'turkey'],
      keywords_n: ['after'],
      regions_n: ['nb', 'nl', 'ns']
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
