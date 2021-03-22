<template>
  <table-wrapper
    v-bind="{ showSearch, externalOptions }"
    :headers="headers"
    :items="items"
    :init-options="options"
    :count="count"
    v-on="$listeners"
  >
    <template #item.id="{ item }">
      <a class="text-link" @click="$openGeoDetail('file', item.attachment_id)">
        {{ item.attachment_id }}
        <v-icon color="deep-orange darken-2" small>mdi-open-in-new</v-icon>
      </a>
    </template>

    <template #item.date="{ item }">
      <div v-if="item.date_created">
        {{ new Date(item.date_created).toISOString().split('T')[0] }}
      </div>
      <div v-else>{{ item.date_created_free }}</div>
    </template>

    <template #item.reference="{ item }">
      <a
        v-if="item.reference_id"
        class="text-link"
        @click="$openGeology('reference', item.reference_id)"
      >
        {{ item.reference }}
        <v-icon color="deep-orange darken-2" small>mdi-open-in-new</v-icon>
      </a>
    </template>

    <template #item.type="{ item }">
      <div>{{ getAttachmentType(item.specimen_image_attachment) }}</div>
    </template>

    <template #item.image="{ item }">
      <image-cell
        v-if="item.uuid_filename"
        :src="`https://files.geocollections.info/medium/${item.uuid_filename}`"
        class="ma-2"
        @click="$openImage(item.uuid_filename)"
      />
    </template>
  </table-wrapper>
</template>

<script>
import TableWrapper from '@/components/tables/TableWrapper.vue'
import ImageCell from '@/components/ImageCell'
export default {
  name: 'AttachmentSolrTable',
  components: { TableWrapper, ImageCell },
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
        { text: this.$t('attachment.id'), value: 'id' },
        { text: this.$t('attachment.format'), value: 'format_value' },
        { text: this.$t('attachment.image_number'), value: 'image_number' },
        { text: this.$t('attachment.author'), value: 'agent' },
        { text: this.$t('attachment.date'), value: 'date' },
        { text: this.$t('attachment.reference'), value: 'reference' },
        { text: this.$t('attachment.type'), value: 'type' },
        { text: this.$t('attachment.image'), value: 'image', sortable: false },
      ],
    }
  },
  methods: {
    getAttachmentType(type) {
      switch (type) {
        case 1:
          return this.$t('attachment.typeSpecimen')
        case 2:
          return this.$t('attachment.typeImage')
        case 4:
          return this.$t('attachment.typeReference')
        default:
          return this.$t('attachment.typeOther')
      }
    },
  },
}
</script>