import { createContext, useEffect, useState, useReducer } from "react";
import useAppDispatch from "./../hooks/useAppDispatch";
import {
  setToken,
  setAdmin,
  setAdminToken,
  setInititalizing,
} from "../redux/slices/authSlice";
import { Spinner } from "react-bootstrap";
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
  const [isLoading, setLoading] = useState(true);
  const [state, dispatch] = useReducer(JWTReducer, initialState);
  const authDispatch = useAppDispatch();
  console.log("INitializing from init");
  authDispatch(setInititalizing(true));

  useEffect(() => {
    const initialize = async () => {
      console.log("initialzing from initialize");
      try {
        //get token from local storage
        const token = window.localStorage.getItem("afya_token");
        console.log("Afya token cookie: ", token);

        //reach out to api to see if the token is still valid
        const validityCheck = await axios.get(
          `${process.env.REACT_APP_API_URL}user`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
          null
        );

        console.log("Resonse from validity check: ", validityCheck);

        //if valid set the user and is authenticated
        if (validityCheck.status === 200) {
          const user = validityCheck.data;
          console.log("Valid user: ", user);
          dispatch({
            type: INITIALIZE,
            payload: {
              isAuthenticated: true,
              user,
            },
          });
          authDispatch(setAdmin(user));
          authDispatch(setToken(token));
          authDispatch(setInititalizing(false));

          console.log("Finished init");
          setLoading(false);
        } else if (validityCheck.status === 401) {
          console.log("Is timedout");
          dispatch({
            type: INITIALIZE,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
          setLoading(false);
        } else {
          dispatch({
            type: INITIALIZE,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
          setLoading(false);

          authDispatch(setInititalizing(false));
        }

        //if not valid redirect to login page
      } catch (err) {
        console.log("Init error", err);
        dispatch({
          type: INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
        setLoading(false);

        authDispatch(setInititalizing(false));
      }
    };

    initialize();
  }, []);

  const get_csrf = async () => {
    // axios.defaults.withCredentials = true;
    const csrf = await axios
      .get("https://apis.sema.co.tz/sanctum/csrf-cookie")
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };

  const signIn = async (email, password) => {
    // axios.defaults.withCredentials = true;
    try {
      console.log("JWT sign in: ", email + password);
      //first getting csrf token
      const csrf_token = await axios.get(
        `https://api.afya-awards.tz/sanctum/csrf-cookie`
      );
      console.log("CSRF TOKEN", csrf_token);

      //singing in
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}users/login`,
        null,
        {
          params: { email: email, password: password },
        }
      );

      console.log("sign in", response);
      if (response.status === 200) {
        const { token, user } = response.data;
        window.localStorage.setItem("user", JSON.stringify(user));
        window.localStorage.setItem("afya_token", token);
        console.log("JWT: ", token);
        authDispatch(setAdminToken(token));
        authDispatch(setAdmin(user));
        authDispatch(setToken(token));
        setSession(token);
        dispatch({ type: SIGN_IN, payload: { user } });
        return user;
      } else {
        console.log("res wasnt 200");
      }
    } catch (e) {
      console.log("sign in:", e.response);
      return e.response;
    }
  };

  // const signIn = async (email, password) => {
  //   // axios.get().then((response) => {
  //   //   // Login...
  //   // });
  //   const csrf = await axios.get(
  //     "http://localhost/semaapi/public/sanctum/csrf-cookie"
  //   );
  //   const response = await axios.get(
  //     "http://localhost/semaapi/public/api/loginuser",
  //     {
  //       params: { email: "baraka@aimfirms.com", password: "LoginPass123" },
  //     }
  //   );

  //   // console.log(response);
  //   // const response = await axios.post(
  //   //   "http://localhost/semaapi/public/api/loginuser/",
  //   //   {
  //   //     email,
  //   //     password,
  //   //   }
  //   // );
  //   console.log("singin", response);
  //   const { accessToken, user } = response.data;

  //   setSession(accessToken);
  //   dispatch({
  //     type: SIGN_IN,
  //     payload: {
  //       user,
  //     },
  //   });
  // };

  const signOut = async () => {
    setSession(null);
    window.localStorage.removeItem("afya_token");
    dispatch({ type: SIGN_OUT });
  };

  const signUp = async (
    email,
    password,
    first_name,
    last_name,
    phone_number
  ) => {
    const response = await axios.post("register_new_client", {
      email,
      password,
      first_name,
      last_name,
      phone_number,
    });
    console.log(response);
    // const { accessToken, user } = response.data;

    // window.localStorage.setItem("accessToken", accessToken);
    // window.localStorage.setItem("user", user);
    // dispatch({
    //   type: SIGN_UP,
    //   payload: {
    //     user,
    //   },
    // });
  };

  const resetPassword = async (email) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}reset_password_request`,
      { email }
    );
    console.log("Password reset: ", response);
  };

  if (isLoading) {
    return (
      <div className="h-100 d-flex align-items-center justify-content-center">
        <h3 className="text-center">
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />{" "}
          Loading...
        </h3>
      </div>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "jwt",
        signIn,
        signOut,
        signUp,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
