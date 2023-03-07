import React, { useState, useEffect } from "react";

interface Props {
  message: string;
  duration?: number;
}

function Toast({ message, duration = 3000 }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timeout = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timeout);
  }, [message]);

  return (
    <div className="mold">
      {message}
      <style jsx>{`
        div {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          padding: 10px;
          z-index: 11;
          animation: slideUp 0.5s ease-in-out;
        }

        @keyframes slideUp {
          0% {
            bottom: -50px;
            opacity: 0;
          }
          100% {
            bottom: 20px;
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default Toast;
