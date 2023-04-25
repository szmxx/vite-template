<!--
 * @Author: cola
 * @Date: 2022-12-07 11:56:51
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div id="mapView" class="w-full h-full"></div>
</template>

<script setup>
  import AMapLoader from '@amap/amap-jsapi-loader'
  import LabelsData from './data/china'
  AMapLoader.load({
    key: '89382fa025180811124c99bf9b39f468	',
    version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ['Map3D', 'AMap.DistrictLayer', 'AMap.ToolBar'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  })
    .then((AMap) => {
      initMap(AMap)
    })
    .catch((e) => {
      console.error(e)
    })
  const selectStyle = 'rgba(20, 120, 230, 0.3)'
  const strokeStyle = 'rgba(93,112,146,1)'
  const fillStyle = 'rgba(255,255,255,1)'
  const hoverStyle = 'rgba(20, 120, 230, 0.1)'
  let selectRegion
  function initMap(AMap) {
    let infoWindow
    // 绘制世界地图国家轮廓
    const disWorld = new AMap.DistrictLayer.World({
      zIndex: 10,
      styles: {
        'nation-stroke': strokeStyle,
        'coastline-stroke': strokeStyle,
        fill: fillStyle,
      },
    })
    const disCountry = new AMap.DistrictLayer.Country({
      SOC: 'CHN',
      depth: 1,
      styles: {
        'nation-stroke': strokeStyle,
        'coastline-stroke': strokeStyle,
        'province-stroke': strokeStyle,
        fill: fillStyle,
      },
    })
    const map = new AMap.Map('mapView', {
      zooms: [0, 6],
      center: [110, 30],
      rotateEnable: false,
      showIndoorMap: false,
      zoom: 4,
      isHotspot: false,
      defaultCursor: 'pointer',
      touchZoomCenter: 1,
      pitch: 0,
      showLabel: false,
      layers: [disWorld, disCountry],
      viewMode: '2D',
      resizeEnable: true,
    })
    map.addControl(new AMap.ToolBar({ liteStyle: true }))
    map.on('complete', function () {
      const layer = new AMap.LabelsLayer({
        // 开启标注避让，默认为开启，v1.4.15 新增属性
        collision: true,
        // 开启标注淡入动画，默认为开启，v1.4.15 新增属性
        animation: true,
      })
      for (let i = 0; i < LabelsData.length; i++) {
        const labelsMarker = new AMap.LabelMarker(LabelsData[i])
        layer.add(labelsMarker)
      }
      map.add(layer)
    })
    map.on('click', function (evt) {
      const px = evt.pixel
      // 拾取所在位置的行政区
      const w_props = disWorld.getDistrictByContainerPos(px)
      const c_props = disCountry.getDistrictByContainerPos(px)
      const props = c_props ? c_props : w_props
      if (props) {
        const NAME_CHN = props.NAME_CHN
        selectRegion = NAME_CHN
        openInfo(evt.lnglat)
        if (NAME_CHN) {
          updateStyle('click', NAME_CHN, evt.lnglat)
        }
      } else {
        closeInfo()
      }
    })
    function updateStyle(type, NAME_CHN) {
      let style
      if (type === 'mouseover') {
        style = hoverStyle
      }
      if (type === 'click') {
        style = selectStyle
      }
      disWorld.setStyles({
        // 国境线
        'nation-stroke': strokeStyle,
        // 海岸线
        'coastline-stroke': strokeStyle,
        fill: function (props) {
          if (props.NAME_CHN === selectRegion) {
            return selectStyle
          }
          return props.NAME_CHN == NAME_CHN ? style : fillStyle
        },
      })
      disCountry.setStyles({
        // 国境线
        'nation-stroke': strokeStyle,
        // 海岸线
        'coastline-stroke': strokeStyle,
        fill: function (props) {
          if (props.NAME_CHN === selectRegion) {
            return selectStyle
          }
          return props.NAME_CHN == NAME_CHN ? style : fillStyle
        },
      })
    }
    map.on('mousemove', function (evt) {
      const px = evt.pixel
      // 拾取所在位置的行政区
      const w_props = disWorld.getDistrictByContainerPos(px)
      const c_props = disCountry.getDistrictByContainerPos(px)
      const props = c_props ? c_props : w_props
      if (props) {
        const NAME_CHN = props.NAME_CHN
        if (NAME_CHN) {
          updateStyle('mouseover', NAME_CHN)
        }
      }
    })
    function openInfo(position, props) {
      const info = []
      info.push('<div>')
      info.push('<div style="padding:0px 0px 0px 4px;"><b>高德软件</b>')
      info.push('电话 : 010-84107000   邮编 : 100102')
      info.push('地址 :北京市朝阳区望京阜荣街10号首开广场4层</div></div>')
      infoWindow = new AMap.InfoWindow({
        content: info.join('<br/>'),
      })
      infoWindow.open(map, position)
    }
    function closeInfo() {
      infoWindow.close()
    }
  }
</script>

<style scoped lang="scss">
  :deep(.amap-copyright),
  :deep(.amap-logo) {
    display: none !important;
    opacity: 0 !important;
    pointer-events: none;
  }
</style>
