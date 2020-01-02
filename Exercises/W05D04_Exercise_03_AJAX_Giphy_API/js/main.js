const giphyURL = 'http://api.giphy.com/v1/gifs/search?q=';
const apiKey = '&api_key=dc6zaTOxFJmzC';
let offsetCount = 0;

$('form').on('submit', function(e) {
  e.preventDefault();

  const input = $('#search-input').val();

  $.ajax({
    method: 'GET',
    url: `${giphyURL}${input}${apiKey}`,
    success: function(response) {
      console.log(response);
      $('#giphs').empty();

      let gifs = '';

      response.data.forEach((gif) => {
        gifs += `<img src="${gif.images.downsized.url}"></img>`
      })

      $('#giphs').append(gifs);
      $('button').attr('disabled', false);
    },
    error: function(response) {
      console.log(response);
    }
  })
});

$(window).scroll(function () {
  if ($(document).height() - $(this).height() == $(this).scrollTop()) {
    const input = $('#search-input').val();

    $.ajax({
      method: 'GET',
      url: `${giphyURL}${input}${apiKey}&offset=${offsetCount}`,
      success: function(response) {
        console.log(response);
  
        let gifs = '';
  
        response.data.forEach((gif) => {
          gifs += `<img src="${gif.images.downsized.url}"></img>`
        })
  
        $('#giphs').append(gifs);
        offsetCount += 25
      },
      error: function(response) {
        console.log(response);
      }
    })
  }
});
