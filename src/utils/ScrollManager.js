import React from 'react';
import { scrollSlice } from './scroll/ScrollSlice';
import { connect } from 'react-redux';
import { gsap } from 'gsap/gsap-core';
import { smoothScrollSlice } from './scroll/SmoothScroll';

class ScrollManager extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            scrollCurrent:0,
            scrollSpeed:10,
        }
    }

    componentDidMount()
    {
        window.onwheel = (e) => {

            this.props.dispatch(scrollSlice.actions.updateScroll(e.deltaY));
        }

        // add gsap scroll ticker
        gsap.ticker.add((time, delta, frame, elapsed) => {

            let to = this.state.scrollCurrent + ((this.props.scroller.value - this.state.scrollCurrent) / this.state.scrollSpeed);

            if (to !== this.state.scrollCurrent)
            {
                this.setState({
                    scrollCurrent: to
                });
    
                this.props.dispatch(smoothScrollSlice.actions.calculatedScroll(to));
            }

             
            window.scroll(0, this.state.scrollCurrent);
        });
    }


    shouldComponentUpdate(nextProps, nextState)
    {
        if (this.props.scroller.value !== nextProps.scroller.value)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    componentDidUpdate()
    {
        // console.log("did update");   
    }

    componentWillUnmount()
    {
        // console.log("test unmounted");
    }

    render()
    {
        // console.log("render");

        return null;
    }
}

function mapStateToProps(state){
    return {
        scroller: state.scrollReducer,
    }
}

export default connect(mapStateToProps)(ScrollManager);