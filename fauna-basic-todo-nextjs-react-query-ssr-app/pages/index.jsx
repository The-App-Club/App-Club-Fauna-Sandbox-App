import useShow, {SHOW_KEY, getShows} from '@/hooks/useShow';
import {MdDeleteOutline} from 'react-icons/md';

import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

import {useForm} from 'react-hook-form';
import {css, cx} from '@emotion/css';
import {
  Box,
  Button,
  Checkbox,
  FormLabel,
  TextField,
  Typography,
} from '@mui/joy';
import Spacer from '@/components/Spacer';

import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {dehydrate, useQuery, useMutation} from '@tanstack/react-query';
import {queryClient} from '@/config/query';

const schema = yup.object({
  newShow: yup.string().required('必須入力です'),
});

export const getServerSideProps = async ({req}) => {
  await queryClient.prefetchQuery([SHOW_KEY], () => getShows());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function Home() {
  const {data: shows, error: errorShows} = useQuery(
    [SHOW_KEY],
    () => getShows(),
    {
      staleTime: Infinity,
    }
  );
  const {addShows, deleteShow, newShow, setNewShow, updateShow} = useShow();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: {errors},
  } = useForm({resolver: yupResolver(schema), mode: 'all'});
  const doSubmit = async ({newShow}) => {
    try {
      setNewShow(newShow);
      const {data: result, statusCode, message} = await addShows(newShow);
      if (statusCode === 200) {
        setNewShow('');
        toast(`"${result.data.title}"を追加しました`, {
          className: cx(
            `text-sm font-bold`,
            css`
              font-family: 'Noto Sans JP', sans-serif;
            `
          ),
        });
      } else {
        toast(`"${result.title}"の追加に失敗しました`, {
          className: cx(
            `text-sm font-bold`,
            css`
              font-family: 'Noto Sans JP', sans-serif;
            `
          ),
        });
        console.log(message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateShow = async (e, show) => {
    const {data} = show;
    try {
      const {
        data: result,
        statusCode,
        message,
      } = await updateShow({
        ...data,
        watched: e.target.checked,
      });
      if (statusCode === 200) {
        toast(
          `${result.data.title}を"${
            result.data.watched ? '視聴済' : '未視聴'
          }"に更新しました`,
          {
            className: cx(
              `text-sm font-bold`,
              css`
                font-family: 'Noto Sans JP', sans-serif;
              `
            ),
          }
        );
      } else {
        toast(`"${result.title}"の更新に失敗しました`, {
          className: cx(
            `text-sm font-bold`,
            css`
              font-family: 'Noto Sans JP', sans-serif;
            `
          ),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteShow = async ({data}) => {
    try {
      const {data: result, statusCode, message} = await deleteShow({...data});
      if (statusCode === 200) {
        toast(`"${result.data.title}"を削除しました`, {
          className: cx(
            `text-sm font-bold`,
            css`
              font-family: 'Noto Sans JP', sans-serif;
            `
          ),
        });
      } else {
        toast(`"${result.title}"の削除に失敗しました`, {
          className: cx(
            `text-sm font-bold`,
            css`
              font-family: 'Noto Sans JP', sans-serif;
            `
          ),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderShows = ({shows}) => {
    if (shows.length === 0) {
      return (
        <Typography
          component={'p'}
          className={cx(`!flex !items-center !justify-center`)}
        >
          視聴したいビデオリストがありません
        </Typography>
      );
    }
    return (
      <Box className={`flex flex-col gap-2`}>
        {shows.map((show, index) => {
          return (
            <Box key={index} className={`flex items-center gap-2`}>
              <MdDeleteOutline
                size={24}
                className={cx(
                  css`
                    min-width: 24px;
                  `,
                  `hover:cursor-pointer`
                )}
                onClick={(e) => {
                  handleDeleteShow(show);
                }}
              />
              <Checkbox
                color="neutral"
                checked={show.data.watched}
                label={show.data.title}
                onClick={(e) => {
                  handleUpdateShow(e, show);
                }}
              />
            </Box>
          );
        })}
      </Box>
    );
  };

  if (!shows) {
    return <p>loading...</p>;
  }

  if (errorShows) {
    return <p>something went wrong...</p>;
  }

  return (
    <Box className="flex justify-start items-center min-h-screen flex-col">
      <ToastContainer />
      <form className="max-w-xs w-full" onSubmit={handleSubmit(doSubmit)}>
        <Box className={`sticky top-0 bg-white z-10 w-full py-2`}>
          <Typography
            component={'h2'}
            className={cx(`!flex !items-center !justify-center`, `!text-2xl`)}
          >
            視聴したいビデオリスト
          </Typography>
          <Box className={`flex items-center flex-col`}>
            <TextField
              type={'text'}
              fullWidth
              id="newShow"
              name="newShow"
              label="見たいビデオ"
              placeholder="見たいビデオを入力してください"
              helperText="例. 映画『シドニアの騎士 あいつむぐほし』"
              color={errors.newShow ? 'danger' : 'neutral'}
              {...register('newShow')}
            />
            {Object.keys(errors).length !== 0 && errors.newShow ? (
              <Typography
                component={'p'}
                className={cx(
                  `!text-sm !flex !items-center !justify-end !w-full !my-1`,
                  `!text-red-600`
                )}
              >
                {errors.newShow.message}
              </Typography>
            ) : (
              <Spacer height="20px" className="my-1" />
            )}
          </Box>
          <Button
            variant="solid"
            type="submit"
            className="flex justify-center items-center w-full"
            disabled={Object.keys(errors).length === 0 ? false : true}
          >
            追加
          </Button>
        </Box>

        <Spacer />
        {renderShows({shows})}
      </form>
    </Box>
  );
}
