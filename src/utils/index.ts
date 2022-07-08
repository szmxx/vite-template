export function getUrlParams(url = location.href) {
  const search = url.split('?')[0]
  return [...new URLSearchParams(search)].reduce(
    (a: Record<string, string>, [k, v]) => ((a[k] = v), a),
    {}
  )
}
