import Link from 'next/link';
import useSWR from 'swr';
import {gql} from 'graphql-request';
import Layout from '../layouts/default';
import {graphQLClient} from '../utils/faunaGraphQLClient';
import {useCookies} from 'react-cookie';
import {css, cx} from '@emotion/css';
import {Box, Checkbox, Typography} from '@mui/joy';
import {useRouter} from 'next/router';
import useTodo from '@/hooks/useTodo';
import Image from 'next/image';
import Spacer from '@/components/Spacer';
import {toast} from 'react-toastify';
import {useEffect} from 'react';
import useUser from '@/hooks/useUser';

const Home = () => {
  const router = useRouter();
  const {getMe, getUser} = useUser();
  const [cookies, setCookie, removeCookie] = useCookies(['fauna_token']);
  const {deleteATodo, blockFeature, getPrivateData, getPublicData, toggleTodo} =
    useTodo();
  const {data, error, mutate} = useSWR({}, async () => {
    if (cookies.fauna_token) {
      const items = await getPrivateData({token: cookies.fauna_token});
      return await Promise.all(
        items.map(async (item) => {
          return {...item, owner: await getUser(item.owner.email)};
        })
      );
    } else {
      const items = await getPublicData({token: cookies.fauna_token});
      return await Promise.all(
        items.map(async (item) => {
          return {...item, owner: await getUser(item.owner.email)};
        })
      );
    }
  });

  const handleToggle = async ({id, completed}) => {
    try {
      const response = await toggleTodo(id, completed);
      console.log(response);
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async ({id}) => {
    try {
      const response = await deleteATodo(id);
      console.log(response);
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // logout
    mutate();
  }, [cookies]);

  if (error) {
    return <p>something went wrong...</p>;
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  const renderTodo = () => {
    if (data?.length === 0) {
      return <p>nothing to do</p>;
    } else {
      return (
        <Box className="w-full flex flex-col gap-4">
          {data.map((todo, index) => {
            return (
              <Box key={todo._id} className={`w-full border-2 p-2`}>
                <Checkbox
                  color="neutral"
                  checked={todo.completed}
                  label={todo.task}
                  onClick={(e) => {
                    if (blockFeature()) {
                      return;
                    }
                    handleToggle({
                      id: todo._id,
                      completed: todo.completed,
                    });
                  }}
                  size={'lg'}
                />
                <Box className={`flex items-center justify-between`}>
                  <Box className={`flex items-center`}>
                    <Image
                      alt={todo.owner.email}
                      src={todo.owner.avatorURL}
                      width={40}
                      height={40}
                      className={`hover:cursor-pointer !rounded-full !border-2`}
                      onClick={(e) => {
                        if (blockFeature()) {
                          return;
                        }
                        router.push('/profile');
                      }}
                    />
                  </Box>
                  <Box className={`flex items-center gap-2`}>
                    <button
                      type="button"
                      className={cx(
                        `px-6 py-2 bg-blue-600 text-white rounded-lg`,
                        `hover:bg-blue-700`,
                        `outline-none focus-visible:ring-2 focus-visible:ring-black`
                      )}
                      onClick={(e) => {
                        if (blockFeature()) {
                          return;
                        }
                        router.push({
                          pathname: `/todo/${todo._id}`,
                        });
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className={cx(
                        `px-6 py-2 bg-blue-600 text-white rounded-lg`,
                        `hover:bg-blue-700`,
                        `outline-none focus-visible:ring-2 focus-visible:ring-black`
                      )}
                      onClick={(e) => {
                        if (blockFeature()) {
                          return;
                        }
                        handleDelete({id: todo._id});
                      }}
                    >
                      Delete
                    </button>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      );
    }
  };

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
          TODO
        </Typography>
        <button
          type="button"
          className={cx(
            `px-6 py-2 bg-blue-600 text-white rounded-lg`,
            `hover:bg-blue-700`,
            `outline-none focus-visible:ring-2 focus-visible:ring-black`
          )}
          onClick={(e) => {
            if (blockFeature()) {
              return;
            }
            router.push({
              pathname: '/new',
            });
          }}
        >
          New Todo
        </button>
        <Spacer />
        {renderTodo()}
      </Box>
    </Layout>
  );
};

export default Home;
