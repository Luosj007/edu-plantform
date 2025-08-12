<template>
  <div>
    <h1>个人信息</h1>

    <SelectAllDropdown :options="data" v-model="selectedList" />

    <p>当前选中: {{ selectedList }}</p>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import SelectAllDropdown from '@/components/SelectAllDropdown.vue'

export default defineComponent({
  name: "PersonalInfo",
  components: { SelectAllDropdown },
  setup() {
    const selectedList = ref([]);

    const data = [
      {
        label: "基本信息",
        value: "base",
        children: [
          { label: "姓名", value: "name" },
          { label: "性别", value: "gender" },
        ],
      },
      {
        label: "联系方式",
        value: "contact",
        children: [
          { label: "邮箱", value: "email" },
          { label: "电话", value: "phone" },
        ],
      },
    ];

    return { selectedList, data };
  },
});
</script>

<style scoped>
</style>
