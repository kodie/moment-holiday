//! moment-holiday.js locale configuration
//! locale : Poland
//! author : Kacper Słotwiński : https://github.com/carbon-wpa
//! regions : whole country


(function () {
    var moment = (typeof require !== 'undefined' && require !== null) && !require.amd ? require('moment') : this.moment;

    moment.holidays.poland = {
        "Nowy Rok": {
            date: '1/1',
            keywords: ['new', 'year']
        },
        "Święto Trzech Króli": {
            date: '1/6',
            keywords: ['epiphany']
        },
        "Wielkanoc": {
            date: 'easter',
            keywords: ['easter'],
        },
        "Poniedziałek Wielkanocny": {
            date: 'easter+1',
            keywords: ['easter', 'monday']
        },
        "Święto Pracy": {
            date: '5/1',
            keywords: ['labour', 'day']
        },
        "Święto Konstytucji 3 Maja": {
            date: '5/3',
            keywords: ['constitution', 'day']
        },
        "Zielone Świątki": {
            date: 'easter+49',
            keywords: ['pentecost']
        },
        "Boże Ciało": {
            date: 'easter+60',
            keywords: ['corpus', 'christi']
        },
        "Wniebowzięcie Najświętszej Maryi Panny": {
            date: '8/15',
            keywords: ['assumption', 'mary']
        },
        "Wszystkich Świętych": {
            date: '11/1',
            keywords: ['all', 'saints', 'hallows', 'day']
        },
        "Narodowe Święto Niepodległości": {
            date: '11/11',
            keywords: ['independence', 'day'],
        },
        "pierwszy dzień Bożego Narodzenia": {
            date: '12/25',
            keywords: ['christmas']
        },
        "Zdrugi dzień Bożego Narodzenia": {
            date: '12/26',
            keywords: ['boxing', 'day']
        }
    };

    if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) {
        module.exports = moment;
    }
}).call(this);
