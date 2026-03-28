import React, {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import ReactDOM from "react-dom";

interface ModalContextValue {
  openModal: (content: ReactNode, onRequestClose?: () => void) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
}

export default function ModalProvider({ children }: PropsWithChildren<{}>) {
  const [content, setContent] = useState<ReactNode | null>(null);
  const [open, setOpen] = useState(false);
  const [onRequestClose, setOnRequestClose] = useState<(() => void) | null>(
    null
  );
  const tDelay = 50;

  const openModal = (node: ReactNode, onClose?: () => void) => {
    setContent(node);
    setOnRequestClose(() => onClose || null);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open) return;
    if (!content) return;
    const timeout = setTimeout(() => {
      setContent(null);
      setOnRequestClose(null);
    }, tDelay);
    return () => clearTimeout(timeout);
  }, [open, content]);

  const ctxValue = useMemo(() => ({ openModal, closeModal }), []);

  const handleDismiss = () => {
    onRequestClose?.();
    closeModal();
  };

  return (
    <ModalContext.Provider value={ctxValue}>
      <>
      {children}
      {content && typeof window !== "undefined"
        ? ReactDOM.createPortal(
            <div className={`_modal_root ${open ? "open" : ""}`}>
              <div
                className="modal_underlay backdrop-blur"
                onPointerDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDismiss();
                }}
              ></div>
              <div
                className="modal_content"
                onPointerDown={(e) => e.stopPropagation()}
              >
                {content}
              </div>
              <style jsx>{`
                ._modal_root {
                  position: fixed;
                  inset: 0;
                  width: 100%;
                  height: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  z-index: 10000;
                }

                .modal_underlay {
                  position: fixed;
                  inset: 0;
                  width: 100%;
                  height: 100%;
                  background-color: rgba(0, 0, 0, 0.4);
                  opacity: 0;
                  transition: opacity ${tDelay / 1000}s;
                }

                .modal_content {
                  position: relative;
                  z-index: 1;
                  opacity: 0;
                  transition: opacity ${tDelay / 1000}s;
                }

                ._modal_root.open .modal_underlay,
                ._modal_root.open .modal_content {
                  opacity: 1;
                }
              `}</style>
            </div>,
            document.body
          )
        : null}
      </>
    </ModalContext.Provider>
  );
}
