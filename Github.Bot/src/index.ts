import { Probot } from "probot";
import { HandleNewPr } from "./handlers/HandleNewPr.js";
export default (app: Probot) => {
  app.on("pull_request.opened", async (context) => {
    try {
      const { owner, repo } = context.repo();
      const pull_number = context.payload.pull_request.number;
      const filesResponse = await context.octokit.pulls.listFiles({
        owner,
        repo,
        pull_number,
      });
      const files = filesResponse.data;
      // Combine all patches (diffs) into one string of code
      const code = files
        .map((file) => `// File: ${file.filename}\n${file.patch}`)
        .join("\n\n");
      const handler = new HandleNewPr();
      const messageForNewPRs = await handler.llmRequest(code);

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
