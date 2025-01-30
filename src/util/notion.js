import { Client } from "@notionhq/client";

const notion = new Client({ auth: import.meta.env.VITE_DB_KEY })