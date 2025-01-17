import styles from '@/assets/styles/modules/base-components.module.scss';
import BaseAutocomplete from '@/components/base/BaseAutocomplete';
import BaseButton from '@/components/base/BaseButton';
import BaseCheckbox from '@/components/base/BaseCheckbox';
import BaseCheckboxGroup from '@/components/base/BaseCheckboxGroup';
import BaseDatePicker from '@/components/base/BaseDatePicker';
import BaseIconSvg from '@/components/base/BaseIconSvg';
import BaseInput from '@/components/base/BaseInput';
import BaseInputNumber from '@/components/base/BaseInputNumber';
import BaseModal from '@/components/base/BaseModal';
import BasePagination from '@/components/base/BasePagination';
import BaseSelect from '@/components/base/BaseSelect';
import BaseSwitch from '@/components/base/BaseSwitch';
import BaseTable from '@/components/base/BaseTable';
import BaseTimePicker from '@/components/base/BaseTimePicker';
import {
  baseCheckboxOptions,
  baseSelectOptions,
  suggestions,
  tableColumns,
  tableData,
} from '@/mocks/base-components.mock';
import { EToast } from '@/models/enums/shared.enum';
import useLoadingStore from '@/stores/loading.store';
import useThemeStore from '@/stores/theme.store';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDebounceFn } from '@reactuses/core';
import {
  CheckboxProps,
  DatePickerProps,
  Form,
  PaginationProps,
  TimePickerProps,
  Tooltip,
} from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { Dayjs } from 'dayjs';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import {
  boolean as yupBoolean,
  object as yupObject,
  ref as yupRef,
  string as yupString,
} from 'yup';

const { LAYOUTS, SHARED } = constants.iconPaths;
const { BLACK, WHITE } = constants.shared.COLORS;
const { APIS_SECTION } = constants.shared.SELECTORS;
const { showToast, sleep } = utils.shared;

interface IForm {
  email: string;
  fullName: string;
  password: string;
  passwordConfirm: string;
  terms: boolean;
  type: string;
}

const BaseComponents: React.FC = () => {
  const schema = yupObject({
    email: yupString()
      .required('Email is required')
      .email('Invalid email format')
      .matches(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Custom email regex validation failed'),
    fullName: yupString()
      .required('Full name is required')
      .matches(/^[A-Za-z\s]+$/, 'Name can only contain letters and spaces'),
    password: yupString()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters long'),
    passwordConfirm: yupString()
      .required('Password confirmation is required')
      .oneOf([yupRef('password')], 'Passwords must match'),
    terms: yupBoolean().required().isTrue('You must agree to the terms and conditions'),
    type: yupString().required('Account type is required'),
  });
  const { control, handleSubmit, reset } = useForm<IForm>({
    defaultValues: {
      email: '',
      fullName: '',
      password: '',
      passwordConfirm: '',
      terms: false,
      type: '',
    },
    resolver: yupResolver<IForm>(schema),
  });
  const { t } = useTranslation();
  const { isDark } = useThemeStore();
  const loadingStore = useLoadingStore();

  const [baseCheckbox, setBaseCheckbox] = useState<boolean>(false);
  const [baseCheckboxAll, setBaseCheckboxAll] = useState<boolean>(false);
  const [isIndeterminate, setIsIndeterminate] = useState<boolean>(false);
  const [baseCheckboxGroup, setBaseCheckboxGroup] = useState<unknown[]>([]);
  const [baseSwitch, setBaseSwitch] = useState<boolean>(true);
  const [baseAutocomplete, setBaseAutocomplete] = useState<string>('');
  const [options, setOptions] = useState<DefaultOptionType[]>([]);
  const [baseInput, setBaseInput] = useState<number | string>();
  const [baseInputNumber, setBaseInputNumber] = useState<number | string>();
  const [baseDatePicker, setBaseDatePicker] = useState<Dayjs | null>();
  const [baseTimePicker, setBaseTimePicker] = useState<Dayjs | null>(null);
  const [baseModal, setBaseModal] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>('');
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 1 });

  const { run: handleGetHealthCheck } = useDebounceFn(async () => {
    await apis.shared.healthCheck();
  }, 200);

  const { run: handleClickIconSvg } = useDebounceFn(() => {
    showToast('handleClickIconSvg');
  }, 200);

  const { run: handleClickButton } = useDebounceFn(() => {
    showToast('handleClickButton');
  }, 200);

  const handleChangeSelect = (value: string) => {
    showToast(`handleChangeSelect: ${value}`);
  };

  const handleChangeCheckbox: CheckboxProps['onChange'] = (event) => {
    setBaseCheckbox(event.target.checked);
    showToast(`handleChangeCheckbox: ${event.target.checked}`);
  };

  const handleCheckAllChange: CheckboxProps['onChange'] = (event) => {
    setBaseCheckboxAll(event.target.checked);
    setIsIndeterminate(false);
    setBaseCheckboxGroup(
      event.target.checked ? baseCheckboxOptions.map((option) => option.value) : [],
    );
  };

  const handleCheckboxGroupChange = (checkedValues: unknown[]) => {
    setBaseCheckboxGroup(checkedValues);
    setIsIndeterminate(
      checkedValues.length > 0 && checkedValues.length < baseCheckboxOptions.length,
    );
    setBaseCheckboxAll(checkedValues.length === baseCheckboxOptions.length);
  };

  const handleChangeSwitch = (checked: boolean) => {
    setBaseSwitch(checked);
    showToast(`handleChangeSwitch: ${checked}`);
  };

  const handleSearch = (value: string) => {
    const results = suggestions.filter((suggestion) =>
      suggestion.value.toLowerCase().includes(value.toLowerCase()),
    );
    setBaseAutocomplete(value);
    setOptions(results);
  };

  const { run: handleChangeInput } = useDebounceFn((value: number | string) => {
    showToast(`handleChangeInput: ${value}`);
  }, 200);

  const handleChangeDatePicker: DatePickerProps['onChange'] = (date, dateString) => {
    setBaseDatePicker(date);
    showToast(`handleChangeDatePicker: ${dateString}`);
  };

  const handleChangeTimePicker: TimePickerProps['onChange'] = (time, timeString) => {
    setBaseTimePicker(time);
    showToast(`handleChangeTimePicker: ${timeString}`);
  };

  const handleModal = () => {
    setBaseModal(false);
    showToast('handleConfirmDialog', EToast.Info);
  };

  const handleChangePagination: PaginationProps['onChange'] = (page, pageSize) => {
    setPagination({ current: page, pageSize, total: tableData.length });
  };

  const onSubmit: SubmitHandler<IForm> = async (values) => {
    console.info('onSubmit:', values);
    showToast('onSubmit: check console');
  };

  const handleLoadingFullscreen = async () => {
    loadingStore.actions.showLoading();
    await sleep(3);
    loadingStore.actions.hideLoading();
  };

  return (
    <div className={styles['base-components']}>
      <section>
        <h4>-- i18n --</h4>
        <div className="tw-flex tw-items-center tw-gap-4">
          <p>{t('shared.hello')}</p>
        </div>
      </section>

      <section id={APIS_SECTION}>
        <h4>-- Apis --</h4>
        <BaseButton onClick={handleGetHealthCheck}>Health Check</BaseButton>
      </section>

      <section>
        <h4>-- The Loading --</h4>
        <BaseButton onClick={handleLoadingFullscreen}>Fullscreen</BaseButton>
      </section>

      <section>
        <h4>-- Base Icons SVG --</h4>
        <div className="tw-flex tw-gap-2">
          {Object.entries(constants.iconPaths).map(([categoryName, category]) => (
            <React.Fragment key={categoryName}>
              {Object.entries(category).map(([iconName, iconPath]) => (
                <Tooltip className="tw-cursor-pointer" key={iconName} title={iconPath}>
                  <BaseIconSvg
                    fill={isDark ? '#FFFFFF' : '#000000'}
                    onClick={handleClickIconSvg}
                    path={String(iconPath)}
                  />
                </Tooltip>
              ))}
            </React.Fragment>
          ))}
        </div>
      </section>

      <section>
        <h4>-- Base Buttons --</h4>
        <div className="tw-flex tw-gap-2 tw-mb-4">
          <BaseButton color="primary" onClick={handleClickButton}>
            Primary
          </BaseButton>
          <BaseButton color="geekblue" onClick={handleClickButton}>
            Geekblue
          </BaseButton>
          <BaseButton color="green" onClick={handleClickButton}>
            Green
          </BaseButton>
          <BaseButton color="orange" onClick={handleClickButton}>
            Orange
          </BaseButton>
          <BaseButton color="danger" onClick={handleClickButton}>
            Danger
          </BaseButton>
          <BaseButton color="default" onClick={handleClickButton}>
            Default
          </BaseButton>
        </div>

        <div className="tw-flex tw-gap-2 tw-mb-4">
          <BaseButton color="primary" onClick={handleClickButton} variant="outlined">
            Primary
          </BaseButton>
          <BaseButton color="geekblue" onClick={handleClickButton} variant="outlined">
            Geekblue
          </BaseButton>
          <BaseButton color="green" onClick={handleClickButton} variant="outlined">
            Green
          </BaseButton>
          <BaseButton color="orange" onClick={handleClickButton} variant="outlined">
            Orange
          </BaseButton>
          <BaseButton color="danger" onClick={handleClickButton} variant="outlined">
            Danger
          </BaseButton>
          <BaseButton color="default" onClick={handleClickButton} variant="outlined">
            Default
          </BaseButton>
        </div>

        <div className="tw-flex tw-gap-2 tw-mb-4">
          <BaseButton
            color="primary"
            icon={<BaseIconSvg fill={WHITE} height="14" path={LAYOUTS.SEARCH} width="14" />}
            onClick={handleClickButton}
          />
          <BaseButton
            color="geekblue"
            icon={<BaseIconSvg fill={WHITE} height="14" path={LAYOUTS.SETTINGS} width="14" />}
            onClick={handleClickButton}
          />
          <BaseButton
            color="green"
            icon={<BaseIconSvg fill={WHITE} height="14" path={LAYOUTS.DASHBOARD} width="14" />}
            onClick={handleClickButton}
          />
          <BaseButton
            color="orange"
            icon={<BaseIconSvg fill={WHITE} height="14" path={LAYOUTS.FOLDER_SHARED} width="14" />}
            onClick={handleClickButton}
          />
          <BaseButton
            color="danger"
            icon={<BaseIconSvg fill={WHITE} height="14" path={SHARED.DELETE} width="14" />}
            onClick={handleClickButton}
          />
          <BaseButton
            color="default"
            icon={
              <BaseIconSvg
                fill={isDark ? BLACK : WHITE}
                height="14"
                path={LAYOUTS.NOTIFICATION}
                width="14"
              />
            }
            onClick={handleClickButton}
          />
        </div>
      </section>

      <section>
        <h4>-- Base Selects --</h4>
        <BaseSelect
          onChange={handleChangeSelect}
          options={baseSelectOptions}
          placeholder="Please select"
          style={{ width: 150 }}
        />

        <BaseSelect
          mode="multiple"
          onChange={handleChangeSelect}
          options={baseSelectOptions}
          placeholder="Please multiple select"
          style={{ marginLeft: 16, width: 200 }}
        />
      </section>

      <section>
        <h4>-- Base Checkboxes --</h4>
        <div>
          <BaseCheckbox checked={baseCheckbox} onChange={handleChangeCheckbox}>
            checkbox label
          </BaseCheckbox>
        </div>

        <div>
          <BaseCheckbox
            checked={baseCheckboxAll}
            className="tw-mt-4 tw-mb-1"
            indeterminate={isIndeterminate}
            onChange={handleCheckAllChange}
          >
            Check all
          </BaseCheckbox>
        </div>
        <BaseCheckboxGroup
          onChange={handleCheckboxGroupChange}
          options={baseCheckboxOptions}
          value={baseCheckboxGroup}
        />
      </section>

      <section>
        <h4>-- Base Switches --</h4>
        <div className="tw-flex tw-items-center">
          <BaseSwitch checked={baseSwitch} onChange={handleChangeSwitch} />
          <span className="tw-ml-2">switch label</span>
        </div>
      </section>

      <section>
        <h4>-- Base Autocompletes --</h4>
        <BaseAutocomplete
          onChange={setBaseAutocomplete}
          onSearch={handleSearch}
          options={options}
          placeholder="Please input"
          style={{ width: 200 }}
          value={baseAutocomplete}
        />
      </section>

      <section>
        <h4>-- Base Inputs --</h4>
        <div className="tw-flex tw-gap-2">
          <BaseInput
            className="!tw-w-[200px]"
            onChange={(event) => {
              setBaseInput(event.target.value);
              handleChangeInput(event.target.value);
            }}
            placeholder="Please input"
            value={baseInput}
          />

          <BaseInputNumber
            className="!tw-w-[200px]"
            onChange={(value) => {
              setBaseInputNumber(value as number | string);
              handleChangeInput(value as number | string);
            }}
            placeholder="Please input number"
            value={baseInputNumber}
          />

          <BaseInput
            allowClear
            className="!tw-w-[300px]"
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder={`${t('shared.search')}...`}
            type="search"
            value={searchInput}
          />
        </div>
      </section>

      <section>
        <h4>-- Base DatePickers --</h4>
        <BaseDatePicker
          onChange={handleChangeDatePicker}
          placeholder="Pick a day"
          value={baseDatePicker}
        />
      </section>

      <section>
        <h4>-- Base TimePickers --</h4>
        <BaseTimePicker
          onChange={handleChangeTimePicker}
          placeholder="Pick a time"
          value={baseTimePicker}
        />
      </section>

      <section>
        <h4>-- Base Modals --</h4>
        <BaseButton onClick={() => setBaseModal(true)}>Open Modal</BaseButton>
        <BaseModal
          footer={[
            <BaseButton key="ok" onClick={handleModal}>
              OK
            </BaseButton>,
          ]}
          onCancel={() => setBaseModal(false)}
          open={baseModal}
          title="Modal Title"
          width={500}
        >
          <span>This is a modal content</span>
        </BaseModal>
      </section>

      <section>
        <h4>-- Base Tables --</h4>
        <BaseTable columns={tableColumns} data={tableData} rowKey="id" scroll={{ y: 300 }} />

        <BasePagination
          className="tw-mt-4 tw-flex-center"
          current={pagination.current}
          onChange={handleChangePagination}
          pageSize={pagination.pageSize}
          showSizeChanger
          total={pagination.total}
        />
      </section>

      <section>
        <h4>-- Base Forms --</h4>
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)} style={{ maxWidth: '600px' }}>
          <div className="tw-grid tw-grid-cols-2 tw-gap-4">
            <FormItem control={control} label="Full Name" name="fullName" required>
              <BaseInput placeholder="Enter your full name" />
            </FormItem>

            <FormItem control={control} label="Type" name="type" required>
              <BaseSelect options={baseSelectOptions} placeholder="Choose a type" />
            </FormItem>
          </div>

          <div className="tw-grid tw-grid-cols-3 tw-gap-4">
            <FormItem control={control} label="Email" name="email" required>
              <BaseInput placeholder="Enter your email address" />
            </FormItem>

            <FormItem control={control} label="Password" name="password" required>
              <BaseInput placeholder="Create a password" type="password" />
            </FormItem>

            <FormItem control={control} label="Confirm Password" name="passwordConfirm" required>
              <BaseInput placeholder="Re-enter your password" type="password" />
            </FormItem>
          </div>

          <FormItem control={control} name="terms" required valuePropName="checked">
            <BaseCheckbox>Agree to terms and conditions</BaseCheckbox>
          </FormItem>

          <div className="tw-flex tw-gap-2">
            <BaseButton htmlType="submit">Submit</BaseButton>

            <BaseButton color="default" onClick={() => reset()}>
              Reset
            </BaseButton>
          </div>
        </Form>
      </section>
    </div>
  );
};

export default BaseComponents;
