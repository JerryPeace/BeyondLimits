import type { NextPage } from 'next';
import React, { useCallback } from 'react';
import Head from 'next/head';
import clsx from 'clsx';
import { Box, Heading, Center } from '@chakra-ui/react';
import { Input, Form, Button } from 'antd';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import systemAPI from '@@src/apis/clients/systemAPI';

const Home: NextPage = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const loginContext = useMutation({
    mutationFn: (values: { username: string, password: string }) =>
      systemAPI.login(values),
    onSuccess: () => {
      router.push(`/userManagment`);
    },
  });

  const loading = loginContext.isLoading;
  const handleLogin = useCallback(async () => {
    try {
      await form.validateFields();
      const values = await form.getFieldsValue();
      loginContext.mutate(values);
    } catch (errors) {
      console.log(errors);
    }
  }, [form, loginContext]);

  return (
    <div className={clsx('w-full')}>
      <Head>
        <meta name="description" content="Neptune Benchmark Data Management" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Box id="main-title" className="p-6">
          <Heading fontSize="2xl" fontWeight="800" as="h1">
            Beyond Limits - Login
          </Heading>
        </Box>
        <Box
          id="main-content"
          className={clsx('relative p-8 flex flex-col gap-y-5')}
          sx={{ bg: 'gray.200', height: 'calc(100vh - 75px)' }}
        >
          <Center bg="white" h="100vh">
            <Box width={450}>
              <Form
                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                layout="horizontal"
                size={'large'}
              >
                <Form.Item
                  style={{ marginBottom: 30 }}
                  name={'username'}
                  label={'User Name'}
                  rules={[{ required: true, message: `User Name is required` }]}
                >
                  <Input disabled={loading} />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: 30 }}
                  name={'password'}
                  label={'Password'}
                  rules={[{ required: true, message: `Password is required` }]}
                >
                  <Input.Password disabled={loading} />
                </Form.Item>
                <Form.Item colon={false} wrapperCol={{ offset: 8, span: 16 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: '100%' }}
                    onClick={handleLogin}
                  >
                    Log in
                  </Button>
                  Or{' '}
                  <Button
                    type="link"
                    loading={loading}
                    style={{ padding: 0, background: 'transparent' }}
                    onClick={() => {
                      router.push(`/signup`);
                    }}
                  >
                    {'register now!'}
                  </Button>
                </Form.Item>
              </Form>
            </Box>
          </Center>
        </Box>
      </main>
    </div>
  );
};

export default Home;
