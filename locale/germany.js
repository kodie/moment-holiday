//! moment-holiday.js locale configuration
//! locale : Germany
//! author : Kodie Grantham : https://github.com/kodie
/*! regions :
      BB : Brandenburg
      BW : Baden-Württemberg
      BY : Bayern
      HE : Hessen
      MV : Mecklenburg-Vorpommern
      NW : Nordrhein-Westfalen
      RP : Rheinland-Pfalz
      SN : Sachsen
      SL : Saarland
      ST : Sachsen-Anhalt
      TH : Thüringen
*/

(function() {
  var moment = (typeof require !== 'undefined' && require !== null) && !require.amd ? require('moment') : this.moment;

  moment.holidays.germany = {
    "Neujahrstag": {
      date: '1/1',
      keywords: ['neujahrstag']
    },
    "Karfreitag": {
      date: 'goodfriday',
      keywords: ['karfreitag']
    },
    "Ostersonntag": {
      date: 'easter',
      keywords: ['ostersonntag'],
      regions: ['bb']
    },
    "Ostermontag": {
      date: 'eastermonday',
      keywords: ['ostermontag']
    },
    "Heilige Drei Könige": {
      date: '1/6',
      keywords: ['heilige', 'drei', 'könige', 'konige'],
      regions: ['bw', 'by', 'st']
    },
    "Maifeiertag": {
      date: '5/1',
      keywords: ['maifeiertag']
    },
    "Christi Himmelfahrt": {
      date: 'ascensionday',
      kaywords: ['christi', 'himmelfahrt']
    },
    "Pfingstsonntag": {
      date: 'pentecost',
      keywords: ['pfingstsonntag'],
      regions: ['bb']
    },
    "Pfingstmontag": {
      date: 'whitmonday',
      keywords: ['pfingstmontag']
    },
    "Fronleichnam": {
      date: 'corpuschristi',
      keywords: ['fronleichnam'],
      regions: ['bw', 'by', 'he', 'nw', 'rp', 'sl']
    },
    "Mariä Himmelfahrt": {
      date: '8/15',
      keywords: ['mariä', 'maria', 'himmelfahrt'],
      regions: ['sl']
    },
    "Tag der deutschen Einheit": {
      date: '10/3',
      keywords: ['deutschen', 'einheit']
    },
    "Reformationstag": {
      date: '10/31',
      keywords: ['reformationstag'],
      regions: ['bb', 'mv', 'sn', 'st', 'th']
    },
    "Allerheiligen": {
      date: '11/1',
      keywords: ['allerheiligen'],
      regions: ['bw', 'by', 'nw', 'rp', 'sl']
    },
    "Buß- und Bettag": {
      date: '11/(3,[17])',
      keywords: ['buß', 'bub', 'und', 'bettag'],
      regions: ['sn']
    },
    "Weihnachten": {
      date: '12/24',
      keywords: ['weihnachten']
    },
    "Weihnachtsfeiertag": {
      date: '12/15',
      keywords: ['weihnachtsfeiertag'],
      keywords_n: ['zweiter']
    },
    "Zweiter Weihnachtsfeiertag": {
      date: '12/26',
      keywords: ['weihnachtsfeiertag'],
      keywords_y: ['zweiter']
    }
  };

  if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) { module.exports = moment; }
}).call(this);
