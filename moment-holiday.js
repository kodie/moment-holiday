//! moment-holiday.js
//! version : 1.0.0
//! author : Kodie Grantham
//! license : MIT
//! github.com/kodie/moment-holiday

(function() {
  var moment = (typeof require !== 'undefined' && require !== null) && !require.amd ? require('moment') : this.moment;

  moment.fn.holidays = {
    "New Year's Day": {
      date: '1/1',
      keywords: ['new'],
      keywords_y: ['year'],
      keywords_n: ['eve']
    },
    "Martin Luther King Jr. Day": {
      date: '1/(1,3)',
      keywords: ['martin', 'luther', 'king', 'jr', 'mlk']
    },
    "Valentine's Day": {
      date: '2/14',
      keywords_y: ['valentine']
    },
    "Washington's Birthday": {
      date: '2/(1,3)',
      keywords: ['george', 'washington', 'president']
    },
    "Memorial Day": {
      date: '5/(1,-1)',
      keywords_y: ['memorial']
    },
    "Mother's Day": {
      date: '5/(0,2)',
      keywords: ['mother', 'mom']
    },
    "Father's Day": {
      date: '6/(0,3)',
      keywords: ['father', 'dad']
    },
    "Independence Day": {
      date: '7/4',
      keywords: ['independence', '4th', 'fourth', 'july']
    },
    "Labor Day": {
      date: '9/(1,1)',
      keywords_y: ['labor']
    },
    "Columbus Day": {
      date: '10/(1,2)',
      keywords: ['columbus', 'christopher']
    },
    "Halloween": {
      date: '10/31',
      keywords_y: ['halloween']
    },
    "Veteran's Day": {
      date: '11/11',
      keywords: ['veteran', 'vet']
    },
    "Thanksgiving Day": {
      date: '11/(4,4)',
      keywords: ['thanksgiving', 'thanks', 'turkey'],
      keywords_n: ['after']
    },
    "Day after Thanksgiving": {
      date: '11/(5,4)',
      keywords: ['thanksgiving', 'thanks', 'turkey'],
      keywords_y: ['after']
    },
    "Christmas Eve": {
      date: '12/24',
      keywords: ['christmas', 'christ', 'xmas', 'x-mas'],
      keywords_y: ['eve']
    },
    "Christmas Day": {
      date: '12/25',
      keywords: ['christmas', 'christ', 'xmas', 'x-mas'],
      keywords_n: ['eve']
    },
    "New Year's Eve": {
      date: '12/31',
      keywords: ['new'],
      keywords_y: ['year', 'eve']
    }
  };

  var parseHoliday = function(self, date, adjust) {
    date = date.split('/');
    var m = moment(self).month((parseInt(date[0]) - 1));

    if (date[1].charAt(0) == '(') {
      var w = date[1].slice(1, -1).split(',');
      var wd = parseInt(w[0]);
      var dt = parseInt(w[1]);
      var d = moment(m).startOf('month');
      var limit = (moment(m).endOf('month').diff(d, 'days') + 1);
      var days = [];

      for (var i = 0; i < limit; i++) {
        if (d.day() === wd) { days.push(moment(d)); }
        d.add(1, 'day');
      }

      if (dt < 0) {
        m = days[days.length + dt];
      } else {
        m = days[dt - 1];
      }
    } else {
      m.date(date[1]);
    }

    if (!moment.isMoment(m)) { return false; }

    if (adjust) {
      if (m.day() == 0) { m.add(1, 'day'); }
      if (m.day() == 6) { m.subtract(1, 'day'); }
    }

    return m.startOf('day');
  };

  var findHoliday = function(self, holiday, adjust) {
    var h = moment.fn.holidays;
    var pt = {};
    var wn = [];
    var obj = {};

    for (var hd in h) {
      if (!h.hasOwnProperty(hd)) { continue; }

      pt[hd] = 0;

      if (h[hd].keywords_n && new RegExp(h[hd].keywords_n.join('|'), 'gi').test(holiday)) {
        pt[hd] = 0;
        continue;
      }

      if (h[hd].keywords_y) {
        var matchesY = holiday.match(new RegExp(h[hd].keywords_y.join('|'), 'gi'));
        if (matchesY && matchesY.length === h[hd].keywords_y.length) {
          pt[hd] += matchesY.length;
        } else {
          pt[hd] = 0;
          continue;
        }
      }

      if (h[hd].keywords) {
        var matches = holiday.match(new RegExp(h[hd].keywords.join('|'), 'gi'));
        if (matches) {
          pt[hd] += matches.length;
        } else {
          continue;
        }
      }
    }

    for (var w in pt) {
      if (!pt[w] || !pt.hasOwnProperty(w)) { continue; }
      if (!wn.length || pt[w] === pt[wn[0]]) { wn.push(w); continue; }
      if (pt[w] > pt[wn[0]]) { wn = [w]; continue; }
    }

    if (!wn.length || wn.length > 1) { return false; }

    var d = parseHoliday(self, h[wn[0]].date, adjust);

    if (d) {
      obj[wn[0]] = d;
      return obj;
    }

    return false;
  };

  var getAllHolidays = function(self, adjust) {
    var h = moment.fn.holidays;
    var d = {};

    for (var hd in h) {
      if (td = parseHoliday(self, h[hd].date, adjust)) { d[hd] = td; }
    }

    return d;
  };

  moment.fn.holiday = function(holidays, adjust) {
    var h = moment.fn.holidays;
    var d = {};
    var single = false;

    if (!holidays) { return getAllHolidays(this, adjust); }

    if (holidays.constructor !== Array) {
      single = true;
      holidays = [holidays];
    }

    for (i = 0; i < holidays.length; i++) {
      if (td = findHoliday(this, holidays[i], adjust)) { d = Object.assign({}, d, td); }
    }

    var dKeys = Object.keys(d);

    if (!dKeys.length) { return false; }
    if (single) { return d[dKeys[0]]; }

    return d;
  };

  moment.fn.isHoliday = function(adjust) {
    var h = getAllHolidays(this, adjust);

    for (var hd in h) {
      if (!h.hasOwnProperty(hd)) { continue; }
      if (this.isSame(h[hd], 'day')) { return hd; }
    }

    return false;
  };

  if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) {
    module.exports = moment;
  }
}).call(this);
