//! moment-holiday.js locale configuration
//! locale : Philippines

(function() {
  var moment = (typeof require !== 'undefined' && require !== null) && !require.amd ? require('moment') : this.moment;

  moment.holidays.philippines = {
    "New Year's Day": {
      date: '1/1',
      keywords_n: ['eve']
    },
    "Day of Valor": {
      date: '1/9',
      keywords: ['day', 'of', 'valor', 'araw', 'ng', 'kagitingan']
    },
    "Good Friday": {
      date: 'easter-2',
      keywords_y: ['good', 'friday']
    },
    "Easter Sunday": {
      date: 'easter',
      keywords_y: ['easter'],
      keywords: ['sunday']
    },
    "Labor Day": {
      date: '5/1',
      keywords: ['labor', 'day', 'araw', 'ng', 'manggaggawa']
    },
    "Independence Day": {
      date: '6/12',
      keywords: ['independence', 'day', 'araw', 'ng', 'kalayaan']
    },
    "Ninoy Aquino Day": {
      date: '11/21',
      keywords: [ 'araw', 'ng', 'kabayanihan', 'ni', 'ninoy', 'aquino']
    },
    "Bonifacio Day": {
      date: '11/30',
      keywords: ['bonifacio']
    },
    "All Saints\' Day": {
      date: '11/1'
    },
    "Christmas Day": {
      date: '12/25',
      keywords: ['christ', 'x-?mas'],
      keywords_n: ['eve']
    },
    "New Year's Eve": {
      date: '12/31',
      keywords_y: ['year', 'eve']
    }
  };

  if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) { module.exports = moment; }
}).call(this);
