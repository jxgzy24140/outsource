import React from "react";
import withRouter from "./withRouter";
import { inject, observer } from "mobx-react";
import Stores from "@/stores/storeIdentifier";
// import { appLayouts, authLayouts } from "./router.config";
// import { autorun } from "mobx";

const AdminProtectedRoute = inject(Stores.AuthenticationStore)(
  observer(({ children, ...props }: any) => {
    // const { navigate, authenticationStore } = props;

    // autorun(() => {
    //   if (!authenticationStore.isAuthenticated) {
    //     return navigate(`/auth/${authLayouts.login.path}`);
    //   }
    //   if (authenticationStore.userProfile.roleId == 1) {
    //     return navigate(`/${appLayouts.home.path}`);
    //   }
    // });

    return <>{children}</>;
  })
);

export default withRouter(AdminProtectedRoute);
