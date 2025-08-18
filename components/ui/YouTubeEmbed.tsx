export interface YouTubeEmbedProps {
  /** @title URL do vídeo (YouTube) */
  url: string;
}

function getYouTubeEmbedUrl(url: string): string {
  const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/);
  if (ytMatch?.[1]) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  if (url.includes("/embed/")) return url;
  return url;
}

const YouTubeEmbed = ({ url }: YouTubeEmbedProps) => (
  <iframe
    src={getYouTubeEmbedUrl(url)}
    class="w-full h-full"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    loading="lazy"
    title="YouTube video"
  />
);

export default YouTubeEmbed;
