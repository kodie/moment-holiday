(function() {
  var moment = (typeof require !== 'undefined' && require !== null) && !require.amd ? require('moment') : this.moment;

  moment.holidays.argentina = {
    "Año Nuevo": {
      date: '1/1',
      keywords: ['Año', 'Nuevo', 'new', 'year']
    },
    "Carnaval": {
      date: '27/2',
      keywords: ['Carnaval', 'Festival']
    },
    "Carnaval": {
      date: '28/2',
      keywords: ['Carnaval', 'Festival'],
    },
    "Día Nacional de la Verdad y la Justicia": {
      date: '24/3',
      keywords: ['verdad', 'justicia', 'nacional', 'dia']
    },
    "Día del Veterano y de los Caídos en la Guerra de Malvinas": {
      date: '2/4',
      keywords: ['malvinas', 'veterano','guerra','caidos']
    },
    "Pascuas Judias": {
      date: '11/4',
      keywords: ['pascuas', 'judias', '']
    },
    "Jueves Santo - Festividad cristiana" : {
      date: '13/4',
      keywords: ['jueves', 'santo', 'cristiana']
    },
    "Viernes Santo - Festividad cristiana": {
      date: '14/4',
     keywords: ['viernes', 'santo', 'cristiana']
    },
    "Día de Acción por la tolerancia y el respeto entre los pueblos": {
      date: '24/4',
      keywords: ['accion', 'tolerancia', 'respeto','pueblo']
    },
    "Día del Trabajador": {
      date: '1/5',
      keywords: ['trabajador', 'dia']
    },
    "Día de la Revolución de Mayo": {
      date: '25/5',
      keywords: ['revolucion', 'mayo', 'dia']
    },
    "Día Paso a la Inmortalidad del Gral. Manual  Belgrano": {
      date: '20/6',
      keywords: ['manuel', 'belgrano', 'inmortalidad', 'bandera']
    },
    "Día de la Independencia": {
      date: '9/7',
      keywords: ['independencia']
    },
    "Paso a la Inmortalidad del Gral. José de San Martín": {
      date: '21/8',
      keywords: ['martin', 'san', 'jose','inmortalidad']
    },
    "Día del Respeto a la Diversidad Cultural": {
      date: '16/10',
      keywords: ['diversidad', 'cultural','respeto']
    },
    "Día de la Soberanía Nacional": {
      date: '20/11',
      keywords: ['soberania', 'nacional']
    },    
    "Navidad": {
      date: '25/12',
      keywords: ['navidad', 'christmas']
    }    
  };

  if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) { module.exports = moment; }
}).call(this);
