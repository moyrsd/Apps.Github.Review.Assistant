<div align="center">
<img width=40% src="https://github.com/user-attachments/assets/a92f27b9-5101-4725-8311-a0e6ada0edc7" alt="rocket-chat">
</div>

<div align="center">

# Rocket Chat Code Review Assistant for opensource projects
</div>
<br />
<div align="center">
  <img width=20% src="https://github.com/moyrsd/Rocket.Chat.Code.Review.Assistant/blob/97b8c8f06d80e237d75fae019fd2e093e0c9b8a1/Assets/icon2.png" alt="mailbridge icon">

  <p align="center">
    <a href="https://www.youtube.com/watch?v=_rReZ2oqPFY&list=PL8wn-1UB8mCDmCJw8F5BhpINHlAiO15e1">View Demo</a>
    ·
    <a href="https://github.com/moyrsd/Rocket.Chat.Code.Review.Assistant/issues">Report Bug</a>
    ·
    <a href="https://github.com/moyrsd/Rocket.Chat.Code.Review.Assistant/issuess">Request Feature</a>
  </p>
</div>

<!-- ABOUT THE PROJECT -->

##  About The Project:
The idea behind this app is to address one of the biggest bottlenecks in development teams: code reviews. Finding the right person to review a pull request quickly can be challenging, often leading to delays that slow down releases and impact collaboration. In open-source projects, the issue is even more critical—slow responses to contributor PRs can lead to disengagement and potentially losing valuable contributors. This app aims to improve the review assignment process, ensuring that PRs get the attention they need as soon as possible.
                            The app will monitor new PRs through GitHub events or integration messages in Rocket.Chat and use a statistical scoring system to suggest the most suitable reviewer based on past review patterns. Once assigned, the app will send friendly but persistent reminders to ensure the review happens in a timely manner. Additionally, it will leverage AI-powered code review using specialized LLMs to catch minor issues before human reviewers step in, reducing unnecessary workload and allowing developers to focus on more meaningful code improvements. By optimizing the review process, the app will help eliminate unnecessary delays, keep contributors engaged, and ensure PRs move through the pipeline more efficiently.



## 📜 Getting Started

### Prerequisites

-   You need a Rocket.Chat Server Setup
-   Rocket.Chat.Apps CLI,

*   In case you don't have run:
    ```sh
    npm install -g @rocket.chat/apps-cli
    ```

### ⚙️ Installation

-   Every RocketChat Apps runs on RocketChat Server, thus everytime you wanna test you need to deploy the app with this note. lets start setting up:

1. Clone the repo
    ```sh
    git clone https://github.com/moyrsd/Rocket.Chat.Code.Review.Assistant.git
    ```
2. Install NPM packages
    ```sh
    npm ci
    ```
3. Deploy app using:

    ```sh
    rc-apps deploy --url <url> --username <username> --password <password>
    ```
4. In the rocket chat app go to settings and put your github Oauth credentials. To genarate github credentials 
   - Click on your icon on top right and select Settings
   - Go to Developer Settings, which is the downmost option in the contextual bar of the Settings
   - Click on Oauth Apps and genarate a new Oauth App
   - It will give you a client id and client secret put that in your settings of rc app
5. To subscribe to webhook events you have to foward your local webhook api endpoint using something like ngrok or smee.io and put that link in the weebhook url.I am using smee in this case 
- go to smee.io
- get the smee url and type the following command in the cmd which will look something like this
```bash
smee -u https://smee.io/Sample token --target http://localhost:3000/api/apps/public/826f0d95-9e25-48a6-a781-a32f147230a5/githubwebhook
```
- You will get the apiendpoint url from app info, scroll down, at the most bottom you will find this.
- Now put your smee url in place of webhook url in either a repo or github app
6. If you are using a github repo :
  - Make sure you have admin access to the repo
  - Go to the settings of that repo
  - Click on webhook from the left contextual bar and then click **Add Webhook**
  - paste the smee url in the payload url
7. If you are using github App :
  - Click on your icon on top right and select Settings
  - Go to Developer Settings, which is the downmost option in the contextual bar of the Settings
  - Click on Github Apps and create a new app 
  - Find webhook url in that and paste your smee url there, give pull request permission in the app
  - Now add some repo in the app and you are good to go


## 📚 Resources

Below is a curated list of helpful resources for working with GitHub Apps, Webhooks, APIs, and related integrations:

1. [GitHub Apps Documentation](https://docs.github.com/en/apps) - Official documentation on GitHub Apps.
2. [Probot Framework](https://github.com/probot/) - A framework for building GitHub Apps in Node.js.
3. [GitHub Webhooks Documentation](https://docs.github.com/en/webhooks) - Comprehensive guide to GitHub webhooks.
4. [Types of GitHub Webhooks](https://docs.github.com/en/webhooks/types-of-webhooks) - Overview of available webhook types.
5. [Octokit REST.js](https://octokit.github.io/rest.js/v21/) - Official GitHub REST API client for JavaScript.
6. [Google Summer of Code Resources](https://github.com/samad-yar-khan/Google-Summer-of-Code) - A repository containing useful GSoC material.
7. [Rocket.Chat Developer Docs](https://developer.rocket.chat/docs/register-api-endpoints) - Guide for registering API endpoints in Rocket.Chat.
8. [Creating GitHub Apps](https://git.io/creating-github-apps) - Step-by-step guide to building GitHub Apps.
9. [GitHub Apps Hello World](https://github.com/swinton/github-apps-hello-world) - A sample GitHub App to get started.
10. [Apps.MailBridge](https://github.com/moyrsd/Apps.MailBridge) - A project example for GitHub Apps.
11. [GitHub Apps vs OAuth Apps](https://docs.github.com/en/apps/oauth-apps) - Key differences between GitHub Apps and OAuth Apps.
12. [GitHub OAuth Apps Documentation](https://docs.github.com/en/apps/oauth-apps) - Documentation for creating and managing OAuth Apps.
13. [ACM Research Paper](https://dl.acm.org/doi/abs/10.1145/3540250.3549104) - Research on topics related to software integration.
14. [ArXiv Preprint](https://arxiv.org/pdf/2308.11148) - A paper relevant to the field of APIs and integrations.
15. [Postman GitHub API](https://www.postman.com/) - A tool for testing GitHub API endpoints.

Feel free to explore these resources to kickstart or deepen your understanding of GitHub integrations!



