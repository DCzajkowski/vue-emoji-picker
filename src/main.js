import EmojiPickerComponent from './Components/EmojiPicker.vue'

if (typeof window !== 'undefined') {
    const EmojiPicker = {
        install(Vue, options = {}) {
            Vue.component('emoji-picker', EmojiPickerComponent)
        },
    }

    if (window.Vue) {
        window.Vue.use(EmojiPicker)
    }

    window.EmojiPicker = EmojiPicker
}

export { EmojiPickerComponent as EmojiPicker }
export default EmojiPickerComponent
