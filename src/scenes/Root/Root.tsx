import { FC } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userAtom from "recoil/user";
import { Auth } from "components";
import { Dashboard } from "../Dashboard";
import { Login } from "../Login";

const Logged: FC = () => {
  return (
    // TODO: add layout
    <Switch>
      <Route exact path="/dashboard" component={Dashboard} />
      <Redirect to="/dashboard" />
    </Switch>
  );
};

const NotLogged: FC = () => {
  return (
    // TODO: add layout
    <Switch>
      <Route exact path="/login" component={Login} />
      <Redirect to="/login" />
    </Switch>
  );
};

export const Root = () => {
  const user = useRecoilValue(userAtom);
  let Component;

  switch (user.isLogged) {
    case true:
      Component = Logged;
      break;
    case false:
    default:
      Component = NotLogged;
      break;
  }

  return (
    <Switch>
      <Route exact path="/auth" component={Auth} key="auth" />
      <Route component={Component} />
    </Switch>
  );
};
