//! Start mongoDB

   brew services start mongodb-community
      //> Service `mongodb-community` already started, use `brew services restart mongodb-community` to restart.
      //>    W04D03_Exercise_1_MongoDB   master  mongo
      //> MongoDB shell version v4.2.1
      //> connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
      //> Implicit session: session { "id" : UUID("e64559d2-9f25-4e1d-9788-5ec44bb748df") }
      //> MongoDB server version: 4.2.1
      //> Server has startup warnings:
      //> 2019-11-18T14:32:21.439-0500 I  CONTROL  [initandlisten]
      //> 2019-11-18T14:32:21.440-0500 I  CONTROL  [initandlisten] ** WARNING: Access control is not enabled for the database.
      //> 2019-11-18T14:32:21.440-0500 I  CONTROL  [initandlisten] **          Read and write access to data and configuration is unrestricted.
      //> 2019-11-18T14:32:21.440-0500 I  CONTROL  [initandlisten]
      //> 2019-11-18T14:32:21.440-0500 I  CONTROL  [initandlisten]
      //> 2019-11-18T14:32:21.440-0500 I  CONTROL  [initandlisten] ** WARNING: soft rlimits too low. Number of files is 256, should be at least 1000
      //> ---
      //> Enable MongoDB's free cloud-based monitoring service, which will then receive and display
      //> metrics about your deployment (disk utilization, CPU, operation statistics, etc).

      //> The monitoring data will be available on a MongoDB website with a unique URL accessible to you
      //> and anyone you share the URL with. MongoDB may use this information to make product
      //> improvements and to suggest MongoDB products and deployment options to you.

      //> To enable free monitoring, run the following command: db.enableFreeMonitoring()
      //> To permanently disable this reminder, run the following command: db.disableFreeMonitoring()
      //> ---

//! Show Databases

   show dbs
      //> admin   0.000GB
      //> config  0.000GB
      //> local   0.000GB

//! Swtich to different DB
   
   use admin
      //> switched to db admin

//! Create and switch to a different DB

   use inClassDB
      //> switched to db inClassDB

//! Where am i?

   db
      //> inClassDB

//! Create a named people and insert data

   db.people.insert({
   ... name: "Roger",
   ... age: 32
   ... })
      //> WriteResult({ "nInserted" : 1 })

   db.people.insert({ name: "Thaisa", age: 31 })
      //> WriteResult({ "nInserted" : 1 })

   db.people.insert({ name: "Yumi", age: 2, email: "yumi@gmail.com" })
      //> WriteResult({ "nInserted" : 1 })

   db.people.insert({ name: "Priscila", birthDate: new Date()})
      //> WriteResult({ "nInserted" : 1 })

//! Find all IDs from table/collection people
   db.people.find({})
      //> { "_id" : ObjectId("5df10fe6030e2aa77231ad96"), "name" : "Roger", "age" : 32 }
      //> { "_id" : ObjectId("5df11011030e2aa77231ad97"), "name" : "Thaisa", "age" : 31 }
      //> { "_id" : ObjectId("5df11051030e2aa77231ad98"), "name" : "Yumi", "age" : 2, "email" : "yumi@gmail.com" }
      //> { "_id" : ObjectId("5df11098030e2aa77231ad99"), "name" : "Priscila", "birthDate" : ISODate("2019-12-11T15:51:52.137Z") }

//! Find an especific ID

   db.people.find({ name: "Yumi"})
      //> { "_id" : ObjectId("5df11051030e2aa77231ad98"), "name" : "Yumi", "age" : 2, "email" : "yumi@gmail.com" }

//! Create a table/collection named products and insert data as an array

   db.products.insert({
   ... name: "ball",
   ... reviews: [{
   ... stars: 4,
   ... comment: "awesome ball"
   ... }]
   ... })
      //> WriteResult({ "nInserted" : 1 })

//! Find all IDs from table/collection products

   db.products.find({})
      //> { "_id" : ObjectId("5df11284030e2aa77231ad9a"), "name" : "ball", "reviews" : [ { "stars" : 4, "comment" : "awesome ball" } ] }

//! Remove (drop) the table/collection
   
   db.burger.drop()
      //> { "ok" : 1 }
   ​
//! Remove (drop) the current database

   db.dropDatabase()
      //> { "dropped" : "inClassDB", "ok" : 1 }

//! Shutdown Server

   pkill mongod

   or

   use admin
   db.shutdownServer()

//! Start
   
   brew services start mongodb-community

//! Docs
   https://docs.mongodb.com/manual/tutorial/manage-mongodb-processes/#start-mongod-processes