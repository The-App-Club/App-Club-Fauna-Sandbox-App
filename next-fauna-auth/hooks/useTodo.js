import {graphQLClient} from '@/utils/faunaGraphQLClient';
import {css, cx} from '@emotion/css';
import {gql} from 'graphql-request';
import {useCookies} from 'react-cookie';
import {toast} from 'react-toastify';

const useTodo = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['fauna_token']);

  const getPublicData = ({token}) => {
    const query = gql`
      query a {
        allTodos {
          data {
            _id
            task
            completed
            owner {
              email
            }
          }
        }
      }
    `;
    return new Promise(async (resolve, reject) => {
      try {
        const {allTodos} = await graphQLClient(token).request(query);
        const resultInfoList = allTodos.data;
        resolve(resultInfoList);
      } catch (error) {
        reject(error);
      }
    });
  };

  const getPrivateData = ({token}) => {
    const query = gql`
      query a($id: ID!) {
        findUserByID(id: $id) {
          email
          todos {
            data {
              _id
              task
              completed
            }
          }
        }
      }
    `;
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('/api/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({token}),
        });
        const {email, httpStatus, id} = await response.json();
        if (httpStatus === 200 && id && email) {
          const variables = {
            id,
          };
          const {findUserByID} = await graphQLClient(token).request(
            query,
            variables
          );
          const {data: itemInfoList, email} = {
            ...findUserByID.todos,
            ...findUserByID,
          };
          const resultInfoList = itemInfoList.map((itemInfo) => {
            return Object.assign(itemInfo, {owner: {email}});
          });
          resolve(resultInfoList);
        } else {
          resolve();
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  const deleteATodo = (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const query = gql`
          mutation DeleteATodo($id: ID!) {
            deleteTodo(id: $id) {
              _id
            }
          }
        `;
        const response = await graphQLClient(cookies.fauna_token).request(
          query,
          {
            id,
          }
        );
        toast(`削除しました`, {
          className: cx(
            css`
              font-weight: 700;
              font-size: 0.875rem; /* 14px */
              line-height: 1.25rem; /* 20px */
              font-family: 'Inter', sans-serif;
            `
          ),
          type: 'success',
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        resolve(response);
      } catch (error) {
        toast(`削除に失敗しました`, {
          className: cx(
            css`
              font-weight: 700;
              font-size: 0.875rem; /* 14px */
              line-height: 1.25rem; /* 20px */
              font-family: 'Inter', sans-serif;
            `
          ),
          type: 'error',
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        reject(error);
      }
    });
  };

  const findATodoByID = (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const query = gql`
          query FindATodoByID($id: ID!) {
            findTodoByID(id: $id) {
              task
              completed
            }
          }
        `;
        const response = await graphQLClient(cookies.fauna_token).request(
          query,
          {
            id,
          }
        );
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  };

  const toggleTodo = (id, completed) => {
    return new Promise(async (resolve, reject) => {
      try {
        const query = gql`
          mutation PartialUpdateTodo($id: ID!, $completed: Boolean!) {
            partialUpdateTodo(id: $id, data: {completed: $completed}) {
              _id
              completed
            }
          }
        `;

        const variables = {
          id,
          completed: !completed,
        };
        const response = await graphQLClient(cookies.fauna_token)
          .setHeader('X-Schema-Preview', 'partial-update-mutation')
          .request(query, variables);
        toast(`${!completed ? '完了済み' : '未完了'}に更新しました`, {
          className: cx(
            css`
              font-weight: 700;
              font-size: 0.875rem; /* 14px */
              line-height: 1.25rem; /* 20px */
              font-family: 'Inter', sans-serif;
            `
          ),
          type: 'success',
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        resolve(response);
      } catch (error) {
        toast(`更新に失敗しました`, {
          className: cx(
            css`
              font-weight: 700;
              font-size: 0.875rem; /* 14px */
              line-height: 1.25rem; /* 20px */
              font-family: 'Inter', sans-serif;
            `
          ),
          type: 'error',
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        reject(error);
      }
    });
  };

  const createATodo = (task, ownerId) => {
    return new Promise(async (resolve, reject) => {
      const mutation = gql`
        mutation CreateATodo($task: String!, $owner: ID!) {
          createTodo(
            data: {task: $task, completed: false, owner: {connect: $owner}}
          ) {
            task
            completed
            owner {
              _id
            }
          }
        }
      `;

      const variables = {
        task,
        owner: ownerId,
      };

      try {
        const response = await graphQLClient(cookies.fauna_token).request(
          mutation,
          variables
        );
        toast(`新規作成しました`, {
          className: cx(
            css`
              font-weight: 700;
              font-size: 0.875rem; /* 14px */
              line-height: 1.25rem; /* 20px */
              font-family: 'Inter', sans-serif;
            `
          ),
          type: 'success',
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        resolve(response);
      } catch (error) {
        toast(`新規作成に失敗しました`, {
          className: cx(
            css`
              font-weight: 700;
              font-size: 0.875rem; /* 14px */
              line-height: 1.25rem; /* 20px */
              font-family: 'Inter', sans-serif;
            `
          ),
          type: 'error',
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        reject(response);
      }
    });
  };

  const updateATodo = (id, task, completed) => {
    return new Promise(async (resolve, reject) => {
      const mutation = gql`
        mutation UpdateATodo($id: ID!, $task: String!, $completed: Boolean!) {
          updateTodo(id: $id, data: {task: $task, completed: $completed}) {
            task
            completed
          }
        }
      `;

      const variables = {
        id,
        task,
        completed,
      };

      try {
        const response = await graphQLClient(cookies.fauna_token).request(
          mutation,
          variables
        );
        toast(`更新しました`, {
          className: cx(
            css`
              font-weight: 700;
              font-size: 0.875rem; /* 14px */
              line-height: 1.25rem; /* 20px */
              font-family: 'Inter', sans-serif;
            `
          ),
          type: 'success',
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        resolve(response);
      } catch (error) {
        toast(`更新に失敗しました`, {
          className: cx(
            css`
              font-weight: 700;
              font-size: 0.875rem; /* 14px */
              line-height: 1.25rem; /* 20px */
              font-family: 'Inter', sans-serif;
            `
          ),
          type: 'error',
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        reject(error);
      }
    });
  };

  return {
    findATodoByID,
    getPublicData,
    getPrivateData,
    deleteATodo,
    toggleTodo,
    createATodo,
    updateATodo,
  };
};

export default useTodo;
