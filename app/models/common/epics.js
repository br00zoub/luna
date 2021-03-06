import { pipe } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';

import {
  getPackagesListener,
  searchPackagesListener,
  viewPackageListener,
  npmActionsListener
} from 'models/packages/actions';

import { npmToolsListener } from 'models/npm/actions';
import { initActions } from 'models/common/actions';

const onInitActionsEpic = pipe(
  ofType(initActions.type),
  mergeMap(() => [
    getPackagesListener(),
    searchPackagesListener(),
    viewPackageListener(),
    npmActionsListener(),
    npmToolsListener()
  ])
);

export default combineEpics(onInitActionsEpic);
