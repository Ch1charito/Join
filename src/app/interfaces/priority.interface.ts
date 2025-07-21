export type PriorityKey = 'urgent' | 'medium' | 'low';
export interface PriorityInterface {
  key: PriorityKey;
  label: string;
  iconPath: string;
}
