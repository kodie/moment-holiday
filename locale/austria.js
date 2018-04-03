//! moment-holiday.js locale configuration
//! locale : Austria
//! author : Nick Müller : https://github.com/MorpheusXAUT
/* regions :
      B : Burgenland
      K : Kärnten
      NOE : Niederösterreich
      OOE : Oberösterreich
      S : Salzburg
      ST : Steiermark
      T : Tirol
      V : Vorarlberl
      W : Wien
*/

(function() {
  var moment = (typeof require !== 'undefined' && require !== null) && !require.amd ? require('moment') : this.moment;

  // Holiday data taken from https://www.feiertage-oesterreich.at, including non-public holidays
  moment.holidays.austria = {
    "Neujahrstag": {
      date: '1/1',
      keywords: ['new', 'year']
    },
    "Heilige Drei Könige": {
      date: '1/6',
      keywords: ['konige']
    },
    "St. Josef": {
      date: '3/19',
      keywords: ['josef'],
      keywords_n: ['public'],
      regions: ['k', 'st', 't', 'v']
    },
    "Karfreitag": {
      date: 'easter-2',
      keywords: ['good', 'friday'],
      keywords_n: ['public']
    },
    "Ostersonntag": {
      date: 'easter',
      keywords: ['easter'],
      keywords_n: ['monday']
    },
    "Ostermontag": {
      date: 'easter+1',
      keywords: ['easter', 'monday']
    },
    "Staatsfeiertag": {
      date: '5/1',
      keywords: ['national']
    },
    "St. Florian": {
      date: '4/5',
      keywords: ['florian'],
      keywords_n: ['public'],
      regions: ['k', 'st', 't', 'v']
    },
    "Christi Himmelfahrt": {
      date: 'easter+39',
      kaywords: ['ascension']
    },
    "Pfingstsonntag": {
      date: 'easter+49',
      keywords: ['pentecost']
    },
    "Pfingstmontag": {
      date: 'easter+50',
      keywords: ['whit', 'monday']
    },
    "Fronleichnam": {
      date: 'easter+60',
      keywords: ['corpus', 'christi']
    },
    "Mariä Himmelfahrt": {
      date: '8/15',
      keywords: ['assumption', 'mary']
    },
    "St. Rupert": {
      date: '9/24',
      keywords: ['rupert'],
      keywords_n: ['public'],
      regions: ['s']
    },
    "Tag der Volksabstimmung": {
      date: '10/10',
      keywords: ['referendum'],
      keywords_n: ['public'],
      regions: ['s']
    },
    "Nationalfeiertag": {
      date: '10/26',
      keywords: ['national']
    },
    "Allerheiligen": {
      date: '11/1',
      keywords: ['all', 'saints']
    },
    "St. Martin": {
      date: '11/11',
      keywords: ['martin'],
      keywords_n: ['public'],
      regions: ['b']
    },
    "St. Leopold": {
      date: '11/15',
      keywords: ['leopold'],
      keywords_n: ['public'],
      regions: ['noe']
    },
    "Mariä Empfängnis": {
      date: '8/15',
      keywords: ['immaculate', 'conception']
    },
    "Heiliger Abend": {
      date: '12/24',
      keywords: ['christmas'],
      keywords_n: ['public'],
      keywords_y: ['eve']
    },
    "Christtag": {
      date: '12/25',
      keywords: ['christmas'],
      keywords_n: ['eve']
    },
    "Stefanitag": {
      date: '12/25',
      keywords: ['stephen']
    },
    "Silvester": {
      date: '12/31',
      keywords: ['new', 'year', 'eve']
    }
  };

  if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) { module.exports = moment; }
}).call(this);
