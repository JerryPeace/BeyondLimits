import React, { useMemo } from 'react';
import clsx from 'clsx';
// import * as Icons from 'react-icons/md';
import {
  MdFilePresent,
  MdImage,
  MdPictureAsPdf,
  MdEdit,
  MdFolder,
  MdFolderOpen,
  MdDelete,
  MdSync,
  MdRefresh,
  MdOutlineDynamicFeed,
  MdCleaningServices,
  MdInsights,
  MdRotateLeft,
} from 'react-icons/md';
import { BiLineChart, BiGitCompare, BiSpreadsheet } from 'react-icons/bi';
import { AllIconNames, EIconName } from '../../schemas/icon';

// todo can pick up only need icon for this project to reduce bundle size
const IconPicker: React.FC<{
  icon: AllIconNames | EIconName;
  className?: string;
  style?: React.CSSProperties;
}> = ({ icon, className, style }) => {
  // if (Icons[icon as never]) return <Icon as={Icons[icon as never]} />;
  const iconComponent = useMemo(() => {
    switch (icon) {
      case 'reset':
        return <MdRotateLeft />;
      case 'filePresent':
        return <MdFilePresent />;
      case 'image':
        return <MdImage />;
      case 'pdf':
        return <MdPictureAsPdf />;
      case 'edit':
        return <MdEdit />;
      case 'folder':
        return <MdFolder />;
      case 'folderOpen':
        return <MdFolderOpen />;
      case 'delete':
        return <MdDelete />;
      case 'sync':
        return <MdSync />;
      case 'refresh':
        return <MdRefresh />;
      case 'parse':
        return <MdOutlineDynamicFeed />;
      case 'clean':
        return <MdCleaningServices />;
      case 'insightLab':
        return <MdInsights />;
      case 'biChart':
        return <BiLineChart />;
      case 'benchmark':
        return <BiGitCompare />;
      case 'teardown':
        return <BiSpreadsheet />;
      default:
        return <span className={clsx(EIconName[icon as never], 'p-1')}></span>;
    }
  }, [icon]);

  return (
    <span className={clsx(className, 'icon p-0.5 mt-0.5')} style={style}>
      {iconComponent}
    </span>
  );
};

export default IconPicker;
