<template>
  <v-container fluid>
    <v-card class="ma-3 pa-3">
      <v-card-title primary-title>
        <div class="headline primary--text">Download Station QR Codes</div>
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="cancel">Cancel</v-btn>
        <v-btn
          @click="submit"
          :disabled="!valid"
        >
          Download
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { dispatchDownloadQRZip } from '@/store/admin/actions';

@Component
export default class Print extends Vue {
  public valid = true;

  public cancel() {
    this.$router.back();
  }

  public async submit() {
    await dispatchDownloadQRZip(this.$store);
  }
}
</script>
