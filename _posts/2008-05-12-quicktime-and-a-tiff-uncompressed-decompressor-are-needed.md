--- 
layout: post
title: "QuickTime and a TIFF (Uncompressed) decompressor are needed to see this picture"
author: "George Mauer"
comments: true
---

Microsoft Office on a Mac can’t save imagesQuickTime and a TIFF (Uncompressed) decompressor are needed to see this picture

I have run into this problem a few times and I figured I’d blog about it both to vent my frustration and to make a note for the next time this comes back to haunt me.

So you get a shiny new Macintosh, you fire it up to discover that the friendly folks over at apple have pre-loaded it with the Mac version of Microsoft Office. Including Excel, PowerPoint, and your favorite word processor Microsoft Word! (Oh just admit it, you’ve never tried a different one.) So you fire it up and start pumping out document after document. It’s wonderful; you get the familiarity of MS Office with the slickness of a Mac. You format up your word file, place a nice logo or banner image as a header and you send it to your friends, or Wendy down in marketing, or even worse your boss. They are of course not enlightened like you; they’re still using that old bludgeon, a Windows PC. Oh well, at least you’ll get to brag to them later about your increased productivity and transcendent, almost religious, user experience. And then you get the call: “These pictures aren’t working!” they cry. You send them the file again – perhaps it got corrupted in email transit – but no, the problems persist. After half a day of this you are forced to trek over to the foolish nonce’s computer to witness for yourself how they are possibly managing to screw this simple process up. You make sure the files are identical – same checksum, no corruption and you open it up to see…to see:

        “QuickTime and a TIFF (Uncompressed) decompressor are needed to see this picture.”

Huh? Excuse me? Where are your images? Does QuickTime suddenly have something to do with Word? Does the Word spelling dictionary even recognize ‘decompressor’ as a valid term? The answers are, in order: They’re there but invisible, it does on a Mac, and an emphatic no.

I don’t know if it was laziness, an evil marketing ploy, or what but it seems like the team responsible for the Mac version of MS Office used QuickTime image compression for storing some formats of embedded image files. The upshot of this is that those images are not visible on a PC, will never be visible on a PC, and you’re going to be left feeling frustrated, embarrassed, and probably a little violated. God forbid this was a powerpoint file.

[The solutions to this quandary aren’t good](http://www.le.ac.uk/av/pms12/ppt/qt_decompressor.html). You basically have to either reinsert the images into the file on a PC or convert the images on the Mac to uncompressed bitmaps, re-insert them, and re-save the file with no compression. Needless to say this is awful programming. Really like mid-90s Windows 95 level bad. I actually would not be surprised if this WAS a dickish screw you to Mac users from somewhere deep in the Microsoft psyche (read marketing). Either that or they just didn’t feel like porting that part of the software properly. This has also been a problem for a long time with no effort by the powers that be for a resolution. Just when I was starting to think that Micro$oft ain’t all that bad. Sigh.

So in conclusion what’s the final word? Well there is one solution, and – you might have guessed it by now – [it’s called Open Office](http://download.openoffice.org/). Presto! Now don’t you definitely feel better than that silly co-worker/boss of yours?