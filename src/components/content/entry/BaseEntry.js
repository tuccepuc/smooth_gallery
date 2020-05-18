import React from 'react';
import './entry.scss';
import gsap, { Cubic, Circ, Back } from 'gsap';
import { connect } from 'react-redux';

class BaseEntry extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            visible: false
        };

        this.entry = React.createRef();
        this.entryWrapper = React.createRef();
        this.entryMask = React.createRef();
        this.entryImage = React.createRef();
    }

    componentDidMount()
    {
        if (this.entry.current)
        {
            gsap.set(this.entry.current, {alpha: 0, y: "100vh"});
            gsap.set(this.entryWrapper.current, {y: "30%"});
            gsap.set(this.entryMask.current, {y: "0%"});
        }
    }

    shouldComponentUpdate(nextProps, nextState)
    {
        if (this.props.contentMap.value !== nextProps.value)
        {
            let mapY = (window.innerHeight) - (((nextProps.contentMap.value - nextProps.from) / (nextProps.to - nextProps.from)) * (window.innerHeight + this.entry.current.offsetHeight));
                
            gsap.set(this.entry.current, {y: mapY, duration: 0, alpha: 1});

            if ((nextProps.from < nextProps.contentMap.value) && (nextProps.to > nextProps.contentMap.value))
            {                
                if (!this.state.visible)
                {
                    this.setState({
                        visible: true
                    }, () => {

                        let to;

                        if (nextProps.from < nextProps.contentMap.value)
                        {
                            to = "100%";
                        }
                        else
                        {
                            to = "-100%";                            
                        }
    
                        gsap.killTweensOf(this.entryMask.current);
                        gsap.killTweensOf(this.entryWrapper.current);
                        gsap.to(this.entryMask.current, {y: to, duration: .5, ease:Circ.easeOut, delay: .2});
                        gsap.to(this.entryWrapper.current, {y: "-20%", duration: .6, ease:Cubic.easeOut, delay: 0});
                    });
                }
            }
            else
            {
                if (this.state.visible)
                {
                    this.setState({
                        visible: false
                    },() => {

                        let to;

                        if (nextProps.from < nextProps.contentMap.value)
                        {
                            to = "-70%";
                        }
                        else
                        {
                            to = "30%";                            
                        }

                        gsap.killTweensOf(this.entryMask.current);
                        gsap.killTweensOf(this.entryWrapper.current);
                        gsap.to(this.entryMask.current, {y: "0%", duration: .6, ease: Circ.easeIn});
                        gsap.to(this.entryWrapper.current, {y: to, duration: .9, ease: Cubic.easeIn});
                    });
                }
    
            }

            return true;
        }
        else
        {
            return false;
        }
    }

    handleMouseOver(e)
    {
        // console.log("handleOver", e);
        gsap.killTweensOf(this.entryImage.current);
    }

    handleMouseOut(e)
    {
        // console.log("handleOut");
        gsap.to(this.entryImage.current, {duration: .6275, x:0, y:0, transformPerspective: "50vw", rotationY: 0, rotateX: 0, ease:Back.easeInOut.config(2)})
    }

    handleMouseMove(e)
    {
        let w = e.nativeEvent.target.width;
        let h = e.nativeEvent.target.height;
        let x = e.nativeEvent.offsetX - w/2;
        let y = e.nativeEvent.offsetY - h/2;

        if (x && y)
        {
            gsap.to(this.entryImage.current, {duration: 0, x: x/2, y: y/2, transformPerspective: "50vw", rotationY: x / 15, rotateX: -y / 15})
        }
    }

    render()
    {
        return (
            <div ref={this.entry} className="entry" style={{transform: "translateX(" + this.props.offset + ")" }}>
                <div className="entry-wrapper" ref={this.entryWrapper} onMouseMove={(e) => this.handleMouseMove(e) } onMouseLeave={(e) => this.handleMouseOut(e) } onMouseEnter={(e) => this.handleMouseOver(e) }>
                    <div className="entry-wrapper-mask" ref={this.entryMask} />
                    <img className="entry-wrapper-image" ref={this.entryImage} alt={this.props.imageName} src={require('../../../assets/images/' + this.props.imageName + '.png')} />
                    <div className="entry-project">
                        <span className="entry-project-client">Clientname</span>
                        <span className="entry-project-name">Projectname</span>
                    </div>               
                </div>
            </div>
        )
    }

    componentDidUpdate()
    {
       // empty
    }
}

function mapStateToProps(state){
    return {
        contentMap: state.contentMapReducer,
    }
}

export default connect(mapStateToProps)(BaseEntry);