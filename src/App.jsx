import { HashRouter as Router } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Root } from "scenes/Root";
import { Dashboard } from "scenes/Dashboard";
import { Auth } from "components/Auth";

import "assets/scss/App.scss";

const App = () => {
  return (
    // <RecoilRoot>
    //   <Auth>
    //     <Router>
    //       <Root />
    //     </Router>
    //   </Auth>
    // </RecoilRoot>
    <Dashboard />
  );
};

export default App;
