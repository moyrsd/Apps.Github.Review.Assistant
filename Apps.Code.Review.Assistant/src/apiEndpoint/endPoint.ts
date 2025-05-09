// endpoint.ts
import {
    HttpStatusCode,
    IHttp,
    ILogger,
    IModify,
    IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import {
    ApiEndpoint,
    IApiEndpointInfo,
    IApiRequest,
    IApiResponse,
} from "@rocket.chat/apps-engine/definition/api";
import { NudgeApp } from "../../CodeReviewAssistantApp";
import { OAuth2Service } from "../services/OAuth2Service";
import { IUser } from "@rocket.chat/apps-engine/definition/users";

export class Endpoint extends ApiEndpoint {
    constructor(
        public readonly app: NudgeApp,
        private readonly oauth2Service: OAuth2Service
    ) {
        super(app);
    }
    public path = "githubWebhook";

    public async post(
        request: IApiRequest,
        endpoint: IApiEndpointInfo,
        read: IRead,
        modify: IModify,
        http: IHttp
    ): Promise<IApiResponse> {
        let event: string = request.headers["x-github-event"] as string;
        let payload: any;
        if (
            request.headers["content-type"] ===
            "application/x-www-form-urlencoded"
        ) {
            payload = JSON.parse(request.content.payload);
        } else {
            payload = request.content;
        }

        const room = await read.getRoomReader().getByName("general");
        const user: IUser = await read.getUserReader().getByUsername("chrome");

        if (!room) {
            return {
                status: HttpStatusCode.NOT_FOUND,
                content: `Room "#general" could not be found`,
            };
        }
        if (event === "issues" && payload.action === "opened") {
            const issueNumber = payload.issue.number;
            const repository = payload.repository;
            const owner = repository.owner.login;
            const repoName = repository.name;

            const messageBuilder1 = modify
                .getCreator()
                .startMessage()
                .setText(
                    `New issue created: #${issueNumber} #${owner} # ${repoName}`
                )
                .setRoom(room);
            await modify.getCreator().finish(messageBuilder1);

            try {
                const accessToken =
                    await this.oauth2Service.getAccessTokenForUser(user, read);
                const githbToken = await accessToken.token;
                if (!githbToken) {
                    const messageBuilder = modify
                        .getCreator()
                        .startMessage()
                        .setText("GitHub access token not available")
                        .setRoom(room);
                    await modify.getCreator().finish(messageBuilder);
                }

                const url = `https://api.github.com/repos/${owner}/${repoName}/issues/${issueNumber}/comments`;
                const commentResponse = await http.post(url, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${githbToken}`,
                    },
                    data: {
                        body: "Thank you for creating this issue! We will review it soon.",
                    },
                });

                if (commentResponse.statusCode !== HttpStatusCode.CREATED) {
                    const messageBuilder5 = modify
                        .getCreator()
                        .startMessage()
                        .setText(
                            `Failed Http response${JSON.stringify(
                                commentResponse.data
                            )}`
                        )
                        .setRoom(room);
                    await modify.getCreator().finish(messageBuilder5);
                }
            } catch (error) {
                const messageBuilder5 = modify
                    .getCreator()
                    .startMessage()
                    .setText(`Failed Http response${error.message}`)
                    .setRoom(room);
                await modify.getCreator().finish(messageBuilder5);
                this.app
                    .getLogger()
                    .error(`Error adding comment: ${error.message}`);
                return {
                    status: HttpStatusCode.INTERNAL_SERVER_ERROR,
                    content: `Error adding comment to the issue: ${error.message}`,
                };
            }
        }

        const messageBuilder = modify
            .getCreator()
            .startMessage()
            .setText(event)
            .setRoom(room);
        const messageId = await modify.getCreator().finish(messageBuilder);

        return this.success(JSON.stringify({ messageId }));
    }
}
