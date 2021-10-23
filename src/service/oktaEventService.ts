import * as uuid from "uuid" 
//import { parseUserId } from "../auth/utils" 
import { OktaEvent } from "../model/oktaEvent"
//oktaEventServiceimport * as AWS from "aws-sdk" 
import { createOktaEventDao } from "../dao/oktaEventDao"

export async function createOktaEventService(oktaEventString:string): Promise<OktaEvent> {
    const eventUuid = uuid.v4() 
  
    console.log("UUID=", eventUuid);

    const oktaEvent:OktaEvent = {
      id: eventUuid,
      okta_event: oktaEventString

    } 
  
    return await createOktaEventDao(oktaEvent) 
  }
