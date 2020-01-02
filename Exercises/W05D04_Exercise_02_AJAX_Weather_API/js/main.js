const weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';

const key = '02e84210a52ed716535f02989864d080';

$("form").on("submit", (e) => {
   e.preventDefault();

   const city = $("#city").val();

   $("button").attr("disabled", true);
   $(".temp").html("<if class='fa fa-spinner fa-spin'></i>")
   $.ajax({
      method: "GET",
      url: `${weatherUrl}${city}&appid=${key}&units=metric`,
      success: function(response) {
         console.log(response);
         const temp = response.main.temp;
         let listItemHTML = ` <h2>City: ${response.name}</h2>
                              <h2>Temp: ${temp}</h2>`;
         $('.temp').append(listItemHTML);
      },
      error: function(response) {
         console.log(response);
      },
      complete: function() {
         $('button').attr('disabled', false);
      }
   });
});