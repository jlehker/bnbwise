<template>
  <v-container fluid>
    <v-card class="ma-3 pa-3">
      <v-card-title primary-title>
        <div class="headline primary--text">Create Property</div>
      </v-card-title>
      <v-card-text>
        <template>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-text-field label="Property Title" data-vv-name="title" data-vv-delay="100" v-validate="{required: true}" v-model="title" :error-messages="errors.first('title')">
            </v-text-field>
          </v-form>
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
  IPropertyCreate,
} from '@/interfaces';
import { dispatchCreateProperty } from '@/store/admin/actions';

@Component
export default class CreateProperty extends Vue {
  public title: string = '';
  public valid = false;

  public async mounted() {
    // await dispatchGetUsers(this.$store);
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
      const updatedProperty: IPropertyCreate = {
        title: this.title,
      };
      await dispatchCreateProperty(this.$store, updatedProperty);
      this.$router.push('/main/properties/all');
    }
  }
}
</script>
