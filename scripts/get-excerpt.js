//https://github.com/dantheuber/node-smmry

const smmry = require("smmry")({
  SM_API_KEY: "AB9D0C21AC", // Required, your SMMRY API key
  SM_LENGTH: 2, // Optional, the number of sentences returned, default 7. - Maximum 40
});

const text =
  "Japanese pickles, also known as Tsukemono, are an essential part of Japanese cuisine. These pickles are made by preserving vegetables in a mixture of salt, vinegar, and other seasonings. There are a variety of Japanese pickles available, each with its unique taste and texture.One of the most popular types of Japanese pickles is the umeboshi. Made from plums, these pickles are salty and tangy and are often eaten as a condiment with rice. Another popular variety is the takuan, made from daikon radish. These pickles are yellow in color and have a crunchy texture and a slightly sweet taste.Japanese pickles are not only delicious but also have numerous health benefits. They are rich in vitamins, minerals, and probiotics, which can aid digestion and boost the immune system. Japanese pickles also add flavor and texture to dishes and are a great way to incorporate more vegetables into your diet. In Japan, pickling is not only a way of preserving food but also a cultural tradition that has been passed down for generations. From the traditional methods to modern variations, Japanese pickles continue to be an integral part of Japanese cuisine and culture.";

const excerpt = async (text) => {
  try {
    const data = await smmry.summarizeText(text);
    return data;
  } catch (err) {
    console.error(err);
  }
};

excerpt(text)
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });

// async function generateExcerpt(text) {
//   const fetch = await import("node-fetch");
//   const url = "https://api.smmry.com";
//   const apiKey = "AB9D0C21AC"; // Replace with your SMMRY API key
//   const params = new URLSearchParams({
//     SM_API_KEY: apiKey,
//     SM_LENGTH: 5, // Adjust the summary length as desired
//     SM_WITH_BREAK: true, // Include line breaks in the summary
//     SM_URL: "", // This parameter is not needed since we're providing the text directly
//     SM_TEXT: text,
//   });
//   const response = await fetch.default(`${url}?${params}`);
//   const data = await response.json();
//   return data.sm_api_content;
// }

// const excerpt = async () =>
//   await generateExcerpt(
//     "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
//   );

// (async () => {
//   const excerptString = await excerpt();
//   console.log(excerptString);
// })();
