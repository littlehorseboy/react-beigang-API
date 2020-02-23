import assert from 'assert';
import { MongoClient } from 'mongodb';
import config from '../../config/config';

const { mLabUrl, mLabDBName } = config;

export const selectArticles = () => new Promise((resolve, reject) => {
  MongoClient.connect(
    mLabUrl,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (connectError, client) => {
      if (connectError) {
        reject(connectError);
      }
      assert.strictEqual(connectError, null);

      const collection = client.db(mLabDBName).collection('articles');

      collection.find({}).toArray()
        .then((results) => {
          assert.notStrictEqual(results.length, 0);
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

export const selectArticleByArticleID = (articleID) => new Promise((resolve, reject) => {
  MongoClient.connect(
    mLabUrl,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (connectError, client) => {
      if (connectError) {
        reject(connectError);
      }
      assert.strictEqual(connectError, null);

      const collection = client.db(mLabDBName).collection('articles');

      collection.findOne({ articleID })
        .then((result) => {
          assert.notStrictEqual(result, null);
          assert.strictEqual(typeof result, 'object');

          resolve(result);
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

export const insertArticle = (payload) => new Promise((resolve, reject) => {
  MongoClient.connect(
    mLabUrl,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (connectError, client) => {
      if (connectError) {
        reject(connectError);
      }
      assert.strictEqual(connectError, null);

      const collection = client.db(mLabDBName).collection('articles');

      collection.findOne({ articleID: payload.articleID })
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

export const updateOneArticleByArticleID = (
  articleID, payload,
) => new Promise((resolve, reject) => {
  MongoClient.connect(
    mLabUrl,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (connectError, client) => {
      if (connectError) {
        reject(connectError);
      }
      assert.strictEqual(connectError, null);

      const collection = client.db(mLabDBName).collection('articles');

      collection.findOne({ articleID })
        .then((result) => {
          assert.notStrictEqual(result, null);

          collection.updateOne({ articleID }, { $set: { ...payload } })
            .then((updateResult) => resolve(updateResult))
            .catch((updateError) => reject(updateError));
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

export const deleteOneArticleByArticleID = (articleID) => new Promise((resolve, reject) => {
  MongoClient.connect(
    mLabUrl,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (connectError, client) => {
      if (connectError) {
        reject(connectError);
      }
      assert.strictEqual(connectError, null);

      const collection = client.db(mLabDBName).collection('articles');

      collection.findOne({ articleID })
        .then((result) => {
          assert.notStrictEqual(result, null);

          collection.deleteOne({ articleID })
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
