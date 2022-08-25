const extension = require("extensionizer");
const resolver = require("./resolver.js");

module.exports = function (provider) {
  console.log("🚀 ~ file: ipfsContent.js ~ line 5 ~ provider", provider);
  function ipfsContent(details) {
    console.log(
      "🚀 ~ file: ipfsContent.js ~ line 7 ~ ipfsContent ~ details",
      details
    );
    const name = details.url.substring(8, details.url.length - 1);
    let clearTime = null;
    if (/^.+\.go$/.test(name) === false) return;

    extension.tabs.query({ active: true }, (tab) => {
      extension.tabs.update(tab.id, { url: "loading.html" });

      clearTime = setTimeout(() => {
        console.log("🚀 ~ file: ipfsContent.js ~ line 21 ~ clearTime");
        return extension.tabs.update(tab.id, { url: "404.html" });
      }, 60000);

      resolver
        .resolve(name, provider)
        .then((ipfsHash) => {
          clearTimeout(clearTime);
          let url = "https://gateway.ipfs.io/ipfs/" + ipfsHash;
          return fetch(url, { method: "HEAD" })
            .then((response) => response.status)
            .then((statusCode) => {
              if (statusCode !== 200) {
                return extension.tabs.update(tab.id, { url: "404.html" });
              }
              extension.tabs.update(tab.id, { url: url });
            })
            .catch((err) => {
              url = "https://gateway.ipfs.io/ipfs/" + ipfsHash;
              extension.tabs.update(tab.id, { url: url });
              return err;
            });
        })
        .catch((err) => {
          clearTimeout(clearTime);
          const url = err === "unsupport" ? "unsupport" : "404";
          extension.tabs.update(tab.id, { url: `${url}.html?name=${name}` });
        });
    });
    return { cancel: true };
  }

  extension.webRequest.onErrorOccurred.addListener(ipfsContent, {
    urls: ["*://*.go/"],
    types: ["main_frame"],
  });

  return {
    remove() {
      extension.webRequest.onErrorOccurred.removeListener(ipfsContent);
    },
  };
};
