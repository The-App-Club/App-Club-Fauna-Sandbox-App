import {useRouter} from 'next/router';
import useSWR from 'swr';
import Layout from '@/layouts/default';
import EditForm from '@/components/EditForm';
import useTodo from '@/hooks/useTodo';
import {Box, Typography} from '@mui/joy';
import {css, cx} from '@emotion/css';

const Todo = () => {
  const router = useRouter();
  const {id} = router.query;
  const {findATodoByID} = useTodo();
  const {data, error} = useSWR([id], async (id) => {
    if (!id) {
      return;
    }
    try {
      return await findATodoByID(id);
    } catch (error) {
      return error;
    }
  });

  if (error) {
    return <p>something went wrong...</p>;
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <Layout>
      <Box
        component={'section'}
        className={cx(
          css`
            margin: 0 auto;
            width: 100%;
            max-width: 400px;
            padding-top: 60px;
            min-height: calc(100vh - 60px);
            @media (max-width: 768px) {
              max-width: 100%;
            }
          `
        )}
      >
        <Typography component="h2" className="!text-2xl font-bold">
          Edit Todo
        </Typography>
        <EditForm defaultValues={data.findTodoByID} id={id} />
      </Box>
    </Layout>
  );
};

export default Todo;
