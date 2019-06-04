import React, {Component} from 'react';
import Header from "./Header.js";
import SearchForm from "./SearchForm.js";
import DisplayResults from "./DisplayResults.js";
import EmailForm from "./EmailForm.js";
import EmailSent from "./EmailSent.js";
import Footer from "./Footer.js"
import './App.scss';

class App extends Component {
  render(){
    return (
      <div className="App">
        <Header/>
        <SearchForm/>
        <DisplayResults/>
        <EmailForm/>
        <EmailSent/>
        <Footer/>
      </div>
    );
  }
}

export default App;
