import "dotenv/config";
const apiEndpoint = process.env.LLM_API_ENDPOINT;
const apiKey = process.env.LLM_API_KEY;
const model = process.env.MODEL;
export class HandleNewPr {
  public async llmRequest(prompt: string): Promise<any> {
    if(apiEndpoint==undefined){
        throw new Error(`Please give a ApiEndPoint in .env`);
    }
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
