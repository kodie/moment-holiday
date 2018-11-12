//! moment-holiday.js locale configuration
//! locale : BE
//! author : Kodie Grantham : https://github.com/kodie
//! locale-author: lordldx : https://github.com/lordldx
//
/* regions :
      BE: Belgium
*/

(function() {
  var moment = require("moment");

  moment.holidays.belgium = {
    "Nieuwjaar": {
      date: '1/1',
      keywords: ['nieuwjaardag'],
      keywords_n: ['oudejaar']
    },
    "Pasen": {
      date: 'easter',
      keywords:['paaszondag'],
      keywords_n: ['maandag']
    },
    "Paasmaandag": {
      date: 'easter+1',
      keywords_y: ['maandag']
    },
    "Dag van de arbeid": {
      date: '5/1',
      keywords: ['arbeid', 'socialist', 'socialisten', 'sossen', 'may day']
    },
    "Onze Heer Hemelvaart": {
      date: 'easter+39',
        keywords_y: ['hemelvaart'],
        keywords: ['hemelvaartsdag'],
        keywords_n: ['vrouw']
    },
    "Pinksteren": {
      date: 'easter+49',
      keywords:['pentecost'],
      keywords_n: ['maandag']
    },
    "Pinkstermaandag": {
      date: 'easter+50',
      keywords:['pentecost'],
      keywords_y: ['maandag']
    },
    "Nationale feestdag": {
      date: '7/21'
    },
    "Onze Lieve Vrouw Hemelvaart": {
      date: '8/15',
      keywords: ['hemelvaart', 'halfoogst'],
      keywords_n: ['heer']
    },
    "Allerheiligen": {
      date: '11/1',
      keywords: ['all saints']
    },
    "Wapenstilstand": {
      date: '11/11',
      keywords: ['wapen', 'stilstand', 'armstice']
    },
    "Kerstmis": {
      date: '12/25',
      keywords: ['kerst', 'christ', 'x-?mas', 'kerstdag'],
      keywords_n: ['eve', 'avond', 'kerstavond', 'tweede', '2']
    },
    "Tweede kerstdag": {
      date: '12/26',
      keywords: ['eve', 'avond', 'kerstavond']
    }
  };

  if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) { module.exports = moment; }
}).call(this);
