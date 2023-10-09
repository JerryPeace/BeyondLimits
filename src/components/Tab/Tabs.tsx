import styled from 'styled-components';
import clsx from 'clsx';
const Wrapper = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  border-top: 1px solid #e7e7e7;
  background: #ffffff;
  padding: 1.8rem 2rem;
  color: #333;
  mix-blend-mode: normal;

  & > button {
    margin-right: 3.5rem;
    opacity: 0.25;
  }
  & > button.actived {
    opacity: 1;
  }
`;

export interface ITabButton {
  text: string;
  name: string;
  className?: string;
  getActived?: (data?: any) => boolean;
  actived?: boolean;
  onClick?: (data?: any) => void;
}

export default function Tabs({ tabs }: { tabs: ITabButton[] }) {
  return (
    <Wrapper className="flex center justify-start">
      {tabs.map((tab, index) => (
        <button
          key={`${tab.name}-${index}`}
          name={tab.name}
          className={clsx('clear-btn', tab.className, {
            actived: tab.getActived ? tab.getActived() : tab.actived,
          })}
        >
          {tab.text}
        </button>
      ))}
    </Wrapper>
  );
}
