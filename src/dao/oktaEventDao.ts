import { documentClient } from '../utils/DynamoDB'
import { OktaEvent } from "../model/oktaEvent"

const oktaEventsTable = process.env.EVENTS_TABLE

export async function createOktaEventDao(oktaEvent: OktaEvent): Promise<OktaEvent> {
  console.info(`DataLayer: Creating OktaEvent`) 
  await documentClient
    .put({
      TableName: oktaEventsTable,
      Item: oktaEvent
    })
    .promise() 
  console.info(`DataLayer: OktaEvent created successfully`)   
  return oktaEvent 
}