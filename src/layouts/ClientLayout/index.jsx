import { Route } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';

import Header from '../../components/clients/Header';
import Footer from '../../components/clients/Footer';
import ModalLogin from '../../components/clients/ModalLogin';

function ClientLayout({ exact, path, component: Component }) {
  const [showModalLogin, setShowModalLogin] = useState(false);

  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => {
        return (
          <div>
            <Header
              showModalLogin={showModalLogin}
              setShowModalLogin={setShowModalLogin}
            />
            <ModalLogin visible={showModalLogin} setVisible={setShowModalLogin} />
            <Component {...routeProps} setShowLogin={setShowModalLogin} />
            <Footer />
          </div>
        );
      }}
    />
  );
}

export default ClientLayout;

ClientLayout.propTypes = {
  exact: PropTypes.bool,
  path: PropTypes.string,
  component: PropTypes.func,
};
