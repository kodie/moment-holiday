//! moment-holiday.js locale configuration
//! locale : Slovakia / Slovensko
//! author : Krym : https://github.com/Krym

(function() {
    var moment = (typeof require !== 'undefined' && require !== null) && !require.amd ? require('moment') : this.moment;
  
    moment.holidays.slovakia = {
      "Deň vzniku Slovenskej republiky": {
        date: '1/1',
        keywords: ['slovensko', 'republika', 'vznik']
      },
      "Zjavenie Pána, Traja králi": {
        date: '1/6'
      },
      "Veľký piatok": {
        date: 'easter-2',
        keywords: ['piatok','good', 'friday']
      },
      "Veľkonočný pondelok ": {
        date: 'easter+1',
        keywords: ['velka noc', 'pondelok', 'easter', 'monday']
      },
      "Sviatok práce": {
        date: '5/1'
      },
      "Deň víťazstva nad fašizmom": {
        date: '5/8'
      },
      "Sviatok svätého Cyrila a Metoda": {
        date: '7/5'
      },
      "Výročie SNP": {
        date: '8/29'
      },
      "Deň Ústavy Slovenskej republiky": {
        date: '9/1'
      },
      "Sedembolestná Panna Mária": {
        date: '9/15'
      },
      "Sviatok všetkých svätých": {
        date: '11/1'
      },
      "Deň boja za slobodu a demokraciu ": {
        date: '11/17'
      },
      "Štedrý deň": {
        date: '12/24',
        keywords: ['christmas', 'vianoce']
      },
      "Prvý sviatok vianočný ": {
        date: '12/25',
        keywords: ['christmas', 'vianoce']
      },
      "Druhý sviatok vianočný": {
        date: '12/26',
        keywords: ['christmas', 'vianoce']
      }
    };
  
    if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) { module.exports = moment; }
  }).call(this);
  