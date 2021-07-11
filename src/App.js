import './App.scss'
import {BrowserRouter} from "react-router-dom";
import {Route} from "react-router";
import Header from "./components/Header/Header";
import CommentsContainer from "./components/Comments/CommentsContainer";

function App() {
  return (
      <BrowserRouter>
          <Header/>
          <Route path='/' render={() => <CommentsContainer/>}/>
      </BrowserRouter>
  );
}

export default App;
