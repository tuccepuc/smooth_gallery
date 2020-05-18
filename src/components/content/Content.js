import React from 'react';

import './content.scss'
import { connect } from 'react-redux';
import BaseEntry from './entry/BaseEntry';
import { contentMapSlice } from './ContentMapSlice';

class Content extends React.Component
{
    constructor(props)
    {
        super(props);

        this.content = React.createRef();
    }

    shouldComponentUpdate(nextProps, nextState)
    {
        if (nextProps.smoothScroll.value !== this.props.smoothScroll.value)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    componentDidMount()
    {
        // empty
        if (this.content.current)
        {
            // console.log(this.content.current.offsetTop);
            // console.log(this.content.current.offsetHeight);            
        }
    }

    render()
    {
        return(
            <div className="content" ref={this.content}>
                <div className="content-row">
                    <BaseEntry id = "0" imageName="florensis" offset="-10%" from=".15" to=".45"/>
                    <BaseEntry id = "1" imageName="chocomel" offset="10%" from=".3" to=".6" />
                    <BaseEntry id = "2" imageName="philips" offset="-10%" from=".45" to=".8"/>
                    <BaseEntry id = "3" imageName="tui" offset="15%" from=".6" to="1"/>
                    <BaseEntry id = "4" imageName="gemeentemuseum" offset="-5%" from=".8" to="1.15"/>
                </div>
            </div>
        );
    }

    componentDidUpdate()
    {
        let progress = (this.props.smoothScroll.value) / (this.content.current.offsetHeight);
        this.props.dispatch(contentMapSlice.actions.mapProgress(progress));
    }
}

function mapStateToProps(state){
    return {
        smoothScroll: state.smoothScrollReducer,
    }
}

export default connect(mapStateToProps)(Content);