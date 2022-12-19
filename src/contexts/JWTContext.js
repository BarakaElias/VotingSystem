import { createContext, useEffect, useReducer, useState } from "react";
import { setToken } from "../redux/slices/authSlice";
import { setUserToken, setUserId } from "../redux/slices/voters";
import { useDispatch } from "react-redux";
// import axios from "../utils/axios";
import axios from "axios";
import { isValidToken, setSession } from "../utils/jwt";

const INITIALIZE = "INITIALIZE";
const SIGN_IN = "SIGN_IN";
const SIGN_OUT = "SIGN_OUT";
const SIGN_UP = "SIGN_UP";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const JWTReducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user,
      };
    case SIGN_IN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case SIGN_OUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    case SIGN_UP:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };

    default:
      return state;
  }
};

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const authDispatch = useDispatch();
  const [isReload, setIsReload] = useState(true);
  const [state, dispatch] = useReducer(JWTReducer, initialState);
  console.log("Authproivder first");
  // const getUser = async (acc) => {
  //   const response = await axios.get(
  //     "http://127.0.0.1:3001/users/get_user_from_token",
  //     {
  //       headers: { "Authorization ": `Bearer ${acc}` },
  //     }
  //   );
  //   console.log("Inside get user", response);
  //   return response.data;
  // };
  // if (isReload) {
  //   const us = getUser();
  //   console.log("got user", us);
  //   // const us = JSON.parse(window.localStorage.getItem("user"));
  //   if (us) {
  //     console.log(us);
  //     dispatch({
  //       type: INITIALIZE,
  //       payload: {
  //         isAuthenticated: true,
  //         isInitialized: true,
  //         user: { ...us },
  //       },
  //     });
  //   }

  //   setIsReload(false);
  // }

  //this one
  useEffect(() => {
    console.log("useEffect inside");
    const initialize = async () => {
      console.log("initialzing from initialize");
      try {
        const accessToken = window.localStorage.getItem("accessToken");
        const userAccessToken = window.localStorage.getItem("userAccessToken");
        const userId = window.localStorage.getItem("userId");

        if (accessToken && isValidToken(accessToken)) {
          console.log("JWT checks what is set as token ", accessToken);
          authDispatch(setToken(accessToken));
          setSession(accessToken);
          console.log("isvalid");

          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}users/get_user_from_token`,
            {
              headers: { "Authorization ": `Bearer ${accessToken}` },
            }
          );

          console.log("User from token", response);
          console.log("token valid going to api");
          const { user } = response.data;
          console.log("JWT INITIALIZE USER: ", user);

          // dispatch({
          //   type: INITIALIZE,
          //   payload: {
          //     isAuthenticated: true,
          //     user: { ...user },
          //   },
          // });
        } else if (userAccessToken) {
          console.log("JWTContext: Found voter token :", userAccessToken);
          console.log("JWTContext: Found userId: ", userId);
          authDispatch(setUserToken(userAccessToken));
          authDispatch(setUserId(userId));
          setSession(userAccessToken);
        } else {
          console.log("token not found or invalid");
          dispatch({
            type: INITIALIZE,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  //this one
  const signIn = async (email, password) => {
    axios.defaults.withCredentials = true;
    try {
      console.log("JWT sign in: ", email + password);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}users/login`,
        {
          params: { email, password },
        }
      );

      console.log("sign in", response);
      if (response.status === 200) {
        const { token, user } = response.data;
        window.localStorage.setItem("user", JSON.stringify(user));
        setToken(token);
        setSession(token);
        dispatch({ type: SIGN_IN, payload: { user } });
        console.log("JWT Context", token);
        return user;
      } else {
        console.log("res wasnt 200");
      }
    } catch (e) {
      console.log("sign in:", e.response);
      return e.response;
    }
  };

  const signOut = async () => {
    setSession(null);
    dispatch({ type: SIGN_OUT });
    dispatch(setToken(null));
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "jwt",
        signIn,
        signOut,
        // signUp,
        // resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
