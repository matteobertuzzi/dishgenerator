import React from 'react';
import DishInputs from '../components/DishInputs';
import DishResults from '../components/DishResults';
import CategoryList from '../components/CategoryList';

const LoggedHome = () => {
  return (
    <>
      <DishInputs isPremium={true} />
      <DishResults />
      <CategoryList />
    </>
  )
}

export default LoggedHome