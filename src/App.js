import React from 'react';
import './app.scss';
import ScrollManager from './utils/ScrollManager';
import gsap, { ScrollToPlugin } from 'gsap/all';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Content from './components/content/Content';


export default class App extends React.Component
{
  constructor()
  {
    super();
    
    gsap.registerPlugin(ScrollToPlugin);
  }

  render() {
    return (
      <div className="app">
        <Header />
        <Content />
        <Footer />
        <ScrollManager />        
      </div>
    )
  } 
}