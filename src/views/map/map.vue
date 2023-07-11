<!--
 * @Author: cola
 * @Date: 2022-12-06 16:23:38
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div id="map" class="relative w-full h-full"></div>
  <div class="absolute left-4 bottom-4">
    <button @click="toggleLayer('world')">全球</button>
    <button @click="toggleLayer('china')">全国</button>
    <button @click="locateByCode('china', '')">中国-</button>
    <button @click="locateByCode('world', '')">全球-</button>
  </div>
</template>

<script setup>
  import chinaLabel from './data/chinaLabel.json'
  import worldLabel from './data/worldLabel.json'
  import china from './data/china.json'
  import world from './data/world.json'
  import worldOther from './data/worldOther.json'
  import {
    Scene,
    PolygonLayer,
    LineLayer,
    PointLayer,
    Zoom,
    Popup,
  } from '@antv/l7'
  import { Map } from '@antv/l7-maps'
  import { es } from 'element-plus/es/locale'
  const selectStyle = 'rgba(20, 120, 230, 0.3)'
  const strokeStyle = 'rgba(93,112,146,1)'
  const fillStyle = '#eee'
  const textStyle = 'rgba(0,0,255,0.8)'
  const hoverStyle = 'rgba(20, 120, 230, 0.1)'
  const colors = [
    'rgb(255,255,217)',
    'rgb(237,248,177)',
    'rgb(199,233,180)',
    'rgb(127,205,187)',
    'rgb(65,182,196)',
    'rgb(29,145,192)',
    'rgb(34,94,168)',
    'rgb(12,44,132)',
  ]
  onMounted(() => {
    initMap()
  })
  let scene
  const popup = new Popup({
    offsets: [0, 0],
    closeButton: false,
  })
  function initMap() {
    scene = new Scene({
      id: 'map',
      map: new Map({
        pitch: 0,
        style: 'blank',
        center: [116.368652, 39.93866],
        zoom: 10,
        rotateEnable: false,
        maxZoom: 8,
      }),
      logoVisible: false,
    })
    scene.on('loaded', () => {
      const zoom = new Zoom()
      scene.addControl(zoom)
      scene.addPopup(popup)
      addHightLayer(scene)
      const worldLayer = addWorldLayer(scene)
      const worldOtherLayer = scene.getLayerByName('world_other_layer')
      worldLayer.on('click', (evt) => {
        locateByCode('world', evt.feature.properties.code)
      })
      worldOtherLayer.on('click', (evt) => {
        locateByCode('world', evt.feature.properties.code)
      })
      const chinaLayer = addChinaLayer(scene)
      chinaLayer.on('click', (evt) => {
        locateByCode('china', evt.feature.properties.adcode)
      })
      toggleLayer('world')
    })
  }
  function addHightLayer(scene, options) {
    const hightLayer = new LineLayer({
      zIndex: 4, // 设置显示层级
      name: 'hightlight',
    })
      .source({
        type: 'FeatureCollection',
        features: [],
      })
      .shape('line')
      .size(2)
      .color(selectStyle)
    scene.addLayer(hightLayer)
    return hightLayer
  }
  function addWorldLayer(scene, options) {
    const worldLayer = new PolygonLayer({
      name: 'world_layer',
      autoFit: true,
      blend: 'normal',
    }).source(world)

    worldLayer
      .shape('fill')
      .style({
        opacity: 1,
      })
      .color('code', (code) => {
        return colors[parseInt(Math.random() * 8)]
      })
      .active({
        color: hoverStyle,
      })
      .select(false)

    const worldOtherLayer = new PolygonLayer({
      name: 'world_other_layer',
      autoFit: true,
      blend: 'normal',
    }).source(worldOther)

    worldOtherLayer
      .shape('fill')
      .style({
        opacity: 1,
      })
      .color('code', (code) => {
        return colors[parseInt(Math.random() * 8)]
      })
      .active({
        color: hoverStyle,
      })
      .select(false)

    const labelLayer = new PointLayer({
      name: 'world_label_layer',
      zIndex: 5,
    })
      .source(worldLabel, {
        parser: {
          type: 'json',
          coordinates: 'center',
        },
      })
      .color(textStyle)
      .shape('NAME_CHN', 'text')
      .size(12)
      .style({
        textAllowOverlap: false,
      })
    //  图层边界
    const borderLayer = new LineLayer({
      name: 'world_border_layer',
      zIndex: 2,
    })
      .source(world)
      .color(strokeStyle)
      .size(0.6)
      .style({
        opacity: 1,
      })
    scene.addLayer(worldLayer)
    scene.addLayer(worldOtherLayer)
    scene.addLayer(borderLayer)
    scene.addLayer(labelLayer)
    return worldLayer
  }
  function showLayers(layers) {
    layers?.map((layer) => {
      layer?.show?.()
    })
  }
  function hideLayers(layers) {
    layers?.map((layer) => {
      layer?.hide?.()
    })
  }
  function addChinaLayer(scene, options) {
    const chinaLayer = new PolygonLayer({
      name: 'china_layer',
      autoFit: true,
    }).source(china)

    chinaLayer
      .shape('fill')
      .style({
        opacity: 1,
      })
      .color('code', () => {
        return colors[parseInt(Math.random() * 8)]
      })
      .active({
        color: hoverStyle,
      })
      .select(false)
    //  图层边界
    const borderLayer = new LineLayer({
      name: 'china_border_layer',
      zIndex: 2,
    })
      .source(china)
      .color(strokeStyle)
      .size(0.6)
      .style({
        opacity: 1,
      })
    const labelLayer = new PointLayer({
      name: 'china_label_layer',
      zIndex: 5,
    })
      .source(chinaLabel, {
        parser: {
          type: 'json',
          coordinates: 'center',
        },
      })
      .color(textStyle)
      .shape('NAME_CHN', 'text')
      .size(12)
      .style({
        textAllowOverlap: false,
      })
    scene.addLayer(chinaLayer)
    scene.addLayer(borderLayer)
    scene.addLayer(labelLayer)
    return chinaLayer
  }

  function toggleLayer(type) {
    const layers = scene.getLayers()
    const hightlightLayer = scene.getLayerByName('hightlight')
    hightlightLayer.setData({
      type: 'FeatureCollection',
      features: [],
    })
    popup.setLnglat([0, 0])
    switch (type) {
      case 'world':
        hideLayers(
          layers.filter((layer) => {
            return layer.name.startsWith('china')
          })
        )
        showLayers(
          layers.filter((layer) => {
            return layer.name.startsWith('world')
          })
        )
        break
      case 'china':
        hideLayers(
          layers.filter((layer) => {
            return layer.name.startsWith('world')
          })
        )
        showLayers(
          layers.filter((layer) => {
            return layer.name.startsWith('china')
          })
        )
        break
    }
  }

  function locateByCode(type, code) {
    const hightlightLayer = scene.getLayerByName('hightlight')
    let feature = null
    switch (type) {
      case 'world':
        // eslint-disable-next-line no-case-declarations
        const worldLayer = scene.getLayerByName('world_layer')
        feature = worldLayer.layerSource.originData.features.find((feature) => {
          return feature.properties.code === code
        })
        if (!feature) {
          const worldOtherLayer = scene.getLayerByName('world_other_layer')
          feature = worldOtherLayer.layerSource.originData.features.find(
            (feature) => {
              return feature.properties.code === code
            }
          )
        }
        break
      case 'china':
        // eslint-disable-next-line no-case-declarations
        const chinaLayer = scene.getLayerByName('china_layer')
        feature = chinaLayer.layerSource.originData.features.find((feature) => {
          return feature.properties.adcode === code
        })
        break
    }
    if (feature) {
      console.log(feature.properties.centroid)
      scene.setCenter(feature.properties.centroid)
      hightlightLayer.setData({
        type: 'FeatureCollection',
        features: [feature],
      })
      popup
        .setLnglat(feature.properties.centroid)
        .setHTML(`<span>地区: ${feature.properties.name}</span>`)
    }
  }
</script>
