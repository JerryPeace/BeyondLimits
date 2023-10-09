import { Box } from '@chakra-ui/react';
import Link from 'next/link';
import styled from 'styled-components';
import { EIconName } from '@@src/schemas/icon';
import { routerConfig } from '@@src/constants/routes';
import IconPicker from '../Icon/IconPicker';
import { useRouter } from 'next/router';

export default function SideBar() {
  const router = useRouter();
  const displaySideBar = router.pathname !== '/' && router.pathname !== '/signup';
  return (
    <Wrapper className="drawer_wrapper">
      <Box py={10} className="drawer" cursor="pointer">
        <Link href={'/'}>
          <a>
            <IconPicker className="logo" icon="rocket" />
            <span className="name">Beyond Limits</span>
          </a>
        </Link>
        <p className="version">1.0</p>
      </Box>
      {displaySideBar && (
        <>
          <Box py={10} className="drawer" cursor="pointer">
            <Link href={routerConfig.userSystem.createUser}>
              <a>
                <IconPicker className="nav-logo" icon={EIconName.benchmark} />
                <span className="nav">Create User</span>
              </a>
            </Link>
            <hr className="divider" />
            <Link href={routerConfig.userSystem.index}>
              <a>
                <IconPicker className="nav-logo" icon={EIconName.teardown} />
                <span className="nav">Users List</span>
              </a>
            </Link>
          </Box>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #0c1d47;
  color: #fff;
  text-align: center;
  transition: 0.2s ease-in-out all;
  width: 70px;
  .drawer {
    overflow: hidden;
    transition: 0.2s ease-in-out all;
    white-space: nowrap;
  }
  * {
    transition: 0.1s ease-in-out all;
  }
  .logo {
    display: inline-block;
    height: 40px;
    width: 40px;
    font-size: 2rem;
  }
  .nav-logo {
    display: inline-block;
    height: 20px;
    font-size: 1.5rem;
  }
  .name,
  .nav,
  .version {
    display: block;
    font-size: 9px;
    font-weight: normal;
    text-align: center;
  }
  .divider {
    margin: 20px 10px;
    opacity: 0.5;
  }
  .link {
    color: '#EEE';
    display: block;
    overflow: hidden;
    padding: 8px 0;
    padding-left: 26px;
    text-decoration: 'none';
    white-space: nowrap;
    width: 100%;
    .icon {
      margin-right: 10px;
    }
    span {
      opacity: 0;
      transition: 0.2s ease-in-out all;
    }
  }
  .list_item {
    .icon-btn {
      flex-direction: column;
    }
    .nav-text {
      visibility: hidden;
    }
    &:hover {
      background-color: rgba(255, 255, 255, 0.08) !important;
    }
    &:active {
      background-color: rgba(255, 255, 255, 0.16) !important;
    }
  }

  &:hover {
    width: 200px;
    .link > span {
      opacity: 1 !important;
    }
    .drawer {
      .logo {
        height: 50px;
        width: 50px;
        font-size: 3rem;
        transition: 0s ease-in-out all;
      }
      .name,
      .version {
        font-size: 9px;
      }

      .name {
        font-size: 24px;
        font-weight: bold;
      }
      .nav-logo {
        height: 30px;
        width: 40px;
        font-size: 2rem;
        transition: 0s ease-in-out all;
      }
      .nav {
        font-size: 18px;
        font-weight: bold;
      }
      .version {
        font-size: 9px;
      }
      .divider {
        margin: 20px;
        opacity: 0.5;
      }
    }
    .list_item {
      .icon-btn {
        flex-direction: row;
      }
      .nav-text {
        visibility: visible;
      }
    }
  }
`;
