<template>
  <v-container>
    <v-row>
      <v-col v-for="(box, i) in boxes" :key="box.id" cols="12" class="pa-0">
        <v-divider v-if="i !== 0" />
        <v-hover v-slot="{ hover }" name="asd">
          <!-- Opens box as new tab -->
          <!-- <v-card
                  nuxt
                  :ripple="false"
                  target="_blank"
                  :href="`/drillcore_box/${box.id}`"
                  class="mx-4 my-2"
                  :elevation="hover ? 10 : 2"
                > -->
          <v-card
            flat
            tile
            :ripple="false"
            target="_blank"
            :class="{ 'on-hover': hover }"
            @click="openDrillcoreBox(box.drillcore_box)"
          >
            <v-card-text>
              <v-row align="start">
                <v-col cols="12" sm="8" align-self="center">
                  <!-- TODO: Add placeholder, for case when box does not have a picture -->
                  <v-img
                    class="rounded"
                    contain
                    max-height="400"
                    :lazy-src="`https://files.geocollections.info/small/${box.attachment__filename}`"
                    :src="`https://files.geocollections.info/medium/${box.attachment__filename}`"
                  >
                    <template #placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular
                          indeterminate
                          color="grey lighten-5"
                        ></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-card-title class="px-0 pt-0">
                    {{
                      $t('drillcoreBox.nr', {
                        number: box.drillcore_box__number,
                      })
                    }}
                  </v-card-title>
                  <v-simple-table dense class="custom-table">
                    <template #default>
                      <tbody>
                        <tr>
                          <td>{{ $t('drillcoreBox.depthStart') }}</td>
                          <td
                            v-if="isNull(box.drillcore_box__depth_start)"
                            class="no-value"
                          >
                            {{ $t('common.noValue') }}
                          </td>
                          <td v-else>
                            {{ box.drillcore_box__depth_start }}
                          </td>
                        </tr>
                        <tr>
                          <td>{{ $t('drillcoreBox.depthEnd') }}</td>
                          <td
                            v-if="isNull(box.drillcore_box__depth_end)"
                            class="no-value"
                          >
                            {{ $t('common.noValue') }}
                          </td>
                          <td v-else>
                            {{ box.drillcore_box__depth_end }}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            {{ $t('drillcoreBox.stratigraphyTop') }}
                          </td>
                          <td
                            v-if="isNull(box.drillcore_box__stratigraphy_top)"
                            class="no-value"
                          >
                            {{ $t('common.noValue') }}
                          </td>
                          <td v-else>
                            <a
                              class="text-link"
                              :href="`https://geocollections.info/stratigraphy/${box.drillcore_box__stratigraphy_top}`"
                            >
                              {{
                                $translate({
                                  et:
                                    box.drillcore_box__stratigraphy_top__stratigraphy,
                                  en:
                                    box.drillcore_box__stratigraphy_top__stratigraphy_en,
                                })
                              }}
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            {{ $t('drillcoreBox.stratigraphyBase') }}
                          </td>
                          <td
                            v-if="isNull(box.drillcore_box__stratigraphy_base)"
                            class="no-value"
                          >
                            {{ $t('common.noValue') }}
                          </td>
                          <td v-else>
                            <a
                              class="text-link"
                              :href="`https://geocollections.info/stratigraphy/${box.drillcore_box__stratigraphy_base}`"
                            >
                              {{
                                $translate({
                                  et:
                                    box.drillcore_box__stratigraphy_base__stratigraphy,
                                  en:
                                    box.drillcore_box__stratigraphy_base__stratigraphy_en,
                                })
                              }}
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
      <v-col>
        <infinite-loading @infinite="infiniteHandler"></infinite-loading>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { isNull } from 'lodash'
export default {
  data() {
    return {
      page: 1,
      boxes: [],
    }
  },
  methods: {
    isNull,
    openDrillcoreBox(id) {
      const routeData = this.$router.resolve({
        name: `drillcore_box-id___${this.$i18n.locale}`,
        params: { id },
      })
      window.open(routeData.href, '_blank', 'height=800, width=800')
    },
    infiniteHandler($state) {
      const paginateBy = 5
      const url = `https://api.geocollections.info/attachment_link/?order_by=drillcore_box__depth_start,drillcore_box&drillcore_box__drillcore=${this.$route.params.id}&page=${this.page}&paginate_by=${paginateBy}&distinct=true&fields=id,drillcore_box,attachment__filename,drillcore_box__number,drillcore_box__stratigraphy_top,drillcore_box__stratigraphy_top__stratigraphy,drillcore_box__stratigraphy_top__stratigraphy_en,drillcore_box__stratigraphy_base,drillcore_box__stratigraphy_base__stratigraphy,drillcore_box__stratigraphy_base__stratigraphy_en,drillcore_box__depth_start,drillcore_box__depth_end`
      this.$axios.$get(url).then((res) => {
        if (!res.page) {
          this.boxes.push(...res.results)
          $state.loaded()
          $state.complete()
        } else if (parseInt(res.page.split(' ').pop()) >= this.page) {
          this.page += 1
          this.boxes.push(...res.results)
          $state.loaded()
        } else {
          $state.complete()
        }
      })
    },
  },
}
</script>