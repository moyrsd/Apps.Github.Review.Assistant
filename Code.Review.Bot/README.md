# Github.Bot

> A GitHub App built with [Probot](https://github.com/probot/probot) that This App was made as a POC for Google Summer of Code for Rocket.Chat in 2025, It does the following things
- Analyze the diffs or PRs made and give feedback about any syntax error, code style, PR minimum criteria and  any secrets.
- It will auto label PRs based on urgency, review status, change type.
- Assign a reviewer based on a scoring system that involves diff info, author score, reviewer score.
      

## Setup

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

## Docker

```sh
# 1. Build container
docker build -t Github.Bot .

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> Github.Bot
```

## Contributing

If you have suggestions for how Github.Bot could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2025 Deepmoy Rudra Sarma
