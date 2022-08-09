import {client, q} from './config';

(async () => {
  try {
    let response;
    // response = await client.query(
    //   q.Do(
    //     // Create Store 1 document
    //     q.Create(q.Ref(q.Collection('stores'), '301'), {
    //       data: {
    //         name: 'DC Fruits',
    //         address: {
    //           street: '13 Pierstorff Drive',
    //           city: 'Washington',
    //           state: 'DC',
    //           zipCode: '20220',
    //         },
    //       },
    //     }),
    //     // Create Store 2 document
    //     q.Create(q.Ref(q.Collection('stores'), '302'), {
    //       data: {
    //         name: 'Party Supplies',
    //         address: {
    //           street: '7529 Capitalsaurus Court',
    //           city: 'Washington',
    //           state: 'DC',
    //           zipCode: '20002',
    //         },
    //       },
    //     }),
    //     // Create Store 3 document
    //     q.Create(q.Ref(q.Collection('stores'), '303'), {
    //       data: {
    //         name: 'Foggy Bottom Market',
    //         address: {
    //           street: '4 Floride Ave',
    //           city: 'Washington',
    //           state: 'DC',
    //           zipCode: '20037',
    //         },
    //       },
    //     })
    //   )
    // );
    // console.log(response);

    response = await client.query(
      q.Do(
        // Create Product 1 document
        q.Create(q.Ref(q.Collection('products'), '201'), {
          data: {
            name: 'cups',
            description: 'Translucent 9 Oz, 100 ct',
            price: 6.98,
            quantity: 100,
            store: q.Ref(q.Collection('stores'), '302'),
            backorderLimit: 5,
            backordered: false,
          },
        }),
        // Create Product 2 document
        q.Create(q.Ref(q.Collection('products'), '202'), {
          data: {
            name: 'pinata',
            description: 'Original Class Donkey Pinata',
            price: 24.99,
            quantity: 20,
            store: q.Ref(q.Collection('stores'), '303'),
            backorderLimit: 10,
            backordered: false,
          },
        }),
        // Create Product 3 document
        q.Create(q.Ref(q.Collection('products'), '203'), {
          data: {
            name: 'pizza',
            description: 'Frozen Cheese',
            price: 4.99,
            quantity: 100,
            store: q.Ref(q.Collection('stores'), '303'),
            backorderLimit: 15,
            backordered: false,
          },
        }),
        // Create Product 4 document
        q.Create(q.Ref(q.Collection('products'), '204'), {
          data: {
            name: 'avocados',
            description: 'Conventional Hass, 4ct bag',
            price: 3.99,
            quantity: 1000,
            store: q.Ref(q.Collection('stores'), '301'),
            backorderLimit: 15,
            backordered: false,
          },
        }),
        // Create Product 5 document
        q.Create(q.Ref(q.Collection('products'), '205'), {
          data: {
            name: 'limes',
            description: 'Conventional, 1 ct',
            price: 0.35,
            quantity: 1000,
            store: q.Ref(q.Collection('stores'), '301'),
            backorderLimit: 15,
            backordered: false,
          },
        }),
        // Create Product 6 document
        q.Create(q.Ref(q.Collection('products'), '206'), {
          data: {
            name: 'limes',
            description: 'Organic, 16 oz bag',
            price: 3.49,
            quantity: 50,
            store: q.Ref(q.Collection('stores'), '301'),
            backorderLimit: 15,
            backordered: false,
          },
        }),
        // Create Product 7 document
        q.Create(q.Ref(q.Collection('products'), '207'), {
          data: {
            name: 'limes',
            description: 'Conventional, 16 oz bag',
            price: 2.99,
            quantity: 30,
            store: q.Ref(q.Collection('stores'), '303'),
            backorderLimit: 15,
            backordered: false,
          },
        }),
        // Create Product 8 document
        q.Create(q.Ref(q.Collection('products'), '208'), {
          data: {
            name: 'cilantro',
            description: 'Organic, 1 bunch',
            price: 1.49,
            quantity: 100,
            store: q.Ref(q.Collection('stores'), '301'),
            backorderLimit: 15,
            backordered: false,
          },
        }),
        // Create Product 9 document
        q.Create(q.Ref(q.Collection('products'), '209'), {
          data: {
            name: 'pinata',
            description: 'Giant Taco Pinata',
            price: 23.99,
            quantity: 10,
            store: q.Ref(q.Collection('stores'), '302'),
            backorderLimit: 10,
            backordered: false,
          },
        })
      )
    );
    console.log(response);

    response = await client.query(
      q.Do(
        // Create Customer 1 document
        q.Create(q.Ref(q.Collection('customers'), '101'), {
          data: {
            firstName: 'Alice',
            lastName: 'Appleseed',
            address: {
              street: '87856 Mendota Court',
              city: 'Washington',
              state: 'DC',
              zipCode: '20220',
            },
            telephone: '208-346-0715',
            creditCard: {
              network: 'Visa',
              number: '4556781272473393',
            },
          },
        }),
        // Create Customer 2 document
        q.Create(q.Ref(q.Collection('customers'), '102'), {
          data: {
            firstName: 'Bob',
            lastName: 'Brown',
            address: {
              street: '72 Waxwing Terrace',
              city: 'Washington',
              state: 'DC',
              zipCode: '20002',
            },
            telephone: '719-872-8799',
            creditCard: {
              network: 'Visa',
              number: '4916112310613672',
            },
          },
        }),
        // Create Customer 3 document
        q.Create(q.Ref(q.Collection('customers'), '103'), {
          data: {
            firstName: 'Carol',
            lastName: 'Clark',
            address: {
              street: '5 Troy Trail',
              city: 'Washington',
              state: 'DC',
              zipCode: '20220',
            },
            telephone: '907-949-4470',
            creditCard: {
              network: 'Visa',
              number: '4532636730015542',
            },
          },
        })
      )
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
