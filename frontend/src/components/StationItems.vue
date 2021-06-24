<template>
    <v-card class="ma-3 pa-3">
        <template>
          <v-form
            ref="form"
            lazy-validation
          >
            <v-toolbar dense>
              <v-overflow-btn
                :items="itemTypes"
                label="Item Type"
                hide-details
                class="pa-0"
              ></v-overflow-btn>
              <v-text-field 
                label="Item Description" 
                data-vv-name="description" 
                v-model="description"
                data-vv-delay="100" 
              ></v-text-field>
              <v-spacer></v-spacer>
              <v-btn
                @click="submit"
              >
                Add Item
              </v-btn>
            </v-toolbar>
         </v-form>
        </template>
        <v-data-table :headers="headers" :items="items">
          <template slot="items" slot-scope="props">
            <td>{{ props.item.description }}</td>
            <td>{{ props.item.type }}</td>
          </template>
        </v-data-table>
    </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { readItems } from '@/store/admin/getters';
import { IItemCreate, IStation } from '@/interfaces';
import { dispatchGetItems, dispatchCreateItem } from '@/store/admin/actions';

@Component
export default class StationItems extends Vue { 
    @Prop({ required: true }) private stationId!: number;

    public title: string = 'Checkbox';
    public description: string = '';

    public headers = [
    {
      text: 'Item Description',
      sortable: true,
      value: 'description',
      align: 'left',
    },
    {
      text: 'Item Type',
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
    return readItems(this.$store);
  }
  public async submit() {
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