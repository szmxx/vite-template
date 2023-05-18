<!--
 * @Author: cola
 * @Date: 2023-03-20 20:09:55
 * @LastEditors: cola
 * @Description:
-->
<template>
  <CommonTable class="w-full overflow-hidden">
    <template #title="{ row }">
      <span>{{ row['title'] }}</span>
    </template>
  </CommonTable>
</template>

<script setup lang="ts"></script>
