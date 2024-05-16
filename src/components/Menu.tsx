import * as React from 'react';
import Modal from './modal';
import { Cross2Icon, MenuIcon } from './Icon';

const Menu = ({ children }: { children: any }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      {!open ? (
        <MenuIcon className="fixed top-4 h-8 w-8 mx-4 z-[9999]" onClick={() => setOpen(!open)} />
      ) : (
        <Cross2Icon onClick={() => setOpen(!open)} className="fixed top-4 h-8 w-8 mx-4 z-[9999]" />
      )}
      <Modal open={open} setOpen={setOpen} className="mt-16">
        {children}
      </Modal>
    </>
  );
};

export default Menu;
