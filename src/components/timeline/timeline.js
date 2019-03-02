import Status from '../status/status.vue'
import timelineFetcher from '../../services/timeline_fetcher/timeline_fetcher.service.js'
import StatusOrConversation from '../status_or_conversation/status_or_conversation.vue'
import { throttle } from 'lodash'

const Timeline = {
  props: [
    'timeline',
    'timelineName',
    'title',
    'userId',
    'tag',
    'embedded',
    'count'
  ],
  data () {
    return {
      paused: false,
      unfocused: false,
      bottomedOut: false
    }
  },
  computed: {
    timelineError () { return this.$store.state.statuses.error },
    newStatusCount () {
      return this.timeline.newStatusCount
    },
    newStatusCountStr () {
      if (this.timeline.flushMarker !== 0) {
        return ''
      } else {
        return ` (${this.newStatusCount})`
      }
    },
    classes () {
      return {
        root: ['timeline'].concat(!this.embedded ? ['panel', 'panel-default'] : []),
        header: ['timeline-heading'].concat(!this.embedded ? ['panel-heading'] : []),
        body: ['timeline-body'].concat(!this.embedded ? ['panel-body'] : []),
        footer: ['timeline-footer'].concat(!this.embedded ? ['panel-footer'] : [])
      }
    }
  },
  components: {
    Status,
    StatusOrConversation
  },
  created () {
    const store = this.$store
    const credentials = store.state.users.currentUser.credentials
    const showImmediately = this.timeline.visibleStatuses.length === 0

    window.addEventListener('scroll', this.scrollLoad)

    if (this.timelineName === 'friends' && !credentials) { return false }

    timelineFetcher.fetchAndUpdate({
      store,
      credentials,
      timeline: this.timelineName,
      showImmediately,
      userId: this.userId,
      tag: this.tag
    })
  },
  mounted () {
    if (typeof document.hidden !== 'undefined') {
      document.addEventListener('visibilitychange', this.handleVisibilityChange, false)
      this.unfocused = document.hidden
    }
    window.addEventListener('keydown', this.handleShortKey)
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollLoad)
    window.removeEventListener('keydown', this.handleShortKey)
    if (typeof document.hidden !== 'undefined') document.removeEventListener('visibilitychange', this.handleVisibilityChange, false)
    this.$store.commit('setLoading', { timeline: this.timelineName, value: false })
  },
  methods: {
    handleShortKey (e) {
      if (e.key === '.') this.showNewStatuses()
    },
    showNewStatuses () {
      if (this.newStatusCount === 0) return

      if (this.timeline.flushMarker !== 0) {
        this.$store.commit('clearTimeline', { timeline: this.timelineName })
        this.$store.commit('queueFlush', { timeline: this.timelineName, id: 0 })
        this.fetchOlderStatuses()
      } else {
        this.$store.commit('showNewStatuses', { timeline: this.timelineName })
        this.paused = false
      }
    },
    fetchOlderStatuses: throttle(function () {
      const store = this.$store
      const credentials = store.state.users.currentUser.credentials
      store.commit('setLoading', { timeline: this.timelineName, value: true })
      timelineFetcher.fetchAndUpdate({
        store,
        credentials,
        timeline: this.timelineName,
        older: true,
        showImmediately: true,
        userId: this.userId,
        tag: this.tag
      }).then(statuses => {
        store.commit('setLoading', { timeline: this.timelineName, value: false })
        if (statuses && statuses.length === 0) {
          this.bottomedOut = true
        }
      })
    }, 1000, this),
    scrollLoad (e) {
      const bodyBRect = document.body.getBoundingClientRect()
      const height = Math.max(bodyBRect.height, -(bodyBRect.y))
      if (this.timeline.loading === false &&
          this.$store.state.config.autoLoad &&
          this.$el.offsetHeight > 0 &&
          (window.innerHeight + window.pageYOffset) >= (height - 750)) {
        this.fetchOlderStatuses()
      }
    },
    handleVisibilityChange () {
      this.unfocused = document.hidden
    }
  },
  watch: {
    newStatusCount (count) {
      if (!this.$store.state.config.streaming) {
        return
      }
      if (count > 0) {
        // only 'stream' them when you're scrolled to the top
        if (window.pageYOffset < 15 &&
            !this.paused &&
            !(this.unfocused && this.$store.state.config.pauseOnUnfocused)
           ) {
          this.showNewStatuses()
        } else {
          this.paused = true
        }
      }
    }
  }
}

export default Timeline
