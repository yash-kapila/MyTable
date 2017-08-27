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
  props: ['row', 'col'],
  render(createElement) {
    if (this.template) {
      return this.template();
    }
    return createElement('div', '');
  },
  created() {
    if (this.col.template) {
      this.template = Vue.compile(this.col.template).render;
    } else {
      this.template = Vue.compile(MyTableConstant.defaultBodyCellTemplate).render;
    }
  },
};
</script>

<style scoped>

</style>
