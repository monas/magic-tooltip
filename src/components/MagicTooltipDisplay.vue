<script>
import {mapGetters} from 'vuex';

export default {
  name: 'MagicTooltipDisplay',
  data() {
    return {
      hovered: false,
      show: false,
      showTimeOut: null,
      hideTimeOut: null,
    };
  },
  computed: {
    ...mapGetters({
      position: 'tooltipSingleGetPosition',
      content: 'tooltipSingleGetContent',
      open: 'tooltipSingleGetOpenState',
      shouldClose: 'tooltipShouldClose',
    }),
  },
  methods: {
    /**
     * Mouse enter handler for tooltip content.
     */
    enterHandler(e) {
      clearTimeout(this.hideTimeOut);

      this.hovered = true;
      this.showContent(e);
      this.$store.dispatch('setShouldClose', {value: false});
    },
    /**
     * Mouse leave handler for tooltip content.
     */
    leaveHandler(e) {
      this.hovered = false;
      this.$store.dispatch('setShouldClose', {value: true});

      // this timeout gives user a chanse to move the mouse back on trigger target
      // and prevent tooltip from closing
      this.hideTimeOut = setTimeout(() => {
        this.hideContent();
      }, 200);
    },
    /**
     * Clear cancel function and set timeout with show actions.
     */
    showContent(e) {
      this.show = true;
    },
    /**
     * Hide tooltip content function.
     */
    hideContent() {
      // check if this should not be closed
      if (!this.shouldClose) {
        return;
      }

      this.hovered = false;

      this.$store.dispatch('closeTooltip', {});
      this.$store.dispatch('setShouldClose', {value: false});
      this.show = false;
    },
  },

  watch: {
    /**
     * This will call hide function when shouldClose is set to true
     */
    shouldClose(val) {
      if (val && !this.hovered) {
        this.hideContent();
      }
    },
    /**
     * This will call show/hide handlers by open state.
     */
    open(val) {
      if (val) {
        this.showContent();
      } else if (!this.hovered) {
        this.hideContent();
      }
    },
  },
  /**
   * Main output rendering function.
   */
  render: function(createElement) {
    let showableBlock = [];
    showableBlock.push(this.$slots.target);

    if (this.show) {
      showableBlock.push(
        createElement(
          'div',
          {
            class: {
              'magic-tooltip-text-container': true,
              [this.position.direction]: true,
            },
            attrs: {id: 'tooltipTextContainer'},
            on: {
              mouseenter: this.enterHandler,
              mouseleave: this.leaveHandler,
            },
          },
          [
            createElement(
              'div',
              {class: {'magic-tooltip-text': true}},
              [this.content] // <- content from the store goes here
            ),
          ]
        )
      );
    }

    let atTop = this.position.y;
    if (this.position.direction == 'bottom') {
        atTop = atTop * 1 + this.position.height * 1;
    }

    let atX = this.position.x;
    if (this.position.direction == 'right') {
        atX = atX * 1 + this.position.width * 1;
    }

    return createElement(
      'div',
      {
        class: {'magic-tooltip-container': true},
        style: {top: atTop + 'px', left: atX + 'px'},
      },
      showableBlock
    );
  },
};
</script>

<style scoped>
.magic-tooltip-container {
  display: inline-block;
  position: fixed;
  z-index: 10;
}

.magic-tooltip-text-container {
  white-space: nowrap;
  z-index: 1;  
  position: absolute;
  padding: 5px;
}

.magic-tooltip-text-container.top {
  padding-bottom: 5px;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
}

.magic-tooltip-text-container.right {
  top: -10px;
  padding-left: 5px;
  left: 110%;
}

.magic-tooltip-text-container.left {
  top: -10px;
  padding-right: 5px;
  right: 110%;
}
</style>
