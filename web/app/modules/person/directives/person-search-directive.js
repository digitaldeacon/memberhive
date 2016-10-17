export function mhPersonSearch() {
  return {
    templateUrl: 'app/modules/person/templates/person-search.html',
    restrict: 'E',
    scope: {
      ngModel: '=',
      queryModel: '='
    },
    controller: function($scope, SearchQuery) {"ngInject";
      if(!angular.isArray($scope.queryModel)) {
        $scope.queryModel = [];
      }
      $scope.selectedItem = null;
      $scope.searchText = "";

      this.currentBlockCat = () => {
        if($scope.queryModel.length === 0) return "empty";
        return _.last($scope.queryModel).cat;
      };

      this.currentBlock = () => {
        if($scope.queryModel.length === 0) return {};
        return _.last($scope.queryModel);
      };

      $scope.querySearch = (query) => {
        let currentBlockCat = this.currentBlockCat();
        switch(currentBlockCat) {
          case "empty":
          case "logic":
            return SearchQuery.searchQueryBlocks(query);
          case "query":
             return SearchQuery.searchQuery(this.currentBlock(), query)
            .then((d) => _.concat(d, SearchQuery.searchUnaryLogicBlocks(query, this.currentBlock().type)));
          case "externQuery":
             return SearchQuery.searchExternQuery(this.currentBlock(), query)
              .then((d) => _.concat(d, SearchQuery.searchUnaryLogicBlocks(query, this.currentBlock().type)));
          case "unaryLogic":
            let block = _.takeRight($scope.queryModel, 2)[0];
            if(block.cat === "query") {
              return SearchQuery.searchQuery(block, query);
            } else if(block.cat === "externQuery") {
              return SearchQuery.searchExternQuery(block, query);
            } 
            return [];
          case "value":
          case "externValue":
            return SearchQuery.searchLogicBlocks(query);
          default:
            return [];
        }
      };

      this.order = 0;
      $scope.transformChip = (chip) => {
        let newChip = {};
        
        if(!_.isObject(chip)) {
          newChip =  {display: chip, name: chip, cat: "value"};
        } else {
           angular.copy(chip, newChip);
        }
        
        if(newChip.cat === "externValue") {
          newChip.promise = SearchQuery.createExternPromise(newChip);
        }
        
        newChip.order = this.order;
        this.order++;
        return newChip;
      };

    
      $scope.ngModel = SearchQuery.generateQuery($scope.queryModel);
      
      $scope.$watchCollection(
        "queryModel",
        (newValue) => {
          $scope.ngModel = SearchQuery.generateQuery(newValue);
        }
      );


    }

  };
}
