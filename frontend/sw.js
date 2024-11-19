import Dexie from "dexie";

// DATABASE SETUP
let dbName = "socme";
let dbVersion = 2;

const database = new Dexie(dbName);

database.version(dbVersion).stores({
  posts: "++id,textContent,mediaFiles,autoPostDateTime",
});

// EVENTS

self.addEventListener("message", async (event) => {
  const { data } = event;

  switch (data.action) {
    case "SAVE": {
      try {
        let id = await database.posts.add(data.req_data);

        postMessageToClient({
          ok: true,
          data: id,
          action: data.action,
        });

        break;
      } catch (e) {
        postMessageToClient({
          ok: false,
          data: undefined,
          action: data.action,
        });
        break;
      }
    }
    case "GET_ALL": {
      const posts = await database.posts.toArray();
      postMessageToClient({ posts, action: data.action });
      break;
    }

    case "DELETE": {
      let id = data.req_data;
      try {
        await database.posts.delete(id);
        postMessageToClient({ ok: true, id, action: data.action });
        break;
      } catch (e) {
        postMessageToClient({ ok: false, id, action: data.action });
        break;
      }
    }
    case "UPDATE":
      break;

    case "UPLOAD": {
      try {
        let id = data.req_data;

        const post = await database.posts.get(id);

        postMessageToClient({
          ok: true,
          post,
          action: data.action,
        });
      } catch (e) {
        postMessageToClient({
          ok: false,
          post: undefined,
          action: data.action,
        });
        break;
      }
    }
  }
});

self.addEventListener("push", async (event) => {
  const post = await event.data.json(); // So far, it's Ok : the post is being received and successfully parsed

  event.waitUntil(
    self.registration.showNotification("Socme", {
      body: `${post.author.name} just posted this : ${post.textContent.slice(
        0,
        64
      )}`,
      tag: post.author._id,
      data: post._id, // So we can handle like and dislike on click
      actions: [
        {
          action: "like",
          type: "button",
          title: "Like",
        },
        {
          action: "dislike",
          type: "button",
          title: "Dislike",
        },
      ],
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  const notification = event.notification;
  switch (event.action) {
    case "like": {
      console.log("You liked this post");
      notification.close();
    }

    case "dislike": {
      console.log("You disliked this post");
      notification.close();
    }
  }
});

function postMessageToClient(message) {
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage(message);
    });
  });
}
