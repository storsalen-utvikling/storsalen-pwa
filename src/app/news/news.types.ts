export interface NewsPost {
  id: number;
  title: string;
  content: string;
  dateGmt: string;
  mediaUrl?: string;
  excerpt?: string;
}
