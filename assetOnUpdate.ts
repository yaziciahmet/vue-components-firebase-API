/**
 * AssetOnUpdate Trigger
 * - Save the update to the history of the corresponding asset
 */

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
 
admin.initializeApp();
const db = admin.firestore();
 
export default async (
    change: any,
    context: functions.EventContext
): Promise<null> => {

    // Get the previous and new version of the updated document
    let oldAssetInfo =  change.before.data();
    const newAssetInfo = change.after.data();
    const assetId = change.before.id;

    // Divide the fields of asset to groups according to the way they will be displayed in frontend
    const infoUpdateGroup = ['assetType', 'brand', 'cost', 'description', 'imgUrl', 'model', 'serialNumber', 'status'];
    const assigneeUpdateGroup = ['assignedTo'];
    const lastCheckUpdateGroup = ['lastCheckDate'];
    const locationUpdateGroup = ['locationId'];
    const associatedItemsUpdateGroup = ['associatedItems'];
    const returnDateUpdateGroup = ['returnDate'];

    let fieldUpdated: boolean;

    // Iterate through the fields of the asset and find out which field has changed 
    Object.keys(oldAssetInfo).forEach(field => {
        // Every field change is single history event, so we have to rebuild the event every iteration        
        let event: {[key: string]: any} = {
            eventTime: new Date(), // current date
            eventType: '', 
            eventPerformer: 'ahPGOPeKYH7781pdBdwY' // Will change according to updater
        };

        // Read the old and new values of the current field
        let oldValue = oldAssetInfo[field];
        let newValue = newAssetInfo[field];
    

        fieldUpdated = false;

        // if the current field is in info update group
        if(infoUpdateGroup.includes(field)){
            event.eventType = 'info update';
            // if the value has changed, set the fields of event object and make fieldUpdated true
            if(oldValue != newValue){
                event.field = field;
                event.prevValue = oldValue;
                event.newValue = newValue;
                fieldUpdated = true;
            }
        }
        // if the current field is in assignee update group
        else if(assigneeUpdateGroup.includes(field)){
            event.eventType = 'assignee update';
            // if the value has changed, set the fields of event object and make fieldUpdated true
            if(oldValue != newValue){
                event.prevAssigneeId = oldValue;
                event.newAssigneeId = newValue;
                fieldUpdated = true;
            }
        }
        // if the current field is in last check update group
        else if(lastCheckUpdateGroup.includes(field)){
            event.eventType = 'asset check';
            // if the value has changed, set the fields of event object and make fieldUpdated true
            if(oldValue.seconds != newValue.seconds || oldValue.nanoseconds != newValue.nanoseconds){
                event.lastCheckUserId = newAssetInfo.lastCheckUserId;
                event.lastCheckDate = newValue;
                fieldUpdated = true;
            }
        }
        // if the current field is in location update group
        else if(locationUpdateGroup.includes(field)){
            event.eventType = 'location update'
            // if the value has changed, set the fields of event object and make fieldUpdated true
            if(oldValue != newValue){
                event.prevLocationId = oldValue;
                event.newLocationId = newValue;
                fieldUpdated = true;
            }
        }
        // if the current field is in associated items update group
        else if(associatedItemsUpdateGroup.includes(field)){
            event.eventType = 'associated items update';

            // Check if anything is removed from the array
            let removed:any = [];
            
            for(let i = 0; i < oldValue.length; i++){
                if(!newValue.includes(oldValue[i])){
                    removed.push(oldValue[i]);
                }
            }

            // Check if anything is added to array
            let added:any = [];

            for(let i = 0; i < newValue.length; i++){
                if(!oldValue.includes(newValue[i])){
                    added.push(newValue[i]);
                }
            }

            // If something is removed from or added to array, set the event object and make fieldUpdated true
            if(removed.length != 0 || added.length != 0){
                event.removed = removed;
                event.added = added;
                fieldUpdated = true;
            }
        }
        // if the current field is in return date update group
        else if(returnDateUpdateGroup.includes(field)){
            event.eventType = 'return date update';
            // if the value has changed, set the fields of event object and make fieldUpdated true
            if(oldValue.seconds != newValue.seconds || oldValue.nanoseconds != newValue.nanoseconds){
                event.prevReturnDate = oldValue;
                event.newReturnDate = newValue;
                fieldUpdated = true;
            }
        }


        // If the current field is updated, push the event into the history collection of the current asset
        if(fieldUpdated){
            db.collection("assets")
            .doc(assetId)
            .collection("history")
            .add(event)
            .then((res) => {
                functions.logger.log(
                    "Added the following event ", event, 
                    "to the history of the asset with the following id: ",
                    assetId
                    );
            })
        }
    })

    
    
    return null;
}
  
 