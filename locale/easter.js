//! moment-holiday.js locale configuration
//! locale : Easter Related Holidays
//! author : Kodie Grantham : https://github.com/kodie

(function() {
  var moment = (typeof require !== 'undefined' && require !== null) && !require.amd ? require('moment') : this.moment;

  moment.holidays.easter = {
    "Ash Wednesday": {
      date: 'ashwednesday',
      keywords_y: ['ash'],
      keywords: ['wednesday']
    },
    "Lent": {
      date: 'lent',
      keywords_y: ['lent']
    },
    "Good Friday": {
      date: 'goodfriday',
      keywords_y: ['good', 'friday']
    },
    "Holy Saturday": {
      date: 'holysaturday',
      keywords_y: ['holy', 'saturday']
    },
    "Easter Sunday": {
      date: 'easter',
      keywords_y: ['easter'],
      keywords: ['sunday']
    },
    "Easter Monday": {
      date: 'eastermonday',
      keywords_y: ['easter', 'monday']
    },
    "Ascension Day": {
      date: 'ascension',
      keywords_y: ['ascension']
    },
    "Pentecost Sunday": {
      date: 'pentecost',
      keywords_y: ['pentecost'],
      keywords: ['sunday']
    },
    "Whit Monday": {
      date: 'whitmonday',
      keywords_y: ['whit'],
      keywords: ['monday']
    },
    "Corpus Christi": {
      date: 'corpuschristi',
      keywords: ['corpus', 'christi', 'feast']
    }
  };

  var easter = function(Y) {
    var C = Math.floor(Y/100);
    var N = Y - 19*Math.floor(Y/19);
    var K = Math.floor((C - 17)/25);
    var I = C - Math.floor(C/4) - Math.floor((C - K)/3) + 19*N + 15;
    I = I - 30*Math.floor((I/30));
    I = I - Math.floor(I/28)*(1 - Math.floor(I/28)*Math.floor(29/(I + 1))*Math.floor((21 - N)/11));
    var J = Y + Math.floor(Y/4) + I + 2 - C + Math.floor(C/4);
    J = J - 7*Math.floor(J/7);
    var L = I - J;
    var M = 3 + Math.floor((L + 40)/44);
    var D = L + 28 - 31*Math.floor(M/4);
    return moment([Y, (M-1), D]);
  };

  moment.modifyHolidays.extendParser(function(m, date){
    if (date === 'ashwednesday' ||
        date === 'lent' ||
        date === 'goodfriday' ||
        date === 'holysaturday' ||
        date === 'easter' ||
        date === 'eastermonday' ||
        date === 'ascension' ||
        date === 'pentecost' ||
        date === 'whitmonday' ||
        date === 'corpuschristi') {

      var e = easter(m.year());

      if (date === 'ashwednesday') { return e.subtract(46, 'days'); }
      if (date === 'goodfriday') { return e.subtract(2, 'days'); }
      if (date === 'holysaturday') { return e.subtract(1, 'day'); }
      if (date === 'easter') { return e; }
      if (date === 'eastermonday') { return e.add(1, 'day'); }
      if (date === 'ascension') { return e.add(39, 'days'); }
      if (date === 'pentecost') { return e.add(49, 'days'); }
      if (date === 'whitmonday') { return e.add(50, 'days'); }
      if (date === 'corpuschristi') { return e.add(60, 'days'); }

      if (date === 'lent') {
        var lent = [];
        var d = moment(e).subtract(46, 'days');
        var length = e.subtract(2, 'days').diff(d, 'days');

        for (i = 0; i < length; i++) {
          lent.push(moment(d));
          d.add(1, 'day');
        }

        return lent;
      }
    }
  });

  if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) { module.exports = moment; }
}).call(this);
