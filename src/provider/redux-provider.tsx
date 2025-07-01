"use client";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import MainProvider from "./main-provider";
interface Props {
  children?: React.ReactNode;
}
function ReduxProvider({ children }: Props) {
  return (
    <Provider store={store}>
      <MainProvider>{children}</MainProvider>
    </Provider>
  );
}

export default ReduxProvider;
