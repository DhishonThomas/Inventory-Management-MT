import React from "react";

interface ButtonProps {
  text: string|React.ReactNode;
  onclick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  bgColor?: string;
  textColor?: string;
  fontSize?: string;
  paddingX?:string;
  paddingY?:string;
  marginY?:string;
  onHover?:string;
  widthFull?:string;
  padding?:string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onclick,
  type,
  disabled = false,
  bgColor: bgColour = "bg-button-gradient",
  textColor: textColour = "text-white",
  fontSize = "font-semibold",
  paddingX='px-5',
  paddingY='py-1',
  marginY='my-5',
  onHover='',
  widthFull="",
  padding="",
}) => {
  return (
    <button
      className={`${bgColour} ${padding} ${widthFull} ${onHover} ${textColour} ${fontSize} ${paddingX} ${paddingY} ${marginY} rounded-md`}
      type={type}
      onClick={onclick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
