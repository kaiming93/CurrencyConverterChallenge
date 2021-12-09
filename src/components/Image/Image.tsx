import React from "react";
import { IImageProps } from "./IImage";
import logo from '../../img/No_image.svg'

const Image: React.FC<IImageProps> = (props: any) => {
  const [failed, setFailed] = React.useState<any>(false);
  return (
    <div className="image blur" data-testid="image">
      {failed ? (
         <img data-testid="invalid-image" className="image_invalid blur" src={logo} width="48px"/>
      ) : (
        <img data-testid="valid-image" className="image_valid blur" src={props.src} onError={() => setFailed(true)} />
      )}
    </div>
  );
};

export default Image;
