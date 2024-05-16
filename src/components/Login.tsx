import * as React from 'react';
import { service } from '../utils';
import Modal from './modal';
import { Form, FormItem } from './form';
import { ReduxContext } from '../store';
import Button from './button';
import Input from './input';

const Login = () => {
  const { state } = React.useContext(ReduxContext);
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button disabled={state.loading} onClick={() => setOpen(true)}>
        登录
      </Button>

      <Modal open={open} setOpen={setOpen}>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
          <Form
            onSubmit={(v) => {
              service({ url: '/user/login', method: 'POST', data: v }).then((res) => {
                if (res && res?.data?.token) {
                  localStorage.setItem('token', res?.data?.token);

                  setOpen(false);
                }
              });
            }}
          >
            <FormItem name="mobile">
              <Input
                className="my-4 px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                type="text"
                required
                placeholder="请输入手机号"
              />
            </FormItem>

            <FormItem name="password">
              <Input
                className="my-4 px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                type="password"
                required
                placeholder="请输入密码"
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
      </Modal>
    </>
  );
};

export default Login;
