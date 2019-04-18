import React from 'react';
import {Layout} from "antd";
// import {hot} from 'react-hot-loader';

import Header from '../../components/home-header-nav';
import Content from '../../components/home-content';

class Homepage extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <Layout>
                <Header/>
                <Content/>
            </Layout>
        );
    }
}

export default Homepage;