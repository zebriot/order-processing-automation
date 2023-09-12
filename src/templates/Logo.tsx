import { AppConfig } from '../utils/AppConfig';

type ILogoProps = {
  xl?: boolean;
};

const Logo = (props: ILogoProps) => {
  const iconStyle = props.xl ? 'h-10 w-10' : 'h-6 w-6';
  const fontStyle = props.xl ? 'text-3xl' : 'text-xl';

  return (
    <span
      className={`inline-flex items-center text-gray-900 ${fontStyle} gap-1 font-semibold`}
    >
      <img src="/svg/logo.svg" className={iconStyle} alt="logo" />
      {AppConfig.site_name}
    </span>
  );
};

export { Logo };
