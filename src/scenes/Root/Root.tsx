import { Route, Switch, Redirect } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userAtom from "recoil/user";
import { useUserNotes } from "dataManagement";
import { Dashboard } from "../Dashboard";
import { Login } from "../Login";

export const Root = () => {
  useUserNotes();
  const { isLogged } = useRecoilValue(userAtom);

  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route path="/">
        {isLogged ? <Dashboard /> : <Redirect to="/login" />}
      </Route>
    </Switch>
  );
};
