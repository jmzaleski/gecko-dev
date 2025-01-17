/* Any copyright is dedicated to the Public Domain.
   http://creativecommons.org/publicdomain/zero/1.0/ */

const TEST_PATH = getRootDirectory(gTestPath)
  .replace("chrome://mochitests/content", "http://mochi.test:8888");
const TEST_URL = `${TEST_PATH}test_wyciwyg_copying.html`;

function testURLBarCopy(targetValue) {
  return new Promise((resolve, reject) => {
    info("Expecting copy of: " + targetValue);
    waitForClipboard(targetValue, function() {
      gURLBar.focus();
      gURLBar.select();

      goDoCommand("cmd_copy");
    }, resolve, () => {
      ok(false, "Clipboard copy failed");
      reject();
    });
  });
}

add_task(async function() {
  let tab = await BrowserTestUtils.openNewForegroundTab(gBrowser, TEST_URL);

  await BrowserTestUtils.synthesizeMouseAtCenter("#btn", {}, tab.linkedBrowser);
  let currentURL = gBrowser.currentURI.spec;
  ok(/^wyciwyg:\/\//i.test(currentURL), currentURL + " is a wyciwyg URI");

  await testURLBarCopy(TEST_URL);

  while (gBrowser.tabs.length > 1)
    gBrowser.removeCurrentTab();
});
