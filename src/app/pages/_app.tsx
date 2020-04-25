import withReduxSaga from "next-redux-saga";
import withRedux from "next-redux-wrapper";
import { Provider } from "react-redux";
import createStore from "../store";

import "line-awesome/dist/line-awesome/css/line-awesome.min.css";
import "../styles/tailwind.css";

const MyApp = ({ Component, pageProps, store }) => (
  <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
);

export default withRedux(createStore)(withReduxSaga(MyApp));
