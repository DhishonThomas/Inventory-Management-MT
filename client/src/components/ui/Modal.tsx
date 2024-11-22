import React from "react";
import Button from "./Button";
import Card from "./Card"

interface ModalProps {
  isVisible: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  roundedLg?: boolean;
  itemsCenter?: boolean;
  roundedMd?: boolean;
  maxWidthMd?: boolean;
  maxWidthMin?: boolean;
  maxWidthMax?: boolean;
  maxWidth2Xl?: boolean;
  maxWidth3Xl?: boolean;
  maxWidth4Xl?: boolean;
  maxWidth5Xl?: boolean;
  maxWidth6Xl?: boolean;
  maxWidth7Xl?: boolean;
  maxWidthXl?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isVisible,
  title,
  children,
  onClose,
  itemsCenter=false,
  roundedMd = false,
  roundedLg = false,
  maxWidthMd = false,
  maxWidthXl = false,
  maxWidth2Xl = false,
  maxWidth3Xl = false,
  maxWidth4Xl = false,
  maxWidth5Xl = false,
  maxWidth6Xl = false,
  maxWidth7Xl = false,
  maxWidthMin = false,
  maxWidthMax = false,
}) => {
  if (!isVisible) return null;

  return (
    <Card
      fixed
      defaultClassName="inset-0 z-50"
      bgColour="bg-black"
      bgOpacity="bg-opacity-50"
      itemsCenter
      flex
      justifyCenter
    >
      <Card
        bgColour="bg-login-background"
        padding="8"
        roundedMd={roundedMd}
        itemsCenter={itemsCenter}
        widthFull
        roundedLg={roundedLg}
        maxWidth2Xl={maxWidth2Xl}
        maxWidth3Xl={maxWidth3Xl}
        maxWidth4Xl={maxWidth4Xl}
        maxWidth5Xl={maxWidth5Xl}
        maxWidth6Xl={maxWidth6Xl}
        maxWidth7Xl={maxWidth7Xl}
        maxWidthMax={maxWidthMax}
        maxWidthMd={maxWidthMd}
        maxWidthMin={maxWidthMin}
        maxWidthXl={maxWidthXl}
      >
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <Card>{children}</Card>
        <Card marginT="4" flex justifyEnd>
          <Button
            text="Close"
            onclick={onClose}
            paddingX="px-4"
            bgColor="bg-gray-600"
          />
        </Card>
      </Card>
    </Card>
  );
};

export default Modal;
