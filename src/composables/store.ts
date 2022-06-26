import {useStore as useVuexStore} from 'vuex';
import {key} from '@store';

const useStore = () => {
  const store = useVuexStore(key);
  return store;
};

export default useStore;
