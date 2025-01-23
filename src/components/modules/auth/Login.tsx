import styles from '@/assets/styles/modules/auth/login.module.scss';
import BaseButton from '@/components/base/BaseButton';
import BaseIconSvg from '@/components/base/BaseIconSvg';
import BaseInput from '@/components/base/BaseInput';
import { ILoginRequest } from '@/models/interfaces/auth.interface';
import useAuthStore from '@/stores/auth.store';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'antd';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import { Link } from 'react-router';
import { object as yupObject, string as yupString } from 'yup';

const { AUTH, HOME } = constants.routePages;
const { MODULES, SHARED } = constants.iconPaths;
const { REGEXES, SELECTORS } = constants.shared;

const Login: React.FC = () => {
  const schema = yupObject({
    email: yupString()
      .required('Email is required')
      .email('Invalid email format')
      .matches(REGEXES.EMAIL, 'Invalid email format'),
    password: yupString()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters long'),
  });
  const { control, handleSubmit } = useForm<ILoginRequest>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const { t } = useTranslation();
  const authStore = useAuthStore();
  const navigate = useNavigate();
  const { handleCatchError } = useHandleCatchError();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit: SubmitHandler<ILoginRequest> = async (values) => {
    try {
      const response = await apis.auth.login(values);
      authStore.actions.setToken(response.data.accessToken);
      await navigate(HOME);
    } catch (error) {
      handleCatchError(error);
    }
  };

  return (
    <div className={styles['login']}>
      <section id={SELECTORS.LOGIN_SECTION}>
        <h4>{t('auth.login')}</h4>

        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <FormItem
            control={control}
            label={
              <>
                <span>{t('auth.email')}</span>
                <BaseIconSvg
                  className="tw-ml-1"
                  height="10"
                  path={SHARED.REQUIRED}
                  width="5"
                />
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
                <BaseIconSvg
                  className="tw-ml-1"
                  height="10"
                  path={SHARED.REQUIRED}
                  width="5"
                />
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
                  path={
                    showPassword ? MODULES.AUTH.EYE : MODULES.AUTH.EYE_CLOSED
                  }
                  width={22}
                />
              }
              type={showPassword ? 'text' : 'password'}
            />
          </FormItem>

          <BaseButton className="tw-w-full tw-mt-2" htmlType="submit">
            {t('auth.login')}
          </BaseButton>
        </Form>

        <div className={styles['login__register-now']}>
          <p>{t('auth.noAccount')}</p>
          <Link to={AUTH.REGISTER}>{t('auth.registerNow')}</Link>
        </div>
      </section>
    </div>
  );
};

export default Login;
