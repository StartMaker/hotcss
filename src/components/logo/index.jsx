import React from 'react';
import logo from '../../static/images/logo.jpg';

class Logo extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <img src={logo} alt='logo' title='logo'/>
        )
    }
}

export default Logo;