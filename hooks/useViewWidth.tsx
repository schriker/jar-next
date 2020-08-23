import { useEffect, useState } from 'react';

const useViewWidth = () => {
  const [viewWitdh, setViewWidth] = useState<number>(0);
  useEffect(() => {
    const resizeHandler = () => {
      const vw = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      );
      setViewWidth(vw);
    };
    window.addEventListener('resize', resizeHandler);
    resizeHandler();
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return viewWitdh;
};

export default useViewWidth;
