import YouTubeEmbed from "../../components/ui/YouTubeEmbed.tsx";

export interface VideoProps {
  /** @title URL do vídeo (YouTube) */
  embedUrl: string;
}

const Video = ({ embedUrl }: VideoProps) => (
  <div class="block mx-4 lg:mx-0 my-4 max-w-full">
    <div class="rounded-xl overflow-hidden aspect-video bg-black">
      <YouTubeEmbed url={embedUrl} />
    </div>
  </div>
);

export default Video;
