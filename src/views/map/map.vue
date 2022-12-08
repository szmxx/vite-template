<!--
 * @Author: cola
 * @Date: 2022-12-06 16:23:38
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div id="map" class="relative w-full h-full"></div>
  <div class='absolute left-4 bottom-4'>
    <button @click='toggleLayer("world")'>全球</button>
    <button @click='toggleLayer("china")'>全国</button>
    <button @click='locateByCode("china","")'>中国-</button>
    <button @click='locateByCode("world","")'>全球-</button>
  </div>
</template>

<script setup>
  import china from './data/china.json'
  import chinaLabel from './data/chinaLabel.json'
  import worldLabel from './data/worldLabel.json'
  import chinaLine from "./data/chinaLine.json"
  import world from './data/world.json'
  import { Scene, PolygonLayer, LineLayer, PointLayer, Zoom } from '@antv/l7'
  import { Mapbox } from '@antv/l7-maps'
  const selectStyle = 'rgba(20, 120, 230, 0.3)'
  const strokeStyle = 'rgba(93,112,146,1)'
  const fillStyle = 'rgba(0, 0, 0, 0.6)'
  const textStyle = 'rgba(0,0,255,0.8)'
  const hoverStyle = 'rgba(20, 120, 230, 0.1)'
  onMounted(() => {
    initMap()
  })
  let scene
  function initMap() {
    scene = new Scene({
      id: 'map',
      map: new Mapbox({
        pitch: 0,
        style: 'blank',
        center: [116.368652, 39.93866],
        zoom: 10,
        rotateEnable: false,
        // maxZoom: 5,
      }),
      logoVisible: false,
    })
    scene.on('loaded', () => {
      const zoom = new Zoom()
      scene.addControl(zoom)
      const hightLayer = addHightLayer(scene)
      const worldLayer = addWorldLayer(scene)
      worldLayer.on('click', (feature) => {
        console.log(feature.feature)
        hightLayer.setData({
          type: 'FeatureCollection',
          features: [feature.feature],
        })
      })
      const chinaLayer = addChinaLayer(scene)
      chinaLayer.on('click', (feature) => {
        hightLayer.setData({
          type: 'FeatureCollection',
          features: [feature.feature],
        })
      })
      toggleLayer("world")
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
      name: "world_layer",
      autoFit: true,
    }).source(world)

    worldLayer
      .shape('fill')
      .style({
        opacity: 1,
      })
      .color(fillStyle)
      .active({
        color: hoverStyle
      })
      .select(true)
    const labelLayer = new PointLayer({
      name: "world_label_layer",
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
      name: "world_border_layer",
      zIndex: 2,
    })
      .source(world)
      .color(strokeStyle)
      .size(0.6)
      .style({
        opacity: 1,
      })
    const guojiexian = new LineLayer({
      zIndex: 1,
      name: "world_guojie_layer"
    })
      .source(chinaLine)
      .shape("line")
      .size(0.8)
      .color(strokeStyle)
      .style({
        opacity: 1
      });
    scene.addLayer(worldLayer)
    scene.addLayer(borderLayer)
    scene.addLayer(labelLayer)
    scene.addLayer(guojiexian)
    return worldLayer
  }
  function showLayers(layers){
    layers?.map(layer => {
      layer?.show?.()
    })
  }
  function hideLayers(layers){
    layers?.map(layer => {
      layer?.hide?.()
    })
  }
  function addChinaLayer(scene, options) {
    const chinaLayer = new PolygonLayer({
      name: "china_layer",
      autoFit: true,
    }).source(china)

    chinaLayer
      .shape('fill')
      .style({
        opacity: 1,
      })
      .color(fillStyle)
      .active({
        color: hoverStyle
      })
      .select(true)
    //  图层边界
    const borderLayer = new LineLayer({
      name: "china_border_layer",
      zIndex: 2,
    })
      .source(china)
      .color(strokeStyle)
      .size(0.6)
      .style({
        opacity: 1,
      })
    const labelLayer = new PointLayer({
      name: "china_label_layer",
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

  function toggleLayer(type){
    const layers = scene.getLayers()
    const hightlightLayer = scene.getLayerByName('hightlight')
    hightlightLayer.setData({
      type: 'FeatureCollection',
      features: [],
    })
    switch(type){
      case "world":
        hideLayers(layers.filter(layer=>{
          return layer.name.startsWith("china")
        }))
        showLayers(layers.filter(layer=>{
          return layer.name.startsWith("world")
        }))
        break;
      case "china":
        hideLayers(layers.filter(layer=>{
          return layer.name.startsWith("world")
        }))
        showLayers(layers.filter(layer=>{
          return layer.name.startsWith("china")
        }))
        break;
    }
  }

  function locateByCode(type, code){
    const hightlightLayer = scene.getLayerByName('hightlight')
    switch(type){
      case "world":
        const worldLayer = scene.getLayerByName('world_layer')
        console.log(worldLayer)
        break
      case "china":
        const chinaLayer = scene.getLayerByName('china_layer')
        console.log(chinaLayer)
        break
    }
  }
</script>
