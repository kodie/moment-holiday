//! moment-holiday.js locale configuration
//! locale : Easter Related Holidays
//! author : Kodie Grantham : https://github.com/kodie
(function() {
  var moment = this.moment || MOMENT

  moment.holidays.easter = {
    "Ash Wednesday": {
      date: 'easter-46'
    },
    "Lent": {
      date: 'easter-46|easter-3'
    },
    "Maundy Thursday": {
      date: 'easter-3',
      keywords_y: ['maundy', 'thursday']
    },
    "Good Friday": {
      date: 'easter-2',
      keywords_y: ['good', 'friday']
    },
    "Holy Saturday": {
      date: 'easter-1',
      keywords_y: ['holy', 'saturday']
    },
    "Easter Sunday": {
      date: 'easter',
      keywords_y: ['easter'],
      keywords: ['sunday']
    },
    "Easter Monday": {
      date: 'easter+1',
      keywords_y: ['easter', 'monday']
    },
    "Ascension Day": {
      date: 'easter+39'
    },
    "Pentecost Sunday": {
      date: 'easter+49',
      keywords_y: ['pentecost'],
      keywords: ['sunday']
    },
    "Whit Monday": {
      date: 'easter+50',
      keywords_y: ['whit'],
      keywords: ['monday']
    },
    "Corpus Christi": {
      date: 'easter+60',
      keywords: ['feast']
    }
  };

  var easter = function(y) {
    var c = Math.floor(y / 100);
    var n = y - 19 * Math.floor(y / 19);
    var k = Math.floor((c - 17) / 25);
    var i = c - Math.floor(c / 4) - Math.floor((c - k) / 3) + 19 * n + 15;
    i = i - 30 * Math.floor((i / 30));
    i = i - Math.floor(i / 28) * (1 - Math.floor(i / 28) * Math.floor(29 / (i + 1)) * Math.floor((21 - n) / 11));
    var j = y + Math.floor(y / 4) + i + 2 - c + Math.floor(c / 4);
    j = j - 7 * Math.floor(j / 7);
    var l = i - j;
    var m = 3 + Math.floor((l + 40) / 44);
    var d = l + 28 - 31 * Math.floor(m / 4);
    return moment([y, (m - 1), d]);
  };

  moment.modifyHolidays.extendParser(function(m, date){
    if (~date.indexOf('easter')) {
      var dates = date.split('|');
      var ds = [];

      for (i = 0; i < dates.length; i++) {
        if (dates[i].substring(0, 6) === 'easter') {
          var e = easter(m.year());

          if (dates[i].charAt(6) === '-') { e.subtract(dates[i].substring(7), 'days'); }
          if (dates[i].charAt(6) === '+') { e.add(dates[i].substring(7), 'days'); }

          if (dates.length === 1) { return e; }
          ds.push(e.format('M/D'));
        } else {
          ds.push(dates[i]);
        }
      }

      if (ds.length) { return ds.join('|'); }
    }
  });

  if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) { module.exports = moment; }
}).call(this);
