var axios = require('axios');
const clientId = 'pCNN85KHlpoe5K6ZlysWZBEgLJRcftOd'

var searchTracks = function(filters) {
  return axios({
    method: 'get',
    url: '/tracks',
    baseURL:'http://api.soundcloud.com/',
    params: filters
  })
};

var compareLikes = function(a,b){
  return b.likes_count - a.likes_count;
};

var extractLikesExtremum = function(collection){
  // sort descending
  collection.sort( compareLikes );
  return [
    collection[0],collection[1],collection[2],
    collection[collection.length-3],collection[collection.length-2],collection[collection.length-1]
  ]
};

exports.getLikesExtremum = function(bandName){
  return searchTracks({
    q : bandName,
    limit : 50,
    client_id : clientId
  }).then(function(response){
    var extremums = extractLikesExtremum(response.data);
    return extremums.map(function(track){
      return {
        title : track.title,
        description : track.description,
        likes_count : track.likes_count,
        tag_list : track.tag_list
      };
    })
  });
};

exports.bandsComparison = function(bands){

  var requests = bands.map( band_name => this.getLikesExtremum(band_name));
  
  return axios.all(requests)
    .then(axios.spread(function () {
      const respones = arguments;
      return bands.map( (band_name,i) => {
        return {
          band_name,
          likes_count: respones[i].reduce( (acc, obj) => {
            return acc + obj.likes_count
          },0 )
        };
      }).sort( compareLikes );
    }));
};