import { inject, observer } from "mobx-react";
import Stores from "@/stores/storeIdentifier";

interface IProps {}
const Profile = inject(Stores.ProductStore)(
  observer((props: IProps) => {
    return <h1>Profile</h1>;
  })
);

export default Profile;
