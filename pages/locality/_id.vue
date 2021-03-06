<template>
  <detail>
    <template #title>
      <title-card-detail
        :ids="ids"
        :title="$translate({ et: locality.locality, en: locality.locality_en })"
        class="title-locality"
      />
    </template>

    <template #column-left>
      <v-card-title class="subsection-title">{{
        $t('common.general')
      }}</v-card-title>
      <v-card-text>
        <v-simple-table dense class="custom-table">
          <template #default>
            <tbody>
              <data-row
                :title="$t('locality.name')"
                :value="
                  $translate({
                    et: locality.locality,
                    en: locality.locality_en,
                  })
                "
              />
              <data-row
                :title="$t('locality.type')"
                :value="
                  $translate({
                    et: locality.type__value,
                    en: locality.type__value_en,
                  })
                "
              />
              <data-row
                :title="$t('locality.country')"
                :value="
                  $translate({
                    et: locality.country__value,
                    en: locality.country__value_en,
                  })
                "
              />
              <data-row
                :title="$t('locality.parish')"
                :value="
                  $translate({
                    et: locality.vald__vald,
                    en: locality.vald__vald_en,
                  })
                "
              />
              <data-row
                :title="$t('locality.settlement')"
                :value="
                  $translate({
                    et: locality.asustusyksus__asustusyksus,
                    en: locality.asustusyksus__asustusyksus_en,
                  })
                "
              />
              <data-row
                :title="$t('locality.elevation')"
                :value="locality.elevation"
              />
              <data-row
                :title="$t('locality.latitude')"
                :value="locality.latitude"
              />
              <data-row
                :title="$t('locality.longitude')"
                :value="locality.longitude"
              />
              <data-row
                :title="$t('locality.coordinateSystem')"
                :value="locality.coord_system"
              />
              <data-row
                :title="$t('locality.coordinateX')"
                :value="locality.coordx"
              />
              <data-row
                :title="$t('locality.coordinateY')"
                :value="locality.coordy"
              />
              <data-row
                :title="$t('locality.coordinatePrecision')"
                :value="locality.coord_det_precision__value"
              />
              <data-row
                :title="$t('locality.coordinateMethod')"
                :value="
                  $translate({
                    et: locality.coord_det_method__value,
                    en: locality.coord_det_method__value_en,
                  })
                "
              />
              <data-row
                :title="$t('locality.coordinateAgent')"
                :value="locality.coord_det_agent__agent"
              />
              <data-row
                :title="$t('locality.locationRemarks')"
                :value="locality.remarks_location"
              />
              <link-data-row
                :title="$t('locality.stratigraphyTop')"
                :value="
                  $translate({
                    et: locality.stratigraphy_top__stratigraphy,
                    en: locality.stratigraphy_top__stratigraphy_en,
                  })
                "
                nuxt
                :href="
                  localePath({
                    name: 'stratigraphy-id',
                    params: { id: locality.stratigraphy_top_id },
                  })
                "
              />
              <link-data-row
                :title="$t('locality.stratigraphyBase')"
                :value="
                  $translate({
                    et: locality.stratigraphy_base__stratigraphy,
                    en: locality.stratigraphy_base__stratigraphy_en,
                  })
                "
                nuxt
                :href="
                  localePath({
                    name: 'stratigraphy-id',
                    params: { id: locality.stratigraphy_base_id },
                  })
                "
              />

              <!-- NOTE: #466 added same link as a button -->
              <!--              <link-data-row-->
              <!--                v-if="drillcore"-->
              <!--                nuxt-->
              <!--                :title="$t('locality.drillcore')"-->
              <!--                :value="-->
              <!--                  $translate({-->
              <!--                    et: drillcore.drillcore,-->
              <!--                    en: drillcore.drillcore_en,-->
              <!--                  })-->
              <!--                "-->
              <!--                :href="-->
              <!--                  localePath({-->
              <!--                    name: 'drillcore-id',-->
              <!--                    params: { id: drillcore.id },-->
              <!--                  })-->
              <!--                "-->
              <!--              />-->

              <data-row
                v-if="locality.date_added"
                :title="$t('locality.dateAdded')"
                :value="
                  new Date(locality.date_added).toISOString().split('T')[0]
                "
              />
              <data-row
                v-if="locality.date_changed"
                :title="$t('locality.dateChanged')"
                :value="
                  new Date(locality.date_changed).toISOString().split('T')[0]
                "
              />
              <data-row
                :title="$t('locality.remarks')"
                :value="locality.remarks"
              />
            </tbody>
          </template>
        </v-simple-table>

        <v-btn
          v-if="analysisResultsCount > 0"
          small
          color="emp-analysis montserrat"
          class="mt-2 white--text"
          @click="goToAnalyticalData"
          >{{ $t('locality.linkToAnalyticalData') }}
          <v-icon right>mdi-chart-scatter-plot</v-icon>
        </v-btn>

        <v-btn
          v-if="drillcore"
          small
          color="emp-drillcore  montserrat"
          class="mt-2 white--text"
          @click="
            $router.push(
              localePath({
                name: 'drillcore-id',
                params: { id: drillcore.id },
              })
            )
          "
          >{{
            $translate({
              et: drillcore.drillcore,
              en: drillcore.drillcore_en,
            })
          }}
          <v-icon right>mdi-screw-machine-flat-top</v-icon>
        </v-btn>
      </v-card-text>
    </template>
    <template v-if="locality.latitude && locality.longitude" #column-right>
      <v-card-title class="subsection-title">{{
        $t('locality.map')
      }}</v-card-title>
      <v-card-text>
        <v-card id="map-wrap" elevation="0">
          <leaflet-map
            rounded
            :estonian-map="locality.country__value === 'Eesti'"
            :estonian-bedrock-overlay="locality.country__value === 'Eesti'"
            locality-overlay
            :center="{
              latitude: locality.latitude,
              longitude: locality.longitude,
            }"
            :markers="[
              {
                latitude: locality.latitude,
                longitude: locality.longitude,
                text: $translate({
                  et: locality.locality,
                  en: locality.locality_en,
                }),
              },
            ]"
          />
        </v-card>
      </v-card-text>
    </template>

    <template #bottom>
      <image-bar v-if="images.length > 0" class="mt-4" :images="images" />
      <v-card v-if="filteredTabs.length > 0" class="mt-4 mb-4">
        <tabs :tabs="filteredTabs" :init-active-tab="initActiveTab" />
      </v-card>
    </template>
  </detail>
</template>

<script>
import { isNil, isEmpty } from 'lodash'
import { mapFields } from 'vuex-map-fields'
import TitleCardDetail from '@/components/TitleCardDetail'
import LinkDataRow from '~/components/LinkDataRow'
import DataRow from '~/components/DataRow'
import LeafletMap from '~/components/map/LeafletMap'
import Tabs from '~/components/Tabs'
import Detail from '~/components/templates/Detail.vue'
import ImageBar from '~/components/ImageBar.vue'

export default {
  components: {
    TitleCardDetail,
    DataRow,
    LinkDataRow,
    LeafletMap,
    Tabs,
    Detail,
    ImageBar,
  },
  async asyncData({ params, route, app, error, redirect }) {
    try {
      const localityResponse = await app.$services.sarvREST.getResource(
        'locality',
        params.id,
        {
          params: {
            fields:
              'asustusyksus__asustusyksus,asustusyksus__asustusyksus_en,coord_det_agent__agent,coord_det_method__value,coord_det_method__value_en,coord_det_precision__value,coord_system,coordx,coordy,country__iso_code,country__value,country__value_en,date_added,date_changed,depth,eelis,elevation,id,latitude,locality,locality_en,longitude,maaamet_pa_id,maakond__maakond,maakond__maakond_en,number,parent__locality,remarks,remarks_location,stratigraphy_base__stratigraphy,stratigraphy_base__stratigraphy_en,stratigraphy_base_free,stratigraphy_base_id,stratigraphy_top__stratigraphy,stratigraphy_top__stratigraphy_en,stratigraphy_top_free,stratigraphy_top_id,type__value,type__value_en,user_added,vald__vald,vald__vald_en',
          },
        }
      )
      const ids = localityResponse?.ids
      const locality = localityResponse.results[0]

      const drillcoreResponse = await app.$services.sarvREST.getResourceList(
        'drillcore',
        {
          defaultParams: {
            locality: locality.id,
          },
        }
      )

      const drillcore = drillcoreResponse.items
        ? drillcoreResponse.items[0]
        : null

      // const attachmentOutcropResponse = await app.$services.sarvSolr.getResourceList(
      //   'attachment',
      //   {
      //     defaultParams: {
      //       fq: `locality_id:${locality.id} AND locality_type:[3 TO 5] AND specimen_image_attachment:2`,
      //       sort: 'date_created desc,date_created_free desc,stars desc,id desc',
      //     },
      //   }
      // )
      //
      // const attachmentsOutcrop = attachmentOutcropResponse.items ?? []

      const attachmentResponse = await app.$services.sarvSolr.getResourceList(
        'attachment',
        {
          defaultParams: {
            fq: `locality_id:${locality.id} AND specimen_image_attachment:2`,
            sort:
              'date_created_dt desc,date_created_free desc,stars desc,id desc',
          },
        }
      )

      const attachments = attachmentResponse.items ?? []

      const tabs = [
        {
          id: 'locality_reference',
          routeName: 'locality-id',
          title: 'locality.references',
          count: 0,
          props: {},
        },
        {
          id: 'locality_description',
          routeName: 'locality-id-descriptions',
          title: 'locality.descriptions',
          count: 0,
          props: {},
        },
        {
          id: 'attachment_link',
          routeName: 'locality-id-attachments',
          title: 'locality.attachments',
          count: 0,
          props: {},
        },
        {
          id: 'sample',
          routeName: 'locality-id-samples',
          title: 'locality.samples',
          isSolr: true,
          count: 0,
          props: {},
        },
        {
          id: 'specimen',
          routeName: 'locality-id-specimens',
          title: 'locality.specimens',
          isSolr: true,
          count: 0,
          props: {},
        },
        {
          id: 'locality_synonym',
          routeName: 'locality-id-synonyms',
          title: 'locality.synonyms',
          count: 0,
          props: {},
        },
        {
          id: 'stratigraphy_stratotype',
          routeName: 'locality-id-stratotypes',
          title: 'locality.stratotypes',
          count: 0,
          props: {},
        },
        {
          id: 'analysis',
          isSolr: true,
          routeName: 'locality-id-analyses',
          title: 'locality.analyses',
          count: 0,
          props: {},
        },
        {
          table: 'analysis_results',
          id: 'graphs',
          isSolr: true,
          routeName: 'locality-id-graphs',
          title: 'locality.graphs',
          count: 0,
          props: { localityObject: locality },
        },
      ]

      if (drillcore) {
        tabs.splice(3, 0, {
          routeName: 'locality-id-drillcore-boxes',
          title: 'locality.drillcoreBoxes',
          count: drillcore.boxes,
          props: { drillcore: drillcore.id },
        })
        tabs.join()
      }

      const hydratedTabs = (
        await Promise.all(
          tabs.map(
            async (tab) =>
              await app.$hydrateCount(tab, {
                solr: {
                  default: {
                    fq: `locality_id:${params.id}`,
                  },
                },
                api: { default: { locality_id: locality.id } },
              })
          )
        )
      ).map((tab) =>
        app.$populateProps(tab, {
          ...tab.props,
          locality: locality.id,
        })
      )

      const validPath = app.$validateTabRoute(route, hydratedTabs)
      if (validPath !== route.path) redirect(validPath)

      return {
        locality,
        ids,
        tabs: hydratedTabs,
        drillcore,
        initActiveTab: validPath,
        // attachmentsOutcrop,
        attachments,
      }
    } catch (err) {
      error({
        message: `Could not find locality ${params.id}`,
        path: route.path,
      })
    }
  },
  head() {
    return {
      title: this.$translate({
        et: this.locality.locality,
        en: this.locality.locality_en,
      }),
      meta: [
        {
          property: 'og:title',
          hid: 'og:title',
          content: this.$translate({
            et: this.locality.locality,
            en: this.locality.locality_en,
          }),
        },
      ],
    }
  },
  computed: {
    ...mapFields('analyticalData', {
      analyticalDataLocality: 'filters.byIds.locality.value',
    }),
    filteredTabs() {
      return this.tabs.filter((item) => item.count > 0)
    },

    images() {
      // return this.attachmentsOutcrop.concat(this.attachments)
      return this.attachments
    },

    analysisResultsCount() {
      return this.tabs?.find((tab) => tab.id === 'graphs')?.count
    },
  },
  methods: {
    isNil,
    isEmpty,

    goToAnalyticalData() {
      this.analyticalDataLocality = this.$translate({
        et: this.locality.locality,
        en: this.locality.locality_en,
      })
      this.$router.push(this.localePath({ name: 'analytical-data' }))
    },
  },
}
</script>
