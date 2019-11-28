$(function() {
   let $li = $("li")

   console.log($li.length)

   console.log($li[0]);

   $li.fadeOut(5000);
   $li.fadeIn(5000);
   // $li.show();
   // $li.hide();
   // $li.toggle();
   $('li').each(function(idx) {
      console.log( idx + ': ' + this.innerHTML );
   });
   
   $li.eq(1).fadeOut(5000);
   $("#inner").html("jQuery Rocks!");

   $('li').html('Hello SEI');

   $('li').css( { color: 'green', 'font-weight': 'bold' } );
  
   $('p').css('font-size', '30px');

   $('p')
      .html('Awesome things jQuery can do:')
      .css('background-color', 'peachpuff');   
})