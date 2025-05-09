import {
    IAppAccessors,
    ILogger,
    IConfigurationExtend,
} from "@rocket.chat/apps-engine/definition/accessors";
import { App } from "@rocket.chat/apps-engine/definition/App";
import { IAppInfo } from "@rocket.chat/apps-engine/definition/metadata";
import { settings } from "./src/settings/settings";
import { OAuth2Service } from "./src/services/OAuth2Service";
import { GithubOauthconfig } from "./src/config/GithubOauthconfig";
import { NudgeAppCommand } from "./src/commands/CodeReviewAssistantCommand";
import {
    ApiSecurity,
    ApiVisibility,
} from "@rocket.chat/apps-engine/definition/api";
import { Endpoint } from "./src/apiEndpoint/endPoint";

export class NudgeApp extends App {
    private oauth2Service: OAuth2Service;
    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);
    }
    protected async extendConfiguration(
        configuration: IConfigurationExtend
    ): Promise<void> {
        this.oauth2Service = new OAuth2Service(this, GithubOauthconfig);
        await this.oauth2Service.setup(configuration);
        await Promise.all([
            ...settings.map((setting) =>
                configuration.settings.provideSetting(setting)
            ),
            configuration.slashCommands.provideSlashCommand(
                new NudgeAppCommand(this, this.oauth2Service, this.getLogger())
            ),
        ]);
        await configuration.api.provideApi({
            visibility: ApiVisibility.PUBLIC,
            security: ApiSecurity.UNSECURE,
            endpoints: [new Endpoint(this, this.oauth2Service)],
        });
    }
}
