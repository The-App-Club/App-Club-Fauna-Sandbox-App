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
    // response = await client.query(
    //   Call(
    //     Function("submit_order"),
    //       "101",
    //       [
    //         {
    //           "productId": "204",
    //           "quantity": 10
    //         },
    //         {
    //           "productId": "206",
    //           "quantity": 5
    //         },
    //         {
    //           "productId": "208",
    //           "quantity": 20
    //         }
    //       ]
    //   )
    // );
    // console.log(response);

    // response = await client.query(
    //   Call(
    //     Function("submit_order"),
    //       "103",
    //       [
    //         {
    //           "productId": "206",
    //           "quantity": 40
    //         },
    //         {
    //           "productId": "203",
    //           "quantity": 90
    //         }
    //       ]
    //   )
    // );
    // console.log(response);

    // response = await client.query(
    //   Call(
    //     Function("submit_order"),
    //       "102",
    //       [
    //         {
    //           "productId": "203",
    //           "quantity": 15
    //         },
    //         {
    //           "productId": "202",
    //           "quantity": 45
    //         }
    //       ]
    //   )
    // );
    // console.log(response);

    response = await client.query(
      Call(Function('submit_order'), '101', [
        Object({
          productId: '201',
          quantity: 70,
        }),
      ])
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
