import { useEffect, useRef, useState } from 'react';
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
  const sourceRef = useRef(null); // 源元素的ref
  const targetRef = useRef(null); // 目标元素的ref
  const [position, setPosition] = useState({ top: 0, left: 0 }); // 存储位置信息
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const onExpand = (newExpandedKeys: React.Key[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  useEffect(() => {
    if (sourceRef.current) {
      const { top, left } = (sourceRef.current as any).getBoundingClientRect();
      setPosition({ top, left });
    }
  }, []);

  return (
    <div className="p-4 relative inline-block">
      <input
        ref={sourceRef}
        id="title"
        className="px-4 block w-[24rem] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        value={title}
        onClick={() => setOpen(true)}
      />

      {open && (
        <Modal
          ref={targetRef}
          open={open}
          setOpen={setOpen}
          className={`w-[24rem] h-[15rem] overflow-y-auto`}
          style={{ position: 'fixed', top: position.top + 40, left: position.left }}
        >
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
    </div>
  );
};

export default ArticleSelect;
