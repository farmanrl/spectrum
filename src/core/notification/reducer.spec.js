import { DELETE_PROJECT_SUCCESS } from 'src/core/projects';

import {
  DISMISS_NOTIFICATION
} from './action-types';

import { notificationReducer } from './reducer';


describe('Notification reducer', () => {
  describe('DELETE_PROJECT_SUCCESS', () => {
    it('should return correct state', () => {
      let nextState = notificationReducer(undefined, {
        type: DELETE_PROJECT_SUCCESS,
        project: {}
      });

      expect(nextState.actionLabel).toBe('Undo');
      expect(nextState.display).toBe(true);
      expect(nextState.message).toBe('Project deleted');
    });
  });


  describe('DISMISS_NOTIFICATION', () => {
    it('should return correct state', () => {
      let nextState = notificationReducer(undefined, {
        type: DISMISS_NOTIFICATION
      });

      expect(nextState.actionLabel).toBe('');
      expect(nextState.display).toBe(false);
      expect(nextState.message).toBe('');
    });
  });
});
