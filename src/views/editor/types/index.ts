export interface TreeItem {
  id: string
  label: string
  isEdit?: boolean
  expanded?: boolean
  children?: TreeItem[]
  meta?: Record<string, unknown>
}
export interface FormItem {
  parentKey?: string
  key: string
  label: string
  value: unknown
  component: string
  type?: string
  options?: unknown[]
  default?: unknown
  level?: number
}
export interface FormConfig {
  labelWidth?: string
  labelPosition?: string
  disabled?: boolean
  size?: string
  panelWidth?: string
  [x: string]: unknown
}
