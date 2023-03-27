export interface NewsPost {
  id: number;
  title: string;
  content: string;
  dateGmt: Date;
  mediaUrl?: string;
  excerpt?: string;
}
