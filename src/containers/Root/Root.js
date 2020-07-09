import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import VariationsMainView from '../VariationsMainView/VariationsMainView';
import { PersistGate } from 'redux-persist/integration/react';
import { useLocation } from "react-router-dom";

const Root = ({
  store,
  persistor,
  callback,
  hasResource,
  noFooter,
  noHeader,
  noSourceLink,
}) => {
  const location = useLocation();
  console.log(location.state)
  try {
    return (
      <Provider store={store}>
        <PersistGate loading="loading..." persistor={persistor}>
          <VariationsMainView
            callback={callback}
            hasResource={hasResource}
            noFooter={noFooter}
            noHeader={noHeader}
            noSourceLink={noSourceLink}
            audio_url={location.state}
          />
        </PersistGate>
      </Provider>
    );
  } catch (err) {
    return <div>{err}</div>;
  }
};

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
