import type {
  FieldsetHTMLAttributes,
  ReactNode,
} from "react";
import clsx from "clsx";
import styles from "./RadioGroup.module.scss";

export type RadioGroupOrientation = "horizontal" | "vertical";

export interface RadioGroupProps
  extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
  legend?: ReactNode;
  orientation?: RadioGroupOrientation;
  children: ReactNode;
}

const RadioGroup = ({
  legend,
  orientation = "vertical",
  children,
  className,
  ...props
}: RadioGroupProps) => {
  return (
    <fieldset
      className={clsx(
        styles.group,
        styles[orientation],
        className,
      )}
      {...props}
    >
      {legend && <legend className={styles.legend}>{legend}</legend>}

      <div className={styles.options}>{children}</div>
    </fieldset>
  );
};

export default RadioGroup;