/*
 * @Author: cola
 * @Date: 2022-07-17 20:54:55
 * @LastEditors: cola
 * @Description:
 */
export {}

// function buildTree(routes, parent) {
//   routes.map((route) => {
//     route.component = () => import(`@/views/${route.name}`)
//     route.path = parent ? route.name : `/${route.name}`
//     if (route?.children?.length) {
//       buildTree(route.children, route)
//     }
//   })
// }

// function flatTree(routes) {
//   const list = []
//   routes.map((route) => {
//     list.push(route)
//     if (route?.children?.length) {
//       list.push(...flatTree(route.children))
//     }
//   })
//   return list
// }
