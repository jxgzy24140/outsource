import Router from "@/components/Layout/Router";
import { inject } from "mobx-react";
import Stores from "./stores/storeIdentifier";
import AuthenticationStore from "./stores/authenticationStore";
import withRouter from "./components/Layout/Router/withRouter";
import { useEffect } from "react";
import OrderStore from "./stores/orderStore";

interface IProps {
  authenticationStore: AuthenticationStore;
  orderStore: OrderStore;
}

const App = inject(
  Stores.AuthenticationStore,
  Stores.OrderStore
)((props: IProps) => {
  useEffect(() => {
    const getAuth = async () => {
      await props.authenticationStore.getAuthentication();
    };
    getAuth();
  }, []);

  return <Router />;
});

export default withRouter(App);
