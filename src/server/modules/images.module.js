import assert from 'assert';
import { MongoClient } from 'mongodb';
import config from '../../config/config';

const { mLabUrl, mLabDBName } = config;

export const selectImagesByArticleID = (articleID) => new Promise((resolve, reject) => {
  MongoClient.connect(
    mLabUrl,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (connectError, client) => {
      if (connectError) {
        reject(connectError);
      }
      assert.strictEqual(connectError, null);

      const collection = client.db(mLabDBName).collection('images');

      collection.find({ articleID }).toArray()
        .then((results) => {
          // assert.notStrictEqual(results.length, 0);
          assert.strictEqual(typeof results, 'object');

          resolve(results);
        })
        .catch((error) => {
          reject(error);
        })
        .then(() => {
          client.close();
        });
    },
  );
});

export const insertImage = (payload) => new Promise((resolve, reject) => {
  MongoClient.connect(
    mLabUrl,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (connectError, client) => {
      if (connectError) {
        reject(connectError);
      }
      assert.strictEqual(connectError, null);

      const collection = client.db(mLabDBName).collection('images');

      collection.findOne({ path: payload.path })
        .then((result) => {
          assert.strictEqual(result, null);

          collection.insertOne({ ...payload })
            .then((insertResult) => resolve(insertResult))
            .catch((insertError) => reject(insertError));
        })
        .catch((error) => {
          reject(error);
        })
        .then(() => {
          client.close();
        });
    },
  );
});

export const deleteOneImageByImageIDAndName = (imageID, name) => new Promise((resolve, reject) => {
  MongoClient.connect(
    mLabUrl,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (connectError, client) => {
      if (connectError) {
        reject(connectError);
      }
      assert.strictEqual(connectError, null);

      const collection = client.db(mLabDBName).collection('images');

      collection.findOne({ imageID, name })
        .then((result) => {
          assert.notStrictEqual(result, null);

          collection.deleteOne({ imageID, name })
            .then((deleteResult) => resolve(deleteResult))
            .catch((deleteError) => reject(deleteError));
        })
        .catch((error) => {
          reject(error);
        })
        .then(() => {
          client.close();
        });
    },
  );
});

// article controller
export const deleteImagesByArticleID = (articleID) => new Promise((resolve, reject) => {
  MongoClient.connect(
    mLabUrl,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (connectError, client) => {
      if (connectError) {
        reject(connectError);
      }
      assert.strictEqual(connectError, null);

      const collection = client.db(mLabDBName).collection('images');

      collection.findOne({ articleID })
        .then((result) => {
          if (result === null) {
            resolve();
          } else {
            collection.deleteMany({ articleID })
              .then((deleteResult) => resolve(deleteResult))
              .catch((deleteError) => reject(deleteError));
          }
        })
        .catch((error) => {
          reject(error);
        })
        .then(() => {
          client.close();
        });
    },
  );
});
