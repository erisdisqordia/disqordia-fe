import Conversation from '../conversation/conversation.vue'

const conversationPage = {
  components: {
    Conversation
  },
  computed: {
    statusId () {
      return this.$route.params.id
    },
    currentUser () {
      return this.$store.state.users.currentUser
    },
    privateMode () { return this.$store.state.instance.private }
  }
}

export default conversationPage
