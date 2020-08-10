import dynamic from 'next/dynamic';
const ReactTooltip = dynamic(() => import('react-tooltip'), {
  ssr: false,
});

const Tooltip = ({ id }: {id: string}) => {
  return ( 
    <ReactTooltip
      id={id}
      effect="solid"
      backgroundColor="#2C2C2C"
    />
  );
};

export default Tooltip;
