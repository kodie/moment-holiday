//! moment-holiday.js locale configuration
//! locale : BE
//! author : Matthias Greif : https://github.com/greifmatthias
//! locale-author: Matthais Greif : https://github.com/greifmatthias
//
/* regions :
      BE : Flanders
      FR : Wallonia
*/

(function () {
    var moment = (typeof require !== 'undefined' && require !== null) && !require.amd ? require('moment') : this.moment;

    moment.holidays.belgium = {
        "Nieuwjaarsdag": {
            date: '1/1',
            keywords_n: ['new', 'year', 'newyear', 'eve']
        },
        "Paasmaandag": {
            date: 'easter+1)',
            keywords_y: ['easter'],
            keywords: ['monday']
        },
        "Dag van de Arbeid": {
            date: '5/1',
            keywords: ['labour']
        },
        "Onze-Heer Hemelvaart": {
            date: 'easter+39'
        },
        "Pinkstermaandag": {
            date: 'easter+49'
        },
        "Nationale feestdag": {
            date: '7/21',
            keywords: ['summer', 'national']
        },
        "Onze-Lieve-Vrouw Hemelvaart": {
            date: '8/15',
        },
        "Allerheiligen": {
            date: '11/1',
        },
        "Wapenstilstand": {
            date: '11/11',
        },
        "Kerstmis": {
            date: '12/25',
            keywords: ['christ', 'x-?mas'],
            keywords_n: ['eve']
        }
    };

    if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) {
        module.exports = moment;
    }
}).call(this);