//! moment-holiday.js locale configuration
//! locale : India
//! author : wonder2991 : https://github.com/wonder2991
(function() {
  var moment = this.moment || MOMENT

  moment.holidays.india = {
    "New Year's Day": {
      date: '1/1',
      keywords: ['naya', 'saal']
    },
    "Republic Day": {
      date: '1/26',
      keywords: ['ganatantr']
    },
    "Mahavir Jayanti": {
      date: '4/9',
      keywords: ['birthday']
    },
    "May Day": {
      date: '5/1',
      keywords: ['labour']
    },
    "Independence Day": {
      date: '8/15',
      keywords: ['svatantrata']
    },
    "Gandhi Jayanti": {
      date: '10/02',
      keywords: ['birthday']
    },
    "Christmas Day": {
      date: '12/25',
      keywords: ['christ']
    }
  };

  if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) { module.exports = moment; }
}).call(this);
