import styles from '@/assets/styles/modules/auth/register.module.scss';
import BaseButton from '@/components/base/BaseButton';
import BaseIconSvg from '@/components/base/BaseIconSvg';
import BaseInput from '@/components/base/BaseInput';
import { IRegister } from '@/models/interfaces/auth.interface';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'antd';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import { Link } from 'react-router';
import { object as yupObject, ref as yupRef, string as yupString } from 'yup';

const { AUTH } = constants.routePages;
const { MODULES, SHARED } = constants.iconPaths;
const { REGISTER_SECTION } = constants.shared.SELECTORS;

const Register: React.FC = () => {
  const schema = yupObject({
    displayName: yupString()
      .required('Display name is required')
      .matches(/^[A-Za-z\s]+$/, 'Name can only contain letters and spaces'),
    email: yupString()
      .required('Email is required')
      .email('Invalid email format')
      .matches(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email format'),
    password: yupString()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters long'),
    passwordConfirm: yupString()
      .required('Confirm password is required')
      .oneOf([yupRef('password')], 'Passwords must match'),
    username: yupString()
      .required('Username is required')
      .matches(
        /^[A-Za-z0-9]+$/,
        'Username can only contain letters and numbers',
      ),
  });
  const { control, handleSubmit, setError } = useForm<IRegister>({
    defaultValues: {
      displayName: '',
      email: '',
      password: '',
      passwordConfirm: '',
      username: '',
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { handleCatchError } = useHandleCatchError();

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordConfirmVisibility = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  const onSubmit: SubmitHandler<IRegister> = async (values) => {
    try {
      await apis.auth.register(values);
      await navigate(AUTH.LOGIN);
    } catch (error) {
      const errorData = handleCatchError<{ fields: (keyof IRegister)[] }>(
        error,
      );
      if (errorData?.fields)
        errorData.fields.forEach((field) => {
          setError(field, {
            message: `${field} is already taken`,
            type: 'manual',
          });
        });
    }
  };

  return (
    <div className={styles['register']}>
      <section id={REGISTER_SECTION}>
        <h4>{t('auth.register')}</h4>

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
            <BaseInput placeholder="name@email.com" />
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

          <FormItem
            control={control}
            label={
              <>
                <span>{t('auth.passwordConfirm')}</span>
                <BaseIconSvg
                  className="tw-ml-1"
                  height="10"
                  path={SHARED.REQUIRED}
                  width="5"
                />
              </>
            }
            name="passwordConfirm"
          >
            <BaseInput
              placeholder={t('auth.inputPassword')}
              suffix={
                <BaseIconSvg
                  height={22}
                  onClick={togglePasswordConfirmVisibility}
                  path={
                    showPassword ? MODULES.AUTH.EYE : MODULES.AUTH.EYE_CLOSED
                  }
                  width={22}
                />
              }
              type={showPassword ? 'text' : 'password'}
            />
          </FormItem>

          <FormItem
            control={control}
            label={
              <>
                <span>{t('auth.username')}</span>
                <BaseIconSvg
                  className="tw-ml-1"
                  height="10"
                  path={SHARED.REQUIRED}
                  width="5"
                />
              </>
            }
            name="username"
          >
            <BaseInput placeholder={t('auth.enterYourUsername')} />
          </FormItem>

          <FormItem
            control={control}
            label={
              <>
                <span>{t('auth.displayName')}</span>
                <BaseIconSvg
                  className="tw-ml-1"
                  height="10"
                  path={SHARED.REQUIRED}
                  width="5"
                />
              </>
            }
            name="displayName"
          >
            <BaseInput placeholder={t('auth.enterYourDisplayName')} />
          </FormItem>

          <BaseButton className="tw-w-full tw-mt-2" htmlType="submit">
            {t('auth.register')}
          </BaseButton>
        </Form>

        <div className={styles['register__login-now']}>
          <p>{t('auth.hasAccount')}</p>
          <Link to={AUTH.LOGIN}>{t('auth.loginNow')}</Link>
        </div>
      </section>
    </div>
  );
};

export default Register;
