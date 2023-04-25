<!--
 * @Author: cola
 * @Date: 2023-03-20 18:10:06
 * @LastEditors: cola
 * @Description:
-->
<template>
  <GlobalTable class="w-full overflow-hidden">
    <template #title="{ row }">
      <span>{{ row['title'] }}</span>
    </template>
  </GlobalTable>
</template>

<script setup lang="ts"></script>
