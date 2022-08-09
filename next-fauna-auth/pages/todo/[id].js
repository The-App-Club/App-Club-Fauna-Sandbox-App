import {useRouter} from 'next/router';
import useSWR from 'swr';
import {gql} from 'graphql-request';
import Layout from '../../layouts/default';
import EditForm from '../../components/edit-form';
import {graphQLClient} from '../../utils/faunaGraphQLClient';
import {useCookies} from 'react-cookie';

const Todo = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['fauna_token']);
  const router = useRouter();
  const {id} = router.query;

  const fetcher = async (query) => {
    return await graphQLClient(cookies.fauna_token).request(query, {id});
  };

  const query = gql`
    query FindATodoByID($id: ID!) {
      findTodoByID(id: $id) {
        task
        completed
      }
    }
  `;

  const {data, error} = useSWR([query, id], fetcher);

  if (error) {
    return <div>failed to load</div>;
  }

  if (!data) {
    return <div>{'loading...'}</div>;
  }

  return (
    <Layout>
      <h1>Edit Todo</h1>
      {data && (
        <EditForm
          defaultValues={data.findTodoByID}
          id={id}
          token={cookies.fauna_token}
        />
      )}
    </Layout>
  );
};

export default Todo;
