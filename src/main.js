import ExampleComponent from './Components/ExampleComponent.vue'

const PackageName = {
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

        // Example component declaration:
        Vue.component('example-component', ExampleComponent)
    },
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(PackageName);
}

window.PackageName = PackageName

export { PackageName }
export default PackageName
