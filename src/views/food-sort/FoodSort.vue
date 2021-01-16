<template>
  <div class="food-sort">
    <div class="sort-list">
      <dropdown
        v-for="item in dropDownDatas"
        :key="item.title"
        class="sort-list-item"
        :title="item.title"
        :sortList="item.sortList"
        :currentSortIndex="item.currentSortIndex"
      ></dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Dropdown from '@/components/dropdown/index.vue'
import { dropDownDatas } from './ts/init'

export default defineComponent({
  name: 'FoodSort',
  components: {
    Dropdown
  },
  setup() {
    return {
      dropDownDatas
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
