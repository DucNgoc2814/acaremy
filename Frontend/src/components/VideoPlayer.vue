<template>
  <div class="aspect-video bg-gray-900 rounded overflow-hidden shadow-lg relative">
    <div ref="playerContainer" class="w-full h-full"></div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default {
  name: 'VideoPlayer',
  props: {
    videoUrl: {
      type: String,
      required: true
    },
    showAddNoteButton: {
      type: Boolean,
      default: true
    }
  },
  emits: ['timeupdate', 'add-note'],
  setup(props, { emit }) {
    const playerContainer = ref(null);
    let player = null;
    let youtubeApiLoaded = false;
    
    // Load YouTube API
    const loadYouTubeApi = () => {
      if (window.YT) {
        youtubeApiLoaded = true;
        initPlayer();
        return;
      }
      
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      
      window.onYouTubeIframeAPIReady = () => {
        youtubeApiLoaded = true;
        initPlayer();
      };
    };
    
    // Initialize YouTube player
    const initPlayer = () => {
      if (!youtubeApiLoaded || !playerContainer.value) return;
      
      // Extract video ID from URL
      const videoId = getYouTubeVideoId(props.videoUrl);
      
      if (!videoId) {
        console.error('Invalid YouTube URL');
        return;
      }
      
      player = new window.YT.Player(playerContainer.value, {
        videoId: videoId,
        playerVars: {
          autoplay: 0,
          modestbranding: 1,
          rel: 0
        },
        events: {
          onReady: onPlayerReady
        }
      });
    };
    
    // Extract YouTube video ID from URL
    const getYouTubeVideoId = (url) => {
      // Handle different YouTube URL formats
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      
      return (match && match[2].length === 11) ? match[2] : null;
    };
    
    // Player ready event handler
    const onPlayerReady = () => {
      // Set up time update interval
      setInterval(() => {
        if (player && player.getCurrentTime) {
          emit('timeupdate', player.getCurrentTime());
        }
      }, 200); // Update more frequently for better responsiveness
    };
    
    // Seek to specific time
    const seekTo = (time) => {
      if (player && player.seekTo) {
        player.seekTo(time);
      }
    };
    
    // Clean up on component unmount
    onBeforeUnmount(() => {
      if (player && player.destroy) {
        player.destroy();
      }
    });
    
    // Initialize player on mount
    onMounted(() => {
      loadYouTubeApi();
    });
    
    return {
      playerContainer,
      seekTo
    };
  }
};
</script>