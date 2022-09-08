# GaiaCraft DiscordV13 Bot Application

- This bot application can be used any Minecraft Servers.
- Includes EmbedMessages for Addresses, Rules, Information, Penalties(Punishments), Policy. And Reaction-Role handler,
  Ticket System
- All systems logging to logChannel channel

## Installing

- You have to have at least NodeJS V16.9.0(for DiscordJS13) or later and npm(i recommend, or you can use yarn etc.)
- Modules to be downloaded in package.json, just run

```sh
npm install
```

# Features

## Temporary Voice Channels

- There is a temporary voice channel system for users to create their own voice channels.
- When the user joins a channel which matching the id's on the config.json, the handle will create a temporary voice
  channel with user limit if user joins a user limit channel.
- When the channel owner leaves voice channel then handle will delete that voice channel.
- There is no permission handling on this, permissions of the channel will be the parent category permissions.
- You can find the handle file in ./events/voiceStateUpdate.js
- The handle record all(Temporary Voice Channels or another) the voice channel join/lefts to channel with matching id's
  logChannel in config.json

## Embed Messages

- Includes EmbedMessage command for Addresses, Rules, Information, Penalties(Punishments) and Policy.
- You can check it in ./commands/Utils directory

## Reaction Role

- Checks all reactions and if reaction in recordChannel, then giving role with id recordRole and logs to logChannel
  channel.
- You can check it in ./events/messageReactionAdd.js
- There is a command sends an EmbedMessage than reaction it for Admins to send a EmbedMessage to recordChannel in
  ./commands/Utils/rolemessage.js

## Ticket System

- There is a ticket system for helping and supporting players for any problem.
- If bot cannot find ticketsCategoryName or ticketAttendant or ticketsClosedCategoryName or ticketBanRole, bot will
  create and change config.json's values to created properties.
- All commands in ./commands/Destek directory.
- ticketBanRole role cannot create a ticket.
- create.js for creating a ticket channel with permission handling, and set channel's category to ticketsCategoryName
- delete.js for ticketAttendant role and Administrators for closing ticket, change permissions for users and set the
  channel's category to ticketsClosedCategoryName. Not actually delete the ticket, it keeps for any problem.
- close.js for closing the ticket for players with permission handling. Not actually delete again, it keeps for any
  problem
- adduser.js for ticket owner can add another user to ticket with permission handling.
- removeuser.js for ticket owner can remove an added user from ticket with permission handling.
- A button-click-ticket system added to the bot, both of them is working.
- If ticketAttendant or Administrator try to click button-close-ticket bot is going to send an information to channel of
  ticket to remind him to close ticket. And if ticketAttendant or Administrator confirm it, ticket is going to close.
- Creating a message and sending to ticketChannel command in ./commands/Utils/ticketMessage.js
- Handler of button-clicking and more in ./events/interactionCreate.js
