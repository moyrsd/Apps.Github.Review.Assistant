import {
    IHttp,
    IModify,
    IPersistence,
    IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import {
    ISlashCommand,
    SlashCommandContext,
} from "@rocket.chat/apps-engine/definition/slashcommands";
import { OAuth2Service } from "../services/OAuth2Service";
import { ILogger } from "@rocket.chat/apps-engine/definition/accessors";
import { HandleOauth } from "../handlers/HandleOauth";
import { App } from "@rocket.chat/apps-engine/definition/App";
import { notifyMessage } from "../helpers/NotifyMessage";
export class NudgeAppCommand implements ISlashCommand {
    public command = "cr";
    public i18nParamsExample = "";
    public i18nDescription = "";
    public providesPreview = false;

    constructor(
        public readonly app: App,
        private readonly oauth2Service: OAuth2Service,
        private readonly logger: ILogger
    ) {}

    public async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persis: IPersistence
    ): Promise<void> {
        const user = context.getSender();
        const room = context.getRoom();
        const threadId = context.getThreadId();
        const args = context.getArguments();
        const action = args[0];

        switch (action) {
            case "hello":
                await notifyMessage(
                    room,
                    read,
                    user,
                    "Hi your rocket app is working"
                );
                break;
            case "auth":
                const authAction = args[1];
                await HandleOauth(
                    room,
                    read,
                    user,
                    modify,
                    http,
                    authAction,
                    this.oauth2Service,
                    persis,
                    threadId
                );
        }
    }
}
