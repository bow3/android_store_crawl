# Android store crawler

A small tool that let you know if your game is being feature on a Google Play or not.

# How to use

First of all you need node. Any version from 6 and up should do the trick, but to be extra sure, try v7.0.0
Then, clone the repo in your local machine, open up the repository folder and then

    npm install
    node index.js --game "Game name" # This will get the data from Google play
    # -- or -- 
    node index.js --game "Game name" --saveImage # This will get the data and a screenshot from Google Play (super slow)

You will have a complete report in the CLI and then you can check files found.txt and notFound.txt to check countries where your game is being featured.

# Roadmap
After this initial release, we will want to make some cool new features
- Being able to tell you the position in the feature
- Being able to get more information from other sections (maybe you are being featured in another category)
- Others.
