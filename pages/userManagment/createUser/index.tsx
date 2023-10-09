import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, Heading, Center } from '@chakra-ui/react';
import UserFieldsForm from '@@src/components/UserFieldsForm';

const CreateUser: NextPage = () => {
  return (
    <div className='w-full'>
      <Head>
        <meta name="description" content="User Management" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Box id="main-title" className="p-6">
          <Heading fontSize="2xl" fontWeight="800" as="h1">
            Beyond Limits - Create new User
          </Heading>
        </Box>
        <Box
          id="main-content"
          className='relative p-6 flex flex-col gap-y-5'
          sx={{ bg: 'gray.200', height: 'calc(100vh - 75px)' }}
        >
          <Center bg="white" h="100vh">
            <UserFieldsForm width={450} buttonText={'Submit'} />
          </Center>
        </Box>
      </main>
    </div>
  );
};

export default CreateUser;
