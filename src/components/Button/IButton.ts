export interface IButtonProps {
    title?: string;
    text?: string;
    logo?: string;
    logoAlt?: string;
    clickFunc: (event:any) => void;
    keyDown?: (event:any) => void;
    className?: string;
  }