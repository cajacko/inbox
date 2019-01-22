import Store from 'src/lib/modules/Store';
import reducers from 'src/lib/store/reducers';
import appLoading from 'src/lib/utils/appLoading';
import Storage from 'src/modules/Storage';

const store = new Store(reducers, undefined, { shouldLogState: true });

const waitForID = 'redux-store';
appLoading.register(waitForID);

store.persistStore(Storage).then(() => {
  appLoading.resolve(waitForID);
});

export default store;
