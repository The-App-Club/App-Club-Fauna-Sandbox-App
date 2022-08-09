import { useCookies } from 'react-cookie';
import { Layout } from '../../layouts/default';
import { FaunaDBQueryManager, q } from '../../fauna/config';
import { getRandomName } from '../../plugins/random';

const Dashboard = ({ style }) => {
  // eslint-disable-next-line
  const [cookies, setCookie] = useCookies(['fauna_token']);

  const handleCreateFruits = async () => {
    const client = new FaunaDBQueryManager({ secret: cookies.fauna_token })
      .client;
    const response = await client.query(
      q.Call(q.Function('create_fruits'), [getRandomName()])
    );
    console.log(response);
  };

  const handleUpdateFruits = async () => {
    const client = new FaunaDBQueryManager({ secret: cookies.fauna_token })
      .client;
    const response = await client.query(
      q.Call(q.Function('update_fruits'), [`updated_`])
    );
    console.log(response);
  };

  const handleSelectFruits = async () => {
    const client = new FaunaDBQueryManager({ secret: cookies.fauna_token })
      .client;
    const response = await client.query(
      q.Call(q.Function('select_fruits'), [getRandomName()])
    );
    console.log(response);
  };

  const handleDeleteFruits = async () => {
    const client = new FaunaDBQueryManager({ secret: cookies.fauna_token })
      .client;
    const response = await client.query(
      q.Call(q.Function('delete_fruits'), [])
    );
    console.log(response);
  };
  return (
    <Layout>
      {'Dashboard'}
      <p>{cookies.fauna_token}</p>
      <button onClick={handleCreateFruits}>{'create fruits'}</button>
      <button onClick={handleUpdateFruits}>{'update fruits'}</button>
      <button onClick={handleDeleteFruits}>{'delete fruits'}</button>
      <button onClick={handleSelectFruits}>{'select fruits'}</button>
    </Layout>
  );
};

export { Dashboard };
