import { client, q } from './config';
import { default as chance } from 'chance';
import dotenv from 'dotenv';

dotenv.config();

const { Collection, Paginate, Documents, Lambda, Get, Var, Update, Do } = q;

const NUMBEROFPRODUCTS = 100000;

const niceChance = (itemInfoList, max = 10) => {
  const to = new chance().integer({ min: 1, max });
  const from = new chance().integer({ min: 1, max: to });
  return itemInfoList.slice(from, to);
};

const updateRandomShopItems = async ({ chance = 7, maxTryCount = 20 }) => {
  const { data } = await client.query(
    q.Map(
      Paginate(Documents(Collection('store')), {
        size: NUMBEROFPRODUCTS,
      }),
      Lambda('ref', Get(Var('ref')))
    )
  );

  const MAXLOOPS = maxTryCount;
  let loops = 0;
  let tryCount = maxTryCount + 1;
  let skipCount = 0;
  let successCount = 0;
  let errorCount = 0;
  let totalUpdatedDocumentCount = 0;
  const loop = () => {
    return new Promise(async (resolve, reject) => {
      try {
        if (data.length === 0) {
          return;
        }
        const randomObjs = niceChance(data, chance);
        const queries = [];
        await Promise.all(
          randomObjs.map(async ({ data, ref }) => {
            const stockDifference =
              data.available > 5
                ? -Math.max(
                    Math.min(data.available, Math.round(Math.random() * 10)),
                    1
                  )
                : Math.round(Math.random() * 90);
            const newPrice = (data.price = Math.round(
              data.price + Math.random() * 100
            ));
            const available = data.available + stockDifference;
            // updating price and stock (available)
            queries.push(
              Update(ref, {
                data: { available: available, price: newPrice },
              })
            );
            data.available = available;
          })
        );
        totalUpdatedDocumentCount =
          totalUpdatedDocumentCount + randomObjs.length;
        if (queries.length === 0) {
          skipCount++;
          console.log(`[skip] ${queries.length} documents updated process`);
        } else {
          await client.query(Do(...queries));
          successCount++;
          console.log(`[done] ${queries.length} documents updated process`);
        }
      } catch (error) {
        console.log(error);
        errorCount++;
      }
      if (loops < MAXLOOPS) {
        loops++;
        setTimeout(await loop(), 200);
      } else {
        resolve(() => {
          console.log({
            tryCount,
            successCount,
            skipCount,
            errorCount,
            totalUpdatedDocumentCount,
          });
        });
      }
    });
  };
  return await loop();
};

(async () => {
  await updateRandomShopItems({ chance: 10, maxTryCount: 13 });
})();
