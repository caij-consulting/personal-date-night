import React, {Component} from 'react';
import Header from "./Components/Header.js";
import SearchForm from "./Components/SearchForm.js";
import DisplayResults from "./Components/DisplayResults.js";
import EmailForm from "./Components/EmailForm.js";
import EmailSent from "./Components/EmailSent.js";
import Footer from "./Components/Footer.js"
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
