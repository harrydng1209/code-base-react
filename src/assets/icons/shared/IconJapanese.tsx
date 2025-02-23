import { SVGProps } from 'react';

const IconJapanese: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    className="tw-cursor-pointer tw-outline-none"
    height="24"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle
      cx="12"
      cy="12"
      fill="#FFF"
      r="11.5"
      stroke="black"
      strokeWidth="0.5"
    />
    <circle cx="12" cy="12" fill="#D52B1E" r="5" />
  </svg>
);

export default IconJapanese;
