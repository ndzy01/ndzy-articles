import { EditorMd } from './editor-md';
import Modal from '../../components/modal';
import { useState } from 'react';
import ArticleSelect from '../../components/ArticleSelect';
import { findNodeById } from '../../utils';

const EditArticle = ({ order, title, content, id, open, setOpen, save, create, data, dispatch }: any) => {
  const [s, setS] = useState<Record<string, any>>({ title, content, order });
  const [v, setV] = useState(false);
  const [a, setA] = useState<string[]>([]);

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="relative w-full flex min-h-full px-6 lg:px-8">
        <div className="w-full h-[60vh] xl:h-[60vh]">
          <div className="space-y-6">
            {!id && (
              <div>
                <label htmlFor="parentId" className="block text-sm font-medium leading-6 text-gray-900">
                  父级
                </label>
                <div className="mt-2">
                  <ArticleSelect
                    open={v}
                    setOpen={setV}
                    data={data}
                    value={a}
                    onChange={(v) => setA(v)}
                    title={a.length > 0 ? findNodeById(data, a[0]).title : ''}
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                标题
              </label>
              <div className="mt-2">
                <input
                  id="title"
                  name="title"
                  type="title"
                  autoComplete="title"
                  required
                  className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={s?.title}
                  onChange={(e) => setS({ ...s, title: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium leading-6 text-gray-900">
                内容
              </label>
              <div className="mt-2">
                <EditorMd value={s.content} onChange={(v: string) => setS({ ...s, content: v })} />
              </div>
            </div>

            <div>
              <label htmlFor="order" className="block text-sm font-medium leading-6 text-gray-900">
                序号
              </label>
              <div className="mt-2">
                <input
                  id="order"
                  name="order"
                  type="order"
                  autoComplete="order"
                  required
                  className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={s?.order}
                  onChange={(e) => setS({ ...s, order: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 w-full">
          <button
            onClick={() => {
              if (id) {
                save(id, { ...s, order: Number(s.order), title: String(s.title) }, dispatch);
                setOpen(false);
              } else {
                if (a.length > 0) {
                  create({ ...s, order: Number(s.order), title: String(s.title), parentId: a[0] }, dispatch);
                  setOpen(false);
                  return;
                }

                create({ ...s, order: Number(s.order), title: String(s.title) }, dispatch);
                setOpen(false);
              }
            }}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            保存
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditArticle;
