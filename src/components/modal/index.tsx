import { Portal } from '../Portal';
import { v4 as uuidv4 } from 'uuid';
import Button from '../button';
import { Cross2Icon } from '../Icon';

const Modal = ({
  open = false,
  setOpen,
  children,
  className,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  children: any;
  renderTrigger?: any;
  className?: string;
}) => {
  return (
    <Portal>
      {open && (
        <div id={'id_protal_' + uuidv4()}>
          <div className="bg-black/20 fixed inset-0" onClick={() => setOpen(false)} />
          <div
            className={`z-[9999] fixed top-0 left-0 h-[100vh] w-[100vw] rounded-4 bg-white p-4 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none ${className}`}
          >
            {children}
            <Button
              onClick={() => setOpen(false)}
              className='className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"'
            >
              <Cross2Icon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </Portal>
  );
};

export default Modal;
