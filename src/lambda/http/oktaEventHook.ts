import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult} from "aws-lambda"
import { createOktaEventService } from "../../service/oktaEventService";

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    if (event.requestContext.httpMethod === 'POST') {
        console.log('data event with body: ', event.body);
        const oktaEvents = JSON.parse(event.body).data.events;

        const targetUserId = oktaEvents[0].target[0].id;
        console.log('getting user ', targetUserId);

        // Create the Okta Event in DynamoDB for Auditing purposes
        //const result = "";
        const result = await createOktaEventService(event.body);
        
        /*
        const user = await client.getUser(targetUserId);
        console.log('got user ', targetUserId);

        user.profile.costCenter = 'Data from lambda';

        console.log('updating user ', user.profile.login);
        await user.update();
        console.log('user ', user.profile.login, ' updated');
*/
        return {
                statusCode: 200,
                body: JSON.stringify({
                    item: result
                  })
            };

    } else {
        const verificationHeader:string =  event.headers['X-Okta-Verification-Challenge'];
        console.log('verification request, header value is: ' + verificationHeader);

        return {
            statusCode: 200,
            body: JSON.stringify({
                verification : verificationHeader
            })
        };
    }
}