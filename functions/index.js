const functions = require("firebase-functions");
const axios = require("axios");

const articlesEndpoint = "https://dev.to/api/articles";

async function getPageViewsCount(postId, pageNo = 1) {
  const { data } = await axios.get(
    `${articlesEndpoint}/me/all?per_page=10&page=${pageNo}`,
    {
      headers: {
        "api-key": functions.config().dev.api_key,
      },
    }
  );

  const post = data.find((i) => i.id == postId);

  if (!post) {
    return getPageViewsCount(postId, pageNo + 1);
  }

  return post;
}

function addCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

async function updatePostTitle(postId) {
  const { page_views_count } = await getPageViewsCount(postId);
  const data = {
    title: `This Post Has ${addCommas(page_views_count)} Views`,
  };
  const res = await axios.put(`${articlesEndpoint}/${postId}`, data, {
    headers: {
      "api-key": functions.config().dev.api_key,
    },
  });
  return res.data;
}

exports.updatePostTitle = functions.pubsub
  .schedule("every 3 minutes")
  .onRun(() => {
    const postId = functions.config().dev.post_id;
    return updatePostTitle(postId);
  });
