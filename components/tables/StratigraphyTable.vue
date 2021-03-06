<template>
  <table-wrapper
    v-bind="{ showSearch }"
    :headers="useDynamicHeaders ? dynamicHeaders : headers"
    :items="items"
    :options="options"
    :count="count"
    v-on="$listeners"
  >
    <template #item.stratigraphy="{ item }">
      <nuxt-link
        class="text-link"
        :to="
          localePath({
            name: 'stratigraphy-id',
            params: { id: item.id },
          })
        "
      >
        {{
          $translate({
            et: item.stratigraphy,
            en: item.stratigraphy_en,
          })
        }}
      </nuxt-link>
    </template>

    <template #item.index_main="{ item }">
      <div v-if="item.index_main_html" v-html="item.index_main_html" />
      <div v-else>{{ item.index_main }}</div>
    </template>

    <template #item.index_additional="{ item }">
      <div
        v-if="item.index_additional_html"
        v-html="item.index_additional_html"
      />
      <div v-else>{{ item.index_additional }}</div>
    </template>

    <template #item.stratigraphy_type="{ item }">
      <div>
        {{
          $translate({
            et: item.stratigraphy_type,
            en: item.stratigraphy_type_en,
          })
        }}
      </div>
    </template>

    <template #item.stratigraphy_rank="{ item }">
      <div>
        {{
          $translate({
            et: item.stratigraphy_rank,
            en: item.stratigraphy_rank_en,
          })
        }}
      </div>
    </template>

    <template #item.stratigraphy_scope="{ item }">
      <div>
        {{
          $translate({
            et: item.stratigraphy_scope,
            en: item.stratigraphy_scope_en,
          })
        }}
      </div>
    </template>

    <template #item.age_stratigraphy="{ item }">
      <div>
        {{
          $translate({
            et: item.age_stratigraphy,
            en: item.age_stratigraphy_en,
          })
        }}
      </div>
    </template>

    <template #item.ageBase="{ item }">
      {{ item.age_base }}
    </template>
    <template #item.ageTop="{ item }">
      {{ item.age_top }}
    </template>

    <template #item.parent_stratigraphy="{ item }">
      <nuxt-link
        v-if="item.parent_id"
        class="text-link"
        :to="
          localePath({
            name: 'stratigraphy-id',
            params: { id: item.parent_id },
          })
        "
      >
        {{
          $translate({
            et: item.parent_stratigraphy,
            en: item.parent_stratigraphy_en,
          })
        }}
      </nuxt-link>
    </template>
  </table-wrapper>
</template>

<script>
import TableWrapper from '@/components/tables/TableWrapper.vue'
import { mapState } from 'vuex'
export default {
  name: 'StratigraphyTable',
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
    useDynamicHeaders: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      headers: [
        { text: this.$t('stratigraphy.id'), value: 'id' },
        { text: this.$t('stratigraphy.stratigraphy'), value: 'stratigraphy' },
        { text: this.$t('stratigraphy.index_main'), value: 'index_main' },
        {
          text: this.$t('stratigraphy.index_additional'),
          value: 'index_additional',
        },
        {
          text: this.$t('stratigraphy.stratigraphy_type'),
          value: 'stratigraphy_type',
        },
        {
          text: this.$t('stratigraphy.stratigraphy_rank'),
          value: 'stratigraphy_rank',
        },
        {
          text: this.$t('stratigraphy.stratigraphy_scope'),
          value: 'stratigraphy_scope',
        },
        {
          text: this.$t('stratigraphy.parent_stratigraphy'),
          value: 'parent_stratigraphy',
        },

        { text: this.$t('stratigraphy.ageBase'), value: 'ageBase' },
        { text: this.$t('stratigraphy.ageTop'), value: 'ageTop' },
        {
          text: this.$t('stratigraphy.age_stratigraphy'),
          value: 'age_stratigraphy',
        },
      ],
    }
  },
  computed: {
    ...mapState('table_headers', {
      tableHeaders(state) {
        return state.stratigraphy.tableHeaders
      },
    }),

    dynamicHeaders() {
      return this.tableHeaders.reduce((prev, item) => {
        if (item.show) {
          prev.push({ ...item, text: this.$t(item.text) })
        }
        return prev
      }, [])
    },
  },
}
</script>
