import * as React from 'react';
import { service } from '../utils';
import Modal from './modal';
import { Cross2Icon } from './Icon';

const Login = () => {
  const [open, setOpen] = React.useState(false);
  const [mobile, setMobile] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      renderTrigger={
        !open ? (
          <svg
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="fixed top-4 h-8 w-8 mx-4 z-[9999]"
          >
            <path
              d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
        ) : (
          <Cross2Icon className="fixed top-4 h-8 w-8 mx-4 z-[9999]" />
        )
      }
    >
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label htmlFor="mobile" className="block text-sm font-medium leading-6 text-gray-900">
                手机号
              </label>
              <div className="mt-2">
                <input
                  id="mobile"
                  name="mobile"
                  type="mobile"
                  autoComplete="mobile"
                  required
                  className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  密码
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                onClick={() => {
                  if (!mobile || !password) return;

                  service({ url: '/user/login', method: 'POST', data: { mobile, password } }).then((res) => {
                    if (res && res?.data?.token) {
                      localStorage.setItem('token', res?.data?.token);

                      setOpen(false);
                    }
                  });
                }}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                登录
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Login;
