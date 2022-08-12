import Image from "next/image";
import React from "react";

export const placeholder = "/icons/neumorphic_mold_cast_in.svg";

const LoadImage = (props) => {
  return (
    <div className={props.className}>
      {props.src ? (
        <Image
          {...props}
          layout="responsive"
          src={props.src}
          placeholder="blur"
          blurDataURL={props.placeholder}
          width={200}
          height={200}
          className="hi-there"
        />
      ) : (
        <Image
          {...props}
          layout="responsive"
          placeholder="blur"
          blurDataURL={props.placeholder}
          width={200}
          height={200}
          src={props.placeholder}
          className=""
        />
      )}
    </div>
  );
};

export default LoadImage;
