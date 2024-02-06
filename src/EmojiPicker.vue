<template>
  <div>
    <slot
      name="emoji-invoker"
      :events="{ click: (e) => toggle(e) }"
    ></slot>
    <div
      v-if="display.visible"
      v-click-outside="hide"
    >
      <slot
        name="emoji-picker"
        :emojis="emojis"
        :insert="insert"
        :display="display"
      ></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue, { PropType } from 'vue'
  import emojis from './emojis'

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping
  const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

  type Data = {
    display: {
      x: number
      y: number
      visible: boolean
    }
  }

  type ClickOutsideElement = HTMLElement & { __vueClickOutside__: ((e: MouseEvent) => void) | null }

  export default /*#__PURE__*/Vue.extend({
    name: 'EmojiPicker',
    props: {
      search: {
        type: String as PropType<string>,
        required: false,
        default: '',
      },
      emojiTable: {
        type: Object as PropType<Record<string, Record<string, string>>>,
        required: false,
        default() {
          return emojis
        },
      },
    },
    data(): Data {
      return {
        display: {
          x: 0,
          y: 0,
          visible: false,
        },
      }
    },
    computed: {
      emojis(): Record<string, Record<string, string>> {
        if (this.search) {
          const obj: Record<string, Record<string, string>> = {}

          for (const category in this.emojiTable) {
            obj[category] = {}

            for (const emoji in this.emojiTable[category]) {
              if (new RegExp(`.*${escapeRegExp(this.search.toLowerCase())}.*`).test(emoji)) {
                obj[category][emoji] = this.emojiTable[category][emoji]
              }
            }

            if (Object.keys(obj[category]).length === 0) {
              delete obj[category]
            }
          }

          return obj
        }

        return this.emojiTable
      },
    },
    methods: {
      insert(emoji: string): void {
        this.$emit('emoji', emoji)
      },
      toggle(e: MouseEvent): void {
        this.display.visible = ! this.display.visible
        this.display.x = e.clientX
        this.display.y = e.clientY
      },
      hide(): void {
        this.display.visible = false
      },
      escape(e: KeyboardEvent): void {
        if (this.display.visible === true && e.keyCode === 27) {
          this.display.visible = false
        }
      },
    },
    directives: {
      'click-outside': {
        bind(el: ClickOutsideElement, binding: any) {
          if (typeof binding.value !== 'function') {
            return
          }

          const bubble = binding.modifiers.bubble
          const handler = (e: any) => {
            if (bubble || (! el.contains(e.target) && el !== e.target)) {
              binding.value(e)
            }
          }
          el.__vueClickOutside__ = handler

          document.addEventListener('click', handler)
        },
        unbind(el: ClickOutsideElement) {
          if (el.__vueClickOutside__ !== null) {
            document.removeEventListener('click', el.__vueClickOutside__)

            el.__vueClickOutside__ = null
          }
        },
      } as any,
    },
    mounted() {
      document.addEventListener('keyup', this.escape)
    },
    destroyed() {
      document.removeEventListener('keyup', this.escape)
    },
  })
</script>
