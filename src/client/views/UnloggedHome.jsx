import React from 'react';
import DishInputs from '../components/DishInputs';
import DishResults from '../components/DishResults';

const UnloggedHome = () => {
    return (
        <>
            <DishInputs isPremium={false} />
            <DishResults />
        </>
    )
}

export default UnloggedHome