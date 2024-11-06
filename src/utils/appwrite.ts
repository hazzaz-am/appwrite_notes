import { Client, Databases } from "appwrite";

export const client = new Client()
	.setEndpoint("https://cloud.appwrite.io/v1")
	.setProject("67282f2b00164eb5906c");

console.log("client", client);

export const databases = new Databases(client);
