import type { ColumnsType } from 'antd/es/table';
import type { NextPage } from 'next';
import { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import dayjs from 'dayjs';
import Head from 'next/head';
import { Button, Table, Input, Drawer } from 'antd';
import { useRouter } from 'next/router';
import { Box, Heading, useDisclosure } from '@chakra-ui/react';
import DeleteConfirmModal from '@@src/components/DeleteConfirmModal';
import userAPI from '@@src/apis/clients/userAPI';
import { UserDataType, UserFieldKey } from '@@src/constants/user';
import UserFieldsForm from '@@src/components/UserFieldsForm';
import { User } from '@prisma/client';

const UserList: NextPage = () => {
  const router = useRouter();
  const confirmModalControl = useDisclosure();
  const [openDrawer, setOpenDrawer] = useState(false);
  const { data, isFetching, refetch } = useQuery('user', () => userAPI.getAllUsers());
  const [updateData, setUpdateData] = useState<UserDataType>();
  const [removeData, setRemoveData] = useState<UserDataType>();
  const [filterData, setFilterData] = useState<Partial<User>[] | undefined>();
  const onClose = () => setOpenDrawer(false);
  const removeActionMutation = useMutation({
    mutationFn: () => userAPI.removeUser({ id: removeData?.id ?? 0 }),
    onSettled: () => {
      refetch();
      confirmModalControl.onClose();
      setRemoveData(undefined);
    },
  });

  const search = (value: string) => {
    const filter = data?.filter((o) =>
      [UserFieldKey.username, UserFieldKey.address].some((k) =>
        String(o[k]).toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilterData(filter);
  };

  const columns: ColumnsType<any> = [
    {
      key: 'username',
      dataIndex: 'username',
      title: 'User Name',
      width: 150,
      sorter: (a, b) => a.username.localeCompare(b.username),
      render: (value: string, record) => (
        <Button
          type="link"
          style={{ padding: 0, background: 'transparent' }}
          onClick={() => {
            setUpdateData(record);
            setOpenDrawer(true);
          }}
        >
          {value}
        </Button>
      ),
    },
    {
      key: 'address',
      dataIndex: 'address',
      title: 'Address',
      width: 250,
      sorter: (a, b) => a.address.localeCompare(b.address),
    },
    {
      key: 'updatedAt',
      dataIndex: 'updatedAt',
      title: 'Last updated',
      width: 120,
      sorter: true,
      render: (value: Date) => {
        return <span>{value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : '-'}</span>;
      },
    },
    {
      key: 'actions',
      title: 'Actions',
      width: 60,
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => {
            setRemoveData(record);
            confirmModalControl.onOpen();
          }}
          style={{ background: 'transparent', padding: 0 }}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div className="w-full">
      <Head>
        <meta name="description" content="User Management" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Box id="main-title" className="p-6">
          <Heading fontSize="2xl" fontWeight="800" as="h1">
            Beyond Limits - Users Management
          </Heading>
        </Box>
        <Box
          id="main-content"
          className='relative p-6 flex flex-col gap-y-5'
          sx={{ bg: 'gray.200', height: 'calc(100vh - 75px)' }}
        >
          <Box bg="white" p={8} h={'100%'}>
            <Button
              size={'large'}
              disabled={isFetching}
              style={{ float: 'right' }}
              type="primary"
              onClick={() => {
                router.push('/userManagment/createUser');
              }}
            >
              Create a new user
            </Button>
            <Box w="100%">
              <Input.Search
                size="large"
                allowClear
                disabled={data?.length === 0 || isFetching}
                style={{ marginBottom: 15, width: 350 }}
                placeholder="Search by user name or address"
                enterButton
                onSearch={search}
              />
              <Table
                loading={isFetching}
                columns={columns}
                dataSource={filterData || data}
                size={'middle'}
                pagination={{
                  pageSizeOptions: ['10', '20', '50'],
                  showSizeChanger: true,
                  showTotal: (total) => `Total ${total} reports`,
                  total: data?.length,
                }}
                scroll={{ y: 460 }}
              />
            </Box>
          </Box>
          {confirmModalControl.isOpen && removeData && (
            <DeleteConfirmModal
              isLoading={removeActionMutation.isLoading}
              actions={confirmModalControl}
              data={removeData}
              onSubmitDelete={() => removeActionMutation.mutate()}
            />
          )}
          {openDrawer &&
            <Drawer
              title="Update User Profile"
              placement="right"
              onClose={onClose}
              open={openDrawer}
            >
              <UserFieldsForm
                width={320}
                buttonText="Update Profile"
                userID={updateData?.id}
                onClosedDrawer={onClose}
                onUpdated={refetch}
              />
            </Drawer>
          }
        </Box>
      </main>
    </div>
  );
};

export default UserList;
