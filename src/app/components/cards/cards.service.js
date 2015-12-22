(function(){

	angular.module('memoryGame')
	.factory('cardsGenerator', cardsGenerator);

	/*  Cards Generator class */
	function cardsGenerator(){
		var cards = [];
		function create(rows){
			cards = []
			cards.length = rows * rows;
			var color = '';

			for (var i = cards.length - 1; i >= 0; i--) {
				if(i % 2 == 1)
					color = getRamdonColor();
				cards[getCardPosition(cards)] =  {color: color, active : 0 }
			}
			return cards;
		}

		function getCardPosition(cards){
			var freePositions = []
			for (var i = cards.length - 1; i >= 0; i--) {
				if(cards[i] == undefined)
					freePositions.push(i);
			}
			var cardPosition = Math.floor(Math.random() * freePositions.length)
			return freePositions[cardPosition];
		}
		function getRamdonColor(){
			var letters = 'ABCDEF'.split('');
				var color = '#';
				for (var i=0; i<3; i++ ) {
					color +=  parseInt(Math.random() * 10) + letters[Math.floor(Math.random() * letters.length)];
				}
				return color;
		}

		return {
			create : create
		}
	}

})()