import { AlertCircle, XIcon } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useCallback, useEffect, useState } from 'react';
import { Button } from './button';

type Error = {
  property: string;
  message: string;
};

interface AlertErrorProps {
  errors: Error[];
  show?: boolean;
  autoClose?: boolean;
  duration?: number;
  onClose?(): void;
}

export function AlertError(props: AlertErrorProps) {
  const { errors, show = false, autoClose = false, duration = 1000, onClose } = props;

  const [open, setOpen] = useState(false);
  const [disableClose, setDisableClose] = useState(false);
  const [nullify, setNullify] = useState(false);

  const handleClose = useCallback(() => {
    setOpen(false);
    setNullify(true);
    onClose?.();
  }, [onClose]);

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined = undefined;
    if (open && autoClose && !disableClose) {
      setNullify(false);
      timeout = setTimeout(() => {
        handleClose();
      }, duration);
    }

    if (disableClose && timeout) {
      clearTimeout(timeout);
    }

    return () => clearTimeout(timeout);
  }, [autoClose, duration, handleClose, open, disableClose]);

  useEffect(() => {
    setOpen(show);
    if (show) {
      setNullify(false);
    }
  }, [show]);

  if (nullify) return null;

  return (
    <div
      data-show={open}
      className="fixed inset-x-0 top-0 z-50 bg-red-600 text-white transition-all data-[show=false]:-translate-y-full data-[show=true]:translate-y-0"
      onMouseEnter={() => setDisableClose(true)}
      onMouseLeave={() => setDisableClose(false)}
    >
      <Alert variant="destructive" className="border-none">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="mb-0">Erro</AlertTitle>
          </div>
          <Button
            className="h-5 w-5 p-0 text-white hover:bg-transparent hover:opacity-90"
            variant="ghost"
            onClick={() => handleClose()}
          >
            <XIcon className="text-white" />
          </Button>
        </div>
        <AlertDescription>
          {errors.map(({ property, message }, key) => (
            <li key={key}>
              <span className="mr-1 font-bold">{property}</span>
              <span>{message}</span>
            </li>
          ))}
        </AlertDescription>
      </Alert>
    </div>
  );
}
