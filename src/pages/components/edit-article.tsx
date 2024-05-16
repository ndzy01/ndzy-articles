import { EditorMd } from './editor-md';
import Modal from '../../components/modal';
import ArticleSelect from '../../components/ArticleSelect';
import { findNodeById } from '../../utils';
import { Form, FormItem } from '../../components/form';
import { enqueueSnackbar } from 'notistack';
import { ReduxContext } from '../../store';
import { useContext } from 'react';

const EditArticle = ({ order, title, content, id, open, setOpen, save, create, data, dispatch }: any) => {
  const { state } = useContext(ReduxContext);
  const ArticleSelectFormItem = (props: any) => {
    return (
      <ArticleSelect
        {...props}
        value={props.value}
        onChange={(v) => props.onChange(v)}
        title={props.value && props.value.length > 0 ? findNodeById(props.data, props.value[0]).title : ''}
      />
    );
  };

  const Input = (props: any) => {
    return <input value={props.value} onChange={(e) => props.onChange(e.target.value)} {...props} />;
  };

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="relative w-full flex min-h-full px-8">
        <div className="w-full h-[90vh]">
          <div className="space-y-6">
            <Form
              initialValues={{ title, content, order }}
              onSubmit={(v) => {
                if (!v.content) {
                  enqueueSnackbar('内容不能为空', {
                    variant: 'error',
                    anchorOrigin: { vertical: 'top', horizontal: 'center' },
                  });
                  setOpen(false);
                  return;
                }

                if (id) {
                  save(id, { ...v, order: Number(v.order) }, dispatch).then(() => {
                    setOpen(false);
                  });
                } else {
                  if (v.parentId && v.parentId.length > 0) {
                    create({ ...v, order: Number(v.order), parentId: v.parentId[0] }, dispatch).then(() => {
                      setOpen(false);
                    });

                    return;
                  }

                  create({ ...v, order: Number(v.order) }, dispatch).then(() => {
                    setOpen(false);
                  });
                }
              }}
            >
              {!id && (
                <FormItem name="parentId" type="custom">
                  <ArticleSelectFormItem data={data} placeholder="请选择父级目录" />
                </FormItem>
              )}

              <FormItem name="title">
                <Input
                  required
                  type="text"
                  className="my-4 px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="请输入标题"
                />
              </FormItem>

              <FormItem name="content" type="custom">
                <EditorMd className="my-4" />
              </FormItem>

              <FormItem name="order">
                <Input
                  required
                  type="text"
                  className="my-4 px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="请输入顺序"
                />
              </FormItem>

              <button
                className="mx-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                type="submit"
                disabled={state.loading}
              >
                提交
              </button>
            </Form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditArticle;
