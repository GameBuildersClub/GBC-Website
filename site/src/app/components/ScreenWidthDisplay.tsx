'use client'

import { useEffect, useState } from 'react';

function ScreenWidthDisplay() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    
    // Cleanup on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="text-xl font-mono p-4">
      Screen width: {width}px
    </div>
  );
}

export default ScreenWidthDisplay;