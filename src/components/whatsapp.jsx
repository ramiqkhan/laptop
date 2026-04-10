import React from "react";
import whatsappIcon from "../assets/OIP1.jfif";

const WhatsAppButton = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href="https://wa.me/923092794449"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 flex items-center justify-center rounded-full shadow-md hover:scale-105 transition overflow-hidden"
      >
        <img
          src={whatsappIcon}
          alt="WhatsApp"
          className="w-full h-full object-cover"
        />
      </a>
    </div>
  );
};

export default WhatsAppButton;