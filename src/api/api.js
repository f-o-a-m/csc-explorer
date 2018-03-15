addPOI(position, name){
  var immediatelyAvailableReference = base.push('data', {
    data: {
      name: 'George',
      type: 'Grizzly',
      position: [],
      elevation: 0
    }
  }).then(newLocation => {
    var generatedKey = newLocation.key;
  }).catch(err => {
    console.error(err)
  });
  //available immediately, you don't have to wait for the Promise to resolve
  var generatedKey = immediatelyAvailableReference.key;
}
