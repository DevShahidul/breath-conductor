import React, { Component } from 'react';
import {TabWrap,TabNav, TabNavItem} from './Tab.elements';

class Tab extends Component {
    render(){
        return(
            <TabWrap>
                <TabNav className={this.props.tabExpanded ? 'expanded' : 'collapsed'}>
                    {this.props.tabs.map((tab, index) => {
                        const active = (tab === this.props.selected ? ' active ' : '');
                        return (
                            <TabNavItem key={index} className={'nav-item' + active} onClick={() => this.props.setSelected(tab)} >
                                {tab}
                            </TabNavItem>
                        )
                    })}
                </TabNav>
                { this.props.children }
            </TabWrap>
        )
    }
}

export default Tab;