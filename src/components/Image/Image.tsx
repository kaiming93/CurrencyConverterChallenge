import React from "react";
import { IImageProps } from "./IImage";
import logo from '../../img/No_image.svg'

const Image: React.FC<IImageProps> = (props: any) => {
  const [failed, setFailed] = React.useState<any>(false);
  React.useEffect(() => {
    setFailed(false)
  }, []);
  return (
    <div className="image blur" data-testid="image">
        <img data-testid="image" className="image_valid blur" src={failed?logo:props.src} width="48px" onError={(e) => { e?setFailed(true):setFailed(false)} }/>
    </div>
  );
};

export default Image;
