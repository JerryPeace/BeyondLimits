export enum EIconName {
    snowFlake = 'icon-snow-flake',
    rocket = 'icon-rocket',
    planet = 'icon-planet'
}
export enum EReactIconName {
    MdOutlineCloudUpload = 'MdOutlineCloudUpload',
    MdOutlineAssignment = 'MdOutlineAssignment',
    MdAdd = 'MdAdd',
    MdOutlineDeleteForever = 'MdOutlineDeleteForever',
    MdClear = 'MdClear',
    MdCheck = 'MdCheck',
    MdOutlineAnnouncement = 'MdOutlineAnnouncement',
    MdOutlineDownload = 'MdOutlineDownload',
    MdInfoOutline = 'MdInfoOutline',
    MdOutlineEdit = 'MdOutlineEdit',
    MdOutlineEditCalendar = 'MdOutlineEditCalendar',
    MdOutlineSearch = 'MdOutlineSearch',
    MdRemoveRedEye = 'MdRemoveRedEye',
    MdOutlineLeaderboard = 'MdOutlineLeaderboard',
    MdOutlineInsertLink = 'MdOutlineInsertLink',
    MdOutlineCheck = 'MdOutlineCheck',
    MdOutlineClose = 'MdOutlineClose',
    MdOutlineAdd = 'MdOutlineAdd',
    MdKeyboardArrowDown = 'MdKeyboardArrowDown',
    MdInfo = 'MdInfo',
    MdAvTimer = 'MdAvTimer',
    MdOutlineReportOff = 'MdOutlineReportOff',
    MdBlock = 'MdBlock',
    MdWavingHand = 'MdWavingHand',
    MdSetting = 'MdSettings'
}
const AllIconTypesCombine = { ...EIconName, ...EReactIconName };

export type AllIconTypes = typeof AllIconTypesCombine;
