
import admin from "firebase-admin"
import { config } from "@shared/config"
import {  injectable } from "tsyringe";
import {IFirebaseService } from "@entities/serviceInterfaces/firebase.service.interface";


admin.initializeApp({
    credential:admin.credential.cert(config.serviceAccount as admin.ServiceAccount)
});



@injectable()
export class FirebaseService implements IFirebaseService{
 async send(token: string, payload: { title: string; body: string; }): Promise<void> {
     await admin.messaging().send({
        token,
        notification:payload
     })
 }
}