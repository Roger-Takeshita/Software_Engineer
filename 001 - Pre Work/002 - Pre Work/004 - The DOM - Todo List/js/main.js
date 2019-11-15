//! The DOM - Todo List

function addItem() {
   const input = document.getElementsByTagName('input')[0];    //! 1) get the object from the first input box
   const newItemText = input.value;                            //! 2) get the value of this object.valeu
   const newItem = document.createElement('li');               //! 3) create a new element "<li></li>"
   newItem.innerHTML = newItemText;                            //! 4) add a new text between this new element that we've created
   document.getElementById('todo-list').appendChild(newItem);  //! 5) get the elemente by id ( 'todo-list' ) 
                                                                  //! then append a new text between the the element that we got ( <li>newText</li> ).
};
document.getElementsByTagName('button')[0].addEventListener('click', addItem);   //? get the element from the DOM (document.getElementsByTagName(''))
                                                                                    //? [0] <- Frist element
                                                                                    //? .addEeventListener ('Type', 'function without ()')
