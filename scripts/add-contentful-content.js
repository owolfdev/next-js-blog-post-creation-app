const contentful = require("contentful-management");
const postsData = require("../data/blog-posts.json");

const client = contentful.createClient({
  accessToken: "CFPAT-NfShdlxxmHvyJU-EX_a84SoTgDBvGgcEQX5Xp_DJVas",
});

const spaceId = "ghe9x8dynqr1";
const contentType = "blogPost";

async function createNewArticle(
  title,
  slug,
  publishedDate,
  body,
  author,
  categories,
  description,
  excerpt
) {
  const space = await client.getSpace(spaceId);
  const environment = await space.getEnvironment("master");
  const entry = await environment.createEntry(contentType, {
    fields: {
      title: {
        "en-US": title,
      },
      slug: {
        "en-US": slug,
      },
      body: {
        "en-US": body,
      },
      author: {
        "en-US": author,
      },
      categories: {
        "en-US": categories,
      },
      description: {
        "en-US": description,
      },
      excerpt: {
        "en-US": excerpt,
      },
      publishedDate: {
        "en-US": publishedDate,
      },
    },
  });

  // Set future publish date and status to "draft"
  entry.sys.scheduledAt = publishedDate;
  //entry.fields.status["en-US"] = "draft";

  // Update entry
  await entry.update();

  console.log(`Entry ${entry} created.`);
  return entry;
}

async function createArticlesFromData(data) {
  console.log("posts data", data);
  for (const article of data) {
    await createNewArticle(
      article.title,
      article.slug,
      article.publishedDate,
      article.body,
      article.author,
      article.categories,
      article.description,
      article.excerpt
    );
  }
}

createArticlesFromData(postsData)
  .then(() => console.log("Created new entries."))
  .catch((err) => console.log(`Error creating new entries: ${err.message}`));
