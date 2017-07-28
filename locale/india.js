//! moment-holiday.js locale configuration
//! locale : India

(function() {
  var moment = (typeof require !== 'undefined' && require !== null) && !require.amd ? require('moment') : this.moment;

  moment.holidays.india = {
    "New Year's Day": {
      date: '1/1',
      keywords: ['naya', 'saal', 'new', 'year']
    },
    "Republic Day": {
      date: '1/26',
      keywords: ['ganatantr divas', 'republic', 'day']
    },
    "Mahavir Jayanti": {
      date: '4/9',
      keywords: ['mahavir', 'birthday']
    },
    "May Day": {
      date: '5/1',
      keywords: ['may', 'labours', 'day']
    },
    "Independence Day": {
      date: '8/15',
      keywords: ['independence', 'day', 'svatantrata divas']
    },
    "Gandhi Jayanti": {
      date: '10/02',
      keywords: ['gandhi', 'birthday']
    },
    "Christmas Day": {
      date: '12/25',
      keywords: ['christ', 'christmas']
    }
  };

  if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) { module.exports = moment; }
}).call(this);
