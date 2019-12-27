//!=============================== Example 1
   console.log("code before the asynchronous function call");

   setTimeout(() => {
      console.log("setTimeout code")
   }, 3000);

   console.log("Code after the asynchronous function call");

//!=============================== Example 2
   let step1 = (cb) => {
      setTimeout( () => {
         console.log('STEP 1 COMPLETE'); 
         cb()
      }, 750);}
   
   let step2 = (cb) => {
      setTimeout( () => {console.log('STEP 2 COMPLETE'); cb()}, 500);
   }
   
   let step3 = (cb) => {
      setTimeout( () => {console.log('STEP 3 COMPLETE'); cb()}, 250);
   }

   // step1(
   //    () => {
   //       step2(
   //          () => {
   //             step3(
   //                () => {
   //                   console.log("Finished!");
   //                }
   //             )
   //          }
   //       )
   //    }
   // )
   
   step1(()=> step2(() => step3(() => console.log("Finished"))))