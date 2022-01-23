import { Route, Switch } from "react-router-dom";
import { Dashboard } from "../Dashboard";
import { Login } from "../Login";

export const Root = () => {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route path="/" component={Dashboard} />
    </Switch>
  );
};
