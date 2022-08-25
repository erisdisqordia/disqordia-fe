import { library } from '@fortawesome/fontawesome-svg-core'
import { faRetweet } from '@fortawesome/free-solid-svg-icons'

library.add(faRetweet)

const RetweetButton = {
  props: ['status', 'loggedIn', 'visibility'],
  data () {
    return {
      animated: false
    }
  },
  methods: {
    retweet () {
      if (this.mergedConfig.confirmRetweets) {
        if (!this.status.repeated) {
          const confirmed = window.confirm(this.$t('status.retweet_confirm'))
          if (confirmed) {
            this.$store.dispatch('retweet', { id: this.status.id })
          }
        } else {
          const confirmed = window.confirm(this.$t('status.unretweet_confirm'))
          if (confirmed) {
            this.$store.dispatch('unretweet', { id: this.status.id })
          }
        }
      } else {
        if (!this.status.repeated) {
          this.$store.dispatch('retweet', { id: this.status.id })
        } else {
          this.$store.dispatch('unretweet', { id: this.status.id })
        }
      }
      this.animated = true
      setTimeout(() => {
        this.animated = false
      }, 500)
    }
  },
  computed: {
    isOwn () {
      return this.status.user.id === this.$store.state.users.currentUser.id
    },
    mergedConfig () {
      return this.$store.getters.mergedConfig
    }
  }
}

export default RetweetButton
