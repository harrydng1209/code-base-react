import { SVGProps } from 'react';

const IconRequired: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    className="tw-cursor-pointer tw-outline-none"
    fill="none"
    height="6"
    viewBox="0 0 5 6"
    width="5"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3.07031 0L2.75977 2.00391L4.3418 0.767578L4.93359 1.77539L3.02344 2.53125L4.93359 3.27539L4.3418 4.29492L2.75977 3.03516L3.07031 5.05078H1.85742L2.17383 3.04688L0.597656 4.2832L0 3.27539L1.91016 2.51953L0 1.77539L0.597656 0.767578L2.17383 2.00391L1.85742 0H3.07031Z"
      fill="#F04438"
    />
  </svg>
);

export default IconRequired;
