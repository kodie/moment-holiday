(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('moment')) :
  typeof define === 'function' && define.amd ? define(['moment'], factory) :
  (global = global || self, factory(global.moment)); // jshint ignore:line
}(this, (function (moment) {

  moment = moment && moment.hasOwnProperty('default') ? moment['default'] : moment;

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

  return moment;

})));
