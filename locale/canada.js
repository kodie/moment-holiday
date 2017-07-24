//! moment-holiday.js locale configuration
//! locale : Canada
//! author : Kodie Grantham : https://github.com/kodie
/*! regions :
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

(function() {
  var moment = (typeof require !== 'undefined' && require !== null) && !require.amd ? require('moment') : this.moment;

  moment.holidays.canada = {
    "New Year's Day": {
      date: '1/1',
      keywords: ['new'],
      keywords_y: ['year'],
      keywords_n: ['eve'],
    },
    "Valentine's Day": {
      date: '2/14',
      keywords_y: ['valentine'],
    },
    "Islander Day": {
      date: '2/(1,2)',
      keywords_y: ['island'],
      regions: ['pe']
    },
    "Family Day": {
      date: '2/(1,3)',
      keywords_y: ['family'],
      regions: ['ab', 'bc', 'on', 'sk']
    },
    "Louis Riel Day": {
      date: '2/(1,3)',
      keywords: ['louis', 'riel'],
      regions: ['mb']
    },
    "Saint Patrick's Day": {
      date: '3/17',
      keywords: ['patrick', 'saint', 'st[\\s\\.]', 'paddy', 'patty']
    },
    "Good Friday": {
      date: 'goodfriday',
      keywords_y: ['good', 'friday'],
      regions_n: ['qc']
    },
    "Easter Sunday": {
      date: 'easter',
      keywords_y: ['easter'],
      keywords: ['sunday']
    },
    "Victoria Day": {
      date: '5/(1,[-24])',
      keywords_y: ['victoria'],
      regions_n: ['nb', 'nl', 'ns']
    },
    "Mother's Day": {
      date: '5/(0,2)',
      keywords: ['mother', 'mom']
    },
    "Father's Day": {
      date: '6/(0,3)',
      keywords: ['father', 'dad']
    },
    "Aboriginal Day": {
      date: '6/21',
      keywords_y: ['aboriginal'],
      regions: ['nt']
    },
    "Saint Jean Baptiste Day": {
      date: '6/24',
      keywords: ['st[\\s\\.]', 'saint', 'jean', 'baptiste'],
      regions: ['qc']
    },
    "Canada Day": {
      date: '7/1',
      keyword_y: ['canada']
    },
    "Civic Day": {
      date: '8/(1,1)',
      keywords_y: ['civic'],
      regions: ['ab', 'bc', 'nb', 'nu', 'on', 'sk']
    },
    "Labour Day": {
      date: '9/(1,1)',
      keywords: ['labour', 'labor']
    },
    "Halloween": {
      date: '10/31',
      keywords_y: ['halloween']
    },
    "Remembrance Day": {
      date: '11/11',
      keywords_y: ['remembrance'],
      regions_n: ['mb', 'ns', 'on', 'qc']
    },
    "Thanksgiving Day": {
      date: '11/(4,4)',
      keywords: ['thanksgiving', 'thanks', 'turkey'],
      keywords_n: ['after'],
      regions_n: ['nb', 'nl', 'ns']
    },
    "Christmas Day": {
      date: '12/25',
      keywords: ['christmas', 'christ', 'x-?mas'],
      keywords_n: ['eve']
    },
    "Boxing Day": {
      date: '12/26',
      keywords: ['box', 'boxing'],
      regions: ['on']
    }
  };

  if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) { module.exports = moment; }
}).call(this);
