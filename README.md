# magic-tooltip

> A tooltips with some magic.

## Build Setup

``` bash
# add package to Your project via yarn or npm
yarn add magic-tooltip
```

## How to use?
For more information [check this story](https://medium.com/@monazzz/the-tooltip-web-component-with-vue-and-vuex-3b588917ab62).

## Basic example

Import components. There are three parts of this puzzle:

* MagicTooltipDisplay - global component for disaplaying stuff.
* MagicTooltipStore - Vuex store for global display.
* MagicTooltip - component which will trigger the display.

### Setup store
It can be used in few ways depending on Your Vuex store configuration

``` js
// useing as a module
import {
  MagicTooltipStore
} from 'magic-tooltip'

export const state = MagicTooltipStore.state
export const mutations = MagicTooltipStore.mutations
export const actions = MagicTooltipStore.actions
export const getters = MagicTooltipStore.getters
```

### Then regular component usage stuff
``` js
import {MagicTooltip, MagicTooltipDisplay} from 'magic-tooltip';
```

``` html
<!-- inside of some component -->
<ul> <!-- the list or some other wrapper -->
  <!-- the row -->
  <li v-for="(row, index) in dataSrc" :key="index">
   #{{ row.id }} 
   ...more components or content of the row goes here...
    <magic-tooltip direction="right">
      <!-- this slot will be trigger for the tooltip -->
      <span slot="target">{{row.username}}</span>

      <!-- this slot will be sent to global
       tooltip display when target is hovered -->
      <div slot="content">
        {{row.name}} <br />
        <i>{{row.company.catchPhrase}}</i><br>
        {{row.company.name}}<br><br>
        <a :href="row.website" target="_blank">{{row.website}}</a>
      </div>
    </magic-tooltip>
  </li>
</ul>

<!-- this is global component -->
<!-- make sure You have only one this per entire page -->
<magic-tooltip-display></magic-tooltip-display>
```

Don't forget to register imorted components. Enjoy!