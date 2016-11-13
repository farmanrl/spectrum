import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { authActions } from '../redux/auth';

export function SignIn({ signInWithGithub, signInWithGoogle, signInWithTwitter }) {
  return (
    <div>
      <h1 >Sign in</h1>
      <button onClick={signInWithGithub}>GitHub</button>
      <button onClick={signInWithGoogle}>Google</button>
      <button onClick={signInWithTwitter}>Twitter</button>
    </div>
  );
}

SignIn.propTypes = {
  signInWithGithub: PropTypes.func.isRequired,
  signInWithGoogle: PropTypes.func.isRequired,
  signInWithTwitter: PropTypes.func.isRequired
};

export default connect(null, authActions)(SignIn);
