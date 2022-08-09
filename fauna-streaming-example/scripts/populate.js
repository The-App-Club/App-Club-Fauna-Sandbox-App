import faker from 'faker';
import dotenv from 'dotenv';
import { client, q } from './config';

dotenv.config();

const { Collection, Create, Do } = q;

const createRandomShopItems = ({ maxItemsCount = 10 }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const queries = [];
      while (maxItemsCount > 0) {
        const productData = {
          name: faker.commerce.productName(),
          color: faker.commerce.color(),
          price: faker.commerce.price(),
          material: faker.commerce.productMaterial(),
          available: Math.round(Math.random() * 100),
        };
        queries.push(
          Create(Collection('store'), {
            data: productData,
          })
        );
        maxItemsCount--;
      }
      await client.query(Do(...queries));
      resolve('done');
    } catch (error) {
      reject(error);
    }
  });
};

const nicePopulate = ({ maxItemsCount }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await createRandomShopItems({ maxItemsCount });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

(async () => {
  try {
    const response = await nicePopulate({ maxItemsCount: 30 });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
