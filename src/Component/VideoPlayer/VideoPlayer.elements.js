import styled from 'styled-components';
//import themeProp from '../../../components/utils/theme';


export const PlayerWrap = styled.div`
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background: #010a16;
    & > div.react-player{
        position: absolute;
        top: 0;
        left: 0;
    }
`;

export const PlayerLoader = styled.img`
    position: relative;
    display: block;
    width: 100%;
    z-index: 3;
`;
