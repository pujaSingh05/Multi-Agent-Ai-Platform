import  {cert, initializeApp} from "firebase-admin"
import serviceAccount from ".serviceAcooountKey.json" with {type:"json"}




export const app  = initializeApp({
  credential: cert(serviceAccount)
  //admin.credential.cert
});
