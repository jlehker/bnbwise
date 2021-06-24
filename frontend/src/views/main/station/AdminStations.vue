<template>
  <div>
    <v-toolbar light>
      <v-toolbar-title>
        Manage Stations
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" to="/main/stations/create">Create Station</v-btn>
    </v-toolbar>
    <v-data-table :headers="headers" :items="stations">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.title }}</td>
        <!-- <td><v-icon v-if="props.item.is_active">checkmark</v-icon></td> -->
        <td><v-icon>checkmark</v-icon></td>
        <td>{{ getPropertyTitle(props.item.property_id) }}</td>
        <td class="layout px-0">
          <v-tooltip top>
            <span>Download QR Code</span>
            <v-btn slot="activator" flat @click="downloadQR(props.item.id, props.item.title)">
              <v-icon>download</v-icon>
            </v-btn>
          </v-tooltip>
          <v-tooltip top>
            <span>Edit</span>
            <v-btn slot="activator" flat :to="{name: 'main-stations-edit', params: {id: props.item.id}}">
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
import { readStations, readOneProperty } from '@/store/admin/getters';
import { dispatchGetStations, dispatchGetProperties, dispatchDownloadQR } from '@/store/admin/actions';

@Component
export default class AdminStations extends Vue {
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
      text: 'Property',
      sortable: true,
      value: 'title',
    },
    {
      text: 'Actions',
      value: 'id',
    },
  ];
  get stations() {
    return readStations(this.$store);
  }
  public getPropertyTitle(propertyId: number) {
    const property = readOneProperty(this.$store)(propertyId);
    return !(property === undefined) ? property.title : '';
  }

  public async mounted() {
    await dispatchGetProperties(this.$store);
    await dispatchGetStations(this.$store);
  }

  public async downloadQR(id: number, title: string) {
      await dispatchDownloadQR(this.$store, { id, title });
  }

}
</script>
