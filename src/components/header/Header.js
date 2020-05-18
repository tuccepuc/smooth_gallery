import React from 'react';
import './header.scss';
import { connect } from 'react-redux';
import gsap, { Cubic, Circ } from 'gsap';

class Header extends React.Component
{

    constructor(props)
    {
        super(props);

        this.backdrop = React.createRef();
        this.title = React.createRef();
        this.letters = [];
        this.characters = [];

        this.logo = React.createRef();
    }

    componentDidMount()
    {
        let letter = null;
        let character = null;

        if (this.title.current)
        {
            for (let i = 0; i < this.title.current.children.length; i++)
            {
                letter = this.title.current.children[i];
                character = letter.children[0];

                gsap.set(letter, {y: "50%"});
                gsap.set(character, {y: "110%"});

                this.letters.push(letter);
                this.characters.push(character);
            }
        }

        gsap.set(this.backdrop.current, {height: "100vh"});
        gsap.to(this.backdrop.current, {duration: 1.375, height: "50vh", ease: Circ.easeInOut, delay: .35});


        gsap.to(this.letters, {duration: 1, y:"0%", stagger: .025, ease: Circ.easeInOut, delay:.5})
        gsap.to(this.characters, {duration: .725, y:"10%", stagger: .025, ease: Cubic.easeInOut, delay:.75})
    }

    shouldComponentUpdate(nextProps, nextState)
    {
        if (this.props.smoothScroll.value !== nextProps.smoothScroll.value)
        {
            return true;
        }
        else
        {
            return false;
        }   
    }

    render()
    {
        if (this.title.current)
        {
            gsap.set(this.title.current, {y: -this.props.smoothScroll.value * .775});
            gsap.set(this.backdrop.current, {y: -this.props.smoothScroll.value * .6});
            
            gsap.set(this.logo.current, {y: -this.props.smoothScroll.value/5});
        }


        return(
            <div className="header">
                <div className="header-inner">
                    
                    <div ref={this.backdrop} className="backdrop"></div>
                    <div className="header-inner-content">
                        
                        <h3 className="dept" ref={this.logo}>DEPT</h3>
                        <div className="proto-align">
                            <div className="prototypes"> 
                                <h1 className="proto" ref={this.title}>
                                    <span className="proto-mask"><span className="proto-letter">P</span></span>
                                    <span className="proto-mask"><span className="proto-letter">R</span></span>
                                    <span className="proto-mask"><span className="proto-letter">O</span></span>
                                    <span className="proto-mask"><span className="proto-letter">T</span></span>
                                    <span className="proto-mask"><span className="proto-letter">O</span></span>
                                    <span className="proto-mask"><span className="proto-letter">T</span></span>
                                    <span className="proto-mask"><span className="proto-letter">Y</span></span>
                                    <span className="proto-mask"><span className="proto-letter">P</span></span>
                                    <span className="proto-mask"><span className="proto-letter">E</span></span>
                                    <span className="proto-mask"><span className="proto-letter">S</span></span>
                                </h1>                          
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidUpdate()
    {
        // gsap.set(this.backdrop, {y: -this.props.smoothScroll.value/2});
        // console.log("hi!", gsap);
    }
}
function mapStateToProps(state){
    return {
        smoothScroll: state.smoothScrollReducer,
    }
}

export default connect(mapStateToProps)(Header);