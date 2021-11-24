import { Route } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userAtom from "recoil/user";
import { Dashboard } from "../Dashboard";
import { Login } from "../Login";

export const Root = () => {
  const { isLogged } = useRecoilValue(userAtom);
  console.log(isLogged);

  return (
    <>
      {isLogged ? (
        <Route path="/" component={Dashboard} />
      ) : (
        <Route path="/login" component={Login} />
      )}
    </>
  );
};
