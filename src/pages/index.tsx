import { useContext, useEffect, useState } from 'react';
import EditArticle from './components/edit-article';
import { EditorMd } from './components/editor-md';
import { ReduxContext } from '../store';
import ArticleSelect from '../components/ArticleSelect';
import { del, query, save, create } from './service';
import { findNodeById } from '../utils';

export const Home = () => {
  const { state, dispatch } = useContext(ReduxContext);
  const [open, setOpen] = useState(false);
  const [v, setV] = useState(false);

  useEffect(() => {
    query(dispatch);
  }, []);

  return (
    <div>
      <div className="ml-16">
        <ArticleSelect
          open={v}
          setOpen={setV}
          data={state.articles}
          value={state.article?.id ? [state.article?.id] : []}
          onChange={(v) => {
            dispatch({ type: 'UPDATE', payload: { article: findNodeById(state.articles, v[0]) } });
          }}
          title={state.article?.title}
        />
        <div className="hidden md:block">
          <button
            className="mx-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={() => {
              dispatch({ type: 'UPDATE', payload: { article: {} } });
              setOpen(true);
            }}
          >
            新增
          </button>
          <button
            className="mx-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={() => {
              if (!state.article?.id) {
                return;
              }

              setOpen(true);
            }}
          >
            编辑
          </button>
          <button
            className="mx-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={() => {
              if (!state.article?.id) {
                return;
              }

              del(state.article.id, dispatch);
            }}
          >
            删除
          </button>
        </div>
      </div>

      {state.article?.content && <EditorMd type="view" value={state.article?.content} />}

      {open && (
        <EditArticle
          setOpen={setOpen}
          {...state.article}
          open={open}
          save={save}
          create={create}
          data={state.articles}
          dispatch={dispatch}
        />
      )}
    </div>
  );
};
