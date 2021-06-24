<template>
  <v-container fluid>
    <v-card class="ma-3 pa-3">
      <v-card-title primary-title>
        <div class="headline primary--text">Create Station</div>
      </v-card-title>
      <v-card-text>
        <template>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-text-field label="Station Title" data-vv-name="title" data-vv-delay="100" v-validate="{required: true}" v-model="title" :error-messages="errors.first('title')">
            </v-text-field>
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
        <v-btn @click="submit" :disabled="!valid">
              Save
            </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {
  IStationCreate,
} from '@/interfaces';
import { readProperties } from '@/store/admin/getters';
import { dispatchCreateStation, dispatchGetProperties } from '@/store/admin/actions';

@Component
export default class CreateStation extends Vue {
  public title: string = '';
  public valid = false;
  public propertyId: number | null = null;

  get properties() {
    return readProperties(this.$store);
  }

  public async mounted() {
    await dispatchGetProperties(this.$store);
    this.reset();
  }

  public reset() {
    this.title = '';
    this.$validator.reset();
  }

  public cancel() {
    this.$router.back();
  }

  public async submit() {
    if (await this.$validator.validateAll()) {
      const updatedStation: IStationCreate = {
        title: this.title,
        property_id: this.propertyId,
      };
      await dispatchCreateStation(this.$store, updatedStation);
      this.$router.push('/main/stations/all');
    }
  }
}
</script>
