<template>
  <v-container fluid>
    <v-card class="ma-3 pa-3">
      <v-card-title primary-title>
        <div class="headline primary--text">Edit Property</div>
      </v-card-title>
      <v-card-text>
        <template>
          <div class="my-3">
            <div class="subheading secondary--text text--lighten-2">Title</div>
            <div
              class="title primary--text text--darken-2"
              v-if="property"
            >{{property.title}}</div>
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
              label="Property Title" 
              data-vv-name="title" 
              data-vv-delay="100" 
              v-validate="{required: true}" 
              v-model="title" :error-messages="errors.first('title')"
            ></v-text-field>
          </v-form>
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
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IProperty, IPropertyUpdate } from '@/interfaces';
import { dispatchGetProperties, dispatchUpdateProperty } from '@/store/admin/actions';
import { readOneProperty } from '@/store/admin/getters';

@Component
export default class EditProperty extends Vue {
  public valid = true;
  public title: string = '';

  public async mounted() {
    await dispatchGetProperties(this.$store);
    this.reset();
  }

  public reset() {
    this.$validator.reset();
    if (this.property) {
      this.title = this.property.title;
    }
  }

  public cancel() {
    this.$router.back();
  }

  public async submit() {
    if (await this.$validator.validateAll()) {
      const updatedProperty: IPropertyUpdate = {
        title: this.title,
      };
      await dispatchUpdateProperty(this.$store, { id: this.property!.id, property: updatedProperty });
      this.$router.push('/main/properties');
    }
  }

  get property() {
    return readOneProperty(this.$store)(+this.$router.currentRoute.params.id);
  }
}
</script>
