<script>
import Vue from 'vue';

import MyTableConstant from './services/MyTableConstant';

export default {
  name: 'MyTableBody',
  data() {
    return {
      template: null,
      defaultCell: '',
    };
  },
  /*
  ** Exposed props to the outside world as well.
  */
  props: ['row', 'col'],
  /*
  ** Render component's template as empty as first and then update based
  ** on this.template value.
  */
  render(createElement) {
    if (this.template) {
      return this.template();
    }
    return createElement('div', '');
  },
  created() {
    /*
    ** Render the component based on external template or default template.
    */
    if (this.col.template) {
      this.template = Vue.compile(this.col.template).render;
    } else {
      this.template = Vue.compile(MyTableConstant.defaultBodyCellTemplate).render;
    }
    /*
    ** Add bindings if needed to the component.
    ** To be used as a way to interact with outside world.
    */
    if (this.col.bindings) {
      Object.keys(this.col.bindings).forEach((key) => {
        this[key] = this.col.bindings[key];
      });
    }
  },
};
</script>

<style scoped>

</style>
