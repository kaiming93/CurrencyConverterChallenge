import React from "react";
import { IImageProps } from "./IImage";
import logo from '../../img/No_image.svg'

const Image: React.FC<IImageProps> = (props: IImageProps) => {
  const [failed, setFailed] = React.useState<boolean>(false);
  React.useEffect(() => {
    let isMounted = false;
    if (!isMounted) {
    setFailed(false)
  } 
  return () => {
    isMounted = true;
  };
  },[props.src]);
  return (
    <div className="image" data-testid="image">
        <img className="image_tag" src={failed?logo:props.src} alt={props.alt} onError={() => { setFailed(true)} }/>
    </div>
  );
};

export default Image;
