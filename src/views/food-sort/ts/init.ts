import { reactive } from 'vue'
import { DropdownProps } from '@/components/dropdown/type'

const dropDownDefaultDatas = [
  {
    title: '楼层',
    sortList: [{
      index: 0,
      name: '无'
    }, {
      index: 1,
      name: '第一层'
    }, {
      index: 2,
      name: '第二层'
    }],
    currentSortIndex: 0,
    isShowList: false
  },
  {
    title: '窗口',
    sortList: [{
      index: 0,
      name: '无'
    }, {
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
    }, {
      index: 6,
      name: '6号'
    }, {
      index: 7,
      name: '7号'
    }, {
      index: 8,
      name: '8号'
    }, {
      index: 9,
      name: '9号'
    }, {
      index: 10,
      name: '10号'
    }, {
      index: 11,
      name: '11号'
    }],
    currentSortIndex: 0,
    isShowList: false
  }
]

export const getDropDownDatas = () => {
  return reactive<DropdownProps[]>(JSON.parse(JSON.stringify(dropDownDefaultDatas)))
}
