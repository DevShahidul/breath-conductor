import React, { Component } from 'react';
import { TabContentWrap } from './Tab.elements';

class TabContent extends Component {
    render() {
        if(this.props.isSelected){
            return(
                <TabContentWrap showHeader={this.props.showHeader}>
                    {this.props.children}
                </TabContentWrap>
            )
        }

        return null;
    }
}

export default TabContent;
