export type PriorityKey = 'urgent' | 'medium' | 'low';

export interface PriorityButtonConfig {
  key: PriorityKey;
  label: string;
  iconPath: string;
  altText: string;
  cssClass: string;
}
// export type PriorityKey = 'urgent' | 'medium' | 'low';

// export interface PriorityOptionInterface {
//   key: PriorityKey;
//   label: string;
//   iconPath: string;
// }
