// TAKEN FROM CLIENTSIDE CHAT MODULE - NOT MY CODE
const MCGuiNewChat = Client.getChatGUI();

const findBigger = (chat,maxLines) => {
  if(maxLines === null) return chat?.length;
  if(chat?.length < maxLines) return chat?.length;
  if(maxLines < chat?.length) return maxLines;
}

const getUnformattedChat = (maxLines = null) => {
    let chat = MCGuiNewChat?.field_146252_h;
    let chatLines = [];
    let lines = findBigger(chat,maxLines);
    for (i = 0; i < lines; i++) {
        let line = ChatLib.removeFormatting(chat[i]?.func_151461_a()?.func_150260_c());
        chatLines.push(line);
    }
    return chatLines;
}

// TAKEN FROM SLEEP MODULE - NOT MY CODE
const sleep = (timeout, callback) => {
  let willFire = 0;
  let st = register('step', () => {
    if (willFire !== 1) {
      willFire++;
    } else {
      callback();
      willFire = 2;
      st.unregister();
    }
  })
  if (timeout < 1000) {
    st.setFps(1000.0 / parseFloat(timeout))
  } else {
    st.setDelay(parseFloat(timeout) / 1000.0)
  }
}

// MADE BY ME (Faav#6320)
register("command", (cmdType) => {
    if (typeof cmdType == 'undefined') cmdType = 'tell';
    sleep(50, () => {
      Client.setCurrentChatMessage(`/minecraft:${cmdType} `);
      ChatLib.chat("&ePlease press TAB!");
      Client.showTitle("&e&lPlease press TAB!", "", 1, 25, 1);
      sleep(2000, () => {
        var recentChat = getUnformattedChat(5); // last 5 messages
        console.log(recentChat);
        var hasVanished = recentChat.filter((message) => {
          if (message.includes(Player.getName()) && message.includes(', ')) return message;
        });
        var playersWhoLeft = recentChat.filter((message) => message.endsWith(' left the game.')).map((message) => message.split(' ')[0]);
        if (hasVanished.length !== 0) {
          var hasVanishedList = hasVanished[0].split(', ');
          var noVanishedList = TabList.getUnformattedNames();
          var vanishedList = hasVanishedList.filter((name) => {
            if (noVanishedList.includes(name) == false && playersWhoLeft.includes(name) == false) return name
          });
          ChatLib.chat("&9Vanished Players (By Faav):\n&l" + vanishedList.join(', '));
          ChatLib.chat("&ePlease press ESC!");
          Client.showTitle("&e&lPlease press ESC!", "", 1, 30, 1);
        } else {
          ChatLib.chat("&eYou didn't press TAB in time!");
          Client.showTitle("&e&lYou didn't press TAB in time!", "", 1, 25, 1);
        }
      });
    });
  })
  .setTabCompletions(["tell", "me", "w", "msg"])
  .setName("vanishchecker")
  .setAliases(["vanishcheck", "vcheck"]);
