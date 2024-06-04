import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import UnloggedHome from './UnloggedHome';
import LoggedHome from './LoggedHome';

const Home = () => {
    const { store, actions } = useContext(Context);
    const { isLogged } = store;

    return (
        <>
            {isLogged ?
                <LoggedHome /> :
                <UnloggedHome />}
        </>
    )
}

export default Home