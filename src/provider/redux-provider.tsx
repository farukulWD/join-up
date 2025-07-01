"use client";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import MainProvider from "./main-provider";
import { PersistGate } from "redux-persist/integration/react";
interface Props {
  children?: React.ReactNode;
}
function ReduxProvider({ children }: Props) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <MainProvider>{children}</MainProvider>
      </PersistGate>
    </Provider>
  );
}

export default ReduxProvider;
