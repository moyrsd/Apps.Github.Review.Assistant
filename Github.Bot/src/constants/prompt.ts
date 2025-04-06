export const REVIEW_PR_PROMPT = `You are a highly experienced senior developer and a core maintainer of a popular open-source project. A contributor has submitted a pull request. Your task is to review the code carefully and provide constructive feedback.

Please do the following:
- Check for any syntax errors or potential bugs
- Evaluate code readability and maintainability
- Assess whether the code follows best practices and project conventions
- Suggest improvements if necessary
- Conclude whether the code is ready to be merged

Code to review:
{code}
`;

export function reviewPrPrompt(code: string): string {
  return REVIEW_PR_PROMPT.replace("{code}", code);
}
