# GaiaCraft DiscordV13 Bot Application

- This bot application can be used any Minecraft Servers.
- Includes EmbedMessages for Addresses, Rules, Information, Penalties(Punishments), Policy. And Reaction-Role handler, Ticket System
- All systems logging to logChannel channel

## Embed Messages

- Includes EmbedMessage command for Addresses, Rules, Information, Penalties(Punishments) and Policy.
- You can check it in ./commands/Utils directory

## Reaction Role

- Checks all reactions and if reaction in recordChannel, than giving role with id recordRole and logs to logChannel channel.
- You can check it in ./events/messageReactionAdd.js
- There is a command sends an EmbedMessage than reaction it for Admins to send a EmbedMessage to recordChannel in ./commands/Utils/rolemessage.js

## Ticket System

- There is a ticket system for helping and supporting players for any problem.
- All commands in ./commands/Destek directory
- create.js for creating a ticket channel with permission handling
- delete.js for ticketAttendant role and Administrators for closing ticket, change permissions for users and set the channel's category to closed(Kapalı Talepler). Not actually delete the ticket, it keeps for any problem.
- close.js for closing the ticket for players with permission handling. Not actually delete again, it keeps for any problem
- adduser.js for ticket owner can add another user to ticket with permission handling.
- removeuser.js for ticket owner can remove a added user from ticket with permission handling.
- Also a button-click-ticket system added to the bot, both of them is working.
- Creating an message and sending to ticketChannel command in ./commands/Utils/ticketMessage.js
- Handler of button-clicking and more in ./events/interactionCreate.js
