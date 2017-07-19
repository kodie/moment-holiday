//! moment-holiday.js
//! version : 1.3.1
//! author : Kodie Grantham
//! license : MIT
//! https://github.com/kodie/moment-holiday

(function() {
  var moment = (typeof require !== 'undefined' && require !== null) && !require.amd ? require('moment') : this.moment;

  var holidayObject = {};

  moment.holidays = {};

  moment.holidays.us = {
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
    "Saint Patrick's Day": {
      date: '3/17',
      keywords: ['patrick', 'saint', 'paddy', 'patty']
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
      keywords: ['labor', 'labour']
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

  var parserExtensions = [];

  var parseHoliday = function(self, date, adjust) {
    var days = [];

    for (var i = 0; i < parserExtensions.length; i++) {
      var pe = parserExtensions[i](self, date);
      if (pe === false) { return false; }
      if (pe) { days = pe; }
    }

    if (!moment.isMoment(days) && !days.length) {
      var range = false;
      var dates = date.split('|');

      if (dates.length > 1) { range = true; }
      if (dates.length > 2) { dates = [dates[0], dates[1]]; }

      for (var i = 0; i < dates.length; i++) {
        var m = moment(self);
        var ds = dates[i].split('/');

        if (ds.length === 1 || (ds.length === 2 && ds[1].charAt(0) !== '(' && ds[1].length === 4)) {
          var td = dates[i];
          i = -1;
          dates = [];
          for (var ii = 1; ii < 13; ii++) { dates.push(ii + '/' + td); }
          continue;
        }

        if (ds.length > 2) { m.year(parseInt(ds[2])); }

        m.month((parseInt(ds[0]) - 1));

        if (ds[1].charAt(0) === '(') {
          var w = ds[1].slice(1, -1).split(',');
          var wd = parseInt(w[0]);
          var dt = parseInt(w[1]);
          var d = moment(m).startOf('month');
          var limit = (moment(m).endOf('month').diff(d, 'days') + 1);
          var wds = [];

          if (w[1] && w[1].charAt(0) === '[') {
            var forward = true;
            dt = parseInt(w[1].slice(1, -1));

            if (dt < 0) {
              forward = false;
              dt = parseInt(w[1].slice(2, -1));
            }

            d = moment(m).date(dt);

            for (var wi = 0; wi < 6; wi++) {
              if (d.day() === wd) { days.push(moment(d)); break; }

              if (forward) {
                d.add(1, 'day');
              } else {
                d.subtract(1, 'day');
              }
            }

            continue;
          }

          for (var ai = 0; ai < limit; ai++) {
            if (d.day() === wd) { wds.push(moment(d)); }
            d.add(1, 'day');
          }

          if (!dt) {
            days = days.concat(wds);
            continue;
          } else if (dt < 0) {
            m = wds[wds.length + dt];
          } else {
            m = wds[dt - 1];
          }

          days.push(m);
        } else {
          days.push(m.date(ds[1]));
        }
      }

      if (range && days.length > 1) {
        var diff = days[1].diff(days[0], 'days');

        if (diff > 1) {
          var di = moment(days[0]);
          days = [days[0]];

          for (var i = 0; i < diff; i++) {
            di.add(1, 'day');
            days.push(moment(di));
          }
        }
      }
    }

    days = arrayify(days);

    for (var i = 0; i < days.length; i++) {
      if (!moment.isMoment(days[i])) { delete(days[i]); continue; }

      if (adjust) {
        if (days[i].day() === 0) { days[i] = days[i].add(1, 'day'); }
        if (days[i].day() === 6) { days[i] = days[i].subtract(1, 'day'); }
      }

      days[i] = days[i].startOf('day');
    }

    if (!days.length) { return false; }
    if (days.length === 1) { return days[0]; }

    return days;
  };

  var findHoliday = function(self, holiday, adjust, parse) {
    var h = holidayObject;
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

    if (parse !== false) {
      var d = parseHoliday(self, h[wn[0]].date, adjust);

      if (d) {
        obj[wn[0]] = d;
        return obj;
      }
    } else {
      return wn[0];
    }

    return false;
  };

  var getAllHolidays = function(self, adjust) {
    var h = holidayObject;
    var d = {};

    for (var hd in h) {
      if (!h.hasOwnProperty(hd)) { continue; }
      if (td = parseHoliday(self, h[hd].date, adjust)) { d[hd] = td; }
    }

    return d;
  };

  var holidayLoop = function(self, count, forward, adjust) {
    if (!count) { count = 1; }

    var h = getAllHolidays(self, adjust);
    var l = moment(self);
    var y = self.year();
    var w = [];

    for (i = 0; i < count; i++) {
      var d = moment(l);

      while (true) {
        var b = false;

        if (forward) {
          d.add(1, 'day');
        } else {
          d.subtract(1, 'day');
        }

        if (d.year() !== y) {
          h = getAllHolidays(d, adjust);
          y = d.year();
        }

        if (!Object.keys(h).length) { b = true; break; }

        for (var hd in h) {
          var b2 = false;
          var ha = arrayify(h[hd]);

          for (var hi = 0; hi < ha.length; hi++) {
            if (d.isSame(ha[hi], 'day')) {
              w.push(ha[hi]);
              l = moment(d);
              b2 = true;
              break;
            }
          }

          if (b2) { b = true; break; }
        }

        if (b) { break; }
      }
    }

    if (!w.length) { return false; }
    if (w.length === 1) { return w[0]; }

    return w;
  };

  var arrayify = function(arr) {
    if (arr && arr.constructor !== Array) { return [arr]; }
    return arr;
  };

  moment.fn.holiday = function(holidays, adjust) {
    var h = holidayObject;
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
    if (dKeys.length === 1 && single) { return d[dKeys[0]]; }

    return d;
  };

  moment.fn.holidays = function(holidays, adjust) {
    return this.holiday(holidays, adjust);
  };

  moment.fn.isHoliday = function(holidays, adjust) {
    var h, returnTitle;

    if (holidays) {
      holidays = arrayify(holidays);
      h = this.holiday(holidays, adjust);
      returnTitle = false;
    } else {
      h = getAllHolidays(this, adjust);
      returnTitle = true;
    }

    if (!h) { return false; }

    for (var hd in h) {
      if (!h.hasOwnProperty(hd)) { continue; }

      var ha = arrayify(h[hd]);

      for (var hi = 0; hi < ha.length; hi++) {
        if (this.isSame(ha[hi], 'day')) {
          if (returnTitle) {
            return hd;
          } else {
            return true;
          }
        }
      }
    }

    return false;
  };

  moment.fn.previousHoliday = function(count, adjust) {
    return holidayLoop(this, count, false, adjust);
  };

  moment.fn.previousHolidays = function(count, adjust) {
    return this.previousHoliday(count, adjust);
  };

  moment.fn.nextHoliday = function(count, adjust) {
    return holidayLoop(this, count, true, adjust);
  };

  moment.fn.nextHolidays = function(count, adjust) {
    return this.nextHoliday(count, adjust);
  };

  moment.fn.holidaysBetween = function(date, adjust) {
    if (!date) { date = new Date(); }
    date = moment(date).subtract(1, 'day');

    var h = getAllHolidays(this, adjust);
    var d = moment(this);
    var y = d.year();
    var w = [];

    for (i = 0; i < date.diff(this, 'days'); i++) {
      d.add(1, 'day');

      if (d.year() !== y) {
        h = getAllHolidays(d, adjust);
        y = d.year();
      }

      if (!Object.keys(h).length) { break; }

      for (var hd in h) {
        var b = false;
        var ha = arrayify(h[hd]);

        for (var hi = 0; hi < ha.length; hi++) {
          if (d.isSame(ha[hi], 'day')) {
            w.push(ha[hi]);
            b = true;
            break;
          }
        }

        if (b) { break; }
      }
    }

    if (!w.length) { return false; }

    return w;
  };

  moment.modifyHolidays = {
    set: function(holidays) {
      if (holidays.constructor === Array) {
        var hs = [];

        for (i = 0; i < holidays.length; i++) {
          var d = findHoliday(this, holidays[i], null, false);
          if (d) { hs.push(d); }
        }

        for (var hd in holidayObject) {
          if (!holidayObject.hasOwnProperty(hd)) { continue; }
          if (hs.indexOf(hd) === -1) { delete(holidayObject[hd]); }
        }
      } else if (typeof holidays === 'string') {
        var locale = holidays.toLowerCase();

        if (!moment.holidays[locale]) {
          try {
            require('./locale/' + locale);
          } catch(e) { }
        }

        if (moment.holidays[locale]) { holidayObject = moment.holidays[locale]; }
      } else {
        holidayObject = holidays;
      }

      return this;
    },

    add: function(holidays) {
      if (typeof holidays === 'string') {
        var locale = holidays.toLowerCase();
        holidays = {};

        if (!moment.holidays[locale]) {
          try {
            require('./locale/' + locale);
          } catch(e) { }
        }

        if (moment.holidays[locale]) { holidays = moment.holidays[locale]; }
      }

      holidayObject = Object.assign({}, holidayObject, holidays);

      return this;
    },

    remove: function(holidays) {
      holidays = arrayify(holidays);

      for (i = 0; i < holidays.length; i++) {
        var d = findHoliday(this, holidays[i], null, false);
        if (d) { delete(holidayObject[d]); }
      }

      return this;
    },

    extendParser: function(func) {
      parserExtensions.push(func);
      return this;
    }
  };

  moment.modifyHolidays.set('US').add('Easter');

  if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) { module.exports = moment; }
}).call(this);
