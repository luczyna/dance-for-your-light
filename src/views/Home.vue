<template>
  <div class="home">
    <SNESButtons @sendMove="recieveMove"/>
  </div>
</template>

<script>
import SNESButtons from '@/components/SNESButtons.vue';
import DanceService from '@/services/dance-service';

export default {
  name: 'home',
  mixins: [
    DanceService
  ],
  components: {
    SNESButtons
  },
  data: function() {
    return {}
  },
  methods: {
    recieveMove(which) {
      this.log(which);
    }
  }
}
</script>
