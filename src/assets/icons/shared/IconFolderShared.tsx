import { SVGProps } from 'react';

const IconFolderShared: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    className="tw-cursor-pointer tw-outline-none"
    fill="currentColor"
    height="24"
    viewBox="0 -960 960 960"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M440-280h320v-22q0-45-44-71.5T600-400q-72 0-116 26.5T440-302v22Zm160-160q33 0 56.5-23.5T680-520q0-33-23.5-56.5T600-600q-33 0-56.5 23.5T520-520q0 33 23.5 56.5T600-440ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H447l-80-80H160v480Zm0 0v-480 480Z" />
  </svg>
);

export default IconFolderShared;
