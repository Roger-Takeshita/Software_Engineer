$(".btn-submit").on("click", submit);

$("body").on("keypress", function(key) {
   let $input = $("input")
   if (!$input.is(":focus")) {
      // console.log("input is not focused")
      $input.focus();
   } else {
      if (key.keyCode === 13) {
         submit();
      }
   }
});

$(".skills").on("click", ".btn-delete", function() {
   localStorage.removeItem($(this).next("p").html());
   $(this).closest("div").fadeOut(500, ()=> $(this).remove());
   console.log(localStorage);
});

$("footer").on("click", ()=> {
   localStorage.clear();
   rebuildList();
   location.reload();
});

function submit () {
   let $string = $("input");
   let $skills = $(".skills");
   if ($string.val() !== "") {
      let $newSkill = $(`<div id="new-skill"><button class="btn-delete">x</button><p id="skill">${$string.val()}</p></div>`);
      $skills.append($newSkill);
      localStorage.setItem($string.val(), $string.val());
   }
   $string.val("").focus();
   console.log(localStorage);
}

function rebuildList () {
   let $string = $("input");
   let $skills = $(".skills");
   for(let i = 0 ; i < localStorage.length ; i++) {
      if (localStorage.key(i) !== "randid") {
         let $oldSkill = $(`<div id="new-skill"><button class="btn-delete">x</button><p id="skill">${localStorage.getItem(localStorage.key(i))}</p></div>`);
         $skills.append($oldSkill);
      } else {
         localStorage.removeItem("randid");
         i--;
      }
   }
   console.log(localStorage);
}

rebuildList();
// localStorage.clear();
// console.log(localStorage);
// localStorage.setItem("roger", "takeshita");
// console.log(localStorage.key(0));
// console.log(JSON.parse(localStorage));