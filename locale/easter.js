//! moment-holiday.js locale configuration
//! locale : Easter (Adds Good Friday and Easter Sunday to any moment-holiday locale)
//! author : Kodie Grantham : https://github.com/kodie

(function() {
  var moment = (typeof require !== 'undefined' && require !== null) && !require.amd ? require('moment') : this.moment;

  moment.holidays.easter = {
    "Good Friday": {
      date: 'goodfriday',
      keywords_y: ['good', 'friday']
    },
    "Easter Sunday": {
      date: 'easter',
      keywords_y: ['easter'],
      keywords: ['sunday']
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
    if (date === 'easter' || date === 'goodfriday') {
      var e = easter(m.year());
      if (date === 'easter') { return e; }
      if (date === 'goodfriday') { return e.subtract(2, 'days'); }
    }
  });

  if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) { module.exports = moment; }
}).call(this);
