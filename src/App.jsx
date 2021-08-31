import { HashRouter as Router } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Root } from "scenes/Root";

import "assets/scss/App.scss";

const App = () => {
  return (
    <RecoilRoot>
      <Router>
        <Root />
      </Router>
    </RecoilRoot>
  );
};

export default App;
