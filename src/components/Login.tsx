import * as React from 'react';
import { service } from '../utils';
import Modal from './modal';
import { Cross2Icon } from './Icon';
import * as Form from '@radix-ui/react-form';

const Login = () => {
  const [open, setOpen] = React.useState(false);

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
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        ) : (
          <Cross2Icon className="fixed top-4 h-8 w-8 mx-4 z-[9999]" />
        )
      }
    >
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
        <Form.Root
          onSubmit={(event) => {
            const data = Object.fromEntries(new FormData(event.currentTarget));
            service({ url: '/user/login', method: 'POST', data }).then((res) => {
              if (res && res?.data?.token) {
                localStorage.setItem('token', res?.data?.token);

                setOpen(false);
              }
            });

            event.preventDefault();
          }}
        >
          <Form.Field className="grid mb-4" name="mobile">
            <div className="flex items-baseline justify-between">
              <Form.Label className="text-[15px] font-medium leading-[35px]">手机号:</Form.Label>
              <Form.Message className="text-[13px] opacity-[0.8]" match="valueMissing">
                请输入手机号。
              </Form.Message>
              <Form.Message className="text-[13px] opacity-[0.8]" match="typeMismatch">
                无效的手机号。
              </Form.Message>
            </div>

            <Form.Control asChild>
              <input
                className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
                type="text"
                required
              />
            </Form.Control>
          </Form.Field>

          <Form.Field className="grid mb-4" name="password">
            <div className="flex items-baseline justify-between">
              <Form.Label className="text-[15px] font-medium leading-[35px]">密码:</Form.Label>
              <Form.Message className="text-[13px] opacity-[0.8]" match="valueMissing">
                请输入密码。
              </Form.Message>
              <Form.Message className="text-[13px] opacity-[0.8]" match="typeMismatch">
                无效的密码。
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input
                className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
                type="password"
                required
              />
            </Form.Control>
          </Form.Field>

          <Form.Submit>
            <button className="box-border w-full text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px]">
              登录
            </button>
          </Form.Submit>
        </Form.Root>
      </div>
    </Modal>
  );
};

export default Login;
