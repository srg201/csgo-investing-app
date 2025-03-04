export class CreateNewsDto {
  title: string;
  content: string;
  source: string;
  imageUrl?: string;
  imageUploadthingKey?: string;
  timeToRead: number;
}
