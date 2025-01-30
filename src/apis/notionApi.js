import { notion } from "@util/notion";

export const getUser = (email) => {
  console.log('token', import.meta.env.VITE_DB_KEY);

  console.log('db id', import.meta.env.VITE_DB_USERS);

  try {
    notion.databases
      .retrieve({ database_id: import.meta.env.VITE_DB_USERS })
      .then(rep => console.log('retrieve', rep));
  } catch (error) {
    console.log(error);

  }
  return notion.databases.query({
    database_id: import.meta.env.VITE_DB_USERS,
    filter: {
      property: "email",
      title: { equals: email }
    },
  });
}