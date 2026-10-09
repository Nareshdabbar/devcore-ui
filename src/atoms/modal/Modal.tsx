"use client";

import {
  useEffect,
  useId,
  useRef,
  type DialogHTMLAttributes,
  type MouseEvent,
  type ReactNode,
  type SyntheticEvent,
} from "react";
import clsx from "clsx";
import styles from "./Modal.module.scss";

export type ModalPlacement = "center" | "top" | "bottom" | "left" | "right";

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

export interface ModalProps extends Omit<
  DialogHTMLAttributes<HTMLDialogElement>,
  "open" | "onClose" | "title"
> {
  open: boolean;
  title?: string;
  description?: string;
  header?: ReactNode;
  footer?: ReactNode;
  placement?: ModalPlacement;
  size?: ModalSize;
  showCloseButton?: boolean;
  closeIcon?: ReactNode;
  closeButtonAriaLabel?: string;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  onClose: () => void;
  children: ReactNode;
}

const DefaultCloseIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M6 6l12 12" />
    <path d="M18 6L6 18" />
  </svg>
);

const Modal = ({
  open,
  title,
  description,
  header,
  footer,
  placement = "center",
  size = "md",
  showCloseButton = true,
  closeIcon,
  closeButtonAriaLabel = "Close dialog",
  closeOnOverlayClick = true,
  closeOnEscape = true,
  onClose,
  children,
  className,
  id,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  ...props
}: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const wasOpenRef = useRef(false);
  const onCloseRef = useRef(onClose);

  onCloseRef.current = onClose;

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (open && !dialog.open) {
      dialog.showModal();
      wasOpenRef.current = true;
    } else if (!open && dialog.open) {
      wasOpenRef.current = false;
      dialog.close();
    }

    return () => {
      if (dialog.open) {
        dialog.close();
      }
    };
  }, [open]);

  const handleCancel = (event: SyntheticEvent<HTMLDialogElement>) => {
    if (!closeOnEscape) {
      event.preventDefault();
      return;
    }

    onCloseRef.current();
  };

  const handleClose = () => {
    if (wasOpenRef.current) {
      wasOpenRef.current = false;
      onCloseRef.current();
    }
  };

  const handleClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (!closeOnOverlayClick || event.target !== dialogRef.current) {
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
      onCloseRef.current();
    }
  };

  const hasHeader = Boolean(header || title || description || showCloseButton);

  const resolvedLabelledBy = ariaLabelledBy
    ? ariaLabelledBy
    : title && !header
      ? titleId
      : undefined;

  return (
    <dialog
      ref={dialogRef}
      id={id}
      className={clsx(
        styles.modal,
        styles[placement],
        styles[`size-${size}`],
        className,
      )}
      aria-labelledby={resolvedLabelledBy}
      aria-describedby={description ? descriptionId : undefined}
      aria-label={resolvedLabelledBy ? undefined : ariaLabel}
      onCancel={handleCancel}
      onClose={handleClose}
      onClick={handleClick}
      {...props}
    >
      {hasHeader && (
        <header className={styles.header}>
          <div className={styles.headerContent}>
            {header ?? (
              <>
                {title && (
                  <h2 id={titleId} className={styles.title}>
                    {title}
                  </h2>
                )}

                {description && (
                  <p id={descriptionId} className={styles.description}>
                    {description}
                  </p>
                )}
              </>
            )}
          </div>

          {showCloseButton && (
            <button
              type="button"
              className={styles.closeButton}
              aria-label={closeButtonAriaLabel}
              onClick={() => onCloseRef.current()}
            >
              {closeIcon ?? <DefaultCloseIcon />}
            </button>
          )}
        </header>
      )}

      <div className={styles.content}>{children}</div>

      {footer != null && <footer className={styles.footer}>{footer}</footer>}
    </dialog>
  );
};

export default Modal;
