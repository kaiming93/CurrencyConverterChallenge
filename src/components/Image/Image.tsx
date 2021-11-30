import React from "react";
import { IImageProps } from "./IImage";
import logo from '../../img/No_image.svg'

const Image: React.FC<IImageProps> = (props: any) => {
  const [failed, setFailed] = React.useState<any>(false);
  return (
    <div className="image blur">
      {failed ? (
         <img src={logo} width="48px"/>
      ) : (
        <img src={props.src} onError={() => setFailed(true)} />
      )}
    </div>
  );
};

export default Image;
