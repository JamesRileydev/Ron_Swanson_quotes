window.onload = function () {

  var xhrBtn = this.document.querySelector('#xhr');
  var fetchBtn = this.document.querySelector('#fetch');
  var jqueryBtn = this.document.querySelector('#jquery');
  var axiosBtn = document.querySelector('#axios');
  var display = this.document.querySelector('#quote');

  var url = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes';


  // XHR BUTTON

  xhrBtn.addEventListener("click", function () {
    // alert('XHR btn clicked');
    var XHR = new XMLHttpRequest();
    XHR.onreadystatechange = function () {
      if (XHR.readyState == 4 && XHR.status == 200) {
        var quote = JSON.parse(XHR.responseText)[0];
        display.innerText = quote;
      }
    }
    XHR.open("GET", url);
    XHR.send();
  });


  //FETCH BUTTON

  fetchBtn.addEventListener('click', function () {
    // alert('fetch btn clicked');
    fetch(url)
      .then(function (req) {
        req.json().then(function (data) {
          display.innerText = data[0];
        })
      })
      .catch(function () {
        alert("ERROR");
      })
  });


  //JQUERY BUTTON

  $('#jquery').click(function () {
    alert('jquery btn clicked');
    $.getJSON(url)
      .done(function (data) {
        $('#quote').text(data[0]);
      });
  });



  //AXIOS BUTTON

  axiosBtn.addEventListener('click', function () {
    // alert("Axios button clicked");
    axios.get(url)
      .then(function (res) {
        display.innerText = res.data[0];
      })
      .catch(handleErrors)
  })

  function handleErrors(err) {
    if (err.response) {
      console.log("Problems with Response ", err.response.status);
    } else if (err.request) {
      console.log("Error with Request!");
    } else {
      console.log("Error", err.message)
    }
  }

}