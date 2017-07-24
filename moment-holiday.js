//! moment-holiday.js
//! version : 1.4.0
//! author : Kodie Grantham
//! license : MIT
//! https://github.com/kodie/moment-holiday

(function() {
  var moment = (typeof require !== 'undefined' && require !== null) && !require.amd ? require('moment') : this.moment;

  moment.holidays = {};
  moment.holidays.active = {};
  moment.holidays.active_last = {};

  moment.holidays.us = {
    "New Year's Day": {
      date: '1/1',
      keywords: ['new'],
      keywords_y: ['year'],
      keywords_n: ['eve']
    },
    "Martin Luther King Jr. Day": {
      date: '1/(1,3)',
      keywords: ['martin', 'luther', 'king', 'jr[\\s\\.]', 'mlk']
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
      keywords: ['patrick', 'saint', 'st[\\s\\.]', 'paddy', 'patty']
    },
    "Good Friday": {
      date: 'goodfriday',
      keywords_y: ['good', 'friday']
    },
    "Easter Sunday": {
      date: 'easter',
      keywords_y: ['easter'],
      keywords: ['sunday']
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
      keywords: ['christmas', 'christ', 'x-?mas'],
      keywords_y: ['eve']
    },
    "Christmas Day": {
      date: '12/25',
      keywords: ['christmas', 'christ', 'x-?mas'],
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
      if (pe || pe === false) { days = pe; }
    }

    if (days === false) { return false; }

    if (!moment.isMoment(days) && !days.length && date.charAt(0).match(/[0-9(]/)) {
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

  var keywordMatches = function(str, kw) {
    var m = [];
    kw = arrayify(kw);

    for (var i = 0; i < kw.length; i++) {
      var f = str.match(new RegExp(kw[i], 'gi'));
      if (f) { m = m.concat(f); }
    }

    return m;
  };

  var findHoliday = function(self, holiday, adjust, parse, holidayObj) {
    var pt = {};
    var wn = [];
    var obj = {};

    h = holidayObj || moment.holidays.active;

    for (var hd in h) {
      if (!h.hasOwnProperty(hd)) { continue; }

      pt[hd] = 0;

      if (h[hd].keywords_n) {
        var matchesN = keywordMatches(holiday, h[hd].keywords_n);
        if (matchesN.length) {
          pt[hd] = 0;
          continue;
        }
      }

      if (h[hd].keywords_y) {
        var matchesY = keywordMatches(holiday, h[hd].keywords_y);
        if (matchesY && matchesY.length === h[hd].keywords_y.length) {
          pt[hd] += matchesY.length;
        } else {
          pt[hd] = 0;
          continue;
        }
      }

      if (h[hd].keywords) {
        var matches = keywordMatches(holiday, h[hd].keywords);
        if (matches) {
          pt[hd] += matches.length;
        } else {
          continue;
        }
      }
    }

    //console.log(pt); // Display scores

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

  var findHolidays = function(self, holidays, adjust, parse, holidayObj) {
    var h = {};

    holidays = arrayify(holidays);
    if (!holidayObj) { holidayObj = moment.holidays.active; }

    for (var i = 0; i < holidays.length; i++) {
      var find = findHoliday(self, holidays[i], adjust, parse, holidayObj);
      if (find) { h[find] = holidayObj[find]; }
    }

    return h;
  };

  var getAllHolidays = function(self, adjust) {
    var h = moment.holidays.active;
    var d = {};

    for (var hd in h) {
      if (!h.hasOwnProperty(hd)) { continue; }
      if (td = parseHoliday(self, h[hd].date, adjust)) { d[hd] = td; }
    }

    return d;
  };

  var compileRegions = function(locale, regions) {
    var h = moment.holidays[locale];
    var o = {};

    if (h) {
      for (var i = 0; i < regions.length; i++) {
        var r = regions[i].toLowerCase();
        var l = moment.holidays[locale + '/' + r];
        l = {};

        for (var hd in h) {
          if (!h.hasOwnProperty(hd)) { continue; }

          var y = h[hd].regions || [];
          var n = h[hd].regions_n || [];

          if (y.length) { y.join().toLowerCase().split(); }
          if (n.length) { n.join().toLowerCase().split(); }

          if ((!y.length && !n.length) || (y.length && ~y.indexOf(r)) || (n.length && !~n.indexOf(r))) {
            l[hd] = h[hd];
          }
        }

        if (l) { o = merge(o, l); }
      }
    }

    if (!Object.keys(o).length) { return false; }

    return o;
  };

  var getLocale = function(locale) {
    regions = locale.split('/');
    locale = regions[0].toLowerCase();
    regions.shift();

    if (!moment.holidays[locale]) {
      try {
        require('./locale/' + locale);
      } catch(e) { }
    }

    if (moment.holidays[locale]) {
      if (regions.length) { return compileRegions(locale, regions); }
      return moment.holidays[locale];
    }

    return false;
  };

  var holidayLoop = function(self, count, forward, adjust) {
    if (!count) { count = 1; }

    var h = getAllHolidays(self, adjust);
    var l = moment(self);
    var y = self.year();
    var w = [];

    for (var i = 0; i < count; i++) {
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
          if (!h.hasOwnProperty(hd)) { continue; }

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

  var merge = function(...sources) {
    return Object.assign({}, ...sources);
  };

  moment.fn.holiday = function(holidays, adjust) {
    var h = moment.holidays.active;
    var d = {};
    var single = false;

    if (!holidays) { return getAllHolidays(this, adjust); }

    if (holidays.constructor !== Array) {
      single = true;
      holidays = [holidays];
    }

    for (var i = 0; i < holidays.length; i++) {
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
    var h, returnTitle, hs = [];

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
            hs.push(hd);
          } else {
            return true;
          }
        }
      }
    }

    if (hs.length) {
      if (hs.length === 1) { return hs[0]; }
      return hs;
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

    for (var i = 0; i < date.diff(this, 'days'); i++) {
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
    set: function(holidays, specifics) {
      var newH = {};

      if (holidays.constructor === Array) {
        var hs = [];

        for (var i = 0; i < holidays.length; i++) {
          var d = findHoliday(this, holidays[i], null, false);
          if (d) { hs.push(d); }
        }

        if (hs.length) {
          newH = merge(moment.holidays.active);

          for (var hd in newH) {
            if (!newH.hasOwnProperty(hd)) { continue; }
            if (!~hs.indexOf(hd)) { delete(newH[hd]); }
          }
        }
      } else if (typeof holidays === 'string') {
        var locale = getLocale(holidays);

        if (locale) {
          if (specifics) {
            newH = findHolidays(this, specifics, null, false, locale);
          } else {
            newH = merge(locale);
          }
        }
      } else {
        newH = holidays;
      }

      if (Object.keys(newH).length && !Object.is(moment.holidays.active, newH)) {
        moment.holidays.active_last = merge(moment.holidays.active);
        moment.holidays.active = newH;
      }

      return this;
    },

    add: function(holidays, specifics) {
      if (typeof holidays === 'string') {
        var locale = getLocale(holidays);
        holidays = {};

        if (locale) {
          if (specifics) {
            holidays = findHolidays(this, specifics, null, false, locale);
          } else {
            holidays = locale;
          }
        }
      }

      if (Object.keys(holidays).length) {
        moment.holidays.active_last = merge(moment.holidays.active);
        moment.holidays.active = merge(moment.holidays.active, holidays);
      }

      return this;
    },

    remove: function(holidays) {
      holidays = arrayify(holidays);

      var find = findHolidays(this, holidays, null, false);
      var newH = merge(moment.holidays.active);

      if (find) {
        for (var hd in find) { delete(newH[hd]); }
      }

      if (!Object.is(moment.holidays.active, newH)) {
        moment.holidays.active_last = merge(moment.holidays.active);
        moment.holidays.active = newH;
      }

      return this;
    },

    undo: function() {
      var c = merge(moment.holidays.active);
      moment.holidays.active = merge(moment.holidays.active_last);
      moment.holidays.active_last = c;
      return this;
    },

    extendParser: function(func) {
      parserExtensions.push(func);
      return this;
    }
  };

  moment.modifyHolidays.set('US').add('Easter', ['Easter Sunday', 'Good Friday']);

  if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) { module.exports = moment; }
}).call(this);
