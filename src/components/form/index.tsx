import React, { useState, useCallback, useContext } from 'react';

export const FormContext = React.createContext({});

const useField = (name: string) => {
  const { values, setValues } = useContext<Record<string, any>>(FormContext);

  const setValue = useCallback(
    (value: Record<string, any>) => setValues((prevValues: Record<string, any>) => ({ ...prevValues, [name]: value })),
    [name, setValues],
  );

  return [values[name], setValue];
};

export const FormItem = ({
  name,
  children,
  type = 'input',
}: {
  name: string;
  children: any;
  type?: 'input' | 'custom';
}) => {
  const [value, setValue] = useField(name);

  const child = React.Children.only(children);
  return React.cloneElement(child, {
    value,
    onChange: (event: any) => {
      switch (type) {
        case 'input':
          setValue(event.target.value);
          break;

        case 'custom':
          setValue(event);
          break;

        default:
          break;
      }
    },
  });
};

export const Form = ({
  children,
  initialValues = {},
  onSubmit,
}: {
  children: any;
  initialValues?: Record<string, any>;
  onSubmit?: (v: Record<string, any>) => void;
}) => {
  const [values, setValues] = useState(initialValues || {});

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit(values);
    }
  };

  return (
    <FormContext.Provider value={{ values, setValues }}>
      <form onSubmit={handleSubmit}>{children}</form>
    </FormContext.Provider>
  );
};
