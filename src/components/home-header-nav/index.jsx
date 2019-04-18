import React from 'react';
import {Layout} from "antd";

const {Header} = Layout;

import nav from '../../static/images/nav.jpg';
import Logo from '../logo';

class Nav extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <Header>
                <Logo/>
                <img src={nav} alt='nav' title='nav'/>
            </Header>
        )
    }
}

export default Nav;