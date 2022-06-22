const StyleDictionaryPackage = require('style-dictionary');

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED

function getStyleDictionaryConfig(brand, theme, platform) {
  return {
    "source": [
      `tokens/brands/${brand}/${theme}/*.json`,
      "tokens/globals/**/*.json",
      `tokens/platforms/${platform}/*.json`
    ],
    "platforms": {
      "scss": {
        "transformGroup": "scss",
        "buildPath": `build/scss/${brand}/${theme}/`,
        "files": [{
          "destination": "tokens.scss",
          "format": "scss/variables"
        }]
      },
      "css": {
        "transformGroup": "css",
        "buildPath": `build/css/${brand}/${theme}/`,
        "files": [{
          "destination": "tokens.css",
          "format": "css/variables"
        }]
      },
      "web": {
        "transformGroup": "web",
        "buildPath": `build/web/${brand}/${theme}/`,
        "files": [{
          "destination": "tokens.scss",
          "format": "scss/variables"
        }]
      },
      "android": {
        "transformGroup": "android",
        "buildPath": `build/android/${brand}/${theme}/`,
        "files": [{
          "destination": "tokens.colors.xml",
          "format": "android/colors"
        },{
          "destination": "tokens.dimens.xml",
          "format": "android/dimens"
        },{
          "destination": "tokens.font_dimens.xml",
          "format": "android/fontDimens"
        }]
      },
      "ios": {
        "transformGroup": "ios",
        "buildPath": `build/ios/${brand}/${theme}/`,
        "files": [{
          "destination": "tokens.h",
          "format": "ios/macros"
        }]
      }
    }
  };
}

console.log('Build started...');

// PROCESS THE DESIGN TOKENS FOR THE DIFFEREN BRANDS AND PLATFORMS

['foundation', 'fast', 'people'].map(function (brand) {
  ['light', 'dark'].map(function (theme) {
    ['scss','css','web', 'ios', 'android'].map(function (platform) {

      console.log('\n==============================================');
      console.log(`\nProcessing: [${platform}] [${brand}] [${theme}]`);

      const StyleDictionary = StyleDictionaryPackage.extend(getStyleDictionaryConfig(brand, theme, platform));

      StyleDictionary.buildPlatform(platform);

      console.log('\nEnd processing');

    })
  })
})

console.log('\n==============================================');


const { exec } = require('child_process');

exec(`git add .`);
exec(`git commit -m "melhorias no tokens"`);
exec(`git push`);

exec(`node ./build/index.js`);


console.log('\nBuild completed!');