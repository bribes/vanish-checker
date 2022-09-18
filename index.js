import { getUnformattedChat } from "../ClientsideChat";
import sleep from '../sleep';

register("command", (cmdType) => {
    if (typeof cmdType == 'undefined') cmdType = 'tell';
    sleep(50, () => {
        Client.setCurrentChatMessage(`/minecraft:${cmdType} `);
        ChatLib.chat("&ePlease press TAB!");
        Client.showTitle("&e&lPlease press TAB!", "", 1, 25, 1);
        sleep(2050, () => {
            var recentChat = getUnformattedChat(10); // last 10 messages
            print('hi')
            var hasVanished = recentChat.filter((message) => {
                if (message.includes(Player.getName()) && message.includes(', ')) return message;
            });
            if (hasVanished.length !== 0) {
                var hasVanishedList = hasVanished[hasVanished.length-1].split(', ');
                var noVanishedList = TabList.getUnformattedNames();
                var vanishedList = hasVanishedList.filter((name) => noVanishedList.includes(name) == false);
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
.setAliases(["vanishcheck", "vcheck"])
