import cs from "classnames";
import Image from "next/image";
import React from "react";

export const placeholder = "/icons/stop.svg";

const LoadImage = (props) => {
  let image = (
    <Image
      {...props}
      layout="fill"
      placeholder="blur"
      blurDataURL={props.placeholder}
      src={props.placeholder}
      className=""
    />
  );

  if (props.src) {
    image = (
      <Image
        {...props}
        layout="fill"
        src={props.src}
        placeholder="blur"
        blurDataURL={props.placeholder}
        className=""
      />
    );
  }

  return <div className={cs(props.className)}>{image}</div>;
};

export default LoadImage;
