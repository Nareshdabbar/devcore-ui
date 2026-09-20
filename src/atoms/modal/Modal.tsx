import {
  useEffect,
  useId,
  useRef,
  type DialogHTMLAttributes,
  type ReactNode,
} from "react";
import clsx from "clsx";
import styles from "./Modal.module.scss";

export type ModalPlacement =
  | "center"
  | "top"
  | "bottom"
  | "left"
  | "right";

export interface ModalProps
  extends Omit<DialogHTMLAttributes<HTMLDialogElement>, "open" | "onClose"> {
  open: boolean;
  title?: string;
  placement?: ModalPlacement;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({
  open,
  title,
  placement = "center",
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  onClose,
  children,
  className,
  id,
  "aria-label": ariaLabel,
  ...props
}: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (open && !dialog.open) {
      dialog.showModal();
    }

    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const handleCancel = (event: React.SyntheticEvent<HTMLDialogElement>) => {
    if (!closeOnEscape) {
      event.preventDefault();
      return;
    }

    onClose();
  };

  const handleClose = () => {
    if (open) {
      onClose();
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (!closeOnOverlayClick) {
      return;
    }

    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    const rect = dialog.getBoundingClientRect();

    const clickedOutside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;

    if (clickedOutside) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      id={id}
      className={clsx(
        styles.modal,
        styles[placement],
        className,
      )}
      aria-labelledby={title ? titleId : undefined}
      aria-label={title ? undefined : ariaLabel}
      onCancel={handleCancel}
      onClose={handleClose}
      onClick={handleClick}
      {...props}
    >
      {(title || showCloseButton) && (
        <header className={styles.header}>
          {title && (
            <h2 id={titleId} className={styles.title}>
              {title}
            </h2>
          )}

          {showCloseButton && (
            <button
              type="button"
              className={styles.closeButton}
              aria-label="Close dialog"
              onClick={onClose}
            >
              <span aria-hidden="true">x</span>
            </button>
          )}
        </header>
      )}

      <div className={styles.content}>{children}</div>
    </dialog>
  );
};

export default Modal;