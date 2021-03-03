import { Box } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import DetailsMobile from './DetailsMobile';
import DetailsDesktop from './DetailsDesktop'

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
}

const  useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    );
  
    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
  
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
    return windowDimensions;
  }

function Details() {
    // console.log(window.innerWidth)
    const { height, width } = useWindowDimensions();
    return (
        <Box>
            {width > 960 ? <DetailsDesktop /> : <DetailsMobile /> }
        </Box>
    )
}

export default Details