//! moment-holiday locale configuration
//! locale : Portugal
//! author : Pedro Martins : https://github.com/xmaarf
//! national holidays only

(function() {
  var moment = (typeof require !== 'undefined' && require !== null) && !require.amd ? require('moment') : this.moment;

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
