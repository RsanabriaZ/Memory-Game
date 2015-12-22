(function() {
  'use strict';

  angular
    .module('memoryGame')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr, cardsGenerator, $log,  $interval) {
    var vm = this;

    vm.rows = 6;
    vm.messageNotMatched = 'Did Not Match';
    vm.messageMatched  = "Matched";
    vm.timeToHideCards = 500;
    vm.creationDate = 1450712500361;
    
    function initialize(){
        vm.moves = 0;   
        vm.cardsMatched = 0;
        vm.time = 0;
        vm.gameStarted = true;
        vm.cardTemp = null;
        vm.cardOne = null
        vm.timer = null;
    }

    vm.show = show
    vm.startGame = startGame

    function stopTimer(){
      if (angular.isDefined(vm.timer)) {
          $interval.cancel(vm.timer)
            vm.timer = undefined
      }
    }

    function startTimer(){
      vm.timer = $interval(function() {
                  vm.time++
                }, 1000);
    }

    function startGame(){
        initialize()
        getCards();
        startTimer();
    }

    function getCards(){
        vm.cards = []
        vm.cards = cardsGenerator.create(vm.rows)
    }

    function show(index){
        if((vm.cardOne == null || index != vm.cardOne.index) && !vm.cards[index].active && vm.gameStarted){
          vm.cards[index].active = 1;
          if(vm.cardOne == null)
            vm.cardOne = {card : angular.copy(vm.cards[index]),index : index}
          else
            matchedCards(vm.cardOne, vm.cards[index])

        }
      
    }

    function matchedCards(cardOne, cardTwo){
        vm.moves++;        
        vm.cardTemp = angular.copy(cardOne);
        vm.cardOne = null
        matches(vm.cardTemp, cardTwo);
    }

    function notMatchedMessage(cardOne, cardTwo){
        toastr.error(vm.messageNotMatched)
        $timeout(function() {
            vm.cards[cardOne.index].active = 0;
            cardTwo.active = 0;
            vm.cardTemp = null;  
        }, vm.timeToHideCards);
    }

    function addMatched(){
        toastr.info(vm.messageMatched);
        vm.cardsMatched++;
        if(isTheEnd()){
            toastr.success('You Win in ' + vm.time + ' segs')
            vm.gameStarted = false;
            stopTimer();
        }
    }

    /* To know if is the end of the game */
    function isTheEnd(){
      return (vm.cards.length / 2)  == vm.cardsMatched
    }

    function matches(cardOne, cardTwo){
      if(cardOne.card.color == cardTwo.color)
        return addMatched();

        return notMatchedMessage(cardOne, cardTwo);
    }


    getCards();
  }
})();
