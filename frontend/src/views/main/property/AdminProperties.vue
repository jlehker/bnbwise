<template>
  <div>
    <v-toolbar light>
      <v-toolbar-title>
        Manage Properties 
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" to="/main/properties/create">Create Property</v-btn>
    </v-toolbar>
    <v-data-table :headers="headers" :items="properties">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.title }}</td>
        <!-- <td><v-icon v-if="props.item.is_active">checkmark</v-icon></td> -->
        <td><v-icon>checkmark</v-icon></td>
        <td class="layout px-0">
          <v-tooltip top>
            <span>Edit</span>
            <v-btn slot="activator" flat :to="{name: 'main-properties-edit', params: {id: props.item.id}}">
              <v-icon>edit</v-icon>
            </v-btn>
          </v-tooltip>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Store } from 'vuex';
import { IUserProfile } from '@/interfaces';
import { readProperties } from '@/store/admin/getters';
import { dispatchGetProperties } from '@/store/admin/actions';

@Component
export default class AdminProperties extends Vue {
  public headers = [
    {
      text: 'Title',
      sortable: true,
      value: 'title',
      align: 'left',
    },
    {
      text: 'Is Active',
      sortable: true,
      value: 'isActive',
      align: 'left',
    },
    {
      text: 'Actions',
      value: 'id',
    },
  ];
  get properties() {
    return readProperties(this.$store);
  }

  public async mounted() {
    await dispatchGetProperties(this.$store);
  }

}
</script>
