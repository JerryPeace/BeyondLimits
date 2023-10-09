export enum EIconName {
  snowFlake = 'icon-snow-flake',
  rocket = 'icon-rocket',
  planet = 'icon-planet',
  filePresent = 'filePresent',
  pdf = 'pdf',
  image = 'image',
  edit = 'edit',
  folder = 'folder',
  folderOpen = 'folderOpen',
  delete = 'delete',
  sync = 'sync',
  refresh = 'refresh',
  parse = 'parse',
  clean = 'clean',
  insightLab = 'insightLab',
  reset = 'reset',
  biChart = 'biChart',
  benchmark = 'benchmark',
  teardown = 'teardown',
}

export type AllIconNames = keyof typeof EIconName;
