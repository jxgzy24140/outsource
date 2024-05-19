import React from "react";
import withRouter from "./withRouter";
import { inject, observer } from "mobx-react";
import Stores from "@/stores/storeIdentifier";
import { autorun } from "mobx";
import { appLayouts, authLayouts } from "./router.config";

const AdminProtectedRoute = inject(Stores.AuthenticationStore)(
  observer(({ children, ...props }: any) => {
    const { navigate, authenticationStore } = props;

    autorun(() => {
      if (!authenticationStore.isAuthenticated) {
        return navigate(`/auth/${authLayouts.login.path}`);
      }
      if (authenticationStore.userProfile.roleId != 2) {
        return navigate(`/${appLayouts.home.path}`);
      }
    });

    return <>{children}</>;
  })
);

export default withRouter(AdminProtectedRoute);
