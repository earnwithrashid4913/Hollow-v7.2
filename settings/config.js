const fs = require('fs')

const config = {
    owner: "923448170040",
    ownerName: "OnlyF!XA??",
    region: "Pakistan",
    province: "Khyber_Pakhtoon_Khwa",
    botNumber: "-",
    thumbUrl: "https://files.catbox.moe/4bue2p.jpg",
    session: "sessions",
    status: {
        public: true,
        terminal: true,
        reactsw: false
    },
    message: {
        owner: "no, this is for owners only",
        group: "this is for groups only",
        admin: "this command is for admin only",
        private: "this is specifically for private chat"
    },
    settings: {
        title: "HolowExec",
        packname: 'HolowExec',
        description: "this script was created by OnlyF!XA??",
        author: 'OnlyF!XA??',
        footer: "Holow — Execution"
    },
    newsletter: {
        name: "OnlyF!XA??",
        id: "120363387182851100@newsletter"
    },
    socialMedia: {
        WhatsApp: "https://whatsapp.com/channel/0029Vb8MSy7KLaHp4Xkmmw1T",
        Telegram: "https://t.me/fixaupdates"
    }
}

module.exports = config;

let file = require.resolve(__filename)
require('fs').watchFile(file, () => {
  require('fs').unwatchFile(file)
  console.log('\x1b[0;32m'+__filename+' \x1b[1;32mupdated!\x1b[0m')
  delete require.cache[file]
  require(file)
})
