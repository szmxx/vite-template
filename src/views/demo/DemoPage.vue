<!--
 * @Author: cola
 * @Date: 2022-07-05 10:27:53
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div>
    {{ x }}
    {{ y }}
  </div>
  <GlobalTree :data="treeData" @expand="expand" @change="change"></GlobalTree>
  <GlobalBreadcrumb :list="breadcrumb"></GlobalBreadcrumb>
</template>

<script setup lang="ts">
  const { x, y } = useMouse()
  function expand(evt: any) {
    console.log(JSON.parse(JSON.stringify(evt)))
  }
  function change(evt: any) {
    console.log(JSON.parse(JSON.stringify(evt)))
  }
  const treeData = [
    {
      id: '1',
      title: '子节点-1',
      meta: {
        icon: 'i-mdi-home',
      },
      children: [
        {
          id: '11',
          meta: {
            icon: 'i-custom-dark',
          },
          title: '子节点-11',
          children: [
            {
              id: '111',
              meta: {
                icon: 'i-custom-default',
              },
              title: '子节点-111',
            },
            {
              id: '112',
              meta: {
                icon: 'ii-mdi-message',
              },
              title: '子节点-112',
              children: [
                {
                  id: '1121',
                  meta: {
                    icon: 'i-mdi-monitor-lock',
                  },
                  title: '子节点-1121',
                },
              ],
            },
            {
              id: '113',
              meta: {
                icon: 'i-custom-default',
              },
              title: '子节点-113',
            },
          ],
        },
        {
          id: '12',
          meta: {
            icon: 'i-custom-dark',
          },
          title: '子节点-12',
          children: [
            {
              id: '121',
              meta: {
                icon: 'i-custom-default',
              },
              title: '子节点-121',
            },
            {
              id: '122',
              meta: {
                icon: 'ii-mdi-message',
              },
              title: '子节点-122',
              children: [
                {
                  id: '1221',
                  meta: {
                    icon: 'i-mdi-monitor-lock',
                  },
                  title: '子节点-1221',
                },
              ],
            },
            {
              id: '123',
              meta: {
                icon: 'i-custom-default',
              },
              title: '子节点-123',
            },
          ],
        },
      ],
    },
    {
      id: '2',
      title: '子节点-2',
      children: [
        {
          id: '21',
          title: '子节点-21',
          meta: {
            icon: 'i-mdi-alarm',
          },
          children: [
            {
              id: '211',
              title: '子节点-211',
              meta: {
                icon: 'i-mdi-microphone-variant',
              },
            },
            {
              id: '212',
              title: '子节点-212',
              meta: {
                icon: 'i-mdi-microsoft-bing',
              },
              children: [
                {
                  id: '2121',
                  title: '子节点-2121',
                  meta: {
                    icon: 'i-mdi-microsoft',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ]
  const breadcrumb = [
    {
      name: '标题',
      path: '/',
    },
    {
      name: '次栏',
      path: '/demo',
    },
    {
      name: '正文',
    },
  ]
</script>
