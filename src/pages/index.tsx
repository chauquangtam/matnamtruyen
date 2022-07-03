import type { NextPage } from 'next'
import { memo } from 'react';
import Grid from '@/components/Grid'
import useFetchHome from '@/hooks/useFetchHome';
import { handleSource } from '@/store/action';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';
import DisplayOptions from '@/components/DisplayOptions';

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const { reducer: select } = useAppSelector((state) => state);

  const typeRender = () => (
    <>
      <h1
        className={`text-white sm:text-4xl text-3xl font-bold mr-auto`}
        onClick={() => {
          dispatch(handleSource(select.source, select.type))
        }}
      >
        {capitalizeFirstLetter(select.type)}
      </h1>
      <DisplayOptions />
    </>
  )

  return (
    <Grid
      fetch={useFetchHome}
      typeRender={typeRender}
    />
  )
}

export default memo(Home)