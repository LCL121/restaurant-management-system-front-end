export interface SortItem {
  index: number;
  name: string;
}

export type SortList = SortItem[]

export interface DropdownProps {
  title: string;
  sortList: SortList;
  currentSortIndex: number;
  isShowList: boolean;
}
