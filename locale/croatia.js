//! moment-holiday.js locale configuration
//! locale : Croatia / Hrvatska
//! author : diomed :: https://github.com/diomed

(function() {
		var moment = (typeof require !== 'undefined' && require !== null) && !require.amd ? require('moment') : this.moment;

		moment.holidays.croatia = {
			"Nova Godina": {
				date: '1/1',
				keywords: ['nova', 'godina']
			},
			"Bogojavljenje": {
				date: '1/6',
				keywords: ['bogojavljenje', 'sveta tri kralja ', 'tri kralja ']
			},
			"Uskrs": {
				date: 'easter',
				keywords: ['uskrs'],
			},
			"Uskrsni ponedjeljak": {
				date: 'eastermonday',
				keywords: ['uskrsni', 'uskršnji', 'ponedjeljak']
			},
			"Praznik rada": {
				date: '5/1',
				keywords: ['praznik', 'rada']
			},
			"Tijelovo": {
				date: 'corpuschristi',
				keywords: ['tijelovo']
			},
			"Dan antifašističke borbe": {
				date: '6/22',
				keywords: ['antifašističke', 'borbe']
			},
			"Dan državnosti": {
				date: '6/25',
				keywords: ['državnost', 'domovinske', 'domovinska']
			},
			"Dan zahvalnosti": {
				date: '8/5',
				keywords: ['domovinske', 'zahvalnosti', 'thanksgiving']
			},
			"Velika Gospa": {
				date: '8/15',
				keywords: ['velika', 'gospa']
			},
			"Dan neovisnosti": {
				date: '10/8',
				keywords: ['neovisnosti', 'nezavisnosti', 'independence']
			},
			"Dan svih svetih": {
				date: '11/1',
				keywords: ['svi sveti', 'sesvete', 'sisvete']
			},
			"Božić": {
				date: '12/25',
				keywords: ['božić', 'christmas']
			},
			"Sv. Stjepan": {
				date: '12/26',
				keywords: ['sveti', 'stjepan']
			}
 };

  if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) { module.exports = moment; }
}).call(this);
