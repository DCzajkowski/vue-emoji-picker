# Highly-customizable emoji picker for Vue 2
<a href="https://www.npmjs.com/package/vue-emoji-picker"><img src="https://img.shields.io/npm/dt/vue-emoji-picker.svg" alt="Downloads"></a>
<a href="https://www.npmjs.com/package/vue-emoji-picker"><img src="https://img.shields.io/npm/v/vue-emoji-picker.svg" alt="Version"></a>
<a href="https://spdx.org/licenses/MIT.html"><img src="https://img.shields.io/npm/l/vue-emoji-picker.svg" alt="License"></a>

## Table of contents
- [Demo](#demo)
- [Installation](#installation)
    - [With npm](#with-npm)
    - [With a CDN](#with-a-cdn)
- [Import](#import)
    - [With an ES6 bundler (via npm)](#with-an-es6-bundler-via-npm)
        - [Use per component](#use-per-component)
        - [Use globally](#use-globally)
    - [Using a CDN](#using-a-cdn)
- [Usage](#usage)
    - [Very simple usage, without any CSS defined](#very-simple-usage-without-any-css-defined)
    - [CSS-styled example](#css-styled-example)
- [Available props](#available-props)
- [License](#license)


## Demo
The live demos are available here:
- [Simple, html-only demo](https://codepen.io/DCzajkowski/pen/JLypqP),
- [Complete, css-styled demo](https://codepen.io/DCzajkowski/pen/jzLzWp),
- [TailwindCSS-styled demo](https://codepen.io/DCzajkowski/pen/Brxvzj).

## Installation
### With npm
```bash
npm i vue-emoji-picker --save
```

### With a CDN
```html
<script src="https://unpkg.com/vue-emoji-picker/dist/vue-emoji-picker.js"></script>
```

## Import
### With an ES6 bundler (via npm)
#### Use per component
```js
import EmojiPicker from 'vue-emoji-picker'

export default {
    // ...
    components: {
        EmojiPicker,
    },
    // ...
}
```

#### Use globally
```js
import { EmojiPickerPlugin } from 'vue-emoji-picker'
Vue.use(EmojiPickerPlugin)
```

### Using a CDN
```html
<script>
    Vue.use(EmojiPicker)

    new Vue({
        // ...
    })
</script>
```

## Usage
vue-emoji-picker is a slot-based component, to provide maximum flexibility.
Since every ounce of html is created by a consumer (ie. you), you can customize every piece of the component as you wish.

### Very simple usage, without any CSS defined
You will need two things. A textarea (or an input), where emojis will be injected, and a component declaration. A simple example is provided below.
```html
<textarea v-model="input"></textarea>

<emoji-picker @emoji="insert" :search="search">
    <div class="emoji-invoker" slot="emoji-invoker" slot-scope="{ events }" v-on="events">
        <button type="button">open</button>
    </div>
    <div slot="emoji-picker" slot-scope="{ emojis, insert, display }">
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
</emoji-picker>
```

```js
{
    data() {
        return {
            input: '',
            search: '',
        }
    },
    methods: {
        insert(emoji) {
            this.input += emoji
        },
    },
}
```

As you may see, you have to declare some things yourself. Namely:
- `input` - a model for your input/textarea,
- `search` - a model for the search box inside the component (optional),
- `insert(emoji)` - a method responsible to put emojis into your input/textarea. Provided `emoji` is a string representation of the emoji to be inserted.

### CSS-styled example
To see what is possible with the component, you can simply have a look at a demo available [here](https://codepen.io/DCzajkowski/pen/jzLzWp).

## Available props
- `search` _optional_ - If you are not using the search functionality, you can omit this one. It should be a model of the search passed from your `data`.
- `emojiTable` _optional_ - You can overwrite the [default](https://github.com/DCzajkowski/vue-emoji-picker/blob/master/src/emojis.js) emoji table by providing your own.

## Slots
- `emoji-invoker`
    - `events` - delares the `v-on:click` toggle of the picker box,
- `emoji-picker`
    - `emojis` - object of unicode emojis,
    - `insert()` - method to be invoked when an emoji is clicked,
    - `display` - object containting `x`, `y` and `visible` properties.

## License
This work is an open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
