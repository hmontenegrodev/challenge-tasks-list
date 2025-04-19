import admin from 'firebase-admin';
import * as functions from 'firebase-functions';

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: functions.config().env.firebase_project_id,
            clientEmail: functions.config().env.firebase_client_email,
            privateKey: functions.config().env.firebase_private_key.replace(/\\n/g, '\n'),
        }),
    });
}
export const db = admin.firestore();