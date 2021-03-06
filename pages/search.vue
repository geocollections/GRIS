<template>
  <div>
    <v-row justify="center" align="center">
      <v-col>
        <h1 class="my-3 text-center text-sm-h3 font-weight-bold text-h4">
          {{ $t('landing.searchTitle') }}
        </h1>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col sm="8" md="6">
        <global-search @input="handleSearch" />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col>
        <div class="mb-2">
          <button-tabs ref="tabs" :tabs="computedTabs" />
        </div>

        <v-card>
          <nuxt-child :query="searchQuery" keep-alive />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { debounce, isEmpty, isEqual, orderBy } from 'lodash'
import ButtonTabs from '@/components/ButtonTabs'
import { mapFields } from 'vuex-map-fields'
import GlobalSearch from '~/components/search/GlobalSearch.vue'
export default {
  name: 'QuickSearch',
  components: { ButtonTabs, GlobalSearch },
  // layout: 'search',
  async asyncData({ params, route, error, app, store, redirect }) {
    try {
      const tabs = [
        {
          id: 'locality',
          routeName: 'search-localities',
          title: 'landing.localities',
          isSolr: true,
          count: 0,
          props: {},
        },
        {
          id: 'site',
          routeName: 'search-sites',
          title: 'landing.sites',
          isSolr: true,
          count: 0,
          props: {},
        },
        {
          id: 'drillcore',
          routeName: 'search',
          title: 'landing.drillcores',
          isSolr: true,
          count: 0,
          props: {},
        },
        {
          id: 'sample',
          routeName: 'search-samples',
          title: 'landing.samples',
          isSolr: true,
          count: 0,
          props: {},
        },
        {
          id: 'analysis',
          routeName: 'search-analyses',
          title: 'landing.analyses',
          isSolr: true,
          count: 0,
          props: {},
        },
        {
          id: 'preparation',
          routeName: 'search-preparations',
          path: '/localities',
          title: 'landing.preparations',
          isSolr: true,
          count: 0,
          props: {},
        },
        {
          id: 'reference',
          routeName: 'search-references',
          title: 'landing.references',
          isSolr: true,
          count: 0,
          props: {},
        },
        {
          id: 'specimen',
          routeName: 'search-specimens',
          title: 'landing.specimens',
          isSolr: true,
          count: 0,
          props: {},
        },
        {
          id: 'doi',
          routeName: 'search-dois',
          title: 'landing.dois',
          isSolr: true,
          count: 0,
          props: {},
        },
        {
          id: 'dataset',
          routeName: 'search-datasets',
          title: 'landing.datasets',
          isSolr: true,
          count: 0,
          props: {},
        },
        {
          id: 'attachment',
          routeName: 'search-files',
          title: 'landing.attachments',
          isSolr: true,
          count: 0,
          props: {},
        },
        {
          id: 'photo',
          table: 'attachment',
          routeName: 'search-photos',
          title: 'landing.photos',
          isSolr: true,
          count: 0,
          props: {},
        },
        {
          id: 'taxon',
          routeName: 'search-taxa',
          title: 'landing.taxa',
          isSolr: true,
          count: 0,
          props: {},
        },
        {
          id: 'rock',
          routeName: 'search-rocks',
          title: 'landing.rocks',
          isSolr: true,
          count: 0,
          props: {},
        },
        {
          id: 'stratigraphy',
          routeName: 'search-stratigraphy',
          title: 'landing.stratigraphy',
          isSolr: true,
          count: 0,
          props: {},
        },
      ]

      const hydratedTabs = await Promise.all(
        tabs.map(
          async (tab) =>
            await app.$hydrateCount(tab, {
              solr: {
                default: {
                  q: isEmpty(store.state.search.searchQuery)
                    ? '*'
                    : `${store.state.search.searchQuery}`,
                },
                photo: {
                  q: isEmpty(store.state.search.searchQuery)
                    ? '*'
                    : `${store.state.search.searchQuery}`,
                  fq: 'specimen_image_attachment:2',
                },
              },
            })
        )
      )

      const validPath = app.$validateTabRoute(route, hydratedTabs, {
        findMax: true,
      })
      if (validPath !== route.path) redirect(validPath)
      return {
        tabs: hydratedTabs,
      }
    } catch (err) {}
  },
  head() {
    return {
      title: this.$t('search.pageTitle'),
    }
  },
  computed: {
    ...mapFields('search', ['searchQuery']),
    computedTabs() {
      // Filtering out empty tabs but still showing active tab whether it is empty or not
      const filteredTabs = this.tabs.filter(
        (item) =>
          item.count > 0 ||
          this.$route.name.includes(
            item.id === 'drillcore' ? `${item.routeName}__` : item.routeName
          )
      )
      return orderBy(filteredTabs, ['count'], ['desc'])
    },
  },
  watch: {
    '$route.query'(newVal, oldVal) {
      if (!isEqual(newVal, oldVal)) {
        this.handleSearch()
      }
    },
  },
  created() {
    if (this.$route.query) {
      // Todo: Should deconstruct query params (page?, paginate? sort?)
      if (!isEmpty(this.$route.query?.q)) this.search = this.$route.query.q
      this.handleSearch()
    }
  },
  methods: {
    handleSearch: debounce(async function () {
      this.tabs = await Promise.all(
        this.tabs.map(
          async (tab) =>
            await this.$hydrateCount(tab, {
              solr: {
                default: {
                  q: isEmpty(this.searchQuery) ? '*' : `${this.searchQuery}`,
                },
                photo: {
                  q: isEmpty(this.searchQuery) ? '*' : `${this.searchQuery}`,
                  fq: 'specimen_image_attachment:2',
                },
              },
            })
        )
      )
      this.updateRouteQuery()
    }, 500),

    updateRouteQuery() {
      const routeName = this.$route.name.includes('search')
        ? this.$route.name.split('__')[0]
        : 'search'
      const query = isEmpty(this.search) ? {} : { q: this.search }
      this.$router.push(this.localePath({ name: routeName, query }))
    },
  },
}
</script>
