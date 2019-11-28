$(".btn-submit").on("click", submit);

$("body").on("keypress", function(key) {
   if (key.keyCode === 13) {
      submit();
   }
});

$(".skills").on("click", ".btn-delete", function() {
   $(this).closest("div").remove()
});

function submit () {
   let $string = $("input").val();
   if ($string !== "") {
      let $newSkill = $(`<div id="new-skill"><button class="btn-delete">x</button><p id="skill">${$("input").val()}</p></div>`);
      $(".skills").append($newSkill);
   }
   $("input").val("").focus();
}

