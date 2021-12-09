export interface IButtonProps {
    title?: string;
    logo?: string;
    logoWidth?: string;
    clickFunc: (event:any) => void;
    keyDown?: (event:any) => void;
    className?: string;
  }