export function SearchQuery(
  Person, 
  Group,
  Household
) {"ngInject";
  this.logicBlocks = [
    {display: "AND", name: "and", cat: "logic"},
    {display: "OR", name: "or", cat: "logic"}
  ];

  this.unaryLogicBlocks = [
    {display: ">", name: "gt", cat: "unaryLogic", type:["number"] },
    {display: ">=", name: "gte", cat: "unaryLogic",  type:["number"] },
    {display: "<", name: "lt", cat: "unaryLogic",  type:["number"] },
    {display: "<=",name: "lte", cat: "unaryLogic",  type:["number"] },
    /* {name: "inq", cat: "unaryLogic",  type:["array"] },
    {name: "nin", cat: "unaryLogic",  type:["array"] },*/
    {display: "NOT", name: "neq", cat: "unaryLogic",  type:["number", "string", "array"] },
    {display: "LIKE", name: "like", cat: "unaryLogic",  type:["string"] },
    {display: "NOT LIKE", name: "nlike", cat: "unaryLogic",  type:["string"] },
  ];

  this.queryBlocks = [
    {display: "Status", name: "status", cat: "query", type: "array"},
    {display: "Tags", name: "tags", cat: "query", type: "array"},
    {display: "First Name", name: "firstName", cat: "query", type: "string"},
    {display: "Middle Name", name: "middleName", cat: "query", type: "string"},
    {display: "Nick name", name: "nickName", cat: "query", type: "string"},
    {display: "Last Name", name: "lastName", cat: "query", type: "string"},
    {display: "Gender", name: "gender", cat: "query", type: "string"},

  ];
  
  this.externQueryBlocks = [
    {display: "Gruppe", searchField: "name", cat: "externQuery", type: "string", model: "Group", name: "groupIds"},
    {display: "Haushalt", searchField: "name", cat: "externQuery", type: "string", model: "Household", name: "householdIds"},
    {display: "Gruppe Tag", searchField: "tags", cat: "externQuery", type: "array", model: "Group", name: "groupIds"},
    {display: "Haushalt tag", searchField: "tags", cat: "externQuery", type: "array", model: "Group", name: "householdIds"},
  ];
  this.nameToModel = (modelName) => {
    switch(modelName) {
      case "Person":
        return Person;
      case "Group":
        return Group;
      case "Household":
        return Household;
      default:
        return null;
    }
  };
  
  this.searchQueryBlocks = (query) => {
    return _.concat(
      _.filter(this.queryBlocks, x => _.startsWith(_.lowerCase(x.display), _.lowerCase(query))),
      _.filter(this.externQueryBlocks, x => _.startsWith(_.lowerCase(x.display), _.lowerCase(query)))
    );
  };
      
      
  this.searchLogicBlocks = (query) => {
      return _.filter(this.logicBlocks, x => _.startsWith(_.lowerCase(x.display), _.lowerCase(query)));
  };
  
  this.searchUnaryLogicBlocks = (query, type) => {
    return _.filter(this.unaryLogicBlocks, x => _.startsWith(_.lowerCase(x.display), _.lowerCase(query)) && _.includes(x.type, type));
  };
  
  this.searchQuery = (block, query) => {
    let results = Person.searchValue({field: block.name, text: query}).$promise
      .then((ret) => _.map(ret.data, x => {return {display: x, name: x, cat: "value"};}));
    let add = [];
    if(block.type === "array") {
      add = [{display: "EMPTY", name: [], cat: "value"}];
    }
    results.then((d) => _.concat(d, add));
    return results;
  };
  
  this.searchExternQuery = (block, query) => {
    let mapData = (x) => {
      return {
        display: x, 
        name: x, 
        cat: "externValue", 
        model: block.model, 
        field: block.searchField,
        blockCat: block.cat
      };
    };
    let m = this.nameToModel(block.model);
    let results = m.searchValue({field: block.searchField, text: query}).$promise
      .then((ret) => _.map(ret.data, mapData));
    return results;
  };

     
      
  this.generateQuery = (model) => {
    let query = this.parseQueryBlock(model, {});
    return query;
  };
  
  this.createExternPromise = (chip) => {
    
    /* if we could make in tranformChip externValue chips we could use this
    if(chip.blockCat === "string") {
      query.where[chip.field] = {like: chip.name};
    } else {
      query.where[chip.field] = chip.name;
    }*/
    
    let query = {where: {}};
    query.where[chip.field] = chip.name;
    let m = this.nameToModel(chip.model);
    return m.find({filter: query}).$promise
      .then((data) => _.map(data, x => x.id));
  };
  
  this.parseQueryBlock = (model, query) => {
    let ret = _.cloneDeep(query);//our generated query. We need it to prevent self referencing loops in the logic part
    if(_.isEmpty(model)) return query;
    
    let first = _.head(model);
    model =  _.drop(model);
    
    //the first chip has to be a query or extern query chip
    //TODO: allow here just a value? I think not, we can use the general search feature for that
    if(first.cat !== "query" && first.cat !== "externQuery") {
      console.error("ist not of cat query or externQuery", first);
      return query;
    }
    //if there is nothing after, we are missing a value and so we cannot do anything
    if(_.isEmpty(model)) return query;
    
    let second = _.head(model);
    model =  _.drop(model);
    //now comes the scary part:
      
    if(second.cat === "unaryLogic" && !_.isEmpty(model)) {
      let value = _.head(model);
      model =  _.drop(model);
      if(value.cat !== "value" && value.cat !== "externValue") {
        console.error("ist not of cat value or extern value", value);
        return {};
      }
      if(first.cat === "query" && value.cat === "value") {
        ret[first.name] = {};
        ret[first.name][second.name] = value.name;
      } else if(first.cat === "externQuery" && value.cat === "externValue"){
        
        //we have to fetch data for externValue
        if(!value.promise) {//if it was a saved queryModel, then the promise was deleted and we have to create a new one
          value.promise = this.createExternPromise(value);
        }
        
        if(second.name === "neq") {
           ret[first.name] = {nin: value.promise};
        } else {
          //ignore others for now
          ret[first.name] = {inq: value.promise};
        }
      } else {
        console.error("after unary block not the right block", first, second, value);
        return {};
      }
      //just prepend the logic stuff
      
    } else {
      if(second.cat !== "value" && second.cat !== "externValue") {
        console.error("ist not of cat value or extern value", second);
        return {};
      }
      if(first.cat === "query") {
        ret[first.name] = second.name;
      } else if(first.cat === "externQuery" && second.cat === "externValue"){
        
        if(!second.promise) {//if it was a saved queryModel, then the promise was deleted and we have to create a new one
          second.promise = this.createExternPromise(second);
        }
        
        ret[first.name] = {inq: second.promise};
      } else {
        console.error("not the right blocks", first, second);
        return {};
      }
    }
    
    //nothing after it is good and we can return our genereated query
    if(_.isEmpty(model)) {
      return ret;
    } 
    //anything after a good query has to be logic combining it with a new query
    let logic = _.head(model);
    model =  _.drop(model);
    if(logic.cat !== "logic") {
      console.error("ist not of cat logic", logic);
      return ret;//just return the previous query without the currently
    }

    let after = this.parseQueryBlock(model, {});
    if(_.isEmpty(after)) {
      return ret;//the next block is not done yet, return the good query
    }
    //logic.name is AND or OR. Loopback needs the others in an array.
    query[logic.name] = [ret, after];
    return query;
    
  };
  this.clean = (queryModel) => {
    _.each(queryModel, (item) => {
      if(item.promise) {
        delete item.promise;
      }
    });
    return queryModel;
  };
  return {
    generateQuery: this.generateQuery,
    searchQueryBlocks: this.searchQueryBlocks,
    searchLogicBlocks: this.searchLogicBlocks,
    searchUnaryLogicBlocks: this.searchUnaryLogicBlocks,
    searchQuery: this.searchQuery,
    searchExternQuery: this.searchExternQuery,
    createExternPromise: this.createExternPromise,
    clean: this.clean
    
  };
}