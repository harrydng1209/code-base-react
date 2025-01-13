import styles from '@/assets/styles/modules/auth/login.module.scss';
import BaseButton from '@/components/base/BaseButton';
import BaseIconSvg from '@/components/base/BaseIconSvg';
import BaseInput from '@/components/base/BaseInput';
import { ILogin } from '@/models/interfaces/auth.interface';
import useAuthStore from '@/stores/auth.store';
import useThemeStore from '@/stores/theme.store';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'antd';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import { object as yupObject, string as yupString } from 'yup';

const { MODULES, SHARED } = constants.iconPaths;

const Login: React.FC = () => {
  const schema = yupObject({
    email: yupString()
      .required('Email is required')
      .email('Invalid email format')
      .matches(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Custom email regex validation failed'),
    password: yupString()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters long')
  });
  const { control, handleSubmit } = useForm<ILogin>({
    defaultValues: {},
    resolver: yupResolver(schema)
  });
  useThemeStore();
  const { t } = useTranslation();
  const authStore = useAuthStore();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit: SubmitHandler<ILogin> = async (values) => {
    try {
      const response = await apis.auth.login(values);
      if (!utils.shared.isSuccessResponse(response)) throw new Error(response.error.message);

      authStore.actions.setToken(response.data.accessToken);
      await navigate(constants.routePages.HOME);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles['login']}>
      <section>
        <h4>{t('auth.login')}</h4>

        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <FormItem
            control={control}
            label={
              <>
                <span>{t('auth.email')}</span>
                <BaseIconSvg className="tw-ml-1" height="10" path={SHARED.REQUIRED} width="5" />
              </>
            }
            name="email"
          >
            <BaseInput placeholder="name@email.com" type="text" />
          </FormItem>

          <FormItem
            control={control}
            label={
              <>
                <span>{t('auth.password')}</span>
                <BaseIconSvg className="tw-ml-1" height="10" path={SHARED.REQUIRED} width="5" />
              </>
            }
            name="password"
          >
            <BaseInput
              placeholder={t('auth.inputPassword')}
              suffix={
                <BaseIconSvg
                  height={22}
                  onClick={togglePasswordVisibility}
                  path={showPassword ? MODULES.AUTH.EYE : MODULES.AUTH.EYE_CLOSED}
                  width={22}
                />
              }
              type={showPassword ? 'text' : 'password'}
            />
          </FormItem>

          <BaseButton
            className="tw-w-full"
            htmlType="submit"
            id={constants.shared.SELECTORS.LOGIN_BUTTON}
          >
            {t('auth.login')}
          </BaseButton>
        </Form>
      </section>
    </div>
  );
};

export default Login;
