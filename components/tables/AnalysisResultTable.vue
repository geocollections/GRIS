<template>
  <table-wrapper
    v-bind="{ showSearch }"
    :headers="computedHeaders"
    :items="items"
    :options="options"
    :count="count"
    v-on="$listeners"
  >
    <template #item.analysis_method="{ item }">{{
      $translate({ et: item.analysis_method, en: item.analysis_method_en })
    }}</template>
  </table-wrapper>
</template>

<script>
import { round } from 'lodash'
import TableWrapper from '~/components/tables/TableWrapper.vue'
export default {
  name: 'AnalysisResultTable',
  components: { TableWrapper },
  props: {
    showSearch: {
      type: Boolean,
      default: true,
    },
    items: {
      type: Array,
      default: () => [],
    },
    count: {
      type: Number,
      default: 0,
    },
    options: {
      type: Object,
      default: () => ({
        page: 1,
        itemsPerPage: 25,
        sortBy: [],
        sortDesc: [],
      }),
    },
    hideDepth: Boolean,
    hideMethod: Boolean,
  },
  data() {
    return {
      headers: [
        { text: this.$t('analysisResult.parameter'), value: 'parameter' },
        { text: this.$t('analysisResult.method'), value: 'analysis_method' },
        { text: this.$t('analysisResult.depth'), value: 'depth' },
        {
          text: this.$t('analysisResult.depthInterval'),
          value: 'depth_interval',
        },
        { text: this.$t('analysisResult.value'), value: 'value' },
        { text: this.$t('analysisResult.valueText'), value: 'value_txt' },
        { text: this.$t('analysisResult.valueError'), value: 'value_error' },
      ],
    }
  },
  computed: {
    computedHeaders() {
      return this.headers.filter((item) => {
        if (item.value.includes('depth')) return !this.hideDepth
        if (item.value === 'analysis_method') return !this.hideMethod
        else return item
      })
    },
  },
  methods: {
    round,
  },
}
</script>
