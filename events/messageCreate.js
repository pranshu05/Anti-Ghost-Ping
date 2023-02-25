module.exports = {
  name: "messageCreate",
  async execute(message) {
    const msg = message;
    if (!msg) return;
    if (msg.author.bot) return;

    if (message.content === `<@916613852362330133>`) {
      await message
        .reply(`${message.author}, Don't ping :eyes:`)
        .then((ping) => {
          message.reply(`${message.author}`);
        });
    }
  },
};
