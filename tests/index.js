module.exports = {
  'Sample Test for demo' : function (client) {
    client
      .url(client.launchUrl)
      .waitForElementVisible('body', 1000)
      .pause(3000)
      // Add Ipad on basket
      .click('button.iPad')
      .pause(1000)
      // Go To About
      .click('a.about')
      .pause(3000)
      // Return to home
      .click('a.home')
      .pause(3000)
      .end();
  }
};
