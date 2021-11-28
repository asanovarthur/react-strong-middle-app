import { useEffect, useState } from "react";
import { Route, useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userAtom from "recoil/user";
import { Dashboard } from "../Dashboard";
import { Login } from "../Login";

type RouteType = {
  path: string;
  component: React.ComponentType;
};

export const Root = () => {
  const history = useHistory();
  const { isLogged } = useRecoilValue(userAtom);
  const [route, setRoute] = useState<RouteType>({
    path: "",
    component: () => null,
  });

  useEffect(() => {
    setRoute(
      isLogged
        ? { path: "/", component: Dashboard }
        : { path: "/login", component: Login }
    );

    history.push(route.path);
  }, [history, isLogged, route.path]);

  return <Route path={route.path} component={route.component} />;
};
