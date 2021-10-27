<script lang="ts">
  import Vue from 'vue'
  import EmojiPicker from '@/EmojiPicker.vue'

  export default Vue.extend({
    name: 'ServeDev',
    components: {
      EmojiPicker,
    },
    data() {
      return {
        input: '',
        search: '',
      }
    },
    methods: {
      insert(emoji: string) {
        this.input += emoji
      },
    },
  })
</script>

<template>
  <div id="app">
    <textarea v-model="input"></textarea>

    <EmojiPicker @emoji="insert" :search="search">
      <div slot="emoji-invoker" slot-scope="{ events: { click: clickEvent } }" @click.stop="clickEvent">
        <button type="button">open</button>
      </div>
      <div slot="emoji-picker" slot-scope="{ emojis, insert }">
        <div>
          <div>
            <input type="text" v-model="search">
          </div>
          <div>
            <div v-for="(emojiGroup, category) in emojis" :key="category">
              <h5>{{ category }}</h5>
              <div>
                <span
                  v-for="(emoji, emojiName) in emojiGroup"
                  :key="emojiName"
                  @click="insert(emoji)"
                  :title="emojiName"
                >{{ emoji }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </EmojiPicker>
  </div>
</template>
