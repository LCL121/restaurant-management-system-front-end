<template>
  <div class="food-sort">
    <div class="sort-list">
      <dropdown
        v-for="(item, index) in dropDownDatas"
        :key="item.title"
        class="sort-list-item"
        :title="item.title"
        :sortList="item.sortList"
        :currentSortIndex="item.currentSortIndex"
        :isShowList="item.isShowList"
        @click="() => {changeShow(index, !item.isShowList)}"
        @change-selected="(selectedIdx) => {changeSelected(index, selectedIdx)}"
        @hidden-dropdown="() => {changeShow(index, false)}"
      ></dropdown>
    </div>
    <dropdown-mask v-if="isShowMask"></dropdown-mask>
    <food-list-model :foodList="foodListModelProps" :title="title"></food-list-model>
    <div ref="observedRef"></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, reactive, ref } from 'vue'
import Dropdown from '@/components/dropdown/index.vue'
import DropdownMask from '@/components/dropdownMask/index.vue'
import { getDropDownDatas } from './ts/init'
import { FoodList } from '@/store/modules/recommendFood'
import FoodListModel from '@/components/foodListModel/index.vue'
import { foodListModelProps, getFoodList, clearFoodList } from './ts/getFoodList'

export default defineComponent({
  name: 'FoodSort',
  components: {
    Dropdown,
    DropdownMask,
    FoodListModel
  },
  setup() {
    const dropDownDatas = getDropDownDatas()
    const observedRef = ref<HTMLDivElement>()
    const title = ref()
    const pageSize = 6
    let currentPage = 1
    let currentFloorFinished = false
    let pending = false
    const getFoodListF = () => {
      if (!currentFloorFinished && !pending) {
        pending = true
        getFoodList(dropDownDatas[0].currentSortIndex + 1, currentPage, pageSize, dropDownDatas[1].sortList[dropDownDatas[1].currentSortIndex].index)
          .then(data => {
            if (data) {
              currentFloorFinished = data.isFinished
              title.value = data.msg
            }
            pending = false
            currentPage++
          })
      }
    }
    const changeSelected = (index: number, selectedIdx: number) => {
      dropDownDatas[index].currentSortIndex = selectedIdx
      currentPage = 1
      clearFoodList()
      currentFloorFinished = false
      getFoodListF()
    }
    const changeShow = (index: number, isShow: boolean) => {
      dropDownDatas[index].isShowList = isShow
    }
    const isShowMask = computed(() => dropDownDatas.some(item => item.isShowList))
    const intersectionObserver = new IntersectionObserver(entries => {
      if (entries[0].intersectionRatio <= 0) return
      getFoodListF()
    })

    onMounted(() => {
      window.scroll(0, 0)
      if (observedRef.value) {
        intersectionObserver.observe(observedRef.value)
      }
      getFoodListF()
    })

    return {
      dropDownDatas,
      changeSelected,
      changeShow,
      isShowMask,
      foodListModelProps,
      observedRef,
      title
    }
  }
})
</script>

<style scoped lang="scss">
@import '@/style/index.scss';

$sort-list-height: px2rem(60);

.food-sort {
  width: 100%;
  .sort-list {
    width: 100%;
    height: $sort-list-height;
    display: flex;
    .sort-list-item {
      flex: 1;
      border-bottom: 1px #dbdbdb solid;
      position: relative;
      text-align: center;
      line-height: $sort-list-height;
      box-sizing: border-box;
    }
    .sort-list-item:nth-child(2)::before {
      content: '';
      position: absolute;
      left: 0;
      top: $sort-list-height / 2;
      transform: translate(-50%, -50%);
      width: px2rem(3);
      height: px2rem(35);
      background: #a8a7a7;
      overflow: hidden;
    }
  }
}
</style>
