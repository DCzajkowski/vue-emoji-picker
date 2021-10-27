import _Vue, { PluginObject } from 'vue'
import EmojiPicker from '@/EmojiPicker.vue'

type InstallableComponent = typeof EmojiPicker & PluginObject<any>

export { EmojiPicker }

export default /*#__PURE__*/((): InstallableComponent => {
  const installable = EmojiPicker as unknown as InstallableComponent

  installable.install = (Vue: typeof _Vue) => {
    Vue.component('EmojiPicker', installable)
  }

  return installable
})()
