//! moment-holiday.js locale configuration
//! locale : Sweden
//! author : Faleij : https://github.com/faleij
//! law text : https://www.riksdagen.se/sv/dokument-lagar/dokument/svensk-forfattningssamling/lag-1989253-om-allmanna-helgdagar_sfs-1989-253

(function() {
  var moment = (typeof require !== 'undefined' && require !== null) && !require.amd ? require('moment') : this.moment;

  moment.holidays.sweden = {
    "Nyårsdagen": {
      date: '1/1',
      keywords: ['nyårsdag', 'nyår', 'new', 'years']
    },
    "Trettondedag jul": {
      date: '6/1',
      keywords: ['trettondedag', 'trettondedagen', 'trettonde']
    },
    "Långfredagen": {
      date: 'easter-2',
      keywords: ['långfredag', 'good', 'friday']
    },
    "Påskdagen": {
      date: 'easter',
      keywords: ['påsk', 'easter', 'sunday'],
    },
    "Annandag påsk": {
      date: 'easter+1',
      keywords: ['annandag påsk', 'easter', 'monday']
    },
    "Första maj": {
      date: '5/1',
      keywords: ['första maj', 'första', 'maj']
    },
    "Nationaldagen": {
      date: '6/6',
      keywords: ['nationaldag']
    },
    "Kristi himmelsfärdsdag": {
      date: 'easter+39',
      kaywords: ['ascension', 'thursday']
    },
    "Pingstdagen": {
      date: 'easter+49',
      keywords: ['pingst', 'pentecost', 'sunday']
    },
    "Midsommardagen": {
      date: '6/(6,[20])',
      keywords: ['midsommar', 'midsommardag', 'saturday']
    },
    "Alla helgons dag": {
      date: '10/(6,[31])',
      keywords: ['helgon', 'alla helgon', 'helgon dag', 'saturday']
    },
    "Juldagen": {
      date: '12/24',
      keywords: ['christmas']
    },
    "Annandag jul": {
      date: '12/25',
      keywords: ['annandag jul']
    }
  };

  if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) { module.exports = moment; }
}).call(this);