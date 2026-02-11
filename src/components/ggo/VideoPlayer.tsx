'use client';

import { useState } from 'react';
import { Video, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoPlayerProps {
  url?: string;
  title?: string;
  duration?: string;
  thumbnail?: string;
  className?: string;
}

/**
 * Extracts video ID and platform from various video URLs
 */
function parseVideoUrl(url: string): { platform: 'youtube' | 'vimeo' | 'direct'; id: string } | null {
  // YouTube patterns
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const youtubeMatch = url.match(youtubeRegex);
  if (youtubeMatch) {
    return { platform: 'youtube', id: youtubeMatch[1] };
  }

  // Vimeo patterns
  const vimeoRegex = /vimeo\.com\/(?:video\/)?(\d+)/;
  const vimeoMatch = url.match(vimeoRegex);
  if (vimeoMatch) {
    return { platform: 'vimeo', id: vimeoMatch[1] };
  }

  // Direct video file
  if (url.match(/\.(mp4|webm|ogg)$/i)) {
    return { platform: 'direct', id: url };
  }

  return null;
}

export function VideoPlayer({ url, title = 'Video', duration, thumbnail, className = '' }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!url) {
    return (
      <div className={`aspect-video bg-ggo-navy/10 rounded-xl flex items-center justify-center ${className}`}>
        <div className="text-center text-ggo-text-muted">
          <Video className="w-12 h-12 mx-auto mb-2 opacity-40" />
          <p className="text-sm">No video available</p>
        </div>
      </div>
    );
  }

  const parsed = parseVideoUrl(url);

  if (!parsed) {
    return (
      <div className={`aspect-video bg-red-50 rounded-xl flex items-center justify-center ${className}`}>
        <div className="text-center text-red-600">
          <Video className="w-12 h-12 mx-auto mb-2" />
          <p className="text-sm font-medium">Invalid video URL</p>
          <p className="text-xs mt-1">Supported: YouTube, Vimeo, MP4</p>
        </div>
      </div>
    );
  }

  const getEmbedUrl = (): string => {
    switch (parsed.platform) {
      case 'youtube':
        return `https://www.youtube.com/embed/${parsed.id}?autoplay=1&rel=0`;
      case 'vimeo':
        return `https://player.vimeo.com/video/${parsed.id}?autoplay=1`;
      case 'direct':
        return parsed.id;
      default:
        return '';
    }
  };

  const getThumbnailUrl = (): string => {
    if (thumbnail) return thumbnail;
    if (parsed.platform === 'youtube') {
      return `https://img.youtube.com/vi/${parsed.id}/maxresdefault.jpg`;
    }
    return '';
  };

  return (
    <div className={`relative aspect-video bg-ggo-navy/10 rounded-xl overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        {!isPlaying ? (
          <motion.div
            key="thumbnail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 cursor-pointer group"
            onClick={() => setIsPlaying(true)}
          >
            {/* Thumbnail or placeholder */}
            {getThumbnailUrl() ? (
              <img
                src={getThumbnailUrl()}
                alt={title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-ggo-navy/20 to-ggo-teal/20" />
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-center"
              >
                <div className="w-20 h-20 rounded-full bg-ggo-teal flex items-center justify-center mb-3 shadow-lg">
                  <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                </div>
                <p className="text-white font-medium text-lg">{title}</p>
                {duration && (
                  <p className="text-white/80 text-sm mt-1">{duration}</p>
                )}
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="player"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0"
          >
            {parsed.platform === 'direct' ? (
              <video
                src={getEmbedUrl()}
                controls
                autoPlay
                className="w-full h-full"
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <iframe
                src={getEmbedUrl()}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
