import { SVGProps } from 'react';

const IconVietnamese: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    className="tw-cursor-pointer tw-outline-none"
    height="24"
    style={{ borderRadius: '50%', overflow: 'hidden' }}
    viewBox="0 0 512 512"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <clipPath id="a">
        <path d="M0 0h512v512H0z" fillOpacity=".7" />
      </clipPath>
    </defs>
    <g clipPath="url(#a)" fillRule="evenodd">
      <path d="M0 0h512v512H0z" fill="#da251d" />
      <path
        d="M256 133.3 278.5 210h78.4l-63.4 46 24.1 76.7L256 286.7l-61.6 46 24.1-76.6-63.5-46h78.5z"
        fill="#ff0"
      />
    </g>
  </svg>
);

export default IconVietnamese;
