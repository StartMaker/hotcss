import React from 'react';
import {Layout, Progress} from "antd";

const {Content} = Layout;

class HomeContent extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <Content>
                <p>免费午餐小善大爱</p>
                <p>达成目标竞猜娱乐场将为小朋友支持375000份午餐</p>
                <Progress strokeColor='rgb(236,79,60)' percent={60} format={() => "01期"}/>
                <div className='column'>
                    <div>
                        <p>爱心筹集目标数量</p>
                        <p>15,000,000</p>
                    </div>
                    <div>
                        <p>已筹集爱心数量</p>
                        <p>1,234,456</p>
                    </div>
                </div>
                <div className='column'>
                    <div>
                        <p>累计献出的爱心</p>
                        <p>5,600</p>
                    </div>
                    <div>
                        <p>为项目贡献</p>
                        <p>0.14</p>
                    </div>
                </div>
                <a>获取更多爱心 ></a>
            </Content>
        )
    }
}

export default HomeContent;