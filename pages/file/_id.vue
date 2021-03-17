<template>
  <v-row>
    <v-col>
      <h1 class="text-center pt-3 page-title">
        {{ fileTitle }}
      </h1>
      <h2 class="text-center pb-3 page-title">
        {{ $t('file.idTitle') }}: {{ file.id }}
      </h2>

      <v-card flat tile>
        <v-row>
          <v-col cols="12" md="6">
            <v-card-text class="text-center">
              <client-only>
                <template #placeholder>
                  <box-image-loader height="400" />
                </template>

                <!-- Image -->
                <template v-if="isImage">
                  <v-hover v-slot="{ hover }">
                    <img
                      :src="`https://files.geocollections.info/medium/${file.uuid_filename}`"
                      class="my-4 transition-swing cursor-pointer rounded"
                      :class="{
                        'elevation-8': hover,
                        'elevation-4': !hover,
                      }"
                      width="100%"
                      style="max-width: 1000px; max-height: 800px"
                      :alt="fileTitle"
                      @click="$openImage(file.uuid_filename)"
                    />
                    <!--<v-img-->
                    <!--  contain-->
                    <!--  class="my-4 transition-swing cursor-pointer rounded mx-auto"-->
                    <!--  :lazy-src="`https://files.geocollections.info/small/${file.uuid_filename}`"-->
                    <!--  :src="`https://files.geocollections.info/medium/${file.uuid_filename}`"-->
                    <!--  max-width="1000"-->
                    <!--  max-height="700"-->
                    <!--  @click="$openImage(file.uuid_filename)"-->
                    <!--  <template #placeholder>-->
                    <!--    <v-row-->
                    <!--      class="fill-height ma-0"-->
                    <!--      align="center"-->
                    <!--      justify="center"-->
                    <!--      <v-progress-circular-->
                    <!--        indeterminate-->
                    <!--        color="grey lighten-5"-->
                    <!--      ></v-progress-circular>-->
                    <!--    </v-row>-->
                    <!--  </template>-->
                    <!--</v-img>-->
                  </v-hover>
                </template>

                <!-- Audio -->
                <audio v-else-if="isAudio" controls>
                  <source
                    :src="`https://files.geocollections.info/${file.uuid_filename}`"
                  />
                  Your browser does not support the audio element.
                  <v-icon>mdi-file-music-outline</v-icon>
                </audio>

                <!-- Video -->
                <video v-else-if="isVideo" controls>
                  <source
                    :src="`https://files.geocollections.info/${file.uuid_filename}`"
                  />
                  Your browser does not support the video element.
                  <v-icon>mdi-file-video-outline</v-icon>
                </video>

                <!-- File -->
                <div
                  v-else
                  class="file-download rounded deep-orange--text"
                  @click="
                    $openWindow(
                      `https://files.geocollections.info/${file.uuid_filename}`
                    )
                  "
                >
                  <v-icon large color="deep-orange darken-2"
                    >mdi-file-download-outline</v-icon
                  >
                  {{ $t('file.download') }}
                </div>
              </client-only>

              <div
                class="d-flex justify-center flex-column justify-md-space-between flex-md-row"
                :class="{ 'mt-4': !isImage }"
              >
                <div class="text-center text-md-left">
                  <div v-if="file.author__agent || file.author_free">
                    <span class="font-weight-bold"
                      >{{ $t('file.author') }}:
                    </span>
                    <span v-if="file.author__agent">{{
                      file.author__agent
                    }}</span>
                    <span v-else>{{ file.author_free }}</span>
                  </div>
                  <div v-if="file.date_created || file.date_created_free">
                    <span class="font-weight-bold"
                      >{{ $t('file.date') }}:
                    </span>
                    <span v-if="file.date_created">{{
                      file.date_created
                    }}</span>
                    <span v-else>{{ file.date_created_free }}</span>
                  </div>
                </div>

                <div class="text-center">
                  <span v-for="(size, index) in imageSizes" :key="index">
                    <a
                      class="text-link"
                      @click="$openImage(file.uuid_filename, size)"
                    >
                      {{ $t(`common.${size}`) }}
                      <v-icon
                        v-if="size === 'original'"
                        small
                        color="deep-orange darken-2"
                        >mdi-file-download-outline</v-icon
                      >
                    </a>
                    <span v-if="index < imageSizes.length - 1">| </span>
                  </span>
                </div>
              </div>
            </v-card-text>
          </v-col>

          <v-col cols="12" md="6">
            <v-card-title>{{ $t('common.general') }}</v-card-title>
            <v-card-text>
              <v-simple-table dense class="custom-table">
                <template #default>
                  <tbody>
                    <link-data-row
                      :title="$t('file.collectionNr')"
                      :value="file.specimen__coll__number"
                      @link-click="$openGeoDetail('specimen', file.specimen)"
                    />
                    <link-data-row
                      :title="$t('file.specimenNr')"
                      :value="file.specimen__specimen_id"
                      @link-click="$openGeoDetail('specimen', file.specimen)"
                    />
                    <template v-for="(item, index) in specimenIdentification">
                      <link-data-row
                        :key="index"
                        :title="$t('file.name')"
                        :value="item.taxon__taxon"
                        :suffix="item.name ? `| ${item.name}` : ''"
                        @link-click="
                          $openWindow(`https://fossiilid.info/${item.taxon_id}`)
                        "
                      />
                    </template>
                    <template
                      v-for="(item, index) in specimenIdentificationGeology"
                    >
                      <link-data-row
                        :key="index"
                        :title="$t('file.name')"
                        :value="item.taxon__taxon"
                        :suffix="item.name ? `| ${item.name}` : ''"
                        @link-click="
                          $openWindow(`https://fossiilid.info/${item.taxon_id}`)
                        "
                      />
                    </template>
                    <link-data-row
                      :title="$t('file.locality')"
                      :value="
                        $translate({
                          et: file.specimen__locality__locality,
                          en: file.specimen__locality__locality_en,
                        })
                      "
                      @link-click="
                        $openGeoDetail('locality', file.specimen__locality)
                      "
                    />
                    <link-data-row
                      :title="$t('file.stratigraphy')"
                      :value="
                        $translate({
                          et: file.specimen__stratigraphy__stratigraphy,
                          en: file.specimen__stratigraphy__stratigraphy_en,
                        })
                      "
                      @link-click="
                        $openGeoDetail(
                          'stratigraphy',
                          file.specimen__stratigraphy
                        )
                      "
                    />
                    <data-row
                      :title="$t('file.scalebar')"
                      :value="file.image_scalebar"
                    />
                    <data-row
                      :title="$t('file.description')"
                      :value="
                        $translate({
                          et: file.description,
                          en: file.description_en,
                        })
                      "
                    />
                    <data-row
                      :title="$t('file.imageNumber')"
                      :value="file.image_number"
                    />
                    <data-row
                      :title="$t('file.imagesetNumber')"
                      :value="file.imageset__imageset_number"
                    />
                    <data-row
                      :title="$t('file.type')"
                      :value="
                        $translate({
                          et: file.type__value,
                          en: file.type__value_en,
                        })
                      "
                    />
                    <data-row
                      :title="$t('file.format')"
                      :value="file.attachment_format__value"
                    />
                    <data-row
                      :title="$t('file.author')"
                      :value="file.author__agent"
                    />
                    <data-row
                      :title="$t('file.date')"
                      :value="file.date_created || file.date_created_free"
                    />
                    <data-row
                      :title="$t('file.keywords')"
                      :value="attachmentKeywords"
                    >
                      <template #value>
                        <ul
                          v-for="(item, index) in attachmentKeywords"
                          :key="index"
                        >
                          <li>{{ item.keyword__keyword }}</li>
                        </ul>
                      </template>
                    </data-row>
                    <link-data-row
                      :title="$t('file.filename')"
                      :value="file.uuid_filename"
                      @link-click="$openImage(file.uuid_filename)"
                    />
                    <data-row
                      :title="$t('file.imagePlace')"
                      :value="file.image_place"
                    />
                    <link-data-row
                      :title="$t('file.locality')"
                      :value="
                        $translate({
                          et: file.locality__locality,
                          en: file.locality__locality_en,
                        })
                      "
                      @link-click="$openGeoDetail('locality', file.locality)"
                    />
                    <data-row
                      :title="$t('file.imageLatitude')"
                      :value="file.image_latitude"
                    />
                    <data-row
                      :title="$t('file.imageLongitude')"
                      :value="file.image_longitude"
                    />
                    <data-row
                      :title="$t('file.personDigitised')"
                      :value="file.agent_digitised__agent"
                    />
                    <data-row
                      :title="$t('file.dateDigitised')"
                      :value="file.date_digitised || file.date_digitised_free"
                    />
                    <data-row
                      :title="$t('file.imageSize')"
                      :value="imageSize"
                    />
                    <link-data-row
                      :title="$t('file.institution')"
                      :value="
                        $translate({
                          et: file.database__name,
                          en: file.database__name_en,
                        })
                      "
                      @link-click="
                        $openWindow(
                          `https://geocollections.info/${file.database__acronym.toLowerCase()}`
                        )
                      "
                    />
                    <link-data-row
                      :title="$t('file.licence')"
                      :value="file.licence__licence_en"
                      @link-click="$openWindow(file.licence__licence_url_en)"
                    />
                    <data-row
                      :title="$t('file.dateAdded')"
                      :value="
                        new Date(file.date_added).toISOString().split('T')[0]
                      "
                    />
                    <data-row
                      :title="$t('file.dateChanged')"
                      :value="
                        new Date(file.date_changed).toISOString().split('T')[0]
                      "
                    />
                  </tbody>
                </template>
              </v-simple-table>

              <v-card v-if="showMap" id="map-wrap" elevation="0" height="300">
                <v-card-title class="pl-0">{{
                  $t('locality.map')
                }}</v-card-title>
                <leaflet-map
                  :is-estonian="mapIsEstonian"
                  :height="300"
                  :center="{
                    latitude: mapLatitude,
                    longitude: mapLongitude,
                  }"
                  :markers="[
                    {
                      latitude: mapLatitude,
                      longitude: mapLongitude,
                      text: $translate({
                        et: mapLocality,
                        en: mapLocalityEn,
                      }),
                    },
                  ]"
                />
              </v-card>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>

      <v-card v-if="filteredTabs.length > 0" class="mt-2 pb-2">
        <tabs :tabs="filteredTabs" :init-active-tab="initActiveTab" />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { isNull, isNil } from 'lodash'
import BoxImageLoader from '@/components/BoxImageLoader'
import Tabs from '@/components/Tabs'
import DataRow from '~/components/DataRow.vue'
import LinkDataRow from '~/components/LinkDataRow.vue'
import LeafletMap from '~/components/LeafletMap'

export default {
  components: { LeafletMap, Tabs, BoxImageLoader, DataRow, LinkDataRow },
  async asyncData({ params, route, error, app }) {
    try {
      const fileResponse = await app.$services.sarvREST.getResource(
        'attachment',
        params.id
      )
      const file = fileResponse.results[0]
      let specimenIdentification
      let specimenIdentificationGeology
      if (file.specimen) {
        const specimenIdentificationResponse = await app.$services.sarvREST.getResourceList(
          'specimen_identification',
          {
            isValid: isNil(file.id),
            defaultParams: {
              current: true,
              specimen_id: file.specimen,
            },
          }
        )
        specimenIdentification = specimenIdentificationResponse.items
        const specimenIdentificationGeologyResponse = await app.$services.sarvREST.getResourceList(
          'specimen_identification_geology',
          {
            isValid: isNil(file.id),
            defaultParams: {
              current: true,
              specimen_id: file.specimen,
            },
          }
        )
        specimenIdentificationGeology =
          specimenIdentificationGeologyResponse.items
      }
      const attachmentKeywordsResponse = await app.$services.sarvREST.getResourceList(
        'attachment_keyword',
        {
          isValid: isNil(file.id),
          defaultParams: {
            attachment: file.id,
          },
        }
      )
      const attachmentKeywords = attachmentKeywordsResponse.items

      const tabs = [
        {
          id: 'collection',
          routeName: 'drillcore_box-id',
          isSolr: false,
          title: 'file.collection',
          count: 0,
          props: {},
        },
        {
          id: 'specimen',
          routeName: 'drillcore_box-id',
          isSolr: false,
          title: 'drillcore.samples',
          count: 0,
          props: {},
        },
        {
          id: 'sample',
          routeName: 'drillcore_box-id',
          isSolr: false,
          title: 'drillcore.samples',
          count: 0,
          props: {},
        },
        {
          id: 'sample_series',
          routeName: 'drillcore_box-id',
          isSolr: false,
          title: 'drillcore.samples',
          count: 0,
          props: {},
        },
        {
          id: 'analysis',
          routeName: 'drillcore_box-id',
          isSolr: false,
          title: 'drillcore.samples',
          count: 0,
          props: {},
        },
        {
          id: 'dataset',
          routeName: 'drillcore_box-id',
          isSolr: false,
          title: 'drillcore.samples',
          count: 0,
          props: {},
        },
        {
          id: 'doi',
          routeName: 'drillcore_box-id',
          isSolr: false,
          title: 'drillcore.samples',
          count: 0,
          props: {},
        },
        {
          id: 'locality',
          routeName: 'drillcore_box-id',
          isSolr: false,
          title: 'drillcore.samples',
          count: 0,
          props: {},
        },
        {
          id: 'drillcore',
          routeName: 'drillcore_box-id',
          isSolr: false,
          title: 'drillcore.samples',
          count: 0,
          props: {},
        },
        {
          id: 'drillcore_box',
          routeName: 'drillcore_box-id',
          isSolr: false,
          title: 'drillcore.samples',
          count: 0,
          props: {},
        },
        {
          id: 'preparation',
          routeName: 'drillcore_box-id',
          isSolr: false,
          title: 'drillcore.samples',
          count: 0,
          props: {},
        },
        {
          id: 'reference',
          routeName: 'drillcore_box-id',
          isSolr: false,
          title: 'drillcore.samples',
          count: 0,
          props: {},
        },
        {
          id: 'location',
          routeName: 'drillcore_box-id',
          isSolr: false,
          title: 'drillcore.samples',
          count: 0,
          props: {},
        },
        {
          id: 'project',
          routeName: 'drillcore_box-id',
          isSolr: false,
          title: 'drillcore.samples',
          count: 0,
          props: {},
        },
        {
          id: 'site',
          routeName: 'drillcore_box-id',
          isSolr: false,
          title: 'drillcore.samples',
          count: 0,
          props: {},
        },
        {
          id: 'locality_description',
          routeName: 'drillcore_box-id',
          isSolr: false,
          title: 'drillcore.samples',
          count: 0,
          props: {},
        },
        {
          id: 'taxon',
          routeName: 'drillcore_box-id',
          isSolr: false,
          title: 'drillcore.samples',
          count: 0,
          props: {},
        },
      ]

      return {
        file,
        specimenIdentification,
        specimenIdentificationGeology,
        attachmentKeywords,
        initActiveTab: route.path,
        tabs: (
          await Promise.all(
            tabs.map(
              async (tab) =>
                await app.$hydrateCount(tab, {
                  solr: {
                    default: {
                      fq: `attachment_id:${file.id}`,
                    },
                  },
                  api: {
                    default: { attachment: file.id },
                    attachment_link: {
                      attachment: file.id,
                    },
                  },
                })
            )
          )
        ).map((tab) =>
          app.$populateProps(tab, {
            ...tab.props,
            attachment: file.id,
          })
        ),
      }
    } catch (err) {
      error({
        message: `Cannot find file ${route.params.id}`,
        path: route.path,
      })
    }
  },
  head() {
    return {
      title: this.fileTitle,
    }
  },
  computed: {
    filteredTabs() {
      return this.tabs.filter((item) => item.count > 0)
    },

    fileTitle() {
      switch (this.file.specimen_image_attachment) {
        case 1:
          return `${this.$t('file.specimenTitle')}: ${
            this.file?.specimen__coll__number
          }-${this.file?.specimen__specimen_id?.split('-')?.[0]} (ID: ${
            this.file.specimen
          })`
        case 2:
          return `${this.$t('file.imageTitle')}: ${this.file.image_number}`
        case 4:
          return `${this.$t('file.referenceTitle')}: ${
            this.file.reference__reference
          }`
        default:
          return `${this.$t('file.fileTitle')}: ${this.$translate({
            et: this.file.description,
            en: this.file.description_en,
          })}`
      }
    },

    imageSize() {
      if (this.file.image_width && this.file.image_height) {
        return `${this.file.image_width} × ${this.file.image_height} px`
      } else return null
    },

    isImage() {
      return this.file.attachment_format__value.includes('image')
    },

    isAudio() {
      return this.file.attachment_format__value.includes('audio')
    },

    isVideo() {
      return this.file.attachment_format__value.includes('video')
    },

    imageSizes() {
      let sizes = ['small', 'medium', 'large', 'original']
      if (!this.isImage) sizes = ['original']
      return sizes
    },

    showMap() {
      return (
        (this.file.locality__latitude && this.file.locality__longitude) ||
        (this.file.image_latitude && this.file.image_longitude) ||
        (this.file.specimen__locality__latitude &&
          this.file.specimen__locality__longitude)
      )
    },

    mapIsEstonian() {
      return (
        this.file.locality__country__value === 'Eesti' ||
        this.file.specimen__locality__country__value === 'Eesti'
      )
    },

    mapLatitude() {
      return (
        this.file.locality__latitude || this.file.specimen__locality__latitude
      )
    },

    mapLongitude() {
      return (
        this.file.locality__longitude || this.file.specimen__locality__longitude
      )
    },

    mapLocality() {
      return (
        this.file.locality__locality || this.file.specimen__locality__locality
      )
    },

    mapLocalityEn() {
      return (
        this.file.locality__locality_en ||
        this.file.specimen__locality__locality_en
      )
    },
  },
  methods: {
    isNull,
    isNil,
  },
}
</script>

<style scoped>
video {
  max-width: 100%;
  vertical-align: middle;
}

.file-download {
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  border-style: dashed;
  background-color: #eee;
  border-color: #5c6598;
  transition: opacity 200ms ease;
}

.file-download:hover {
  opacity: 0.8;
  cursor: pointer;
}
</style>