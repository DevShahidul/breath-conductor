import styled from 'styled-components';


export const TabWrap = styled.div`
    width: 100%;
`;

export const TabNav = styled.ul`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 14px 15px;
    border-bottom: 1px solid #333;
`;

export const TabNavItem = styled.li`
    display: block;
    font-size: 16px;
    position: relative;
    margin-right: 25px;
    cursor: pointer;
    &:last-child{
        margin-right: 0;
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