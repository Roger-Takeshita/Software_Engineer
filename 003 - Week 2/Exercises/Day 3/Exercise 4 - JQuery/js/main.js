$(function() {
   $("#addHome")
   .removeClass("btn-danger")
   .addClass("btn-success");

   $("h1").addClass("text-center");
   var $newLink = $( '<br><br><a id="zillowLink" href="http://www.zillow.com">Visit Zillow.com</a>' );

   $newLink.eq(2).attr("target", "blank");
   $("body").append($newLink);
   $("#zillowLink").attr("target","blank");
   console.log($("#zillowLink").attr("href"));
   console.log($newLink.eq(2).attr("href"));

   $('#addHome').on('click', function(evt) {
      console.log(evt, this);
   });
})