import React from 'react';
import {Layout} from 'antd';
import {render} from 'react-dom';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";

import 'hotcss/src/hotcss.js';
import './static/css/default.less';
import './styles.less';
import Home from './pages/homepage';
import NotFound from './components/notfound';


class Entry extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidCatch(error,info){
        console.log({
            error: error,
            info: info
        });
    }
    componentWillMount(){
        console.log(document.getElementById('root')._reactRootContainer);
    }
    render() {
        return (
            <Router>
                <Switch>
                    <Route component={Home} exact path='/'/>
                    <Route component={NotFound} path='*'/>
                </Switch>
            </Router>
        );
    }
}

render(
    <Entry/>,
    document.getElementById('root')
);

export default Entry;