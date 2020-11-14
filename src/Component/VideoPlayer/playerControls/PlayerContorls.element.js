import styled from 'styled-components';
//import themeProps from '../../../../components/utils/theme';
//import { transform } from '../../../../components/utils/style-util';

export const ControlsWrapper = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
`;

export const ControlWrapMiddle = styled.div`
    position: absolute;
    left: 0;
    top: 70px;
    width: 100%;
    height: calc(100% - 160px);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    cursor: pointer;
    &.played{
        &>button{
            transition: all .3s ease-in;
            transition-delay: .3s;
            opacity: 0;
            visibility: hidden
        }
    }
    &:hover{
        &.played{
            &>button{
                transition-delay: 0s;
                opacity: 1;
                visibility: visible
            }
        }
    }
    & > button{
        color: #ffffff;
    }
    & > button{
        &:nth-child(2){
            color: #1d1e23;
            background: #ffffff;
            &::before{
                content: "";
                width: 100%;
                height: 100%;
                border-radius: 50%;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%) scale(1.5);
                background: rgba(255, 255, 255, 0.2);
            }
        }
        
    }
    & > button{
        &:last-child{
            margin-left: 25px
        }
    }
    & > button{
        &:first-child{
            margin-right: 25px;
        }
    }
`;

export const ControlWrapBottom = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    width: 100%;
    padding: 0 15px 22px;
    background: #010f22;
    position: relative;
    & > .MuiGrid-container > .MuiGrid-item > .MuiGrid-container > button{
        color: #ffffff;
        padding: 0;
    }
    & > .MuiGrid-container > .MuiGrid-item > button{
        color: #ffffff;
        padding: 0;
    }
    & > .MuiGrid-container > .MuiGrid-item > .MuiSlider-colorPrimary {
        color: #4e5661;
    }
    & > .MuiGrid-container > .MuiGrid-item > .MuiSlider-colorPrimary > .MuiSlider-thumb {
        background-color: #ffffff;
    }
`;

export const SkipIntro = styled.button`
    background: transparent;
    border: 1px solid #787878;
    padding: 8px;
    display: block;
    cursor: pointer;
    top: -52px;
    right: 14px;
    position: absolute;
    font-size: 10px;
    text-transform: uppercase;
    color: #ffffff;
    &:focus{
        outline: none;
    }
`;