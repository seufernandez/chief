import { ReactNode } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

export function TextFieldError({
  error,
}: {
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl> | undefined;
}) {
  return error ? (
    <div
      style={{
        color: "red",
        fontSize: "0.8em",
      }}
    >
      {error as ReactNode}
    </div>
  ) : null;
}
