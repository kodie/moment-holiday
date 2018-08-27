//! moment-holiday.js
//! version : 2.0.0rc
//! author: Benjamin Dequevauviller
//! forked from : Kodie Grantham
//! license : MIT
//! forked from :  https://github.com/kodie/moment-holiday
//! https://github.com/passiverecords/moment-holiday
const MOMENT = require('moment')
;(function() {
  var moment = this.moment || MOMENT
  var parserExtensions = []

  var parseHoliday = function(self, date, adjust) {
    var days = [],
      pd

    for (var i = 0; i < parserExtensions.length; i++) {
      var pe = parserExtensions[i](self, date)
      if (pe || pe === false) {
        pd = pe
      }
    }

    if (pd === false) {
      return false
    }
    if (typeof pd === 'string') {
      date = pd
    } else if (pd) {
      days = pd
    }

    if (
      !moment.isMoment(days) &&
      !days.length &&
      date.charAt(0).match(/[0-9(]/)
    ) {
      var range = false
      var dates = date.split('|')

      if (dates.length > 1) {
        range = true
      }
      if (dates.length > 2) {
        dates = [dates[0], dates[1]]
      }

      for (var i = 0; i < dates.length; i++) {
        var m = moment(self)
        var ds = dates[i].split('/')

        if (
          ds.length === 1 ||
          (ds.length === 2 && ds[1].charAt(0) !== '(' && ds[1].length === 4)
        ) {
          var td = dates[i]
          i = -1
          dates = []
          for (var ii = 1; ii < 13; ii++) {
            dates.push(ii + '/' + td)
          }
          continue
        }

        if (ds.length > 2) {
          m.year(parseInt(ds[2]))
        }

        m.month(parseInt(ds[0]) - 1)

        if (ds[1].charAt(0) === '(') {
          var w = ds[1].slice(1, -1).split(',')
          var wd = parseInt(w[0])
          var dt = parseInt(w[1])
          var d = moment(m).startOf('month')
          var limit =
            moment(m)
              .endOf('month')
              .diff(d, 'days') + 1
          var wds = []

          if (w[1] && w[1].charAt(0) === '[') {
            var forward = true
            dt = parseInt(w[1].slice(1, -1))

            if (dt < 0) {
              forward = false
              dt = parseInt(w[1].slice(2, -1))
            }

            d = moment(m).date(dt)

            for (var wi = 0; wi < 7; wi++) {
              if (d.day() === wd) {
                days.push(moment(d))
                break
              }

              if (forward) {
                d.add(1, 'day')
              } else {
                d.subtract(1, 'day')
              }
            }

            continue
          }

          for (var ai = 0; ai < limit; ai++) {
            if (d.day() === wd) {
              wds.push(moment(d))
            }
            d.add(1, 'day')
          }

          if (!dt) {
            days = days.concat(wds)
            continue
          } else if (dt < 0) {
            m = wds[wds.length + dt]
          } else {
            m = wds[dt - 1]
          }

          days.push(m)
        } else {
          days.push(m.date(ds[1]))
        }
      }

      if (range && days.length > 1) {
        var diff = days[1].diff(days[0], 'days')

        if (diff > 1) {
          var di = moment(days[0])
          days = [days[0]]

          for (var i = 0; i < diff; i++) {
            di.add(1, 'day')
            days.push(moment(di))
          }
        }
      }
    }

    days = arrayify(days)

    for (var i = 0; i < days.length; i++) {
      if (!moment.isMoment(days[i])) {
        delete days[i]
        continue
      }

      if (adjust) {
        if (days[i].day() === 0) {
          days[i] = days[i].add(1, 'day')
        }
        if (days[i].day() === 6) {
          days[i] = days[i].subtract(1, 'day')
        }
      }

      days[i] = days[i].startOf('day')
    }

    if (!days.length) {
      return false
    }
    if (days.length === 1) {
      return days[0]
    }

    return days
  }

  var keywordMatches = function(str, kw) {
    var m = []
    kw = arrayify(kw)

    for (var i = 0; i < kw.length; i++) {
      var f = str.match(new RegExp(kw[i], 'gi'))
      if (f) {
        m = m.concat(f)
      }
    }

    return m
  }

  var findHoliday = function(self, holiday, adjust, parse, holidayObj) {
    var pt = {}
    var wn = []
    var obj = {}

    h = holidayObj || moment.holidays.active

    if (h.hasOwnProperty(holiday)) {
      wn.push(holiday)
    } else if ((fk = findKey(holiday, h))) {
      wn.push(fk)
    } else {
      for (var hd in h) {
        if (!h.hasOwnProperty(hd)) {
          continue
        }

        pt[hd] = keywordMatches(
          holiday,
          hd.split(/[\s,.-]+/).filter(function(w) {
            return w.length > 2
          })
        ).length

        if (h[hd].keywords_n) {
          var matchesN = keywordMatches(holiday, h[hd].keywords_n)
          if (matchesN.length) {
            pt[hd] = 0
            continue
          }
        }

        if (h[hd].keywords_y) {
          var matchesY = keywordMatches(holiday, h[hd].keywords_y)
          if (matchesY && matchesY.length === h[hd].keywords_y.length) {
            pt[hd] += matchesY.length
          } else {
            pt[hd] = 0
            continue
          }
        }

        if (h[hd].keywords) {
          var matches = keywordMatches(holiday, h[hd].keywords)
          if (matches) {
            pt[hd] += matches.length
          } else {
            continue
          }
        }
      }

      //console.log(pt); // Display scores

      for (var w in pt) {
        if (!pt[w] || !pt.hasOwnProperty(w)) {
          continue
        }
        if (!wn.length || pt[w] === pt[wn[0]]) {
          wn.push(w)
          continue
        }
        if (pt[w] > pt[wn[0]]) {
          wn = [w]
          continue
        }
      }
    }

    if (!wn.length) {
      return false
    }

    if (parse !== false) {
      for (var i = 0; i < wn.length; i++) {
        var d = parseHoliday(self, h[wn[i]].date, adjust)
        if (d) {
          obj[wn[i]] = d
        }
      }

      if (Object.keys(obj).length) {
        return obj
      }
    } else {
      return wn
    }

    return false
  }

  var findHolidays = function(self, holidays, adjust, parse, holidayObj) {
    var h = []
    if (parse) {
      h = {}
    }

    holidays = arrayify(holidays)
    if (!holidayObj) {
      holidayObj = moment.holidays.active
    }

    for (var i = 0; i < holidays.length; i++) {
      var find = findHoliday(self, holidays[i], adjust, parse, holidayObj)

      if (find) {
        if (parse) {
          h = merge(h, find)
        } else {
          h = h.concat(find)
        }
      }
    }

    return h
  }

  var getAllHolidays = function(self, adjust) {
    var h = moment.holidays.active
    var d = {}

    for (var hd in h) {
      if (!h.hasOwnProperty(hd)) {
        continue
      }
      if ((td = parseHoliday(self, h[hd].date, adjust))) {
        d[hd] = td
      }
    }

    return d
  }

  var compileRegions = function(locale, regions) {
    var h = moment.holidays[locale]
    var o = {}

    if (h) {
      for (var i = 0; i < regions.length; i++) {
        var r = regions[i].toLowerCase()
        var l = moment.holidays[locale + '/' + r]
        l = {}

        for (var hd in h) {
          if (!h.hasOwnProperty(hd)) {
            continue
          }

          var y = h[hd].regions || []
          var n = h[hd].regions_n || []

          if (y.length) {
            y.join()
              .toLowerCase()
              .split()
          }
          if (n.length) {
            n.join()
              .toLowerCase()
              .split()
          }

          if (
            (!y.length && !n.length) ||
            (y.length && ~y.indexOf(r)) ||
            (n.length && !~n.indexOf(r))
          ) {
            l[hd] = h[hd]
          }
        }

        if (l) {
          o = merge(o, l)
        }
      }
    }

    if (!Object.keys(o).length) {
      return false
    }

    return o
  }

  var getLocale = function(locale) {
    regions = locale.split('/')
    locale = regions[0].toLowerCase().replace(' ', '_')
    regions.shift()

    if (!moment.holidays[locale]) {
      try {
        var path = './locale/'
        if (
          __dirname
            .split('/')
            .slice(-1)
            .pop() == 'build'
        ) {
          path = '.' + path
        }
        require(path + locale)
      } catch (e) {}
    }

    if (moment.holidays[locale]) {
      if (regions.length) {
        return compileRegions(locale, regions)
      }
      return moment.holidays[locale]
    }

    return false
  }

  var holidayLoop = function(self, count, forward, adjust) {
    if (!count) {
      count = 1
    }

    var h = getAllHolidays(self, adjust)
    var l = moment(self)
    var y = self.year()
    var w = []

    for (var i = 0; i < count; i++) {
      var d = moment(l)

      while (true) {
        var b = false

        if (forward) {
          d.add(1, 'day')
        } else {
          d.subtract(1, 'day')
        }

        if (d.year() !== y) {
          h = getAllHolidays(d, adjust)
          y = d.year()
        }

        if (!Object.keys(h).length) {
          b = true
          break
        }

        for (var hd in h) {
          if (!h.hasOwnProperty(hd)) {
            continue
          }

          var b2 = false
          var ha = arrayify(h[hd])

          for (var hi = 0; hi < ha.length; hi++) {
            if (d.isSame(ha[hi], 'day')) {
              w.push(ha[hi])
              l = moment(d)
              b2 = true
              break
            }
          }

          if (b2) {
            b = true
            break
          }
        }

        if (b) {
          break
        }
      }
    }

    if (!w.length) {
      return false
    }
    if (w.length === 1) {
      return w[0]
    }

    return w
  }

  var arrayify = function(arr) {
    if (arr && arr.constructor !== Array) {
      return [arr]
    }
    return arr
  }

  var findKey = function(find, obj) {
    if (obj.constructor === Object) {
      obj = Object.keys(obj)
    }
    for (var i = 0; i < obj.length; i++) {
      if (find.toLowerCase() === obj[i].toLowerCase()) {
        return obj[i]
      }
    }
    return false
  }

  var merge = function(o1, o2) {
    return Object.assign({}, o1, o2)
  }

  moment.fn.holiday = function(holidays, adjust) {
    var h = moment.holidays.active
    var d = {}
    var single = false

    if (!holidays) {
      d = getAllHolidays(this, adjust)
    } else {
      if (holidays.constructor !== Array) {
        single = true
        holidays = [holidays]
      }

      for (var i = 0; i < holidays.length; i++) {
        if ((td = findHoliday(this, holidays[i], adjust))) {
          d = Object.assign({}, d, td)
        }
      }
    }

    var dKeys = Object.keys(d)

    if (!dKeys.length) {
      return false
    }
    if (dKeys.length === 1 && single) {
      return d[dKeys[0]]
    }

    return d
  }

  moment.fn.holidays = function(holidays, adjust) {
    return this.holiday(holidays, adjust)
  }

  moment.fn.isHoliday = function(holidays, adjust) {
    var h,
      returnTitle,
      hs = []

    if (holidays) {
      holidays = arrayify(holidays)
      h = this.holiday(holidays, adjust)
      returnTitle = false
    } else {
      h = getAllHolidays(this, adjust)
      returnTitle = true
    }

    if (!h) {
      return false
    }

    for (var hd in h) {
      if (!h.hasOwnProperty(hd)) {
        continue
      }

      var ha = arrayify(h[hd])

      for (var hi = 0; hi < ha.length; hi++) {
        if (this.isSame(ha[hi], 'day')) {
          if (returnTitle) {
            hs.push(hd)
          } else {
            return true
          }
        }
      }
    }

    if (hs.length) {
      if (hs.length === 1) {
        return hs[0]
      }
      return hs
    }

    return false
  }

  moment.fn.previousHoliday = function(count, adjust) {
    return holidayLoop(this, count, false, adjust)
  }

  moment.fn.previousHolidays = function(count, adjust) {
    return this.previousHoliday(count, adjust)
  }

  moment.fn.nextHoliday = function(count, adjust) {
    return holidayLoop(this, count, true, adjust)
  }

  moment.fn.nextHolidays = function(count, adjust) {
    return this.nextHoliday(count, adjust)
  }

  moment.fn.holidaysBetween = function(date, adjust) {
    if (!date) {
      date = new Date()
    }
    date = moment(date).subtract(1, 'day')

    var h = getAllHolidays(this, adjust)
    var d = moment(this)
    var y = d.year()
    var w = []

    for (var i = 0; i < date.diff(this, 'days'); i++) {
      d.add(1, 'day')

      if (d.year() !== y) {
        h = getAllHolidays(d, adjust)
        y = d.year()
      }

      if (!Object.keys(h).length) {
        break
      }

      for (var hd in h) {
        var b = false
        var ha = arrayify(h[hd])

        for (var hi = 0; hi < ha.length; hi++) {
          if (d.isSame(ha[hi], 'day')) {
            w.push(ha[hi])
            b = true
            break
          }
        }

        if (b) {
          break
        }
      }
    }

    if (!w.length) {
      return false
    }

    return w
  }

  moment.holidays = {
    active: {},
    active_last: {}
  }

  moment.modifyHolidays = {
    set: function(holidays, specifics) {
      var newH = {}

      if (holidays.constructor === Array) {
        var hs = []

        for (var i = 0; i < holidays.length; i++) {
          var d = findHoliday(this, holidays[i], null, false)
          if (d) {
            hs = hs.concat(d)
          }
        }

        if (hs.length) {
          newH = merge(moment.holidays.active)

          for (var hd in newH) {
            if (!newH.hasOwnProperty(hd)) {
              continue
            }
            if (!~hs.indexOf(hd)) {
              delete newH[hd]
            }
          }
        }
      } else if (typeof holidays === 'string') {
        var locale = getLocale(holidays)

        if (locale) {
          if (specifics) {
            var k = findHolidays(this, specifics, false, false, locale)
            for (var i = 0; i < k.length; i++) {
              newH[k[i]] = merge(locale[k[i]])
            }
          } else {
            newH = merge(locale)
          }
        }
      } else {
        newH = holidays
      }

      if (
        (Object.keys(newH).length || holidays === newH) &&
        !Object.is(moment.holidays.active, newH)
      ) {
        moment.holidays.active_last = merge(moment.holidays.active)
        moment.holidays.active = newH
      }

      return this
    },

    add: function(holidays, specifics) {
      if (typeof holidays === 'string') {
        var locale = getLocale(holidays)
        holidays = {}

        if (locale) {
          if (specifics) {
            var k = findHolidays(this, specifics, false, false, locale)
            for (var i = 0; i < k.length; i++) {
              holidays[k[i]] = merge(locale[k[i]])
            }
          } else {
            holidays = locale
          }
        }
      }

      if (Object.keys(holidays).length) {
        moment.holidays.active_last = merge(moment.holidays.active)
        moment.holidays.active = merge(moment.holidays.active, holidays)
      }

      return this
    },

    remove: function(holidays) {
      holidays = arrayify(holidays)

      var find = findHolidays(this, holidays, false, false)
      var newH = merge(moment.holidays.active)

      if (find) {
        for (var i = 0; i < find.length; i++) {
          delete newH[find[i]]
        }
      }

      if (!Object.is(moment.holidays.active, newH)) {
        moment.holidays.active_last = merge(moment.holidays.active)
        moment.holidays.active = newH
      }

      return this
    },

    undo: function() {
      var c = merge(moment.holidays.active)
      moment.holidays.active = merge(moment.holidays.active_last)
      moment.holidays.active_last = c
      return this
    },

    load: function(locales) {
      locales = arrayify(locales)
      for (var i = 0; i < locales.length; i++) {
        getLocale(locales[i])
      }
      return this
    },

    extendParser: function(func) {
      parserExtensions.push(func)
      return this
    }
  }

  if (
    (typeof module !== 'undefined' && module !== null
      ? module.exports
      : void 0) != null
  ) {
    module.exports = moment
  }
}.call(this))

//! moment-holiday.js locale configuration
//! locale : Argentina
//! author : NahuelOvejero : https://github.com/NahuelOvejero
const MOMENT = require('moment')

(function() {
  var moment = this.moment || MOMENT

  moment.holidays.argentina = {
    "Año Nuevo": {
      date: '1/1',
      keywords: ['ano', 'new', 'year']
    },
    "Lunes de Carnival": {
      date: 'easter-48',
      keywords: ['festival']
    },
    "Martes de Carnival": {
      date: 'easter-47',
      keywords: ['festival'],
    },
    "Día de la Memoria por la Verdad y la Justicia": {
      date: '3/24',
    },
    "Día del Veterano de Guerra y los Caídos en las Islas Malvinas": {
      date: '4/2',
      keywords: ['caidos']
    },
    "Jueves Santo" : {
      date: 'easter-3',
      keywords: ['festividad', 'cristina']
    },
    "Viernes Santo": {
      date: 'easter-2',
      keywords: ['festividad', 'cristina']
    },
    "Día de Acción por la tolerancia y el respeto entre los pueblos": {
      date: '4/24',
      keywords: ['accion', 'pueblo']
    },
    "Día del Trabajador": {
      date: '5/1',
      keywords: ['labor', 'labour']
    },
    "Día de la Revolución de Mayo": {
      date: '5/25',
      keywords: ['revolucion', 'revolution']
    },
    "Día Paso a la Inmortalidad del Gral. Manual Belgrano": {
      date: '6/20',
      keywords: ['bandera', 'flag']
    },
    "Día de la Independencia": {
      date: '7/9',
      keywords: ['independence']
    },
    "Paso a la Inmortalidad del Gral. José de San Martín": {
      date: '8/(1,3)',
      keywords: ['martin', 'jose', 'saint', 'st[\\s\\.]']
    },
    "Día del Respeto a la Diversidad Cultural": {
      date: '10/(1,2)',
      keywords: ['christopher', 'columbus', 'culture']
    },
    "Día de la Soberanía Nacional": {
      date: '11/(1,4)',
      keywords: ['soberania', 'sovereignty']
    },
    "Navidad": {
      date: '12/25',
      keywords: ['christmas']
    }
  };

  if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) { module.exports = moment; }
}).call(this);

//! moment-holiday.js locale configuration
//! locale : Brazil
//! author : Fernando Fabricio dos Santos : https://github.com/ferfabricio
const MOMENT = require('moment')

(function() {
  var moment = this.moment || MOMENT

  moment.holidays.brazil = {
    'Ano Novo': {
      date: '1/1',
      keywords_n: ['eve']
    },
    'Sexta Feira Santa': {
      date: 'easter-2',
      keywords_y: ['good', 'friday']
    },
    'Domingo de Páscoa': {
      date: 'easter',
      keywords_y: ['easter'],
      keywords: ['sunday']
    },
    'Corpus Christi': {
      date: 'easter+60'
    },
    'Tiradentes': {
      date: '4/21'
    },
    'Dia do Trabalhador': {
      date: '5/1',
      keywords: ['labour']
    },
    'Dia da Independência do Brasil': {
      date: '8/7',
      keywords: ['independency']
    },
    'Nossa Senhora Aparecida': {
      date: '10/12'
    },
    'Finados': {
      date: '11/2'
    },
    'Proclamação da República': {
      date: '11/15'
    },
    'Natal': {
      date: '12/25',
      keywords: ['christ', 'x-?mas'],
      keywords_n: ['eve']
    }
  };

  if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) { module.exports = moment; }
}).call(this);

//! moment-holiday.js locale configuration
//! locale : Canada
//! author : Kodie Grantham : https://github.com/kodie
/* regions :
      AB : Alberta
      BC : British Columbia
      MB : Manitoba
      NB : New Brunswick
      NL : Newfoundland and Labrador
      NS : Nova Scotia
      NT : Northwest Territories
      NU : Nunavut
      ON : Ontario
      PE : Prince Edward Island
      QC : Quebec
      SK : Saskatchewan
*/
const MOMENT = require('moment')

(function() {
  var moment = this.moment || MOMENT

  moment.holidays.canada = {
    "New Year's Day": {
      date: '1/1',
      keywords_n: ['eve'],
    },
    "Valentine's Day": {
      date: '2/14'
    },
    "Islander Day": {
      date: '2/(1,2)',
      keywords_y: ['island'],
      regions: ['pe']
    },
    "Family Day": {
      date: '2/(1,3)',
      regions: ['ab', 'bc', 'on', 'sk']
    },
    "Louis Riel Day": {
      date: '2/(1,3)',
      regions: ['mb']
    },
    "Saint Patrick's Day": {
      date: '3/17',
      keywords: ['st[\\s\\.]', 'paddy', 'patty']
    },
    "Good Friday": {
      date: 'easter-2',
      keywords_y: ['good', 'friday'],
      regions_n: ['qc']
    },
    "Easter Sunday": {
      date: 'easter',
    },
    "Victoria Day": {
      date: '5/(1,[-24])',
      regions_n: ['nb', 'nl', 'ns']
    },
    "Mother's Day": {
      date: '5/(0,2)',
      keywords: ['mom']
    },
    "Father's Day": {
      date: '6/(0,3)',
      keywords: ['dad']
    },
    "Aboriginal Day": {
      date: '6/21',
      regions: ['nt']
    },
    "Saint Jean Baptiste Day": {
      date: '6/24',
      keywords: ['st[\\s\\.]'],
      regions: ['qc']
    },
    "Canada Day": {
      date: '7/1',
    },
    "Civic Day": {
      date: '8/(1,1)',
      regions: ['ab', 'bc', 'nb', 'nu', 'on', 'sk']
    },
    "Labour Day": {
      date: '9/(1,1)',
      keywords: ['labor']
    },
    "Halloween": {
      date: '10/31',
    },
    "Remembrance Day": {
      date: '11/11',
      regions_n: ['mb', 'ns', 'on', 'qc']
    },
    "Thanksgiving Day": {
      date: '11/(4,4)',
      keywords: ['thanks', 'turkey'],
      keywords_n: ['after'],
      regions_n: ['nb', 'nl', 'ns']
    },
    "Christmas Day": {
      date: '12/25',
      keywords: ['christ', 'x-?mas'],
      keywords_n: ['eve']
    },
    "Boxing Day": {
      date: '12/26',
      keywords: ['box'],
      regions: ['on']
    }
  };

  if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) { module.exports = moment; }
}).call(this);

const MOMENT = require('moment')

(function() {
  var moment = this.moment || MOMENT

  moment.holidays.colombia = {
    "Día de los Reyes Magos": {
      date: '1/9',
      keywords: ['reyes magos']
    },
    "Día de San José": {
      date: '3/20',
      keywords: ['Día del hombre']
    },
    "Día del Trabajo": {
      date: '4/1',
    },
    "Día de la Ascensión": {
      date: '5/29',
    },
    "Corpus Christi": {
      date: '6/19',
      keywords: ['festividad', 'cristiana']
    },
    "Sagrado Corazón" : {
      date: '6/26',
      keywords: ['festividad', 'cristiana']
    },
    "San Pedro y San Pablo": {
      date: '7/3',
      keywords: ['festividad', 'cristiana']
    },
    "Día de la Independencia": {
      date: '7/20',
      keywords: ['bandera', 'independencia Colombia', 'libertad']
    },
    "Batalla de Boyacá": {
      date: '8/7',
      keywords: ['Batalla de Boyaca','Colombia', 'libertad']
    },
    "La asunción de la Virgen ": {
      date: '8/21',
      keywords: ['festividad', 'cristiana']
    },
    "Día de la Raza": {
      date: '10/16',
      keywords: ['Raza','abolicion de esclavitud']
    },
    "Todos los Santos ": {
      date: '11/6',
      keywords: ['festividad', 'cristiana']
    },
    "Independencia de Cartagena":{
    	date: '11/13'
    },
    "Día de la Inmaculada Concepción ": {
      date: '12/8',
      keywords: ['festividad', 'cristiana']
    },
    "Día de Navidad ": {
      date: '12/8',
      keywords: ['christmas', 'navidad', 'merryxmas']
   }
  };
  if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) { module.exports = moment; }
}).call(this);

//! moment-holiday.js locale configuration
//! locale : Croatia / Hrvatska
//! author : diomed : https://github.com/diomed
const MOMENT = require('moment')

(function() {
  var moment = this.moment || MOMENT

  moment.holidays.croatia = {
    "Nova Godina": {
      date: '1/1',
      keywords: ['new', 'year']
    },
    "Bogojavljenje": {
      date: '1/6',
      keywords: ['tri kralja']
    },
    "Uskrs": {
      date: 'easter',
      keywords: ['easter'],
      keywords_n: ['monday']
    },
    "Uskrsni ponedjeljak": {
      date: 'easter+1',
      keywords: ['uskršnji', 'easter', 'monday']
    },
    "Praznik rada": {
      date: '5/1'
    },
    "Tijelovo": {
      date: 'easter+60',
      keywords: ['corpus', 'christi']
    },
    "Dan antifašističke borbe": {
      date: '6/22',
      keywords: ['antifasisticke']
    },
    "Dan državnosti": {
      date: '6/25',
      keywords: ['drzavnost', 'domovinske', 'domovinska']
    },
    "Dan zahvalnosti": {
      date: '8/5',
      keywords: ['domovinske', 'thanksgiving']
    },
    "Velika Gospa": {
      date: '8/15'
    },
    "Dan neovisnosti": {
      date: '10/8',
      keywords: ['nezavisnosti', 'independence']
    },
    "Dan svih svetih": {
      date: '11/1',
      keywords: ['svi sveti', 'sesvete', 'sisvete']
    },
    "Božić": {
      date: '12/25',
      keywords: ['bozic', 'christmas']
    },
    "Sveti Stjepan": {
      date: '12/26',
      keywords: ['sv[\\s\\.]']
    }
  };

  if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) { module.exports = moment; }
}).call(this);

//! moment-holiday.js locale configuration
//! locale : Denmark
//! author : Alexander Køpke : https://github.com/alexanderkopke
const MOMENT = require('moment')

(function() {
  var moment = this.moment || MOMENT

  moment.holidays.denmark = {
    "Nytårsdag": {
      date: '1/1',
      keywords: ['nytarsdag', 'new', 'years']
    },
    "Skærfredag": {
      date: 'easter-2',
      keywords: ['skaerfredag', 'good', 'friday']
    },
    "Påske": {
      date: 'easter',
      keywords: ['paske', 'easter', 'sunday'],
    },
    "Anden påskedag": {
      date: 'easter+1',
      keywords: ['andenpåskedag', 'andenpaskedag', 'paskedag', 'easter', 'monday']
    },
    "Første maj": {
      date: '5/1',
      keywords: ['førstemaj', 'forstemaj', 'forste', 'maj']
    },
    "Kristi himmelfart": {
      date: 'easter+39',
      kaywords: ['ascension']
    },
    "Pinse": {
      date: 'easter+49',
      keywords: ['pentecost']
    },
    "Anden pinse": {
      date: 'easter+50',
      keywords: ['andenpinsedag', 'pinsedag', 'whit', 'monday']
    },
    "Juleaften": {
      date: '12/24',
      keywords: ['christmas']
    },
    "Anden juledag": {
      date: '12/25',
      keywords: ['andenjuledag'],
      keywords_y: ['anden']
    }
  };

  if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) { module.exports = moment; }
}).call(this);

//! moment-holiday.js locale configuration
//! locale : Easter Related Holidays
//! author : Kodie Grantham : https://github.com/kodie
const MOMENT = require('moment')

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

//! moment-holiday.js locale configuration
//! locale : Finland
//! author : Kodie Grantham : https://github.com/kodie
const MOMENT = require('moment')

(function() {
  var moment = this.moment || MOMENT

  moment.holidays.finland = {
    "Uudenvuodenpäivä": {
      date: '1/1',
      keywords: ['uudenvuodenpaiva', 'new', 'year']
    },
    "Loppiainen": {
      date: '1/6'
    },
    "Vappu": {
      date: '5/1'
    },
    "Juhannuspäivä": {
      date: '6/(6,[21])',
      keywords: ['juhannuspaiva']
    },
    "Pyhäinpäivä": {
      date: '11/(6,[1])',
      keywords: ['pyhainpaiva']
    },
    "Joulupäivä": {
      date: '12/25',
      keywords: ['joulupaiva', 'christmas']
    },
    "Tapaninpäivä": {
      date: '12/26',
      keywords: ['tapaninpaiva']
    },
    "Pitkäperjantai": {
      date: 'easter-2',
      keywords: ['pitkaperjantai', 'good', 'friday']
    },
    "Pääsiäispäivä": {
      date: 'easter',
      keywords: ['paasiaispaiva', 'easter'],
      keywords_n: ['toinen', 'monday']
    },
    "Toinen Pääsiäispäivä": {
      date: 'easter+1',
      keywords: ['paasiaispaiva', 'easter', 'monday'],
      keywords_y: ['toinen']
    },
    "Helatorstai": {
      date: 'easter+39',
      keywords: ['ascension']
    }
  };

  if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) { module.exports = moment; }
}).call(this);

//! moment-holiday.js locale configuration
//! locale : FR
//! locale-author : Benjamin Dequevauviller : https://github.com/blurp1478963
//
const MOMENT = require('moment')

(function() {
  var moment = this.moment || MOMENT

  moment.holidays.france = {
    "Jour de l'an": {
      date: '1/1'
    },
    "Fête du Travail": {
      date: '5/1',
    },
    "8 Mai 1945": {
      date: '5/8',
    },
    "Fête Nationale": {
      date: '7/14',
    },
    "Assomption": {
      date: '8/15',
    },
    "La Toussaint": {
      date: '11/1',
    },
    "Armistice": {
      date: '11/11',
    },
    "Noël": {
      date: '12/25',
    },
    "Vendredi Saint": {
      date: 'easter-2',
      keywords_y: ['good', 'friday'],
    },
    "Jeudi de l'Ascension": {
      date: 'easter+39',
      keywords_y: ['good', 'thursday'],
    },
    "Dimanche de Pâques": {
      date: 'easter',
      keywords_y: ['easter'],
      keywords: ['sunday']
    },
    "Lundi de Pâques": {
      date: 'easter+1',
      keywords_y: ['good', 'monday'],
    },
    "Lundi de Pentecôte": {
      date: 'easter+50',
      keywords_y: ['good', 'monday'],
    }
  };

  if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) {
    module.exports = moment;
  }
}).call(this);

//! moment-holiday.js locale configuration
//! locale : Germany
//! author : Kodie Grantham : https://github.com/kodie
/* regions :
      BB : Brandenburg
      BW : Baden-Württemberg
      BY : Bayern
      HE : Hessen
      MV : Mecklenburg-Vorpommern
      NW : Nordrhein-Westfalen
      RP : Rheinland-Pfalz
      SN : Sachsen
      SL : Saarland
      ST : Sachsen-Anhalt
      TH : Thüringen
*/
const MOMENT = require('moment')

(function() {
  var moment = this.moment || MOMENT

  moment.holidays.germany = {
    "Neujahrstag": {
      date: '1/1',
      keywords: ['new', 'year']
    },
    "Karfreitag": {
      date: 'easter-2',
      keywords: ['good', 'friday']
    },
    "Ostersonntag": {
      date: 'easter',
      keywords: ['easter'],
      keywords_n: ['monday'],
      regions: ['bb']
    },
    "Ostermontag": {
      date: 'easter+1',
      keywords: ['easter', 'monday']
    },
    "Heilige Drei Könige": {
      date: '1/6',
      keywords: ['konige'],
      regions: ['bw', 'by', 'st']
    },
    "Maifeiertag": {
      date: '5/1'
    },
    "Christi Himmelfahrt": {
      date: 'easter+39',
      kaywords: ['ascension']
    },
    "Pfingstsonntag": {
      date: 'easter+49',
      keywords: ['pentecost'],
      regions: ['bb']
    },
    "Pfingstmontag": {
      date: 'easter+50',
      keywords: ['whit', 'monday']
    },
    "Fronleichnam": {
      date: 'easter+60',
      keywords: ['corpus', 'christi'],
      regions: ['bw', 'by', 'he', 'nw', 'rp', 'sl']
    },
    "Mariä Himmelfahrt": {
      date: '8/15',
      keywords: ['maria'],
      regions: ['sl']
    },
    "Tag der deutschen Einheit": {
      date: '10/3'
    },
    "Reformationstag": {
      date: '10/31',
      regions: ['bb', 'mv', 'sn', 'st', 'th']
    },
    "Allerheiligen": {
      date: '11/1',
      regions: ['bw', 'by', 'nw', 'rp', 'sl']
    },
    "Buß- und Bettag": {
      date: '11/(3,[17])',
      keywords: ['bub'],
      regions: ['sn']
    },
    "Weihnachten": {
      date: '12/24',
      keywords: ['christmas']
    },
    "Zweiter Weihnachtsfeiertag": {
      date: '12/26',
      keywords_y: ['zweiter']
    }
  };

  if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) { module.exports = moment; }
}).call(this);

//! moment-holiday.js locale configuration
//! locale : Ghana
//! author : Emmanuel Zidafamor : https://github.com/e-zidaf
/* Cities :
       Accra
       Kumasi
       Tamale
       Secondi-Takoradi
       Sunyani
       Cape-Coast
       Bayelsa
       Obuasi
       Teshie
       Tema
       Koforidua
*/
const MOMENT = require('moment')

(function() {
  var moment = this.moment || MOMENT

  moment.holidays.ghana = {
    "New Year's Day": {
      date: '1/1',
      keywords: ['New Year'],
    },
    "New Year's Holiday":{
        date: '1/2',
        keywords: ['Public Holiday'],
    },
    "Valentine's Day": {
      date: '2/14'
    },
    "Independence Day": {
      date: '3/6',
      keywords: ['Independence'],
    },
    "Good Friday": {
      date: 'easter-2',
      keywords_y: ['good', 'friday'],
      regions_n: ['qc']
    },
    "Easter Sunday": {
      date: 'easter',
    },
//! Monday's precceding Easter Sundays
    "Easter Monday": {
        date: 'easter-3',
        keywords: ['easter monday'],
    },
    "African Unity Day": {
      date: '5/25',
      keywords: ['unity day'],
    },
    "Eid ul-Fitr": {
      date: '6/26',
      keywords: ['end of ramadan'],
    },
    "Republic Day": {
      date: '7/3',
      keywords: ['ghana republic'],
    },
    "Eidul-Adha": {
      date: '9/1',
      keywords: ['Eid'],
    },
    "Founders Day": {
      date: '9/21',
      keywords: ['birthday of Ghana first president, Kwame Nkrumah'],
    },
    "Farmer's Day": {
      date: '12/1',
      keywords: ['farmers day, first friday of december'],
    },
    "Christmas Day": {
      date: '12/25',
      keywords: ['christ', 'x-?mas'],
      keywords_n: ['eve']
    },
    "Boxing Day": {
      date: '12/26',
      keywords: ['box'],
      regions: ['on']
    }
  };

  if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) { module.exports = moment; }
}).call(this);

//! moment-holiday.js locale configuration
//! locale : India
//! author : wonder2991 : https://github.com/wonder2991
const MOMENT = require('moment')

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

//! moment-holiday.js locale configuration
//! locale : Italy
//! author : Lorenzo Brutti : https://github.com/lbrutti
// based on Google Calendar of Italian Holidays : https://calendar.google.com/calendar/embed?src=it.italian%23holiday%40group.v.calendar.google.com&ctz=Europe%2FRome
const MOMENT = require('moment')

(function() {
  var moment = this.moment || MOMENT

  moment.holidays.italy = {
    "Assunzione / Ferragosto": {
      date: '08/15'
    },
    "Tutti i Santi": {
      date: '11/01'
    },
    "Immacolata": {
      date: '12/08'
    },
    "Natale": {
      date: '12/25'
    },
    "Santo Stefano": {
      date: '12/26'
    },
    "San Silvestro": {
      date: '12/31'
    },
    "Capodanno": {
      date: '01/01'
    },
    "Epifania": {
      date: '01/06'
    },
    "Pasqua": {
      date: 'easter'
    },
    "Lunedì di Pasquetta": {
      date: 'easter+1'
    },
    "Liberazione": {
      date: '04/25'
    },
    "Festa del Lavoro": {
      date: '05/01'
    },
    "Festa della Repubblica": {
      date: '06/02'
    }
  };

  if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) {
    module.exports = moment;
  }
}).call(this);

//! moment-holiday.js locale configuration
//! locale : Japan
//! author : garroadran : https://github.com/garroadran/
const MOMENT = require('moment')

(function() {
  var moment = this.moment || MOMENT

  moment.holidays.japan = {
    "Gantan": {
      date: '1/1',
      keywords: ['new', 'year']
    },
    "Seijin no hi": {
      date: '1/(1,2)',
      keywords: ['coming', 'age']
    },
    "Kenkoku kinen no hi": {
      date: '2/11',
      keywords: ['national', 'foundation'],
    },
    "Shunbun no hi": {
      date: '3/20',
      keywords: ['vernal', 'equinox']
    },
    "Showa no hi": {
      date: '4/29',
      keywords: ['emperor']
    },
    "Kenpou kinenbi" : {
      date: '5/3',
      keywords: ['constitution', 'memorial']
    },
    "Midori no hi": {
      date: '5/4',
      keywords: ['green', 'greenery']
    },
    "Kodomo no hi": {
      date: '5/5',
      keywords: ['kids', 'children']
    },
    "Umi no hi": {
      date: '7/(1,3)',
      keywords: ['marine', 'ocean', 'sea']
    },
    "Yama no hi": {
      date: '8/11',
      keywords: ['mountain']
    },
    "Keiro no hi": {
      date: '9/(1,3)',
      keywords: ['respect', 'aged', 'seniors']
    },
    "Shubun no hi": {
      date: '9/23',
      keywords: ['autumn', 'fall', 'autumnal', 'equinox']
    },
    "Taiiku no hi": {
      date: '10/(1,2)',
      keywords: ['health', 'sports']
    },
    "Bunka no hi": {
      date: '11/3',
      keywords: ['culture']
    },
    "Rodo kansha no hi": {
      date: '11/23',
      keywords: ['labor', 'appreciation']
    },
    "Tennou tanjoubi": {
      date: '12/23',
      keywords: ['emperor', 'birthday']
    }
  };

  if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) { module.exports = moment; }
}).call(this);

//! moment-holiday.js locale configuration
//! locale : Nigeria
//! author : Emmanuel Zidafamor : https://github.com/e-zidaf
/* States :
       Abia
       Abuja - FCT
       Adamawa
       Akwa Ibom
       Anambra
       Bauchi
       Bayelsa
       Benue
       Borno
       Cross River
       Delta
       Ebonyi
       Edo
       Ekiti
       Enugu
       Gombe
       Imo
       Jigawa
       Kaduna
       Kano
       Katsina
       Kebbi
       Kogi
       Kwara
       Lagos
       Nasarawa
       Niger
       Ogun
       Ondo
       Osun
       Oyo
       Plateau
       Rivers
       Sokoto
       Taraba
       Yobe
       Zamfara
*/
const MOMENT = require('moment')

(function() {
  var moment = this.moment || MOMENT

  moment.holidays.nigeria = {
    "New Year's Day": {
      date: '1/1',
      keywords: ['New Year'],
    },
    "New Year's Holiday":{
        date: '1/2',
        keywords: ['Public Holiday'],
    },
    "Valentine's Day": {
      date: '2/14'
    },
    "Women's Day": {
        date: '3/8',
        keywords: ['womens day'],
    },
    "Dr. Samuel Memorial Day": {
        date: '3/17',
        keywords_y: ['Samuel Ogbemudia'],
        regions: ['Edo']
    },
    "Good Friday": {
      date: 'easter-2',
      keywords_y: ['good', 'friday'],
      regions_n: ['qc']
    },
    "Easter Sunday": {
      date: 'easter',
    },
//! Monday's precceding Easter Sundays
    "Easter Monday": {
        date: 'easter-3',
        keywords: ['easter monday'],
    },
    "Worker's Day": {
      date: '5/1',
      keywords: ['workers'],
    },
    "Children's Day": {
      date: '5/27',
      keywords: ['children'],
    },
    "Democracy Day": {
      date: '5/29',
      keywords: ['democracy'],
    },
     "Mother's Day": {
      date: '5/(0,2)',
      keywords: ['mom']
    },
    "Father's Day": {
      date: '6/(0,3)',
      keywords: ['dad']
    },
    "Eid-el-fitri Sallah": {
      date: '6/25',
      keywords: ['Eid'],
    },
    "Sallah Holiday": {
      date: '6/26',
      keywords: ['sallah'],
    },
    "Sallah Holidays": {
      date: '6/27',
      keywords: ['Eid sallah'],
    },
    "Id el Kabir": {
      date: '9/1',
      keywords: ['Eid'],
    },
    "Independence Day": {
      date: '10/1',
      keywords: ['National Independence'],
    },
    "Christmas Day": {
      date: '12/25',
      keywords: ['christ', 'x-?mas'],
      keywords_n: ['eve']
    },
    "Boxing Day": {
      date: '12/26',
      keywords: ['box'],
      regions: ['on']
    }
  };

  if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) { module.exports = moment; }
}).call(this);

//! moment-holiday locale configuration
//! locale : Portugal
//! author : Pedro Martins : https://github.com/xmaarf
//! national holidays only
const MOMENT = require('moment')

(function() {
  var moment = this.moment || MOMENT

  moment.holidays.portugal = {
    "Dia de Ano-Novo": {
        date: '1/1',
        keywords_n: ['eve'],
    },
    "Sexta-Feira Santa": {
        date: 'easter-2',
        keywords_y: ['good', 'friday'],
    },
    "Páscoa": {
        date: 'easter'
    },
    "25 de Abril - Dia da Liberdade": {
        date: '4/25'
    },
    "Dia do Trabalhador": {
        date: '5/01'
    },
    "Corpo de Deus": {
        date: 'easter+60'
    },
    "Dia de Portugal": {
        date: '6/10'
    },
    "Assunção de Nossa Senhora": {
        date: '8/15'
    },
    "Implantação da República": {
        date: '10/05'
    },
    "Dia de Todos os Santos": {
        date: '11/01'
    },
    "Restauração da Independência": {
        date: '12/01'
    },
    "Dia da Imaculada Conceição": {
        date: '12/08'
    },
    "Natal": {
        date: '12/25',
        keywords: ['christ', 'x-?mas'],
        keywords_n: ['eve']
    },
  };

  if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) { module.exports = moment; }
}).call(this);

//! moment-holiday.js locale configuration
//! locale : Russa
//! author : Vasilii Vakhtin : https://github.com/Vasil11
const MOMENT = require('moment')

(function() {
  var moment = this.moment || MOMENT

  moment.holidays.russia = {
    "New Year and Christmas Holidays": {
      date: '1/1 | 1/8',
      keywords: ['new', 'year', 'christmas']
    },
    "Defender's Day": {
      date: '2/23',
      keywords: ['defender\'s day', '23 of February']
    },
    "Women's Day": {
      date: '3/8',
      keywords: ['women\'s day', '8 of March']
    },
    "May Day": {
      date: '5/1',
      keywords: ['may day', 'Labour', 'spring']
    },
    "Victory Day": {
      date: '5/9',
      keywords: ['victory day']
    },
    "Russia Day": {
      date: '6/12',
      keywords: ['russia day']
    },
    "National Unity Day": {
      date: '11/4',
      keywords: ['national unity day']
    },
    "New Year": {
    date: '12/31',
    keywords: ['new', 'year']
    }
  };

  if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) { module.exports = moment; }
}).call(this);

//! moment-holiday.js locale configuration
//! locale : Sweden
//! author : Faleij : https://github.com/faleij
//! law text : https://www.riksdagen.se/sv/dokument-lagar/dokument/svensk-forfattningssamling/lag-1989253-om-allmanna-helgdagar_sfs-1989-253
const MOMENT = require('moment')

(function() {
  var moment = this.moment || MOMENT

  moment.holidays.sweden = {
    "Nyårsdagen": {
      date: '1/1',
      keywords: ['nyårsdag', 'nyår', 'new', 'years']
    },
    "Trettondedag jul": {
      date: '6/1',
      keywords: ['trettondedag', 'trettondedagen', 'trettonde']
    },
    "Långfredagen": {
      date: 'easter-2',
      keywords: ['långfredag', 'good', 'friday']
    },
    "Påskdagen": {
      date: 'easter',
      keywords: ['påsk', 'easter', 'sunday'],
    },
    "Annandag påsk": {
      date: 'easter+1',
      keywords: ['annandag påsk', 'easter', 'monday']
    },
    "Första maj": {
      date: '5/1',
      keywords: ['första maj', 'första', 'maj']
    },
    "Nationaldagen": {
      date: '6/6',
      keywords: ['nationaldag']
    },
    "Kristi himmelsfärdsdag": {
      date: 'easter+39',
      kaywords: ['ascension', 'thursday']
    },
    "Pingstdagen": {
      date: 'easter+49',
      keywords: ['pingst', 'pentecost', 'sunday']
    },
    "Midsommardagen": {
      date: '6/(6,[20])',
      keywords: ['midsommar', 'midsommardag', 'saturday']
    },
    "Alla helgons dag": {
      date: '10/(6,[31])',
      keywords: ['helgon', 'alla helgon', 'helgon dag', 'saturday']
    },
    "Juldagen": {
      date: '12/24',
      keywords: ['christmas']
    },
    "Annandag jul": {
      date: '12/25',
      keywords: ['annandag jul']
    }
  };

  if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) { module.exports = moment; }
}).call(this);

//! moment-holiday.js locale configuration
//! locale : Switzerland
//! author : Kodie Grantham : https://github.com/kodie
/* regions :
      AG : Aargau
      AI : Appenzell Innerrhoden
      AR : Appenzell Ausserrhoden
      BE : Bern
      BL : Basel-Landschaft
      BS : Basel-Stadt
      FR : Freiburg
      GE : Genf
      GL : Glarus
      GR : Graubünden
      JU : Jura
      LU : Luzern
      NE : Neuenburg
      NW : Nidwalden
      OW : Obwalden
      SG : St. Gallen
      SH : Schaffhausen
      SO : Solothurn
      SZ : Schwyz
      TG : Thurgau
      TI : Tessin
      UR : Uri
      VD : Waadt
      VS : Wallis
      ZG : Zug
      ZH : Zürich
*/
const MOMENT = require('moment')

(function() {
  var moment = this.moment || MOMENT

  moment.holidays.switzerland = {
    "Neujahrstag": {
      date: '1/1',
      keywords: ['new', 'year']
    },
    "Berchtoldstag": {
      date: '1/2',
      keywords: ['berchtold'],
      regions_n: ['ai', 'ar', 'bl', 'bs', 'ge', 'gr', 'sz', 'ti', 'ur']
    },
    "Dreikönigstag": {
      date: '1/6',
      keywords: ['epiphany', 'konige'],
      regions: ['sz', 'ti', 'ur']
    },
    "Ausrufung Republik Neuenburg": {
      date: '3/1',
      keywords: ['establishment', 'republic', 'neuchatel'],
      regions: ['ne']
    },
    "Josephstag": {
      date: '3/19',
      keywords: ['joseph'],
      regions: ['nw', 'sz', 'ti', 'ur', 'vs']
    },
    "Karfreitag": {
      date: 'easter-2',
      keywords: ['good', 'friday'],
      regions_n: ['ti', 'vs']
    },
    "Ostersonntag": {
      date: 'easter',
      keywords: ['easter'],
      keywords_n: ['monday']
    },
    "Ostermontag": {
      date: 'easter+1',
      keywords: ['easter', 'monday'],
      regions_n: ['ne']
    },
    "Näfelser Fahrt": {
      date: '4/(4,1)',
      keywords: ['nafels', 'fahrt'],
      regions: ['gl']
    },
    "Tag der Arbeit": {
      date: '5/1',
      keywords: ['labor'],
      regions: ['ag', 'bl', 'bs', 'ju', 'ne', 'sh', 'so', 'tg', 'ti', 'zh']
    },
    "Auffahrt": {
      date: 'easter+39',
      keywords: ['ascension', 'christi', 'himmelfahrt']
    },
    "Pfingstsonntag": {
      date: 'easter+49',
      keywords: ['pentecost']
    },
    "Pfingstmontag": {
      date: 'easter+50',
      keywords: ['whit', 'monday'],
      regions_n: ['ne']
    },
    "Fronleichnam": {
      date: 'easter+60',
      keywords: ['corpus', 'christi'],
      regions_n: ['ar', 'be', 'bl', 'bs', 'ge', 'gl', 'gr', 'sg', 'sh', 'tg', 'vd', 'zh']
    },
    "Unabhängigkeitsfest Jura": {
      date: '6/23',
      keywords: ['independence', 'jura'],
      regions: ['ju']
    },
    "St. Peter und Paul": {
      date: '6/29',
      keywords: ['st[\\s\\.]', 'peter', 'paul'],
      regions: ['ti']
    },
    "Bundesfeiertag": {
      date: '8/1',
      keywords: ['national', 'holiday']
    },
    "Mariä Himmelfahrt": {
      date: '8/15',
      keywords: ['assumption', 'maria'],
      regions: ['ag', 'ai', 'fr', 'ju', 'lu', 'nw', 'ow', 'so', 'sz', 'ti', 'ur', 'vs', 'zg']
    },
    "Genfer Bettag": {
      date: '9/(4,[-11])',
      keywords: ['repentance'],
      keywords_y: ['geneva'],
      keywords_n: ['federal', 'monday'],
      regions: ['ge']
    },
    "Eidg. Dank-, Buss- und Bettag": {
      date: '9/(0,3)',
      keywords: ['repentance'],
      keywords_y: ['federal'],
      keywords_n: ['geneva', 'monday'],
      regions: ['vd']
    },
    "Bettagsmontag": {
      date: '9/(1,[-22])',
      keywords: ['repentance'],
      keywords_y: ['monday'],
      keywords_n: ['federal', 'geneva'],
      regions: ['vd']
    },
    "Mauritiustag": {
      date: '9/22',
      keywords: ['maurice'],
      regions: ['ai']
    },
    "Bruderklausenfest": {
      date: '9/25',
      keywords: ['brother', 'klaus'],
      regions: ['ow']
    },
    "Allerheiligen": {
      date: '11/1',
      keywords: ['all', 'saints'],
      regions_n: ['ar', 'be', 'bl', 'bs', 'ge', 'gr', 'ne', 'sh', 'tg', 'vd', 'zh']
    },
    "Mariä Empfängnis": {
      date: '12/8',
      keywords: ['immaculate', 'conception'],
      regions: ['ag', 'ai', 'fr', 'lu', 'nw', 'ow', 'sz', 'ti', 'ur', 'vs', 'zg']
    },
    "Weihnachtstag": {
      date: '12/25',
      keywords: ['christ', 'x-?mas']
    },
    "Stephanstag": {
      date: '12/26',
      keywords: ['boxing', 'box'],
      regions_n: ['ge', 'ju', 'vd']
    },
    "Wiederherstellung Republik Genf": {
      date: '12/31',
      keywords: ['restoration', 'republic', 'geneva'],
      regions: ['ge']
    }
  };

  if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) { module.exports = moment; }
}).call(this);

//! moment-holiday.js locale configuration
//! locale : UK
//! author : Kodie Grantham : https://github.com/kodie
//! locale-author: DMCooper : https://github.com/SilentGamelan
//
/* regions :
      EN : England
      SL : Scotland
      WL : Wales
      NI : Northern Island
*/
const MOMENT = require('moment')

(function() {
  var moment = this.moment || MOMENT

  moment.holidays.united_kingdom = {
    "New Year's Day": {
      date: '1/1',
      keywords_n: ['eve']
    },
    "Saint David's Day": {
      date: '3/1',
      keywords:['David', 'st[\\s\\.]'],
      regions: ['WL']
    },
    "Saint Patrick's Day": {
      date: '3/17',
      keywords:['paddy', 'st[\\s\\.]'],
      regions: ['NI']
    },
    "Good Friday": {
      date: 'easter-2',
      keywords_y: ['good', 'friday'],
    },
    "Easter Sunday": {
      date: 'easter',
      keywords_y: ['easter'],
      keywords:['sunday']
    },
    "Easter Monday": {
      date: 'easter+1)',
      keywords_y: ['easter'],
      keywords: ['monday'],
      regions: ['EN', 'NI', 'WL']
    },
    "Mothering Sunday": {
      date: 'easter-21',
      keywords_y:['mother'],
      keywords: ['sunday', 'day']
    },
    "Saint George's Day": {
      date: '4/24',
      keywords: ['st[\\s\\.]', 'george'],
      regions: ['EN']
    },
    "May Day": {
      date: '5/1'
    },
    "Early May Bank Holiday" : {
      date: '5/(1,1)',
      keywords_y: ['may'],
      keywords: ['spring', 'early', 'may']
    },
    "Spring Bank Holiday": {
      date: '5/(1,-1)',
      keywords: ['bank', 'spring', 'late']
    },
    "Queen's Birthday": {
      date: '6/(6,2)',
      keywords: ['queen']
    },
   "Father's Day": {
      date: '6/(0,3)',
      keywords: ['dad', 'father']
    },
    "Battle of the Boyne": {
      date: '6/12',
      keywords: ['battle', 'boyne'],
      regions: ['NI']
    },
    "Summer Bank Holiday (Scotland)": {
      date: '8/(1,1)',
      keywords: ['summer', 'bank'],
      regions: ['SC']
    },
    "Summer Bank Holiday": {
      date: '8/(1,-1)',
      keywords: ['summer', 'bank'],
      keywords_n: ['scottish', 'scotland'],
      regions: ['EN', 'WL', 'NI']
    },
    "Halloween": {
      date: '10/31',
    },
    "Guy Fawks Day": {
      date: '10/5',
      keywords: ['guy', 'fawks', 'bonfire']
    },
    "Remembrance Day": {
      date: '1/(0,2)',
      keywords: ['poppy', 'remembrance']
    },
    "Saint Andrews Day": {
      date: '10/30',
      keywords: ['andrew', 'saint', 'st[\\s\\.]'],
      regions: ['SL']
    },
    "Christmas Day": {
      date: '12/25',
      keywords: ['christ', 'x-?mas'],
      keywords_n: ['eve']
    },
    "Boxing Day": {
      date: '12/26',
      keywords: ['box']
    }
  };

  if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) { module.exports = moment; }
}).call(this);

//! moment-holiday.js locale configuration
//! locale : United States
//! author : Kodie Grantham : https://github.com/kodie
const MOMENT = require('moment')

(function() {
  var moment = this.moment || MOMENT

  moment.holidays.united_states = {
    "New Year's Day": {
      date: '1/1',
      keywords_n: ['eve']
    },
    "Martin Luther King Jr. Day": {
      date: '1/(1,3)',
      keywords: ['mlk']
    },
    "Valentine's Day": {
      date: '2/14'
    },
    "Washington's Birthday": {
      date: '2/(1,3)',
      keywords: ['george', 'president', 'day']
    },
    "Saint Patrick's Day": {
      date: '3/17',
      keywords: ['st[\\s\\.]', 'paddy', 'patty']
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
    "Memorial Day": {
      date: '5/(1,-1)'
    },
    "Mother's Day": {
      date: '5/(0,2)',
      keywords: ['mom']
    },
    "Father's Day": {
      date: '6/(0,3)',
      keywords: ['dad']
    },
    "Independence Day": {
      date: '7/4',
      keywords: ['4th', 'fourth', 'july']
    },
    "Labor Day": {
      date: '9/(1,1)',
      keywords: ['labour']
    },
    "Columbus Day": {
      date: '10/(1,2)',
      keywords: ['christopher']
    },
    "Halloween": {
      date: '10/31'
    },
    "Veteran's Day": {
      date: '11/11',
      keywords: ['vet']
    },
    "Thanksgiving Day": {
      date: '11/(4,4)',
      keywords: ['thanks', 'turkey'],
      keywords_n: ['after']
    },
    "Day after Thanksgiving": {
      date: '11/(5,4)',
      keywords: ['thanks', 'turkey'],
      keywords_y: ['after']
    },
    "Christmas Eve": {
      date: '12/24',
      keywords: ['christ', 'x-?mas'],
      keywords_y: ['eve']
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

//! Set default locales
(function() {
  var moment = (typeof require !== 'undefined' && require !== null) && !require.amd ? require('moment') : this.moment;
  moment.modifyHolidays.add("United States");
}).call(this);