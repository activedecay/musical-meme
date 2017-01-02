/* eslint-disable */
import mongo from 'mongodb';
const dbuser = process.env.DBUSER;
const dbpw = process.env.DBPW;
const url = `mongodb://${dbuser}:${dbpw}@ds151208.mlab.com:51208/effective-spoon`;

export default function () {
  return new Promise((resolve, reject) => {
    mongo.MongoClient.connect(url,
      (err, db) => {
        err ? reject(err) :
          db.collection('spoons')
            .insertOne({ tits: 'ass' }, (e, result) => {
              db.close();
              e ? reject(e) : resolve(result)
            });
      });
  });
}

// Example of a simple url connection string for a single server connection
// MongoClient.connect(url,
//   { native_parser: true },
//   (err, db) => {
//     db.collection('mongoclient_test')
//       .updateOne({ a: 1 }, { b: 1 }, { upsert: true }, (e, result) => {
//         db.close();
//       });
//   });

// // Example of a simple url connection string to a replicaset, with acknowledgement of writes.
// MongoClient.connect("mongodb://localhost:30000,localhost:30001,localhost:30002/integration_test_?w=1", (err, db) => {
//   db.collection("replicaset_mongo_client_collection").update({a:1}, {b:1}, {upsert:true}, (err, result) => {
//     db.close();
//   });
// });
//
// // Example of a simple url connection string to a shard, with acknowledgement of writes.
// MongoClient.connect('mongodb://localhost:50000,localhost:50001/sharded_test_db?w=1', (err, db) => {
//   db.collection('replicaset_mongo_client_collection')
//     .updateOne({ a: 1 }, { b: 1 }, { upsert: true }, (e, result) => {
//       db.close();
//     });
// });

// // Set up the connection to the local db
// const mongoclient = new MongoClient(new Server("localhost", 27017), {native_parser: true});
//
// // Open the connection to the server
// mongoclient.open(function(err, mongoclient) {
//
//   // Get the first db and do an update document on it
//   const db = mongoclient.db("integration_tests");
//   db.collection('mongoclient_test').update({a:1}, {b:1}, {upsert:true}, function(err, result) {
//     // Get another db and do an update document on it
//     const db2 = mongoclient.db("integration_tests2");
//     db2.collection('mongoclient_test').update({a:1}, {b:1}, {upsert:true}, function(err, result) {
//       // Close the connection
//       mongoclient.close();
//     });
//   });
// });