//! moment-holiday.js locale configuration
//! locale : Australia
//! author : Wlad Paiva : https://github.com/wladiston
/* regions :
      ACT : Australian Capital Territory
      NSW : New South Wales
      NT  : Northern Territory
      QLD : Queensland
      SA  : South Australia
      TAS : Tasmania
      VIC : Victoria
      WA  : Western Australia
*/

(function() {
  var moment = (typeof require !== 'undefined' && require !== null) && !require.amd ? require('moment') : this.moment;

  moment.holidays.australia = {
    "New Year's Day": {
      date: '1/1',
      keywords_n: ['eve'],
    },
    "Australia Day": {
      date: '1/26'
    },
    "Labour Day - WA": {
      date: '3/(1,1)',
      regions: ['wa']
    },
    "Adelaide Cup": {
      date: '3/(1,2)',
      regions: ['sa']
    },
    "Canberra Day": {
      date: '3/(1,2)',
      regions: ['act']
    },
    "Labour Day - VIC": {
      date: '3/(1,2)',
      regions: ['vic']
    },
    "Eight Hours Day": {
      date: '3/(1,2)',
      regions: ['tas']
    },
    "Good Friday": {
      date: 'easter-2',
      keywords_y: ['good', 'friday']
    },
    "Holy Saturday": {
      date: 'easter-1',
      keywords_y: ['holy', 'saturday'],
      regions: ['act', 'nsw', 'nt', 'qld', 'sa', 'vic']
    },
    "Easter Sunday": {
      date: 'easter',
      keywords_y: ['easter'],
      keywords: ['sunday'],
      regions: ['act', 'nsw', 'qld', 'vic']
    },
    "Easter Monday": {
      date: 'easter+1',
      keywords_y: ['easter', 'monday']
    },
    "Anzac Day": {
      date: '4/25',
      keywords_y: ['anzac']
    },
    "Labour Day - QLD, NT": {
      date: '5/(1,1)',
      regions: ['qld', 'nt']
    },
    "Reconciliation Day": {
      date: '5/(1,[27])',
      regions: ['act']
    },
    "Western Australia Day": {
      date: '6/(1,1)',
      regions: ['wa']
    },
    "Queens Birthday": {
      date: '6/(1,2)',
      keywords_y: ['queen', 'birthday'],
      regions: ['act', 'nsw', 'nt', 'sa', 'tas', 'vic']
    },
    "Picnic Day": {
      date: '8/(1,1)',
      keywords_y: ['picnic'],
      regions: ['nt']
    },
    "Queens Birthday - WA": {
      date: '9/(1,-1)',
      keywords_y: ['queen', 'birthday'],
      regions: ['wa']
    },
    "Grand Final Eve": {
      date: '9/(5,-1)',
      keywords_y: ['grand', 'final'],
      regions: ['vic']
    },
    "Labour Day - ACT, NSW, SA": {
      date: '10/(1,1)',
      regions: ['act', 'nsw', 'sa']
    },
    "Queens Birthday - QLD": {
      date: '10/(1,1)',
      keywords_y: ['queen', 'birthday'],
      regions: ['qld']
    },
    "Melbourne Cup Day": {
      date: '11/(5,-1)',
      keywords_y: ['melbourne', 'cup'],
      regions: ['vic']
    },
    "Christmas Day": {
      date: 'christimasday',
      keywords: ['christ', 'x-?mas'],
      keywords_n: ['eve']
    },
    "Boxing Day": {
      date: '12/26',
      keywords: ['box'],
      regions: ['act', 'nsw', 'nt', 'qld', 'tas', 'vic', 'wa']
    },
    "Proclamation Day": {
      date: '12/26',
      keywords: ['proclamation'],
      regions: ['sa']
    }
  };

  moment.modifyHolidays.extendParser(function(m, date, adjust){
    if(date === 'christimasday'){
      var observed;
      var d = moment(m).month(11).date(25);
      var wd = d.day();
      var isSunday = wd === 0;
      var isSaturday = wd === 6;

      if(isSunday && adjust) {
        observed = d.add(2, 'days');  // next Tuesday after boxing day
      } else {
        if(isSaturday && adjust) {
          observed = d.add(3, 'days');  // next Tuesday after boxing day
        } else {
          observed = d;
        }
      }

      return observed.format('M/D');
    }
  });

  if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) { module.exports = moment; }
}).call(this);
