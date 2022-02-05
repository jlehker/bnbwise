<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Create New Item</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Item Description*"
                  required
                  data-vv-name="description" 
                  v-model="description"
                  data-vv-delay="100" 
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Item Title"
                  hint="I don't know this doesn't do it"
                ></v-text-field>
              </v-col>
              <v-col cols="12">

              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  :items="itemTypes"
                  label="Item Type*"
                  required
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-checkbox
                  v-model="itemRequired"
                  label="Required"
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="submit"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card class="ma-3 pa-3">
      <v-toolbar light>
        <v-toolbar-title>
          Manage Items
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="dialog = true">New Item</v-btn>
      </v-toolbar>
        <v-data-table :headers="headers" :items="items">
          <template slot="items" slot-scope="props">
            <td>Checkbox</td>
            <td>{{ props.item.description }}</td>
            <td>Actions Coming Soon</td>
          </template>
        </v-data-table>
    </v-card>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { readStationItems } from '@/store/admin/getters';
import { IItemCreate, IStation } from '@/interfaces';
import { dispatchGetItems, dispatchCreateItem } from '@/store/admin/actions';

@Component
export default class StationItems extends Vue { 
    @Prop({ required: true }) private stationId!: number;

    public title: string = 'Checkbox';
    public description: string = '';
    public itemRequired: boolean = false;
    public dialog: boolean = false;

    public headers = [
    {
      text: 'Item Type',
      sortable: true,
      value: 'description',
      align: 'left',
    },
    {
      text: 'Item Description',
      sortable: true,
      value: 'description',
      align: 'left',
    },
    {
      text: 'Actions',
      value: 'id',
    },
  ];

  public async mounted() {
    await dispatchGetItems(this.$store);
  }
 
  get items() {
    // return [
    //   {type: 'Checkbox', description: 'Take out garbage'},
    //   {type: 'Checkbox', description: 'Make the beds'},
    //   {type: 'Photo', description: 'Pictures of the sink'},
    // ];
    return readStationItems(this.$store)(+this.stationId);
  }
  public async submit() {
      this.dialog = false;
      const item: IItemCreate = {
        title: 'Checkbox',
        description: this.description,
        station_id: this.stationId,
      };
      await dispatchCreateItem(this.$store, item);
  }

  get itemTypes() {
    return [
      'Checkbox',
      'Photo   ',
      'Textarea',
    ]
  }
}
</script>