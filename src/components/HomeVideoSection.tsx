import { PlayCircle } from "lucide-react";
import { useHomeVideo } from "@/lib/homeVideo";
import { extractYoutubeId } from "@/lib/youtube";

export function HomeVideoSection() {
  const video = useHomeVideo();
  const videoId = video?.youtube_url ? extractYoutubeId(video.youtube_url) : null;

  if (!video?.active || !videoId) return null;

  return (
    <section className="mx-auto max-w-3xl px-6 pb-10">
      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
        <div className="aspect-video w-full">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={video.title || "Video hướng dẫn"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
        {video.title && (
          <p className="flex items-center gap-2 px-5 py-3.5 text-sm font-medium">
            <PlayCircle className="h-4 w-4 shrink-0 text-primary" />
            {video.title}
          </p>
        )}
      </div>
    </section>
  );
}
