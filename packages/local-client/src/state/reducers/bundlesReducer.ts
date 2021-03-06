import produce from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';

interface BundlesState {
  [key: string]:
    | {
        isBundling: boolean;
        code: string;
        err: string;
      }
    | undefined;
}

const initialState: BundlesState = {};

const reducer = (
  state: BundlesState = initialState,
  action: Action
): BundlesState => {
  switch (action.type) {
    case ActionType.BUNDLE_START: {
      state[action.payload.cellId] = {
        isBundling: true,
        code: '',
        err: '',
      };
      return state;
    }
    case ActionType.BUNDLE_COMPLETE: {
      state[action.payload.cellId] = {
        isBundling: false,
        code: action.payload.bundle.code,
        err: action.payload.bundle.err,
      };
      return state;
    }
    default:
      return state;
  }
};

export default produce(reducer);
