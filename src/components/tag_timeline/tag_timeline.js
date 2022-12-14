import Timeline from '../timeline/timeline.vue'

const TagTimeline = {
  created () {
    this.$store.commit('clearTimeline', { timeline: 'tag' })
    this.$store.dispatch('startFetchingTimeline', { timeline: 'tag', tag: this.tag })
  },
  components: {
    Timeline
  },
  computed: {
    tag () { return this.$route.params.tag },
    timeline () { return this.$store.state.statuses.timelines.tag }
  },
  watch: {
    tag () {
      this.$store.commit('clearTimeline', { timeline: 'tag' })
      this.$store.dispatch('startFetchingTimeline', { timeline: 'tag', tag: this.tag })
    }
  },
  unmounted () {
    this.$store.dispatch('stopFetchingTimeline', 'tag')
  }
}

export default TagTimeline
