import { useContext, useEffect, useState } from 'react';
import EditArticle from './components/edit-article';
import { EditorMd } from './components/editor-md';
import { ReduxContext } from '../store';
import ArticleSelect from '../components/ArticleSelect';
import { del, query, save, create } from './service';
import { findNodeById } from '../utils';
import Menu from '../components/Menu';
import Login from '../components/Login';
import Button from '../components/button';

export const Home = () => {
  const { state, dispatch } = useContext(ReduxContext);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    query(dispatch);
  }, []);

  return (
    <div>
      <Menu>
        <Login />
        <Button
          onClick={() => {
            dispatch({ type: 'UPDATE', payload: { article: {} } });
            setOpen(true);
          }}
        >
          新增
        </Button>

        <Button
          onClick={() => {
            if (!state.article?.id) {
              return;
            }

            setOpen(true);
          }}
        >
          编辑
        </Button>
        <Button
          disabled={state.loading}
          onClick={() => {
            if (!state.article?.id) {
              return;
            }

            del(state.article.id, dispatch);
          }}
        >
          删除
        </Button>
        <ArticleSelect
          data={state.articles}
          value={state.article?.id ? [state.article?.id] : []}
          onChange={(v) => {
            dispatch({ type: 'UPDATE', payload: { article: findNodeById(state.articles, v[0]) } });
          }}
          title={state.article?.title || ''}
        />
      </Menu>

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
