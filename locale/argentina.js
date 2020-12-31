//! moment-holiday.js locale configuration
//! locale : Argentina
//! author : NahuelOvejero : https://github.com/NahuelOvejero

(function() {
  var moment = require("moment");

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
