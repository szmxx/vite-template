/*
 * @Author: cola
 * @Date: 2023-03-27 01:27:35
 * @LastEditors: cola
 * @Description:
 */
export const INVALID_VALUE = [null, undefined, '', false, Infinity, -Infinity]

export const STYLE_KEYS = ['style', 'class']

export const DYNAMIC_KEYS = ['api']

export const UNIQUE_KEY = '__INNERKEY__'

export const COMPONENT_PREFIX = 'Common'
export const EVENT_SUFFIX = 'Handler'
export const HOOK_NAME = 'hooks'

export const DirectiveRe = /^v-.*/
export const EventRe = /^@.*/

export const Q_START = '__Q_START__'
export const Q_END = '__Q_END__'

export const HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeDestroy',
  'destroyed',
]

export const CONTAINER_COMPONENT_MAP = {
  GridContainer: 'CommonGrid',
  FlexContainer: 'CommonFlex',
  TableContainer: 'CommonTable',
  TabContainer: 'CommonTab',
  CardContainer: 'CommonCard',
  FormContainer: 'CommonForm',
}

export const COMPONENT_CONTAINER_MAP = Object.keys(CONTAINER_COMPONENT_MAP).map(
  (key) => {
    return {
      [CONTAINER_COMPONENT_MAP[key as keyof typeof CONTAINER_COMPONENT_MAP]]:
        key,
    }
  }
)
