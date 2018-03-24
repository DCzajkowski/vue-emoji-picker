import EmojiPickerComponent from './Components/EmojiPicker.vue'

const EmojiPicker = {
    install(Vue, options = {}) {
        /**
         * Here comes your plugin's logic
         *
         * To make use of it you can declare a Vue mixin:
         * Vue.mixin({
         *     // Your Vue related logic goes here
         * });
         *
         * If you don't want to use a mixin, you can also use all Vue-connected declarations like so:
         * Vue.component('component-name', ImportedComponent)
         *
         * Good resources:
         * - https://alligator.io/vuejs/creating-custom-plugins/
         * - https://vuejs.org/v2/guide/plugins.html
         */

        Vue.component('emoji-picker', EmojiPicker)
    },
}

if (typeof window !== 'undefined') {
    if (window.Vue) {
        window.Vue.use(EmojiPicker)
    }

    window.EmojiPicker = EmojiPicker
}

export { EmojiPicker: EmojiPickerComponent }
export default EmojiPickerComponent
