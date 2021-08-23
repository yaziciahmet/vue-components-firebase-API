import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();



export default async (
    data: any,
    context: functions.https.CallableContext
  ): Promise<any> => {
    
    const { roomId, floorId, buildingId, siteId, updatedRoomInfo } = data;
    const { area, operatingKey, assignedTo, maxOccupants, phone, managedBy, name, description } = updatedRoomInfo;

    // check if id's are valid
    const validId = roomId != null && roomId != undefined && roomId != "" &&
                    floorId != null && floorId != undefined && floorId != "" &&
                    buildingId != null && buildingId != undefined && buildingId != "" &&
                    siteId != null && siteId != undefined && siteId != "";
    
    if(validId){
      return db.collection("sites")
                .doc(siteId)
                .collection("buildings")
                .doc(buildingId)
                .collection("floors")
                .doc(floorId)
                .collection("rooms")
                .doc(roomId)
                .update({ // update the given room as the following document
                  area: area ? area : "",
                  operatingKey: operatingKey ? operatingKey : "",
                  assignedTo: assignedTo ? assignedTo : "",
                  maxOccupants: maxOccupants ? maxOccupants : "",
                  phone: phone ? phone : "",
                  managedBy: managedBy ? managedBy : "",
                  name: name ? name : "",
                  description: description ? description : ""
                })
                .then((res) => {
                  functions.logger.log(
                    "Updated the room with id: " +
                      roomId
                  );
                  return res;
                })
                .catch((reason) => {
                  functions.logger.error(
                    "Room with the following id could not be updated:",
                    roomId,
                    "reason:",
                    reason
                  );

                  return new functions.https.HttpsError(
                    "unknown",
                    reason.message,
                    reason
                  );
                });
    }
    // if id's are not valid
    else{ 
      functions.logger.error("Room could not be updated");
      return new functions.https.HttpsError(
        "unknown",
        "One or more of the given ids are invalid",
        "One or more of the following ids are invalid:" +
        "roomid: " + roomId +
        "floorid: " + floorId +
        "buildingid: " + buildingId +
        "siteid: " + siteId
      );
    }
  };


  