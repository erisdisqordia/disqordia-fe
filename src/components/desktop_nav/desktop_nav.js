import SearchBar from 'components/search_bar/search_bar.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faSignInAlt,
  faSignOutAlt,
  faHome,
  faComments,
  faBell,
  faUserPlus,
  faBullhorn,
  faSearch,
  faTachometerAlt,
  faCog,
  faGlobe,
  faBolt,
  faUsers,
  faCommentMedical,
  faBookmark,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faSignInAlt,
  faSignOutAlt,
  faHome,
  faComments,
  faBell,
  faUserPlus,
  faBullhorn,
  faSearch,
  faTachometerAlt,
  faCog,
  faGlobe,
  faBolt,
  faUsers,
  faCommentMedical,
  faBookmark,
  faInfoCircle
)

export default {
  components: {
    SearchBar
  },
  data: () => ({
    searchBarHidden: true,
    supportsMask: window.CSS && window.CSS.supports && (
      window.CSS.supports('mask-size', 'contain') ||
        window.CSS.supports('-webkit-mask-size', 'contain') ||
        window.CSS.supports('-moz-mask-size', 'contain') ||
        window.CSS.supports('-ms-mask-size', 'contain') ||
        window.CSS.supports('-o-mask-size', 'contain')
    )
  }),
  computed: {
    enableMask () { return this.supportsMask && this.$store.state.instance.logoMask },
    logoStyle () {
      return {
        'visibility': this.enableMask ? 'hidden' : 'visible'
      }
    },
    logoMaskStyle () {
      return this.enableMask ? {
        'mask-image': `url(${this.$store.state.instance.logo})`
      } : {
        'background-color': this.enableMask ? '' : 'transparent'
      }
    },
    logoBgStyle () {
      return Object.assign({
        'margin': `${this.$store.state.instance.logoMargin} 0`,
        opacity: this.searchBarHidden ? 1 : 0
      }, this.enableMask ? {} : {
        'background-color': this.enableMask ? '' : 'transparent'
      })
    },
    logo () { return this.$store.state.instance.logo },
    mergedConfig () {
      return this.$store.getters.mergedConfig
    },
    sitename () { return this.$store.state.instance.name },
    showNavShortcuts () {
      return this.mergedConfig.showNavShortcuts
    },
    showWiderShortcuts () {
      return this.mergedConfig.showWiderShortcuts
    },
    hideSiteFavicon () {
      return this.mergedConfig.hideSiteFavicon
    },
    hideSiteName () {
      return this.mergedConfig.hideSiteName
    },
    hideSitename () { return this.$store.state.instance.hideSitename },
    logoLeft () { return this.$store.state.instance.logoLeft },
    currentUser () { return this.$store.state.users.currentUser },
    privateMode () { return this.$store.state.instance.private }
  },
  methods: {
    scrollToTop () {
      window.scrollTo(0, 0)
    },
    logout () {
      this.$router.replace('/main/public')
      this.$store.dispatch('logout')
    },
    onSearchBarToggled (hidden) {
      this.searchBarHidden = hidden
    },
    openSettingsModal () {
      this.$store.dispatch('openSettingsModal')
    }
  }
}
