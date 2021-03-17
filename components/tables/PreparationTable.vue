<template>
  <table-wrapper
    v-bind="{ showSearch, externalOptions }"
    :headers="headers"
    :items="items"
    :init-options="options"
    :count="count"
    v-on="$listeners"
  >
    <!-- Todo: Uncomment when preparation detail view is done -->
    <!--    <template #item.preparation_number="{ item }">-->
    <!--      <nuxt-link-->
    <!--        class="text-link"-->
    <!--        :to="localePath({ name: 'preparation-id', params: { id: item.id } })"-->
    <!--      >-->
    <!--        {{ item.preparation_number }}-->
    <!--      </nuxt-link>-->
    <!--    </template>-->
    <template #item.locality="{ item }">
      <nuxt-link
        class="text-link"
        :to="
          localePath({
            name: 'locality-id',
            params: { id: item.locality_id },
          })
        "
      >
        {{ $translate({ et: item.locality, en: item.locality_en }) }}
      </nuxt-link>
    </template>
    <template #item.depth="{ item }">
      <div>
        <span>{{ item.depth }}</span>
        <span v-if="item.depth_interval">({{ item.depth_interval }})</span>
      </div>
    </template>
    <!-- Todo: Add lithostratigraphy -->
    <template #item.stratigraphy="{ item }">
      <a
        class="text-link"
        @click="$openGeoDetail('stratigraphy', item.stratigraphy_id)"
      >
        {{ $translate({ et: item.stratigraphy, en: item.stratigraphy_en }) }}
      </a>
    </template>
  </table-wrapper>
</template>

<script>
import { round } from 'lodash'
import TableWrapper from '~/components/tables/TableWrapper.vue'
export default {
  name: 'PreparationTable',
  components: { TableWrapper },
  props: {
    showSearch: {
      type: Boolean,
      default: true,
    },
    externalOptions: {
      type: Boolean,
      default: false,
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
  },
  data() {
    return {
      headers: [
        { text: this.$t('preparation.id'), value: 'id' },
        {
          text: this.$t('preparation.preparation_number'),
          value: 'preparation_number',
        },
        { text: this.$t('preparation.locality'), value: 'locality' },
        { text: this.$t('preparation.depth'), value: 'depth' },
        {
          text: this.$t('preparation.stratigraphy'),
          value: 'stratigraphy',
        },
        { text: this.$t('preparation.agent'), value: 'agent' },
        { text: this.$t('preparation.mass'), value: 'mass' },
      ],
    }
  },
  methods: {
    round,
  },
}
</script>