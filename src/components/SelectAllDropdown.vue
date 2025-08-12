<template>
  <div class="select-all-dropdown">
    <!-- 总父级 -->
    <label>
      <input
        type="checkbox"
        :checked="isAllChecked"
        :indeterminate.prop="isAllIndeterminate"
        @change="toggleAll"
      />
      全选
    </label>

    <div class="groups">
      <div v-for="group in options" :key="group.value" class="group">
        <label>
          <input
            type="checkbox"
            :checked="isParentChecked(group)"
            :indeterminate.prop="isParentIndeterminate(group)"
            @change="toggleParent(group)"
          />
          {{ group.label }}
        </label>

        <div class="children">
          <label v-for="child in group.children" :key="child.value">
            <input
              type="checkbox"
              :checked="isChildChecked(child.value)"
              @change="toggleChild(child.value)"
            />
            {{ child.label }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "SelectAllDropdown",
  props: {
    options: { type: Array, required: true }, // [{ label, value, children: [...] }]
    modelValue: { type: Array, default: () => [] },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    // 获取所有子项 value
    const allChildValues = computed(() =>
      props.options.flatMap((group) => group.children.map((c) => c.value))
    );

    // 总父级是否全选
    const isAllChecked = computed(() =>
      allChildValues.value.length > 0 &&
      allChildValues.value.every((v) => props.modelValue.includes(v))
    );

    // 总父级半选
    const isAllIndeterminate = computed(() => {
      const some = allChildValues.value.some((v) =>
        props.modelValue.includes(v)
      );
      return some && !isAllChecked.value;
    });

    // 切换总父级
    const toggleAll = () => {
      if (isAllChecked.value) {
        emit("update:modelValue", []);
      } else {
        emit("update:modelValue", [...allChildValues.value]);
      }
    };

    // 分组状态
    const isParentChecked = (parent) =>
      parent.children.every((c) => props.modelValue.includes(c.value));

    const isParentIndeterminate = (parent) => {
      const some = parent.children.some((c) =>
        props.modelValue.includes(c.value)
      );
      return some && !isParentChecked(parent);
    };

    const toggleParent = (parent) => {
      const childValues = parent.children.map((c) => c.value);
      let newSelected;
      if (isParentChecked(parent)) {
        newSelected = props.modelValue.filter(
          (v) => !childValues.includes(v)
        );
      } else {
        newSelected = Array.from(
          new Set([...props.modelValue, ...childValues])
        );
      }
      emit("update:modelValue", newSelected);
    };

    // 子项状态
    const isChildChecked = (value) => props.modelValue.includes(value);

    const toggleChild = (value) => {
      let newSelected;
      if (isChildChecked(value)) {
        newSelected = props.modelValue.filter((v) => v !== value);
      } else {
        newSelected = [...props.modelValue, value];
      }
      emit("update:modelValue", newSelected);
    };

    return {
      isAllChecked,
      isAllIndeterminate,
      toggleAll,
      isParentChecked,
      isParentIndeterminate,
      toggleParent,
      isChildChecked,
      toggleChild,
    };
  },
});
</script>

<style scoped>
.select-all-dropdown {
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 4px;
  width: 300px;
}
.groups {
  margin-top: 8px;
}
.group {
  margin-bottom: 8px;
}
.children {
  padding-left: 20px;
  display: flex;
  flex-direction: column;
}
</style>
