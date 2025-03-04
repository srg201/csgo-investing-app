import { UTApi } from 'uploadthing/server';
import { createUploadthing, type FileRouter } from 'uploadthing/server';

const f = createUploadthing();

export const utapi = new UTApi({
  token: process.env.UPLOADTHING_TOKEN,
});
