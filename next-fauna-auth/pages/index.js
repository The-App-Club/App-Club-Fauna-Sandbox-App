import Link from 'next/link';
import useSWR from 'swr';
import {gql} from 'graphql-request';
import Layout from '../layouts/default';
import styles from '../styles/Home.module.css';
import {graphQLClient} from '../utils/faunaGraphQLClient';
import {useCookies} from 'react-cookie';

import {getPublicData} from '../utils/getPublicData';
import {getPrivateData} from '../utils/getPrivateData';

const Home = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['fauna_token']);
  const {data, error, mutate} = useSWR({}, async () => {
    if (Object.keys(cookies).length !== 0) {
      return await getPrivateData({token: cookies.fauna_token});
    } else {
      return await getPublicData({token: cookies.fauna_token});
    }
  });

  const toggleTodo = async (id, completed) => {
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

    try {
      await graphQLClient(cookies.fauna_token)
        .setHeader('X-Schema-Preview', 'partial-update-mutation')
        .request(query, variables);
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteATodo = async (id) => {
    const query = gql`
      mutation DeleteATodo($id: ID!) {
        deleteTodo(id: $id) {
          _id
        }
      }
    `;

    try {
      const response = await graphQLClient(cookies.fauna_token).request(query, {
        id,
      });
      console.log(response);
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  if (error) {
    return (
      <Layout>
        <div>failed to load</div>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );
  }

  const renderTodo = () => {
    if (data?.length === 0) {
      return <p>nothing to do</p>;
    } else {
      return (
        <ul>
          {data?.map((todo) => {
            return (
              <li key={todo._id} className={styles.todo}>
                <span>{todo.owner.email}</span>
                <span
                  onClick={() => toggleTodo(todo._id, todo.completed)}
                  style={
                    todo.completed
                      ? {textDecorationLine: 'line-through'}
                      : {textDecorationLine: 'none'}
                  }
                >
                  {todo.task}
                </span>
                <span className={styles.edit}>
                  <Link href="/todo/[id]" as={`/todo/${todo._id}`}>
                    <a>Edit</a>
                  </Link>
                </span>
                <span
                  onClick={() => deleteATodo(todo._id)}
                  className={styles.delete}
                >
                  Delete
                </span>
              </li>
            );
          })}
        </ul>
      );
    }
  };

  return (
    <Layout>
      <h1>NextJs Fauna GraphQL CRUD</h1>
      <Link href="/new">
        <a>Create New Todo</a>
      </Link>
      {renderTodo()}
    </Layout>
  );
};

export default Home;
