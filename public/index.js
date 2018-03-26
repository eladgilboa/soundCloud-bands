function onSearchButtonClicked(){
  bandName = document.getElementById('bandName').value;

  axios({
    method: 'post',
    url: '/soundCloud/likesExtremum',
    data: {
      "band_name": bandName,
      "secret_key": 'secretKey'
    }
  })
    .then(function (response) {
      renderResults(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function onCompareBandsClicked(){
  var bands = ['scorpions','led zeppelin','the doors','the beatles','nirvana'];

  axios({
    method: 'post',
    url: '/soundCloud/bandsComparison',
    data: {
      "bands": bands,
      "secret_key": 'secretKey'
    }
  })
    .then(function (response) {
      renderCompareBands(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function renderCompareBands(collection){
  var resultsElement = document.getElementById('compareBandsTable');
  var i = 0, length = collection.length;
  var tbody = resultsElement.getElementsByTagName('tbody')[0];
  tbody.innerHTML = '';
  for(;i < length; i++){
    tbody.innerHTML += '<tr><td>'+ collection[i].band_name +'</td><td>'+ collection[i].likes_count +'</td></tr>'
  }
}

function renderResults(collection){
  var resultsElement = document.getElementById('results');
  var i = 0, length = collection.length;
  var tbody = document.getElementsByTagName('tbody')[0];
  tbody.innerHTML = '';
  for(;i < length; i++){
    tbody.innerHTML += '<tr><td>'+ collection[i].title +'</td><td>'+ collection[i].description +'</td><td>'+ collection[i].likes_count +'</td><td>'+ collection[i].tag_list  +'</td></tr>'
  }
}


var searchButton = document.getElementById('searchButton');
searchButton.onclick = onSearchButtonClicked;

var compareBandsButton = document.getElementById('compareBands');
compareBandsButton.onclick = onCompareBandsClicked;