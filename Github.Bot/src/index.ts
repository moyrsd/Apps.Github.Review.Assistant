import { Probot } from "probot";
import { REVIEW_PR_PROMPT } from "./constants/prompt.js";
import { HandleNewPr } from "./handlers/HandleNewPr.js";
export default (app: Probot) => {
  app.on("pull_request.opened", async (context) => {
    const handler = new HandleNewPr();
    const messageForNewPRs = await handler.llmRequest(REVIEW_PR_PROMPT);
    REVIEW_PR_PROMPT;
    try {
      const { owner, repo } = context.repo();
      const pull_number = context.payload.pull_request.number;

      await context.octokit.rest.pulls.createReview({
        owner,
        repo,
        pull_number,
        body: messageForNewPRs,
        event: "COMMENT",
        comments: [],
      });
    } catch (error) {
      context.log.error("PR comment failed:", error);
      throw error;
    }
  });
};
