const person = {
   firstName: 'Katie',
   intro: function() {
      console.log(`Hello, I'm ${this.firstName}!`);
   }
};

person.intro();

class Sprite {
   constructor(color, pos) {
     this.color = color;
     this.pos = pos;
   }
    
   move(direction) {
     switch (direction.toUpperCase()) {
       case 'R':
         this.pos.x < 999 ? this.pos.x++ : this.pos.x = 0;
         break;
       case 'D':
         return;
      }
   }
}