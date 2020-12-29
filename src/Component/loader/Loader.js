import React from 'react';
import { LoopCircleLoading } from 'react-loadingg';

const Loader = () => {
  
    
    return (
		<div className="loader">
			<LoopCircleLoading style={{width: '80px', height: '80px'}} />
			{/* <ReactSonic fillColor="#05E2FF" width="100" height="100" />
			<ReactArcSonic fillColor="#FF00FF" width="50" height="50" /> */}
			{/* {Sonic(element)} */}
		</div>
    )
}
export default Loader;