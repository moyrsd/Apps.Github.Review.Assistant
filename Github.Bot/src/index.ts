import { Probot } from "probot";

export default (app: Probot) => {
  app.on("pull_request.opened", async (context) => {
    const messageForNewPRs = "Thanks for opening a new PR! ";
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
