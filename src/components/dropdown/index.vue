<template>
  <div class="dropdown" ref="dropdownRef">
    {{title}} - {{sortList[currentSortIndex].name}}
    <ul
      class="dropdown-list"
      v-if="isShowList"
      ref="dropdownListRef"
    >
      <!-- 最多展示9个 -->
      <li
        class="dorpdown-list-item"
        v-for="item in sortList"
        :key="item.index"
        :class="{checked: item.index === currentSortIndex}"
        @click="changeSelected(item.index)"
      >{{item.name}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { SortList } from './type'

export default defineComponent({
  name: 'Dropdown',
  props: {
    title: {
      type: String,
      required: true
    },
    sortList: {
      type: Array as PropType<SortList>,
      required: true
    },
    currentSortIndex: {
      type: Number,
      required: true
    },
    isShowList: {
      type: Boolean,
      required: true
    }
  },
  emits: ['change-selected', 'hidden-dropdown'],
  setup(props, context) {
    const dropdownListRef = ref<null | HTMLUListElement>(null)
    const dropdownRef = ref<null | HTMLDivElement>(null)
    const changeSelected = (index: number) => {
      context.emit('change-selected', index)
    }
    const isClickOutside = ref(false)

    const handler = (e: MouseEvent) => {
      if (dropdownRef.value) {
        if (!dropdownRef.value.contains(e.target as HTMLElement)) {
          isClickOutside.value = true
        } else {
          isClickOutside.value = false
        }
      }
    }

    onMounted(() => {
      document.addEventListener('click', handler)
    })

    onUnmounted(() => {
      document.removeEventListener('click', handler)
    })

    watch(() => props.isShowList, () => {
      if (props.isShowList && props.sortList.length > 9) {
        nextTick(() => {
          if (dropdownListRef.value) {
            dropdownListRef.value.style.height = '900%'
          }
        })
      }
    })

    watch(isClickOutside, () => {
      if (isClickOutside.value) {
        context.emit('hidden-dropdown')
      }
    })

    return {
      dropdownListRef,
      dropdownRef,
      changeSelected
    }
  }
})
</script>

<style scoped lang="scss">
@import '@/style/index.scss';

.dropdown {
  .dropdown-list {
    z-index: 200;
    background: #fff;
    position: relative;
    overflow-y: auto;
    list-style: none;
    margin: 0;
    padding: 0;
    .dorpdown-list-item {
      border: 1px #dbdbdb solid;
      border-top: none;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    .checked {
      color: #f50;
    }
  }
}
</style>
