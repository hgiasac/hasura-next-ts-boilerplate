import * as React from "react";
import { useDispatch } from "react-redux";
import { useApolloClient } from "@apollo/client";
import { actionUnauthenticate, actionAuthenticate, actionInitialLoad } from "../../../store/global/actions";
import { withAuthProvider } from "../../auth";
import { FirebaseApp } from "../../vendor/firebase";

type Props = {

};

// this component initialize client side data 
const ConnectedLayout: React.FunctionComponent<Props> = ({
  children
}) => {

  const dispatch = useDispatch();
  const apolloClient = useApolloClient();

  React.useEffect(() => {

    void FirebaseApp().auth().onAuthStateChanged((authUser) => {
      if (!authUser) {
        dispatch(actionInitialLoad(false));

        return dispatch(actionUnauthenticate);
      }

      // check authentication from cache
      void withAuthProvider({ apolloClient }).getUser()
        .then((user) => {
          dispatch(actionInitialLoad(false));
          if (user) {
            dispatch(actionAuthenticate(user));
          } else {
            return dispatch(actionUnauthenticate);
          }
        });
    });

  }, []);

  return (
    <div>
      {children}
    </div>
  );
};

export default ConnectedLayout;
