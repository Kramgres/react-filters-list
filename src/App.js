/*import './App.css';*/
import './App.scss'
import {BrowserRouter} from "react-router-dom";
import {Redirect, Route} from "react-router";
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
