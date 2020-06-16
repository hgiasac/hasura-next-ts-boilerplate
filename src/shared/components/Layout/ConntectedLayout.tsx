import * as React from "react";
import { useDispatch } from "react-redux";
import { actionUnauthenticate, actionAuthenticate } from "../../../store/global/actions";
import { authProvider } from "../../auth";
// import registerServiceWorker from "../../service-worker";
type Props = {

};

// this component initialize client side data 
const ConnectedLayout: React.FunctionComponent<Props> = ({
  children
}) => {

  const dispatch = useDispatch();

  React.useEffect(() => {
    // check authentication from cache
    void authProvider.getUser().then((user) => {

      if (user) {
        dispatch(actionAuthenticate(user));
      } else {
        dispatch(actionUnauthenticate);
      }
    });
    // register service worker
    // registerServiceWorker();
  }, []);

  return (
    <div>
      {children}
    </div>
  );
};

export default ConnectedLayout;
