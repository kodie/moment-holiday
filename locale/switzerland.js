//! moment-holiday.js locale configuration
//! locale : Switzerland
//! author : Kodie Grantham : https://github.com/kodie
/* regions :
      AG : Aargau
      AI : Appenzell Innerrhoden
      AR : Appenzell Ausserrhoden
      BE : Bern
      BL : Basel-Landschaft
      BS : Basel-Stadt
      FR : Freiburg
      GE : Genf
      GL : Glarus
      GR : Graubünden
      JU : Jura
      LU : Luzern
      NE : Neuenburg
      NW : Nidwalden
      OW : Obwalden
      SG : St. Gallen
      SH : Schaffhausen
      SO : Solothurn
      SZ : Schwyz
      TG : Thurgau
      TI : Tessin
      UR : Uri
      VD : Waadt
      VS : Wallis
      ZG : Zug
      ZH : Zürich
*/

(function() {
  var moment = this.moment || require('moment');

  moment.holidays.switzerland = {
    "Neujahrstag": {
      date: '1/1',
      keywords: ['new', 'year']
    },
    "Berchtoldstag": {
      date: '1/2',
      keywords: ['berchtold'],
      regions_n: ['ai', 'ar', 'bl', 'bs', 'ge', 'gr', 'sz', 'ti', 'ur']
    },
    "Dreikönigstag": {
      date: '1/6',
      keywords: ['epiphany', 'konige'],
      regions: ['sz', 'ti', 'ur']
    },
    "Ausrufung Republik Neuenburg": {
      date: '3/1',
      keywords: ['establishment', 'republic', 'neuchatel'],
      regions: ['ne']
    },
    "Josephstag": {
      date: '3/19',
      keywords: ['joseph'],
      regions: ['nw', 'sz', 'ti', 'ur', 'vs']
    },
    "Karfreitag": {
      date: 'easter-2',
      keywords: ['good', 'friday'],
      regions_n: ['ti', 'vs']
    },
    "Ostersonntag": {
      date: 'easter',
      keywords: ['easter'],
      keywords_n: ['monday']
    },
    "Ostermontag": {
      date: 'easter+1',
      keywords: ['easter', 'monday'],
      regions_n: ['ne']
    },
    "Näfelser Fahrt": {
      date: '4/(4,1)',
      keywords: ['nafels', 'fahrt'],
      regions: ['gl']
    },
    "Tag der Arbeit": {
      date: '5/1',
      keywords: ['labor'],
      regions: ['ag', 'bl', 'bs', 'ju', 'ne', 'sh', 'so', 'tg', 'ti', 'zh']
    },
    "Auffahrt": {
      date: 'easter+39',
      keywords: ['ascension', 'christi', 'himmelfahrt']
    },
    "Pfingstsonntag": {
      date: 'easter+49',
      keywords: ['pentecost']
    },
    "Pfingstmontag": {
      date: 'easter+50',
      keywords: ['whit', 'monday'],
      regions_n: ['ne']
    },
    "Fronleichnam": {
      date: 'easter+60',
      keywords: ['corpus', 'christi'],
      regions_n: ['ar', 'be', 'bl', 'bs', 'ge', 'gl', 'gr', 'sg', 'sh', 'tg', 'vd', 'zh']
    },
    "Unabhängigkeitsfest Jura": {
      date: '6/23',
      keywords: ['independence', 'jura'],
      regions: ['ju']
    },
    "St. Peter und Paul": {
      date: '6/29',
      keywords: ['st[\\s\\.]', 'peter', 'paul'],
      regions: ['ti']
    },
    "Bundesfeiertag": {
      date: '8/1',
      keywords: ['national', 'holiday']
    },
    "Mariä Himmelfahrt": {
      date: '8/15',
      keywords: ['assumption', 'maria'],
      regions: ['ag', 'ai', 'fr', 'ju', 'lu', 'nw', 'ow', 'so', 'sz', 'ti', 'ur', 'vs', 'zg']
    },
    "Genfer Bettag": {
      date: '9/(4,[-11])',
      keywords: ['repentance'],
      keywords_y: ['geneva'],
      keywords_n: ['federal', 'monday'],
      regions: ['ge']
    },
    "Eidg. Dank-, Buss- und Bettag": {
      date: '9/(0,3)',
      keywords: ['repentance'],
      keywords_y: ['federal'],
      keywords_n: ['geneva', 'monday'],
      regions: ['vd']
    },
    "Bettagsmontag": {
      date: '9/(1,[-22])',
      keywords: ['repentance'],
      keywords_y: ['monday'],
      keywords_n: ['federal', 'geneva'],
      regions: ['vd']
    },
    "Mauritiustag": {
      date: '9/22',
      keywords: ['maurice'],
      regions: ['ai']
    },
    "Bruderklausenfest": {
      date: '9/25',
      keywords: ['brother', 'klaus'],
      regions: ['ow']
    },
    "Allerheiligen": {
      date: '11/1',
      keywords: ['all', 'saints'],
      regions_n: ['ar', 'be', 'bl', 'bs', 'ge', 'gr', 'ne', 'sh', 'tg', 'vd', 'zh']
    },
    "Mariä Empfängnis": {
      date: '12/8',
      keywords: ['immaculate', 'conception'],
      regions: ['ag', 'ai', 'fr', 'lu', 'nw', 'ow', 'sz', 'ti', 'ur', 'vs', 'zg']
    },
    "Weihnachtstag": {
      date: '12/25',
      keywords: ['christ', 'x-?mas']
    },
    "Stephanstag": {
      date: '12/26',
      keywords: ['boxing', 'box'],
      regions_n: ['ge', 'ju', 'vd']
    },
    "Wiederherstellung Republik Genf": {
      date: '12/31',
      keywords: ['restoration', 'republic', 'geneva'],
      regions: ['ge']
    }
  };

  if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) { module.exports = moment; }
}).call(this);
