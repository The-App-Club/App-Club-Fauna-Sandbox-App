import {client, q} from './config';

const {
  Abort,
  Abs,
  AccessProvider,
  AccessProviders,
  Acos,
  Add,
  All,
  And,
  Any,
  Append,
  Asin,
  At,
  Atan,
  BitAnd,
  BitNot,
  BitOr,
  BitXor,
  Bytes,
  Call,
  Casefold,
  Ceil,
  Class,
  Classes,
  Collection,
  Collections,
  Concat,
  Contains,
  ContainsField,
  ContainsPath,
  ContainsStr,
  ContainsStrRegex,
  ContainsValue,
  Cos,
  Cosh,
  Count,
  Create,
  CreateAccessProvider,
  CreateClass,
  CreateCollection,
  CreateDatabase,
  CreateFunction,
  CreateIndex,
  CreateKey,
  CreateRole,
  Credentials,
  CurrentIdentity,
  CurrentToken,
  Database,
  Databases,
  Date,
  DayOfMonth,
  DayOfWeek,
  DayOfYear,
  Degrees,
  Delete,
  Difference,
  Distinct,
  Divide,
  Do,
  Documents,
  Drop,
  EndsWith,
  Epoch,
  Equals,
  Events,
  Exists,
  Exp,
  Filter,
  FindStr,
  FindStrRegex,
  Floor,
  Foreach,
  Format,
  Function,
  Functions,
  GT,
  GTE,
  Get,
  HasCurrentIdentity,
  HasCurrentToken,
  HasIdentity,
  Hour,
  Hypot,
  Identify,
  Identity,
  If,
  Index,
  Indexes,
  Insert,
  Intersection,
  IsArray,
  IsBoolean,
  IsBytes,
  IsCollection,
  IsCredentials,
  IsDatabase,
  IsDate,
  IsDoc,
  IsDouble,
  IsEmpty,
  IsFunction,
  IsIndex,
  IsInteger,
  IsKey,
  IsLambda,
  IsNonEmpty,
  IsNull,
  IsNumber,
  IsObject,
  IsRef,
  IsRole,
  IsSet,
  IsString,
  IsTimestamp,
  IsToken,
  Join,
  KeyFromSecret,
  Keys,
  LT,
  LTE,
  LTrim,
  Lambda,
  Length,
  Let,
  Ln,
  Log,
  Login,
  Logout,
  LowerCase,
  Map,
  Match,
  Max,
  Mean,
  Merge,
  Min,
  Minute,
  Modulo,
  Month,
  MoveDatabase,
  Multiply,
  NGram,
  NewId,
  NextId,
  Not,
  Now,
  Object,
  Or,
  Paginate,
  Pow,
  Prepend,
  Query,
  RTrim,
  Radians,
  Range,
  Reduce,
  Ref,
  RegexEscape,
  Remove,
  Repeat,
  Replace,
  ReplaceStr,
  ReplaceStrRegex,
  Reverse,
  Role,
  Roles,
  Round,
  Second,
  Select,
  SelectAll,
  Sign,
  Sin,
  Singleton,
  Sinh,
  Space,
  Sqrt,
  StartsWith,
  SubString,
  Subtract,
  Sum,
  Take,
  Tan,
  Tanh,
  Time,
  TimeAdd,
  TimeDiff,
  TimeSubtract,
  TitleCase,
  ToArray,
  ToDate,
  ToDouble,
  ToInteger,
  ToMicros,
  ToMillis,
  ToNumber,
  ToObject,
  ToSeconds,
  ToString,
  ToTime,
  Tokens,
  Trim,
  Trunc,
  Union,
  Update,
  UpperCase,
  Var,
  Year,
} = q;

(async () => {
  try {
    let response;
    response = await client.query(
      CreateFunction({
        name: 'submit_order',
        body: Query(
          Lambda(
            ['customerId', 'products'],
            // 1- Get Customer and Products
            // The first step is to make sure that documents exist within the
            // database for the given parameters. Therefore, we try to get
            // the Customer and all of the Products for the given Ids. If
            // they exist, we bind them to variables using the Let function
            // in order to make them available within the scope of the
            // function.
            Let(
              {
                customer: Get(Ref(Collection('customers'), Var('customerId'))),
                products: Map(
                  Var('products'),
                  Lambda(
                    'requestedProduct',
                    Let(
                      {
                        product: Get(
                          Ref(
                            Collection('products'),
                            Select('productId', Var('requestedProduct'))
                          )
                        ),
                      },
                      // Build up a new temporal product object containing
                      // the data given as parameter together with the
                      // data retrieved from the database.
                      {
                        ref: Select('ref', Var('product')),
                        price: Select(['data', 'price'], Var('product')),
                        currentQuantity: Select(
                          ['data', 'quantity'],
                          Var('product')
                        ),
                        requestedQuantity: Select(
                          ['quantity'],
                          Var('requestedProduct')
                        ),
                        backorderLimit: Select(
                          ['data', 'backorderLimit'],
                          Var('product')
                        ),
                      }
                    )
                  )
                ),
              },
              Do(
                // 2- Check if there's enough stock
                // Next, we need to verify if there is enough stock for the
                // requested products. To do so, we evaluate all of the
                // requested products and compare their requested quantity
                // value against the current quantity value. When there is
                // not enough stock for any of the products, we print a
                // message and cancel the whole transaction with the Abort
                // function.
                Foreach(
                  Var('products'),
                  Lambda(
                    'product',
                    If(
                      LTE(
                        Select('requestedQuantity', Var('product')),
                        Select('currentQuantity', Var('product'))
                      ),
                      Var('product'),
                      Abort(
                        Concat([
                          'Stock quantity for Product [',
                          Select(['ref', 'id'], Var('product')),
                          '] not enough – requested at [',
                          ToString(Time('now')),
                          ']',
                        ])
                      )
                    )
                  )
                ),
                // 3- Update products stock
                // Then, we need to update the product stock quantity
                // accordingly. To do this, we update each product document
                // through the Update function subtracting the requested
                // quantity from its current quantity.
                Foreach(
                  Var('products'),
                  Lambda(
                    'product',
                    Update(Select('ref', Var('product')), {
                      data: {
                        quantity: Subtract(
                          Select('currentQuantity', Var('product')),
                          Select('requestedQuantity', Var('product'))
                        ),
                      },
                    })
                  )
                ),
                // 4- Update backordered status
                // Moving forward, we verify if the backordered status needs
                // to be updated. For that, we check if the updated stock
                // quantity is lower than the backorderLimit threshold and
                // set the backordered flag to true if so.
                Foreach(
                  Var('products'),
                  Lambda(
                    'product',
                    If(
                      LTE(
                        Subtract(
                          Select('currentQuantity', Var('product')),
                          Select('requestedQuantity', Var('product'))
                        ),
                        Select('backorderLimit', Var('product'))
                      ),
                      Update(Select('ref', Var('product')), {
                        data: {
                          backordered: true,
                        },
                      }),
                      Var('product')
                    )
                  )
                ),
                // 5- Create Order
                // Last, we create a new Order document with the provided
                // and retrieved data. As this is the last query to be
                // executed, the function will output the newly created
                // Order as result.
                Let(
                  {
                    productsLine:
                      // Build up the Order products line object from the
                      // products variable.
                      Map(
                        Var('products'),
                        Lambda('product', {
                          product: Select('ref', Var('product')),
                          quantity: Select('requestedQuantity', Var('product')),
                          price: Select('price', Var('product')),
                        })
                      ),
                  },
                  Create(Collection('orders'), {
                    data: {
                      customer: Select('ref', Var('customer')),
                      line: Var('productsLine'),
                      status: 'processing',
                      creationDate: Time('now'),
                      shipDate: null,
                      shipAddress: Select(['data', 'address'], Var('customer')),
                      creditCard: Select(
                        ['data', 'creditCard'],
                        Var('customer')
                      ),
                    },
                  })
                )
              )
            )
          )
        ),
      })
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
