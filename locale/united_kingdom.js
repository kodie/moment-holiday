//! moment-holiday.js locale configuration
//! locale : UK
//! author : Kodie Grantham : https://github.com/kodie
//! locale-author: DMCooper : https://github.com/SilentGamelan
//
/* regions :
      EN : England
      SL : Scotland
      WL : Wales
      NI : Northern Island
*/

(function() {
  var moment = require("moment");

  moment.holidays.united_kingdom = {
    "New Year's Day": {
      date: '1/1',
      keywords_n: ['eve']
    },
    "Saint David's Day": {
      date: '3/1',
      keywords:['David', 'st[\\s\\.]'],
      regions: ['WL']
    },
    "Saint Patrick's Day": {
      date: '3/17',
      keywords:['paddy', 'st[\\s\\.]'],
      regions: ['NI']
    },
    "Good Friday": {
      date: 'easter-2',
      keywords_y: ['good', 'friday'],
    },
    "Easter Sunday": {
      date: 'easter',
      keywords_y: ['easter'],
      keywords:['sunday']
    },
    "Easter Monday": {
      date: 'easter+1)',
      keywords_y: ['easter'],
      keywords: ['monday'],
      regions: ['EN', 'NI', 'WL']
    },
    "Mothering Sunday": {
      date: 'easter-21',
      keywords_y:['mother'],
      keywords: ['sunday', 'day']
    },
    "Saint George's Day": {
      date: '4/24',
      keywords: ['st[\\s\\.]', 'george'],
      regions: ['EN']
    },
    "May Day": {
      date: '5/1'
    },
    "Early May Bank Holiday" : {
      date: '5/(1,1)',
      keywords_y: ['may'],
      keywords: ['spring', 'early', 'may']
    },
    "Spring Bank Holiday": {
      date: '5/(1,-1)',
      keywords: ['bank', 'spring', 'late']
    },
    "Queen's Birthday": {
      date: '6/(6,2)',
      keywords: ['queen']
    },
   "Father's Day": {
      date: '6/(0,3)',
      keywords: ['dad', 'father']
    },
    "Battle of the Boyne": {
      date: '6/12',
      keywords: ['battle', 'boyne'],
      regions: ['NI']
    },
    "Summer Bank Holiday (Scotland)": {
      date: '8/(1,1)',
      keywords: ['summer', 'bank'],
      regions: ['SC']
    },
    "Summer Bank Holiday": {
      date: '8/(1,-1)',
      keywords: ['summer', 'bank'],
      keywords_n: ['scottish', 'scotland'],
      regions: ['EN', 'WL', 'NI']
    },
    "Halloween": {
      date: '10/31',
    },
    "Guy Fawks Day": {
      date: '10/5',
      keywords: ['guy', 'fawks', 'bonfire']
    },
    "Remembrance Day": {
      date: '1/(0,2)',
      keywords: ['poppy', 'remembrance']
    },
    "Saint Andrews Day": {
      date: '10/30',
      keywords: ['andrew', 'saint', 'st[\\s\\.]'],
      regions: ['SL']
    },
    "Christmas Day": {
      date: '12/25',
      keywords: ['christ', 'x-?mas'],
      keywords_n: ['eve']
    },
    "Boxing Day": {
      date: '12/26',
      keywords: ['box']
    }
  };

  if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) { module.exports = moment; }
}).call(this);
