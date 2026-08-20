
/*─────────────────────────────────────────
  Owner            : OnlyF!XA??
  Region           : Pakistan
  Province         : Khyber_Pakhtoon_Khwa
  WhatsApp Channel : https://whatsapp.com/channel/0029Vb8MSy7KLaHp4Xkmmw1T
  Telegram         : https://t.me/fixaupdates
──────────────────────────────────────────*/

const chalk = require('chalk')

const color = (text, color) => {
    return !color ? chalk.green(text) : chalk.keyword(color)(text)
}

const bgcolor = (text, bgcolor) => {
  return !bgcolor ? chalk.green(text) : chalk.bgKeyword(bgcolor)(text)
}

const Lognyong = (text, color) => {
  return !color ? chalk.yellow('[ ! ] ') + chalk.green(text) : chalk.yellow('=> ') + chalk.keyword(color)(text)
}

module.exports = {
  color,
  bgcolor,
  Lognyong
}
