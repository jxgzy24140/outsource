import React from "react";
import withRouter from "./withRouter";
import { inject } from "mobx-react";
import Stores from "@/stores/storeIdentifier";

const ProtectedRoute = inject(Stores.AuthenticationStore)(
  ({ children }: any) => {
    // useEffect(() => {
    //   if (!sessionStorage.getItem("accessToken"))
    //     navigate(`/auth/${authLayouts.login.path}`);
    // }, []);
    return <>{children}</>;
  }
);

export default withRouter(ProtectedRoute);
