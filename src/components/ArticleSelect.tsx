import { useState } from 'react';
import Modal from './modal';
import RCTree from 'rc-tree';
import 'rc-tree/assets/index.css';
import { loop } from '../utils';

const ArticleSelect = ({
  data,
  value,
  onChange,
  open,
  setOpen,
  title,
}: {
  data: any[];
  value: string[];
  onChange: (v: string[]) => void;
  open: boolean;
  setOpen: (v: boolean) => void;
  title: string;
}) => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const onExpand = (newExpandedKeys: React.Key[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  return (
    <>
      <input
        id="title"
        className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        value={title}
        onClick={() => setOpen(true)}
      />

      {open && (
        <Modal open={open} setOpen={setOpen}>
          <RCTree
            showLine
            onExpand={onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            treeData={loop(data)}
            selectedKeys={value}
            onSelect={(keys: any) => {
              onChange(keys || []);
              setOpen(false);
            }}
          />
        </Modal>
      )}
    </>
  );
};

export default ArticleSelect;
