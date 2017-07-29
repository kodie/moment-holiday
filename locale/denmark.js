//! moment-holiday.js locale configuration
//! locale : Denmark
//! author : Kodie Grantham : https://github.com/kodie


(function() {
  var moment = (typeof require !== 'undefined' && require !== null) && !require.amd ? require('moment') : this.moment;

  moment.holidays.denmark = {
    "Nytårsdag": {
      date: '1/1',
      keywords: ['nytårsdag', 'dag', 'nytår']
    },
    "Skærfredag": {
      date: 'goodfriday',
      keywords: ['skærfredag', 'skær', 'fredag']
    },
    "Påske": {
      date: 'easter',
      keywords: ['påske', 'easter'],
    },
    "Anden påskedag": {
      date: 'eastermonday',
      keywords: ['andenpåskedag', 'anden', 'påskedag']
    },

    "Første maj": {
      date: '5/1',
      keywords: ['førstemaj']
    },
    "Kristi himmelfart": {
      date: 'ascensionday',
      kaywords: ['kristi', 'himmelfart', 'ascension']
    },
    "Pinse": {
      date: 'pentecost',
      keywords: ['pinse', 'pentecost']
        },
    "Anden pinse": {
      date: 'whitmonday',
      keywords: ['andenpinsedag', 'anden', 'pinsedag']
    },

    "Juleaften": {
      date: '12/24',
      keywords: ['juleaften', 'christmas']
    },
    "Anden juledag": {
      date: '12/25',
      keywords: ['andenjuledag'],
      keywords_y: ['anden']
    }
  };

  if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) { module.exports = moment; }
}).call(this);
