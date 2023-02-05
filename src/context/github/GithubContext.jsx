import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';

const GithubContext = createContext();

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

  return (
    <GithubContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </GithubContext.Provider>
  );

  // return (
  //   <GithubContext.Provider
  //     value={{
  //       users: state.users,
  //       isLoading: state.isLoading,
  //       user: state.user,
  //       repos: state.repos,
  //       searchUsers,
  //       clearUsers,
  //       getUser,
  //       getUserRepos,
  //     }}
  //   >
  //     {children}
  //   </GithubContext.Provider>
  // );
};

export default GithubContext;
