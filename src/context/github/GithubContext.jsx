import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
// const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  // const [users, setUsers] = useState([]);
  // const [isLoading, setIsloading] = useState(true);  //Replacing useState with useReducers
  const initialState = {
    users: [],
    user: {},
    repos: [],
    isLoading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  // Get initial users (testing purpose)
  const fetchUsers = async () => {
    setLoading();
    const res = await fetch(`${GITHUB_URL}/users`);
    // For setting bearer token
    // const res = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
    //   headers: {
    //     Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
    //   },
    // });
    const data = await res.json();
    // setUsers(data);
    // setIsloading(false);
    dispatch({
      type: 'GET_USERS',
      payload: data,
    });
  };

  // Get search results
  const searchUsers = async (text) => {
    setLoading();
    const params = new URLSearchParams({ q: text });
    const res = await fetch(`${GITHUB_URL}/search/users?${params}`);
    const { items } = await res.json(); // or data = {items: []}
    dispatch({
      type: 'SEARCH_USERS',
      payload: items,
    });
  };

  // Get single user
  const getUser = async (login) => {
    setLoading();
    const res = await fetch(`${GITHUB_URL}/users/${login}`);
    if (res.status === 404) {
      window.location = '/notfound';
    } else {
      const data = await res.json();
      dispatch({
        type: 'GET_USER',
        payload: data,
      });
    }
  };

  // Get user repos
  const getUserRepos = async (login) => {
    setLoading();
    const params = new URLSearchParams({ sort: 'created', per_page: 10 });
    const res = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`);
    if (res.status === 404) {
      window.location = '/notfound';
    } else {
      const data = await res.json();
      dispatch({
        type: 'GET_REPOS',
        payload: data,
      });
    }
  };

  // clear users from state
  const clearUsers = () => {
    dispatch({ type: 'CLEAR_USERS' });
  };

  // Set Loading
  const setLoading = () => {
    dispatch({ type: 'SET_LOADING' });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        isLoading: state.isLoading,
        user: state.user,
        repos: state.repos,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
