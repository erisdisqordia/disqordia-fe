<template>
  <div class="column-inner">
    <!--<instance-specific-panel v-if="showInstanceSpecificPanel" />-->
    <staff-panel v-if="currentUser || !privateMode" />
    <terms-of-service-panel />
    <MRFTransparencyPanel />
    <features-panel v-if="showFeaturesPanel" />
  </div>
</template>

<script src="./about.js" ></script>

<style lang="scss">
</style>
