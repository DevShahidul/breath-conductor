import styled from 'styled-components';


export const TabWrap = styled.div`
    width: 100%;
`;

export const TabNav = styled.ul`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 2px 15px;
`;

export const TabNavItem = styled.li`
    display: block;
    font-size: 26px;
    position: relative;
    margin-right: 86px;
    cursor: pointer;
    &:last-child{
        margin-right: 0;
    }
    &.active{
        font-weight: 700;
        color: #ffffff;
    }
    &.active::after{
        content: "";
        width: 100%;
        height: 3px;
        position: absolute;
        bottom: -16px;
        left: 0;
        background-color: transparent;
    }
    &>svg{
        margin-right: 15px;
        font-size: 16px;
    }
`;

export const TabContentWrap = styled.div`
    width: 100%;
    @media only screen and (min-width: 480px) and (max-width: 767px){
        max-height: ${props => (props.showHeader ? '100vh' : '100vh' )};
    }
`;