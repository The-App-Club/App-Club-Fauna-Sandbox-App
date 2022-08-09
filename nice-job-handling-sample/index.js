// https://stackoverflow.com/a/36757699
import Q from "q";

function workCollection({ promiseList, statusCountInfo }) {
  return promiseList.reduce(function (promise, item, index) {
    return promise
      .then(function ({ previousStatus = true, statusCountInfo }) {
        console.log("previousStatus", previousStatus);
        if (previousStatus) {
          return Q.delay(1000);
        }
        return Q.delay(3000);
      })
      .then(async function (result) {
        // main process
        const { status, result: _result } = { ...(await item) };
        if (status === 1) {
          statusCountInfo.fail = statusCountInfo.fail + 1;
          return (() => {
            console.log("Unhappy Cowboy Bebop", _result); // teardown process then rollback process
            return { previousStatus: false, statusCountInfo }; // next status;
          })();
        }
        return (() => {
          statusCountInfo.success = statusCountInfo.success + 1;
          console.log("Happy Cowboy Bebop", _result); // teardown process and next prepare process
          return { previousStatus: true, statusCountInfo }; // next status;
        })();
      });
  }, Q(true));
}

function doWorkCollection({ promiseList, statusCountInfo }) {
  Q()
    .then(function () {
      console.log("start");
      Object.assign(statusCountInfo, { success: 0, fail: 0 });
      return [promiseList, statusCountInfo];
    })
    .then(([promiseList, statusCountInfo]) => {
      return workCollection({ promiseList, statusCountInfo });
    })
    .then(function ({ previousStatus, statusCountInfo }) {
      console.log("done");
      console.log(statusCountInfo);
    });
}

(() => {
  const jobItemListWithAllOk = [
    new Promise((resolve, reject) => {
      try {
        resolve({ status: 0, result: 1 });
      } catch (error) {
        reject(error);
      }
    }),
    new Promise((resolve, reject) => {
      try {
        resolve({ status: 0, result: 2 });
      } catch (error) {
        reject(error);
      }
    }),
    new Promise((resolve, reject) => {
      try {
        resolve({ status: 0, result: 3 });
      } catch (error) {
        reject(error);
      }
    }),
  ];
  const jobItemListWithAllNg = [
    new Promise((resolve, reject) => {
      try {
        resolve({ status: 1, result: new Error("!!!") });
      } catch (error) {
        reject(error);
      }
    }),
    new Promise((resolve, reject) => {
      try {
        resolve({ status: 1, result: new Error("!!!") });
      } catch (error) {
        reject(error);
      }
    }),
    new Promise((resolve, reject) => {
      try {
        resolve({ status: 1, result: new Error("!!!") });
      } catch (error) {
        reject(error);
      }
    }),
  ];
  const jobItemListWithSomethingError = [
    new Promise((resolve, reject) => {
      try {
        resolve({ status: 1, result: new Error("!!!") });
      } catch (error) {
        reject(error);
      }
    }),
    new Promise((resolve, reject) => {
      try {
        resolve({ status: 0, result: 2 });
      } catch (error) {
        reject(error);
      }
    }),
    new Promise((resolve, reject) => {
      try {
        resolve({ status: 1, result: new Error("!!!") });
      } catch (error) {
        reject(error);
      }
    }),
  ];
  // doWorkCollection({ promiseList: jobItemListWithAllOk, statusCountInfo: {} });
  doWorkCollection({ promiseList: jobItemListWithAllNg, statusCountInfo: {} });
  // doWorkCollection({
  //   promiseList: jobItemListWithSomethingError,
  //   statusCountInfo: {},
  // });
})();
