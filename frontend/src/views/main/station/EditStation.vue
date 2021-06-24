<template>
  <v-container fluid>
    <v-card class="ma-3 pa-3">
      <v-card-title primary-title>
        <div class="headline primary--text">Edit Station</div>
      </v-card-title>
      <v-card-text>
        <template>
          <div class="my-3">
            <div class="subheading secondary--text text--lighten-2">Title</div>
            <div
              class="title primary--text text--darken-2"
              v-if="station"
            >{{station.title}}</div>
            <div
              class="title primary--text text--darken-2"
              v-else
            >-----</div>
          </div>
          <v-form
            v-model="valid"
            ref="form"
            lazy-validation
          >
            <v-text-field 
              label="Station Title" 
              data-vv-name="title" 
              data-vv-delay="100" 
              v-validate="{required: true}" 
              v-model="title" :error-messages="errors.first('title')"
            ></v-text-field>
          </v-form>
        </template>
      </v-card-text>
      <v-card-text>
        <template>
          <v-select
            v-model="propertyId"
            :items="properties"
            label="Property"
            item-text="title"
            item-value="id"
          ></v-select>
        </template>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="cancel">Cancel</v-btn>
        <v-btn @click="reset">Reset</v-btn>
        <v-btn
          @click="submit"
          :disabled="!valid"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
    <StationItems :stationId="stationId" />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IStation, IStationUpdate } from '@/interfaces';
import { dispatchGetProperties, dispatchGetStations, dispatchUpdateStation } from '@/store/admin/actions';
import { readOneStation, readProperties } from '@/store/admin/getters';
import StationItems from '@/components/StationItems.vue';


@Component({
  components: {
    StationItems,
  },
})
export default class EditStation extends Vue {
  public valid = true;
  public title: string = '';
  public propertyId: number | null = null;

  get properties() {
    return readProperties(this.$store);
  }

  get stationId(): number {
    return this.station!.id;
  }

  public async mounted() {
    await dispatchGetProperties(this.$store);
    await dispatchGetStations(this.$store);
    this.reset();
  }

  public reset() {
    this.$validator.reset();
    if (this.station) {
      this.title = this.station.title;
      this.propertyId = this.station.property_id;
    }
  }

  public cancel() {
    this.$router.back();
  }

  public async submit() {
    if (await this.$validator.validateAll()) {
      const updatedStation: IStationUpdate = {
        title: this.title,
        property_id: this.propertyId,
      };
      await dispatchUpdateStation(this.$store, { id: this.station!.id, station: updatedStation });
      this.$router.push('/main/stations');
    }
  }

  get station() {
    return readOneStation(this.$store)(+this.$router.currentRoute.params.id);
  }
}
</script>
