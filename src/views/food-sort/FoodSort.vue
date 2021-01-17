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
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted } from 'vue'
import Dropdown from '@/components/dropdown/index.vue'
import DropdownMask from '@/components/dropdownMask/index.vue'
import { getDropDownDatas } from './ts/init'

export default defineComponent({
  name: 'FoodSort',
  components: {
    Dropdown,
    DropdownMask
  },
  setup() {
    const dropDownDatas = getDropDownDatas()
    const changeSelected = (index: number, selectedIdx: number) => {
      dropDownDatas[index].currentSortIndex = selectedIdx
    }
    const changeShow = (index: number, isShow: boolean) => {
      dropDownDatas[index].isShowList = isShow
    }
    const isShowMask = computed(() => dropDownDatas.some(item => item.isShowList))

    onMounted(() => {
      window.scroll(0, 0)
    })

    return {
      dropDownDatas,
      changeSelected,
      changeShow,
      isShowMask
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
