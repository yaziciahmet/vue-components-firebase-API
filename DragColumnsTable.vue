<!-- A table where the columns are exchangable both visually and datawise by simple drag and drop action -->



<template>
  <div class="row q-mt-xl">
    <div
        v-for="column in columns"
        :key="column.name"
        v-bind:class="column.visible ? 'col':''"
    >
        <table
        class="edit-view-table full-width text-center"
        draggable="true"
        @dragstart="grabColumn(column,$event)"
        @dragenter="changeColumns(column,$event)"
        @dragend="grabbedColumn=''"
        @dragover.prevent
        v-bind:style="[grabbedColumn.name==column.name ? {'background':'yellow','opacity':'0.6'} : {}]"
        v-if="column.visible"
        >
        <!-- Header -->
        <tr v-if="column.visible" draggable="false">
            <th  style="background:gray;color:white;height:70px;" draggable="false">{{ column.label }}</th>
        </tr>
        <!-- Non image data -->
        <template v-if="column.name!='image' && column.visible">
            <tr  draggable="false" v-for="asset in data" :key="asset.assetId">
            <td draggable="false">{{ asset[column.name] }}</td>
            </tr>
        </template>
        <!-- Image data -->
        <template v-else-if="column.name=='image' && column.visible">
            <tr draggable="false" v-for="asset in data" :key="asset.assetId">
            <td draggable="false"><q-img  draggable="false" style="height:83px;width:100%;" :src="asset.imgUrl" /></td>
            </tr>
        </template>
        </table>
    </div>
    </div>
</template>

<script>
export default {
    name: 'DragColumnsTable',
    data() {
        return {
            grabbedColumn: ''
        };
    },
    props: {
        columns: Array, // Example column: { name: 'image', align: 'center', label: 'IMAGE', field: row => row.image, visible: true } 
        data: Array
    },
    methods: {
        grabColumn(grabbedColumn, event) {
            // Set the column that is currently grabbed
            this.grabbedColumn = grabbedColumn;
        },
        changeColumns(droppedColumn,event){
            // Exchange the places of the columns in the array and force Vue to rerender
            let indexOfGrabbed = this.columns.indexOf(this.grabbedColumn);
            let indexOfDropped = this.columns.indexOf(droppedColumn);
            
            let temp = droppedColumn;
            this.columns[indexOfDropped] = this.grabbedColumn;
            this.columns[indexOfGrabbed] = temp;

            this.$forceUpdate();
        },
    }
}
</script>

<style>
.edit-view-table {
  border-collapse:collapse;
  border: 1px solid black;
  height: 100%;
}
.edit-view-table td, .edit-view-table th {
  border: 1px solid lightgray;
}
</style>
