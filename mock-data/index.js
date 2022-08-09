import "isomorphic-fetch";
import { default as faker } from "@faker-js/faker";
import randomItem from "random-item";

const imageURL = ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`https://picsum.photos/id/${id}/200/300`);
      resolve(response.url);
    } catch (error) {
      reject(error);
    }
  });
};

const createRandomShopItems = async ({
  maxShopItemCount = 30,
  itemInfoList = [],
}) => {
  while (maxShopItemCount > 0) {
    const itemInfo = {
      name: faker.commerce.productName(),
      color: faker.commerce.color(),
      price: faker.commerce.price(),
      material: faker.commerce.productMaterial(),
      available: Math.round(Math.random() * 100),
      thumbnail: await imageURL({ id: maxShopItemCount }),
    };
    itemInfoList.push(itemInfo);
    maxShopItemCount = maxShopItemCount - 1;
  }
  return itemInfoList;
};

(async () => {
  const itemInfoList = await createRandomShopItems({ maxShopItemCount: 10 });
  console.log(itemInfoList);
  console.log(randomItem.multiple(itemInfoList, 3));
})();
