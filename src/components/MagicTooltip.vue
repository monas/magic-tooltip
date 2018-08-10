<template>
    <span class="magic-tooltip" @mouseenter="enterHandler" @mouseleave="leaveHandler" ref="tooltipText">
        <slot name="target"></slot>

        <!-- <slot name="content"></slot> <- this slot is used for content transportation only -->
    </span>
</template>
<script>
import {mapGetters} from 'vuex';

export default {
  name: 'MagicTooltipTrigger',
  props: {
    direction: {
      type: String,
      default: 'top'
    },
  },
  data() {
    return {
      showFn: null,
      cancelFn: null,
    };
  },
  computed: {
    ...mapGetters({
      ttPosition: 'tooltipSingleGetPosition',
      ttContent: 'tooltipSingleGetContent',
      ttOpen: 'tooltipSingleGetOpenState',
      ttShouldClose: 'tooltipShouldClose',
    }),
  },
  methods: {
    /**
     * Clear cancel function and set timeout with show actions.
     */
    enterHandler(e) {
      clearTimeout(this.cancelFn);
      var position = this.getPosition();

      if (!position) {
        return;
      }

      // if position is different and ttOpen is true - we need to close previous
      if (
        (this.ttOpen || this.ttShouldClose) &&
        !this.inSamePosition(position, this.ttPosition)
      ) {
        this.$store.dispatch('setShouldClose', {value: true});
        this.showFn = setTimeout(() => {
          this.$store.dispatch('setContent', {content: this.$slots.content});
          this.$store.dispatch('setPosition', {position: position});
          this.$store.dispatch('openTooltip', {});
        }, 500);

        return;
      }

      // if position of tooltip is the same and it is opened - prevent from closing it
      if (this.ttOpen && this.inSamePosition(position, this.ttPosition)) {
        this.$store.dispatch('setShouldClose', {value: false});
        return;
      }

      // if we still here - just set content, position and open the tooltip
      if (!this.ttOpen) {
        this.showFn = setTimeout(() => {
          this.$store.dispatch('setContent', {content: this.$slots.content});
          this.$store.dispatch('setPosition', {position: position});
          this.$store.dispatch('openTooltip', {});
        }, 500);
      }
    },
    /**
     * Clear show function and set timeout with cancel actions.
     */
    leaveHandler() {
      this.cancelFn = setTimeout(() => {
        clearTimeout(this.showFn);
        this.$store.dispatch('setShouldClose', {value: true});
      }, 200);
    },
    /**
     * This will try to detect position of tooltipText bounding rectangle.
     */
    getPosition() {
      // grab text block coordinates
      var targetEl = this.$refs.tooltipText.getBoundingClientRect();
      if (!targetEl || targetEl == undefined) {
        return false;
      }

      return { 
          direction: this.direction,
          x: targetEl.x,
          y: targetEl.y,
          height: targetEl.height,
          width: targetEl.width
      };

    },
    /**
     * Compare detected position and position which is set on tooltip element.
     */
    inSamePosition(pos1, pos2) {
      return pos1 && pos2 && pos1.x === pos2.x && pos1.y === pos2.y;
    },
  },
};
</script>
