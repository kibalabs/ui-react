import React from 'react';

import { Alignment, Direction, Markdown, PaddingSize, Spacing, Stack, Text, TextAlignment } from '@kibalabs/ui-react';

const CONTENT = `
### Communities that GM together, stay together

At [Token Page](https://www.tokenpage.xyz), we absolutely love when people say GM - it really makes our day.

We realized over the last year that the communities that GM together stay together, and we found ourselves having more fun in these communities too. So we built GM!

It's super simple, just visit the page, connect your wallet and GM - that's it! 😄

*But, why?*

Well, if you GM you're signalling to the world that you're still here and are in web3 for the vibes. Plus, you stand to win prizes!

*I'm worried about my security 🔓*

Firstly, we get it. Web3 is a bit of a cess-pool and it's hard to know who to trust. The good part is, actually, you shouldn't trust anyone, not even us. Whenever you try to connect to a website you should always be super careful because there are hundreds of ways you could be scammed.

For GM specifically, here's what you should be wary of - we will never ask you to sign a **transaction**, ever! We will only ask you to connect to your wallet and then sign a **message** to confirm you control the waller. If you don't know the difference between signing a transaction and signing a message just reach out to us, we're always super happy to show people exactly what it means.

If you don't even want to connect your wallet because it has all your best NFTs and you're super skeptical, we invite you to use **delegation**. It's a super easy way for you to allow one wallet to take non-transactional actions on behalf of another. So you could (e.g.) allow your hot wallet to say GM on your cold-wallets behalf. To use this just head over to [Delegate.Cash](https://delegate.cash) and use the app there. Once you've delegated a wallet, it will automatically work in GM 🚀

`;
// ### The prizes 🎁

// Every day 1 GM-er from the collection with the most GMs will win an NFT!

// Keep your daily streak of GMs going for long enough and you will be in for a chance to win [REDACTED] too. 😉

// More new prizes will be shared over the coming months! 👀

// You can see all the past daily winners [here](https://bit.ly/3dEGSaI).

// NOTE: Prizes have been put on hold! If you are interested on working on this project to help us bring the prizes back then tweet us [@tokenpagexyz](https://twitter.com/tokenpagexyz) 💬

// ### How do I win? 🤔

// This is the easy part! Whenever you GM, once per day, you add a point to the daily score of each community you hold an NFT for.

// Get your community to the top by getting others holding that NFT to GM too!

// The collection at the top of the list at the end of the day (in the UTC timezone) will have one random collector win the prize of the day. 🙌

// So the trick is: just get everyone from your community to come to the page and GM every day! If you are in many communities your best bet is to share it with all of them so that you raise your personal chances of being in the community that wins!

// If you have questions, just send us a tweet to [@tokenpagexyz](https://twitter.com/tokenpagexyz) 💬

// **Good luck and GM frens!** 👋

export const AboutPage = (): React.ReactElement => {
  return (
    <Stack direction={Direction.Vertical} isFullWidth={true} childAlignment={Alignment.Fill}>
      <Text variant='header2' alignment={TextAlignment.Center}>GM frens 👋</Text>
      <Spacing variant={PaddingSize.Wide} />
      <Markdown source={CONTENT} />
    </Stack>
  );
};
