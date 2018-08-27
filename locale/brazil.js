//! moment-holiday.js locale configuration
//! locale : Brazil
//! author : Fernando Fabricio dos Santos : https://github.com/ferfabricio

(function() {
  var moment = (typeof require !== 'undefined' && require !== null) && !require.amd ? require('moment') : this.moment;

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
