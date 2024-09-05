import { AlertCircle, XIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useEffect, useState } from "react";
import { Button } from "./button";

type Error = {
  property: string;
  message: string;
};

interface AlertErrorProps {
  errors: Error[];
  show?: boolean;
  autoClose?: boolean;
}

export function AlertError(props: AlertErrorProps) {
  const { errors, show = false, autoClose = false } = props;
  const [open, setOpen] = useState(false);
  const [nullify, setNullify] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (open && autoClose) {
      setNullify(false);
      timeout = setTimeout(() => {
        handleClose();
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [autoClose, open]);

  useEffect(() => {
    setOpen(show);
    // if (show) {
    //   setNullify(false);
    // }
  }, [show]);

  const handleClose = () => {
    setOpen(false);
    setNullify(true);
  };

  if (nullify) return null;

  return (
    <div
      data-show={open}
      className="bg-red-600 text-white fixed top-0 z-50 inset-x-0 transition-all data-[show=true]:translate-y-0 data-[show=false]:-translate-y-full"
    >
      <Alert variant="destructive" className="border-none">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="mb-0">Erro</AlertTitle>
          </div>
          <Button
            className="h-5 w-5 p-0 text-white hover:bg-transparent hover:opacity-90"
            variant="ghost"
            onClick={handleClose}
          >
            <XIcon className="text-white" />
          </Button>
        </div>
        <AlertDescription>
          {errors.map(({ property, message }, key) => (
            <li key={key}>
              <span className="font-bold mr-1">{property}</span>
              <span>{message}</span>
            </li>
          ))}
        </AlertDescription>
      </Alert>
    </div>
  );
}
