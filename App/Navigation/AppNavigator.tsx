type appNavigatorType = null | object

export let appNavigator: appNavigatorType = null

export const setAppNavigator = (ref: object | null) => {
  appNavigator = ref
}
