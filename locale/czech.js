//! moment-holiday.js locale configuration
//! locale : Czechia / Česká republika
//! author : Krym : https://github.com/Krym

(function() {
    var moment = (typeof require !== 'undefined' && require !== null) && !require.amd ? require('moment') : this.moment;
  
    moment.holidays.czech = {
      "Nový rok": {
        date: '1/1',
        keywords: ['new', 'year']
      },
      "Velký pátek": {
        date: 'easter-2',
        keywords: ['pátek','good', 'friday']
      },
      "Velikonoční pondělí ": {
        date: 'easter+1',
        keywords: ['pondělí', 'easter', 'monday']
      },
      "Svátek práce": {
        date: '5/1'
      },
      "Den vítězství": {
        date: '5/8'
      },
      "Den slovanských věrozvěstů Cyrila a Metoděje": {
        date: '7/5'
      },
      "Den upálení mistra Jana Husa": {
        date: '7/6'
      },
      "Den české státnosti": {
        date: '9/28'
      },
      "Den vzniku samostatného československého státu": {
        date: '10/28',
        keywords: ['československo']
      },
      "Den boje za svobodu a demokracii": {
        date: '11/17',
        keywords: ['svoboda', 'demokracie', 'boj za svobodu']
      },
      "Štědrý den": {
        date: '12/24',
        keywords: ['christmas', 'vánoce']
      },
      "1. svátek vánoční": {
        date: '12/25',
        keywords: ['christmas', 'vánoce']
      },
      "2. svátek vánoční": {
        date: '12/26',
        keywords: ['christmas', 'vánoce']
      }
    };
  
    if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) { module.exports = moment; }
  }).call(this);
  