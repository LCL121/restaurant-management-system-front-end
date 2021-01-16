import { DropdownProps } from '@/components/dropdown/type'

export const dropDownDatas: DropdownProps[] = [
  {
    title: '楼层',
    sortList: [{
      index: 1,
      name: '第一层'
    }, {
      index: 2,
      name: '第二层'
    }],
    currentSortIndex: 1
  },
  {
    title: '窗口',
    sortList: [{
      index: 1,
      name: '1号'
    }, {
      index: 2,
      name: '2号'
    }, {
      index: 3,
      name: '3号'
    }, {
      index: 4,
      name: '4号'
    }, {
      index: 5,
      name: '5号'
    }],
    currentSortIndex: 1
  }
]
