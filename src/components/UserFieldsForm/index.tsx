import { useCallback, useEffect, useState } from 'react';
import { Input, Form, Button, Skeleton } from 'antd';
import { Box } from '@chakra-ui/react';
import { userFieldConfig, UserFieldConfigItem } from '@@src/constants/user';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import userAPI from '@@src/apis/clients/userAPI';

interface UserFieldsFormProps {
  width: number;
  onClosedDrawer?: () => void;
  onUpdated?: () => void;
  buttonText: string; // Add buttonText prop
  userID?: number;
  isSignUp?: boolean;
}

const UserFieldsForm: React.FC<UserFieldsFormProps> = ({
  width,
  onClosedDrawer,
  onUpdated,
  buttonText,
  userID,
  isSignUp,
}: UserFieldsFormProps) => {
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState({} as any);
  const router = useRouter();
  const getUserContext = useMutation({
    mutationFn: (id: number) => userAPI.getSingleUser({ id }),
    onSuccess: (data) => {
      const state = Object.values(userFieldConfig).reduce((acc, item: UserFieldConfigItem) => {
        acc[item.field] =
          data ? data[item.field] : userFieldConfig[item.field].defaultValue;
        return acc;
      }, {} as any);
      setInitialValues(state)
    },
  });

  const createContext = useMutation({
    mutationFn: (values: any) => userAPI.createUser({ data: values }),
    onSuccess: () => {
      isSignUp ? router.push('/') : router.push('/userManagment');
    },
  });
  const updateContext = useMutation({
    mutationFn: (values: any) => userAPI.updateUser({ data: values }),
    onSuccess: () => {
      onUpdated && onUpdated();
      onClosedDrawer && onClosedDrawer();
    },
  });

  useEffect(() => {
    if (userID) {
      getUserContext.mutate(userID);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loading = createContext.isLoading || updateContext.isLoading;
  const handleSave = useCallback(async () => {
    try {
      await form.validateFields();
      const values = await form.getFieldsValue();
      userID ? updateContext.mutate({
        ...values,
        passwordChanged: !!values.password,
        id: userID,
      }) : createContext.mutate(values);
    } catch (errors) {
      console.log(errors);
    }
  }, [createContext, form, userID, updateContext]);

  return (
    <Box w={width} mb={4}>
      {getUserContext.isLoading ? (
        <Skeleton active paragraph={{ rows: 12 }} />
      ) : (
        <Form
          initialValues={initialValues}
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 40 }}
          layout="horizontal"
          size={'large'}
        >
          {Object.values(userFieldConfig).map((item: UserFieldConfigItem) => {
            return (
              <Form.Item
                style={{ marginBottom: 25 }}
                key={item.field}
                name={item.field}
                label={item.label}
                rules={[{ required: !userID, message: `${item.label} field is required` }]}
              >
                {item.type === 'password' ? (
                  <Input.Password disabled={loading} placeholder={userID ? '********' : ''} />
                ) : (
                  <Input type={item.type} disabled={loading} />
                )}
              </Form.Item>
            );
          })}
          <Form.Item colon={false} wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              htmlType="submit"
              size={'large'}
              loading={loading}
              type="primary"
              onClick={handleSave}
            >
              {buttonText}
            </Button>
          </Form.Item>
        </Form>
      )}
    </Box>
  );
};

export default UserFieldsForm;
