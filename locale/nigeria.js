//! moment-holiday.js locale configuration
//! locale : Nigeria
//! author : Emmanuel Zidafamor : https://github.com/e-zidaf
/* States :
       Abia
       Abuja - FCT
       Adamawa
       Akwa Ibom 
       Anambra
       Bauchi
       Bayelsa
       Benue
       Borno
       Cross River
       Delta
       Ebonyi
       Edo
       Ekiti
       Enugu
       Gombe
       Imo
       Jigawa
       Kaduna
       Kano
       Katsina
       Kebbi
       Kogi
       Kwara
       Lagos
       Nasarawa
       Niger
       Ogun
       Ondo
       Osun
       Oyo
       Plateau
       Rivers
       Sokoto
       Taraba
       Yobe
       Zamfara
*/

(function() {
  var moment = require("moment");

  moment.holidays.nigeria = {
    "New Year's Day": {
      date: '1/1',
      keywords: ['New Year'],
    },
    "New Year's Holiday":{
        date: '1/2',
        keywords: ['Public Holiday'],
    },
    "Valentine's Day": {
      date: '2/14'
    },
    "Women's Day": {
        date: '3/8',
        keywords: ['womens day'],
    },
    "Dr. Samuel Memorial Day": {
        date: '3/17',
        keywords_y: ['Samuel Ogbemudia'],
        regions: ['Edo']
    },
    "Good Friday": {
      date: 'easter-2',
      keywords_y: ['good', 'friday'],
      regions_n: ['qc']
    },
    "Easter Sunday": {
      date: 'easter',
    },
//! Monday's precceding Easter Sundays
    "Easter Monday": {
        date: 'easter-3',
        keywords: ['easter monday'],
    },
    "Worker's Day": {
      date: '5/1',
      keywords: ['workers'],
    },
    "Children's Day": {
      date: '5/27',
      keywords: ['children'],
    },
    "Democracy Day": {
      date: '5/29',
      keywords: ['democracy'],
    },
     "Mother's Day": {
      date: '5/(0,2)',
      keywords: ['mom']
    },
    "Father's Day": {
      date: '6/(0,3)',
      keywords: ['dad']
    },
    "Eid-el-fitri Sallah": {
      date: '6/25',
      keywords: ['Eid'],
    },
    "Sallah Holiday": {
      date: '6/26',
      keywords: ['sallah'],
    },
    "Sallah Holidays": {
      date: '6/27',
      keywords: ['Eid sallah'],
    },
    "Id el Kabir": {
      date: '9/1',
      keywords: ['Eid'],
    },
    "Independence Day": {
      date: '10/1',
      keywords: ['National Independence'],
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