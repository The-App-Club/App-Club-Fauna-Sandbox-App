import {useEffect, useState} from 'react';
import useSWR from 'swr';
import useShow from '@/hooks/useShow';
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

const schema = yup.object({
  newShow: yup.string().required('必須入力です'),
});

export default function Home() {
  const {newShow, setNewShow, getShows, addShows, updateShow, deleteShow} =
    useShow();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: {errors},
  } = useForm({resolver: yupResolver(schema), mode: 'all'});
  const doSubmit = async (data) => {
    setNewShow(data.newShow);
    const response = await addShows(data.newShow);
    setNewShow('');
    mutateShows();
  };

  const {
    data: shows,
    error: errorShows,
    mutate: mutateShows,
  } = useSWR({}, async () => {
    try {
      const response = await getShows();
      return response;
    } catch (error) {
      return error;
    }
  });

  const handleAddShow = async () => {
    try {
      const response = await addShows();
      console.log(response);
      setNewShow('');
      mutateShows();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateShow = async (e, show) => {
    const {data} = show;
    try {
      const response = await updateShow({...data, watched: e.target.checked});
      console.log(response);
      mutateShows();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteShow = async (show) => {
    const {data} = show;
    try {
      const response = await deleteShow({...data});
      console.log(response);
      mutateShows();
    } catch (error) {
      console.log(error);
    }
  };

  const handleNewShow = (e) => {
    setNewShow(e.target.value);
  };

  if (errorShows) {
    return <p>{errorShows.data}</p>;
  }

  if (!shows) {
    return <p>{`loading...`}</p>;
  }

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

  return (
    <Box className="flex justify-start items-center min-h-screen flex-col">
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
