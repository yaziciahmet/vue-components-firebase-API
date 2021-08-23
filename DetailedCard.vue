<template>
  <div class="card-container">
    <div class="row">
      <!-- Image -->
      <div class="col-2 card-image q-ml-md q-mr-md q-mt-md" style="width:100px; height:100px;">
        <!-- Img Div -->
        <div
          v-if="dataLoaded"
          class="flex justify-center"
          style="width:100%; height:100%;">  
            <img
              :src="
              imgPath == '' ? './assets/image-placeholder-white.png' : imgPath
              "
            />
            </div>
        <!-- Img Skeleton -->
        <q-skeleton v-else height="100%" width="100%" />
      </div>

      <!-- Info -->
      <div
        v-if="dataLoaded"
        class="col"
      >
        <div class="row">
          <div class="col-auto text-h4 q-mt-md">
            <template v-if="!isEditing">{{ header }}</template>
            <q-input filled v-else class="inputBox header" :dense="true" v-model="header" placeholder="Room Name" @keyup="$emit('updateValue','Header',header);"></q-input>
          </div>
          
          <div class="col col-ms-12 q-ml-md text-h5 text-weight-light q-mt-lg">
            {{ headerRight }}
          </div>
        </div>
        <div class="row">
          <div class="col-6 col-ms-12 text-h5">
            <template v-if="!isEditing">{{ subHeader }}</template>
            <q-input filled v-else class="inputBox subHeader" style="margin-top:5px;" :dense="true" v-model="subHeader" placeholder="Room Description" @keyup="$emit('updateValue','Sub Header',subHeader);"></q-input>
          </div>
        </div>
      </div>

      <!-- Info Skeleton -->
      <div v-else class="col q-mt-md">
        <div class="row ">
          <q-skeleton class="skeleton-text-header" height="45px" width="200px" />
        </div>
        <div class="row">
          <q-skeleton
          class="skeleton-text-description"
          height="35px"
          width="350px"
        />
        </div>
      </div>

      <div class="col-2 float-right">
          <q-btn flat v-if="!isEditing" class="float-right" color="primary" @click="editBtnEvent"
            >edit</q-btn>
          <q-btn flat v-if="isEditing" class="float-right" color="red" @click="cancelBtnEvent"
            >cancel</q-btn>
          <q-btn flat v-if="isEditing" class="float-right" color="primary" @click="saveBtnEvent"
            >save</q-btn>
        </div>
    </div>

      <!-- Room info 1st row-->
      <div
        v-if="dataLoaded"
        class="col-12 row text-h5 flex q-mx-md q-mb-sm q-mt-sm"
      >
        <!-- Area of the room -->
        <div class= "col-4 attribute">
          <q-input filled v-if="isEditing" class="inputBox onexone" v-model="onexoneValue" :dense="true" @keyup="$emit('updateValue',onexoneLabel,onexoneValue);">
            <template v-slot:before>
            <div style="color:black;"><b>{{onexoneLabel}}:</b></div>
          </template>
          <slot name="onexone"></slot>
          </q-input>
          <div v-else style="margin:4px 0px 3px 0px;">
            <b>{{onexoneLabel}}: </b>
            <template v-if="onexoneValue != '' && onexoneValue != undefined && onexoneValue != null">{{onexoneValue}}</template>
            <template v-else>N/A</template>
          </div>
        </div>
        <!-- Operating Key-->
        <div class="col-4 attribute">
          <q-input filled v-if="isEditing" class="inputBox onextwo"  v-model="onextwoValue" :dense="true" @keyup="$emit('updateValue',onextwoLabel,onextwoValue);">
            <template v-slot:before>
            <div style="color:black;"><b>{{onextwoLabel}}:</b></div>
          </template>
          <slot name="onextwo"></slot>
          </q-input>
          <div v-else style="margin:4px 0px 3px 0px;">
            <b>{{onextwoLabel}}: </b>
            <template v-if="onextwoValue != '' && onextwoValue != undefined && onextwoValue != null">{{onextwoValue}}</template>
            <template v-else>N/A</template>
          </div>
        </div>
        <!-- Person Assigned To The Room-->
        <div class="col-4 attribute">
          <q-input filled v-if="isEditing" class="inputBox onexthree" v-model="onexthreeValue" :dense="true" @keyup="$emit('updateValue',onexthreeLabel,onexthreeValue);">
            <template v-slot:before>
              <div style="color:black; "><b>{{onexthreeLabel}}:</b></div>
            </template>
            <slot name="onexthree"></slot>
          </q-input>
          <div v-else style="margin:4px 0px 3px 0px;">
            <b>{{onexthreeLabel}}: </b>
            <template v-if="onexthreeValue != '' && onexthreeValue != undefined && onexthreeValue != null">{{onexthreeValue}}</template>
            <template v-else>N/A</template>
          </div>
      </div>
      </div>
      <!-- Room info 2nd row-->
      <div
        v-if="dataLoaded"
        class="col-12 row text-h5 flex q-mx-md q-mb-sm q-mt-sm"
      >
        <!-- Max Occupants -->
        <div class="col-4 attribute">
          <q-input filled v-if="isEditing" class="inputBox twoxone" v-model="twoxoneValue" :dense="true" @keyup="$emit('updateValue',twoxoneLabel,twoxoneValue);">
            <template v-slot:before>
              <div style="color:black;"><b>{{twoxoneLabel}}:</b></div>
            </template>
            <slot name="twoxone"></slot>
          </q-input>
          <div v-else style="margin:5px 0px 7px 0px;">
            <b>{{twoxoneLabel}}: </b>
            <template v-if="twoxoneValue != '' && twoxoneValue != undefined && twoxoneValue != null">{{twoxoneValue}}</template>
            <template v-else>N/A</template>
          </div>
        </div>
        <!-- Phone -->
        <div class="col-4 attribute">
          <q-input filled v-if="isEditing" class="inputBox twoxtwo" v-model="twoxtwoValue" :dense="true" @keyup="$emit('updateValue',twoxtwoLabel,twoxtwoValue);">
            <template v-slot:before>
              <div style="color:black;"><b>{{twoxtwoLabel}}:</b></div>
            </template>
            <slot name="twoxtwo"></slot>
          </q-input>
            <div v-else style="margin:5px 0px 7px 0px;">
              <b>{{twoxtwoLabel}}: </b>
            <template v-if="twoxtwoValue != '' && twoxtwoValue != undefined && twoxtwoValue != null">{{twoxtwoValue}}</template>
            <template v-else>N/A</template>
            </div>
        </div>
        <!-- Managed By -->
        <div class="col-4 attribute">
          <div v-if="isEditing" style="color:black;">
            <q-input filled v-if="isEditing" class="inputBox twoxthree" v-model="twoxthreeValue" :dense="true" @keyup="$emit('updateValue',twoxthreeLabel,twoxthreeValue);">
              <template v-slot:before>
                <div style="color:black;"><b>{{twoxthreeLabel}}:</b></div>
              </template>
              <slot name="twoxthree"></slot>
            </q-input>
          </div>
          <div v-else style="margin:5px 0px 7px 0px;">
            <b>{{twoxthreeLabel}}: </b>
            <template v-if="twoxthreeValue != '' && twoxthreeValue != undefined && twoxthreeValue != null">{{twoxthreeValue}}</template>
            <template v-else>N/A</template>
          </div>
        </div>
    
      </div>  
    
  </div>
</template>

<script>

export default {
  name: "DetailedCard",
  data() {
    return {
      title: "",
      dataLoaded: false,
      isEditing: false,
      text: ''
    };
  },
  props: {
    header: String,
    header2: String,
    headerRight: String,
    subHeader: String,
    onexoneLabel: String,
    onextwoLabel: String,
    onexthreeLabel: String,
    twoxoneLabel: String,
    twoxtwoLabel: String,
    twoxthreeLabel: String,
    onexoneValue: String,
    onextwoValue: String,
    onexthreeValue: String,
    twoxoneValue: String,
    twoxtwoValue: String,
    twoxthreeValue: String,
    imgPath: String
  },
  methods: {
    editBtnEvent() {
      this.$emit('editBtnClicked');
      this.isEditing = true;
    },
    saveBtnEvent() {
      // Emit the click to other components
      this.$emit('saveBtnClicked');
      this.isEditing = false;

    },
    cancelBtnEvent() {
      // We also have to change to previous values inside the parent -FIRoom-
      this.$emit('cancelBtnClicked');
      this.isEditing = false;
    }
  }
};
</script>

<style scoped>

.inputBox{
  width:90%;
}

.card-container {
  background-color: #e6e6e6;
  height:230px;
  width: 75%;
  border-radius: 10px;
}
.card-image {
  background-color: lightgrey;
}

.skeleton-text-description {
  margin: 0;
  margin-top: 5px;
}

.skeleton-text-header {
  margin-top:0%;
}

img {
  width: 100%;
  height: 100%;
}

.attribute {
  font-size: 18px;  
}
</style>

