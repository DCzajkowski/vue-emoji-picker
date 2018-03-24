import EmojiPickerComponent from './Components/EmojiPicker.vue'

const EmojiPickerPlugin = {
    install(Vue, options = {}) {
        Vue.component('emoji-picker', EmojiPickerComponent)
    },
}

if (typeof window !== 'undefined') {
    window.EmojiPicker = EmojiPickerPlugin
}

export { EmojiPickerComponent as EmojiPicker, EmojiPickerPlugin }
export default EmojiPickerComponent
