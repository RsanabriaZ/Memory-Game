(function() {
  'use strict';

  angular
    .module('memoryGame')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
