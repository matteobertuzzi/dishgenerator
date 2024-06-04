import { json } from "react-router-dom";

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            recipe: null,
            allRecipes: [],
            favoriteRecipes: [],
            currentUser: {},
            isLogged: false,
            token: null,
            freeCredits: 3,
            premiumCredits: 10
        },
        actions: {
            handleLogout: () => {
                setStore({ isLogged: false });
                localStorage.removeItem('isLogged');
                localStorage.removeItem('currentUser');
                localStorage.removeItem('favoriteRecipes');
                localStorage.removeItem('token');
            },
            getUserInfo: () => {
                const logData = localStorage.getItem('isLogged');
                const isLogged = logData ? JSON.parse(logData) : null;
                setStore({ isLogged: isLogged });
                const userData = localStorage.getItem('currentUser');
                const currentUser = userData ? JSON.parse(userData) : {};
                setStore({ currentUser: currentUser });
                const favoriteData = localStorage.getItem('favoriteRecipes');
                const favoriteRecipes = favoriteData ? JSON.parse(favoriteData) : [];
                setStore({ favoriteRecipes: favoriteRecipes })
            },
            getRecipes: async () => {
                const url = 'http://127.0.0.1:5000/recipes';
                const response = await fetch(url);
                if (!response.ok) {
                    console.error(response.status, response.statusText);
                    return;
                }
                const data = await response.json();
                const allRecipes = data.results;
                console.log(allRecipes);
                setStore({ allRecipes: allRecipes });
                localStorage.setItem('allRecipes', JSON.stringify(allRecipes));
                return;
            },
            handleRecipe: async (inputs) => {
                const url = 'http://127.0.0.1:5000/generate/recipe';
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(inputs)
                };
                const response = await fetch(url, options);
                if (!response.ok) {
                    console.error(response.statusText);
                }
                const data = await response.json();
                const recipeData = data.results
                console.log(recipeData);
                setStore({ recipe: recipeData });
                return recipeData;
            },
            handlePremiumRecipe: async (inputs) => {
                //const token = localStorage.getItem('token');
                //if (!token) {
                //    console.error('Access token not found!');
                //    return
                //}
                const url = 'http://127.0.0.1:5000/premium-recipe';
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                        //        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(inputs)
                };
                const response = await fetch(url, options)
                if (!response.ok) {
                    console.error(response.status, response.statusText);
                    return
                }
                const data = await response.json();
                console.log('Recipe data', data.message, data.results);
                return data.results
            },
            handleSignup: async (inputs) => {
                const url = 'http://127.0.0.1:5000/signup';
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(inputs)
                };
                const response = await fetch(url, options);
                if (!response.ok) {
                    console.error(response.status, response.statusText);
                    return null
                }
                const data = await response.json();
                console.log(data.message, data.results);
                return data.message;
            },
            handleLogin: async (inputs) => {
                const url = 'http://127.0.0.1:5000/login';
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(inputs)
                };
                const response = await fetch(url, options);
                if (!response.ok) {
                    console.error(response.status, response.statusText);
                    return null
                }
                const data = await response.json();
                setStore({ isLogged: true });
                setStore({ currentUser: data.results });
                setStore({ token: data.token })
                localStorage.setItem('isLogged', JSON.stringify(true));
                localStorage.setItem('currentUser', JSON.stringify(data.results));
                localStorage.setItem('token', data.token);
                getActions().getFavorites();
                return data.message;
            },
            handleCredits: () => {
                const currentCredits = getStore().freeCredits;
                const newCredits = currentCredits - 1;
                setStore({ freeCredits: newCredits });
                console.log(newCredits)
                return newCredits;
            },
            handleFavorites: async (recipe) => {
                const currentFavorites = getStore().favoriteRecipes;
                let favoriteIds = [];
                for (let i = 0; i < currentFavorites.length; i++) {
                    favoriteIds.push(currentFavorites[i].id);
                }
                if (favoriteIds.includes(recipe.id)) {
                    console.error('Recipe already added to favorite.');
                    return
                }
                currentFavorites.push(recipe);
                setStore({ favoriteRecipes: currentFavorites });
                localStorage.setItem('favoriteRecipes', JSON.stringify(currentFavorites));

                const userId = getStore().currentUser.id
                const favoritePayload = {
                    user_id: userId,
                    recipe_id: recipe.id
                };
                console.log(favoritePayload);
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('Access token not found!');
                    return
                }
                const url = 'http://127.0.0.1:5000/favorites';
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(favoritePayload)
                };
                const response = await fetch(url, options)
                if (!response.ok) {
                    console.error(response.status, response.statusText);
                    return
                }
                const data = await response.json();
                console.log(data.message, data.results);
                getActions().getFavorites();
                return data.message
            },
            getFavorites: async () => {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('Access token not found!');
                    return
                }
                const url = 'http://127.0.0.1:5000/favorites';
                const options = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    }
                }
                const response = await fetch(url, options);
                if (!response.ok) {
                    console.error(response.status, response.statusText);
                    setStore({ favoriteRecipes: [] });
                    localStorage.setItem('favoriteRecipes', [])
                    return;
                }
                const data = await response.json();
                const favoriteRecipes = data.results;
                setStore({ favoriteRecipes: favoriteRecipes });
                console.log(favoriteRecipes);
                localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
                return favoriteRecipes;
            },
            removeFavorite: async (recipeId) => {
                const userId = getStore().currentUser.id
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('Access token not found!');
                    return
                }
                const toDelete = {
                    recipe_id: recipeId,
                    user_id: userId
                }
                const url = 'http://127.0.0.1:5000/favorites';
                const options = {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(toDelete)
                }
                const response = await fetch(url, options);
                if (!response.ok) {
                    console.error(response.status, response.statusText);
                    return;
                }
                const data = await response.json();
                getActions().getFavorites();
                return data.message;
            }
        }
    };
};

export default getState;