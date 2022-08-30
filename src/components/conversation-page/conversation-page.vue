<template>
  <div
    v-if="!currentUser && privateMode"
    class="panel error-placeholder"
  >
    <div class="panel-heading">
      <div class="title">
        ???
      </div>
    </div>
    <div class="panel-body error">
      <img
        class="error-img"
        src="/static/error.gif"
      >
    </div>
  </div>
  <conversation
    v-else
    :collapsable="false"
    is-page="true"
    :status-id="statusId"
  />
</template>

<script src="./conversation-page.js"></script>

<style lang="scss">
.error-placeholder {
  .panel-body {
    display: flex;
    justify-content: center;
    align-items: middle;
    padding: 7em;

    &.error {
      padding: 0em;
    }

    .error-img {
      width: 100%;
      border-radius: 0px 0px 10px 10px;
    }
  }
}
</style>
