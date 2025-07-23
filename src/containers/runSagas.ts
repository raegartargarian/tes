import { globalSaga } from "../containers/global/saga";
import { runSaga } from "../store/configureStore";

export const runSagas = () => {
  runSaga(globalSaga);
};
