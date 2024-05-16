const Button = ({
  type = 'default',
  children,
  className = '',
  ...rest
}: {
  children: any;
  type?: 'default';
  className?: string;
  [k: string]: any;
}) => {
  let innerClassName = '';
  switch (type) {
    case 'default':
      innerClassName =
        'mx-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow';
      break;

    default:
      break;
  }
  return (
    <button className={className || innerClassName} {...rest}>
      {children}
    </button>
  );
};

export default Button;
