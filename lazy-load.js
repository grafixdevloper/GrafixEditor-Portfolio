// Lazy loading for YouTube videos
document.addEventListener('DOMContentLoaded', function() {
    // Check if Intersection Observer is supported
    if ('IntersectionObserver' in window) {
        const videoObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const iframe = entry.target;
                    // Replace data-src with src to load the video
                    if (iframe.dataset.src) {
                        iframe.src = iframe.dataset.src;
                        iframe.removeAttribute('data-src');
                    }
                    // Stop observing after loading
                    observer.unobserve(iframe);
                }
            });
        }, { threshold: 0.1 });

        // Observe all iframes with data-src attribute
        const lazyVideos = document.querySelectorAll('iframe.lazyload');
        lazyVideos.forEach(video => videoObserver.observe(video));
    } else {
        // Fallback for browsers that don't support Intersection Observer
        const lazyVideos = document.querySelectorAll('iframe.lazyload');
        lazyVideos.forEach(video => {
            if (video.dataset.src) {
                video.src = video.dataset.src;
                video.removeAttribute('data-src');
            }
        });
    }
});