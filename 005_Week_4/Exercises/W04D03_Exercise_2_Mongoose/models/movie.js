//!                             ,,                                                  AW                                    ,,             ,,          
//!                           `7MM                                                 ,M'                                  `7MM           `7MM          
//!                             MM                                                 MV                                     MM             MM          
//!          ,pP"Ybd  ,p6"bo    MMpMMMb.   .gP"Ya  `7MMpMMMb.pMMMb.   ,6"Yb.      AW   `7MMpMMMb.pMMMb.   ,pW"Wq.    ,M""bMM   .gP"Ya    MM  ,pP"Ybd 
//!          8I   `" 6M'  OO    MM    MM  ,M'   Yb   MM    MM    MM  8)   MM     ,M'     MM    MM    MM  6W'   `Wb ,AP    MM  ,M'   Yb   MM  8I   `" 
//!          `YMMMa. 8M         MM    MM  8M""""""   MM    MM    MM   ,pm9MM     MV      MM    MM    MM  8M     M8 8MI    MM  8M""""""   MM  `YMMMa. 
//!          L.   I8 YM.    ,   MM    MM  YM.    ,   MM    MM    MM  8M   MM    AW       MM    MM    MM  YA.   ,A9 `Mb    MM  YM.    ,   MM  L.   I8 
//!          M9mmmP'  YMbmd'  .JMML  JMML. `Mbmmd' .JMML  JMML  JMML.`Moo9^Yo. ,M'     .JMML  JMML  JMML. `Ybmd9'   `Wbmd"MML. `Mbmmd' .JMML.M9mmmP' 
//!                                                                            MV                                                                    
//!                                                                           AW                                                                    

//+ We will always have a single file per Mongoose Model where:
   //- We define the schema,
   //- Compile the schema into a model, and
   //- Export that model.

//+ In the schema/model module, we will always do this:
   let mongoose = require("mongoose");
   let Schema = mongoose.Schema;

//+ Create the basic Movie Schema
   let movieSchema = new Schema (
      {
         title: String,
         releaseYear: {
            type: Number,
            default: function() {
               return new Date().getFullYear();
            }
         },
         mpaaaRating: String,
         cast: [String],
         nowShowing: {
            type: Boolean,
            default: true
         }
      },
      {
         timestamps: true
      }
   );

//+ Compile the schema into a model and export it
   module.exports = mongoose.model("Movie", movieSchema);