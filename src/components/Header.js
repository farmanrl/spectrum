import React, { PropTypes } from 'react';
import Toolbar from './Toolbar';

const styles = {
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    margin: '0px 20px 0px 20px'
  },
  title: {
    width: 180,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#333'
  },
  search: {
    width: '50%'
  },
  buttons: {
    display: 'flex',
    width: 300,
    margin: 10,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
};

const logo = 'https://lh5.ggpht.com/LdeTCmBgU2a7wTwDB_zYR-ltq9PTWTWR2NCx_Ad9FoNaSaPMNCDJBBnaoM2QeLop5YXS=w300';

const Header = ({ authenticated, signOut }) => {
  return (
    <div style={styles.toolbar}>
      <div style={styles.title}>
        <img src={logo} width={36} height={36} role="presentation" />
        <h2>Spectrum</h2>
      </div>
      {authenticated ? <button className="btn" onClick={signOut}>Sign out</button> : null}
      <Toolbar />
    </div>
  );
};

Header.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired
};

export default Header;
