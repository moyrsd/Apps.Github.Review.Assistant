import "dotenv/config";
import { reviewPrPrompt } from "../constants/prompt.js";
const apiEndpoint = process.env.LLM_API_ENDPOINT;
const apiKey = process.env.LLM_API_KEY;
const model = process.env.MODEL;
export class HandleNewPr {
  /**
   * @param code - The code snippet to be reviewed or processed by the LLM.
   * @returns A Promise of the response which will be commented in the PR..
   */
  public async llmRequest(code: string): Promise<any> {
    if (apiEndpoint == undefined) {
      throw new Error(`Please give a ApiEndPoint in .env`);
    }
    const prompt = reviewPrPrompt(code);
    const body = this.createBody(prompt);
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`LLM request failed: ${response.status} ${errorText}`);
    }

    const responseData = await response.json();
    return responseData.choices[0].message.content;
  }

  private createBody(prompt: string) {
    if (model == undefined) {
      throw new Error(`Please give a model name in .env`);
    }

    return {
      model: model,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    };
  }
}
