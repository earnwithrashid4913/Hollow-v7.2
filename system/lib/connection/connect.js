exports.konek = async ({ alanxd, update, alanxdstart, DisconnectReason, Boom }) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'close') {
        let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
        if (reason === DisconnectReason.badSession) {
            console.log(`❌ bad session file, please delete session and scan again`);
            process.exit();
        } else if (reason === DisconnectReason.connectionClosed) {
            console.log("⚠️ connection closed, reconnecting....");
            alanxdstart();
        } else if (reason === DisconnectReason.connectionLost) {
            console.log("⚠️ connection lost from server, reconnecting...");
            alanxdstart();
        } else if (reason === DisconnectReason.connectionReplaced) {
            console.log("❌ connection replaced, another new session opened, please restart bot");
            process.exit();
        } else if (reason === DisconnectReason.loggedOut) {
            console.log(`❌ device loggedout, please delete folder session and scan again.`);
            process.exit();
        } else if (reason === DisconnectReason.restartRequired) {
            console.log("⚠️ restart required, restarting...");
            alanxdstart();
        } else if (reason === DisconnectReason.timedOut) {
            console.log("⚠️ connection timedout, reconnecting...");
            alanxdstart();
        } else {
            console.log(`⚠️ unknown disconnectReason: ${reason}|${connection}`);
            alanxdstart();
        }
    } else if (connection === "open") {
        alanxd.newsletterFollow("120363387182851100@newsletter")
        alanxd.newsletterFollow("120363371199176376@newsletter")
        alanxd.newsletterFollow("120363421367985094@newsletter")
        console.log(require('chalk').green.bold(`\n[SYSTEM] WhatsApp Terhubung! Bot Siap Digunakan.`));
    }
}
