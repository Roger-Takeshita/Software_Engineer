
const googleBooksUrl = "https://www.googleapis.com/books/v1/volumes?q=isbn:";

$('form').on('submit', function(e) {
   e.preventDefault();

   const isbn = $('#isbn').val();

   $.ajax({
      method: 'GET',
      url: googleBooksUrl + isbn,
      success: function( response ) {
         console.log(response);
         const bookInfo = response.items[0].volumeInfo;

         const listItemHTML = `<li>
            <h2>${bookInfo.title}</h2>
            <p>${bookInfo.description}</p>
            <img src= ${bookInfo.imageLinks.thumbnail}>
            <a href= ${bookInfo.previewLink }>Preview Book</a>
            </li>`

         $('.books').append(listItemHTML);
      }
   });
});