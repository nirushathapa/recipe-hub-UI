
const recipes = [
  {
    id: 1,
    name: 'Creamy Garlic Pasta',
    image: 'images/Creamy Garlic Pasta.jpg',
    alt: 'Delicious creamy pasta with garlic'
  },
  {
    id: 2,
    name: 'Spicy Thai Curry',
    image: 'images/Spicy Thai Curry.jpg',
    alt: 'Thai red curry with vegetables'
  },
  {
    id: 3,
    name: 'Classic Pancakes',
    image: 'images/Classic Pancakes.jpg',
    alt: 'Fluffy pancakes with berries'
  },
  {
    id: 4,
    name: 'Berry Smoothie',
    image: 'images/Berry Smoothie.jpg',
    alt: 'Refreshing berry smoothie bowl'
  }
];

// DOM elements
const recipeGrid = document.getElementById('recipeGrid');
const darkToggle = document.getElementById('darkModeToggle');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

// Load recipes on page load
document.addEventListener('DOMContentLoaded', () => {
  displayRecipes(recipes);
  initWishlistListeners();
  initVideoPlayer(); // Initialize video player
});

// Display recipes in grid
function displayRecipes(recipesToShow) {
  recipeGrid.innerHTML = recipesToShow.map(recipe => `
    <div class="card" data-id="${recipe.id}">
      <img src="${recipe.image}" alt="${recipe.alt}" class="card-img" loading="lazy">
      <div class="card-content">
        <div class="card-header">
          <h3 class="card-title">${recipe.name}</h3>
          <button class="wishlist-icon" aria-label="Add to wishlist">
            <i class="far fa-heart"></i>
          </button>
        </div>
        <button class="view-btn">View Recipe →</button>
      </div>
    </div>
  `).join('');
}

// Initialize wishlist functionality
function initWishlistListeners() {
  document.querySelectorAll('.wishlist-icon').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const icon = btn.querySelector('i');
      
      if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        btn.classList.add('active');
        
        // Animation feedback
        icon.style.transform = 'scale(1.2)';
        setTimeout(() => {
          icon.style.transform = 'scale(1)';
        }, 150);
      } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        btn.classList.remove('active');
      }
    });
  });

  // Add click listeners for view buttons
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.card');
      const recipeName = card.querySelector('.card-title').textContent;
      alert(`📖 Opening recipe: "${recipeName}"\n(full recipe would load in a real app)`);
    });
  });
}

// Dark mode toggle
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  
  // Update toggle icon
  const icon = darkToggle.querySelector('i');
  if (document.body.classList.contains('dark')) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
});

// Search functionality
function filterRecipes(searchTerm) {
  const filtered = recipes.filter(recipe => 
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  displayRecipes(filtered);
  initWishlistListeners();
}

searchBtn.addEventListener('click', () => {
  filterRecipes(searchInput.value);
});

searchInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    filterRecipes(searchInput.value);
  }
});

// Clear search with Escape key
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    searchInput.value = '';
    displayRecipes(recipes);
    initWishlistListeners();
  }
});

// ============ VIDEO PLAYER FUNCTIONALITY ============

// Initialize video player
function initVideoPlayer() {
  const videoContainer = document.getElementById('videoContainer');
  const thumbnail = document.querySelector('.video-thumbnail');
  const videoIframe = document.getElementById('youtubeIframe');
  const youtubePlayer = document.getElementById('youtubePlayer');
  
  // Only run if video elements exist on the page
  if (thumbnail && videoIframe && youtubePlayer) {
    setupVideoPlayer(thumbnail, videoIframe, youtubePlayer);
  }
}

// Setup video player with click event
function setupVideoPlayer(thumbnail, videoIframe, youtubePlayer) {
  thumbnail.addEventListener('click', function() {
    // Hide thumbnail
    this.style.display = 'none';
    
    // Show iframe container
    videoIframe.style.display = 'block';
    
   
    const videoId = 'euK_DYmsSTI'; // Extract just the video ID
    
    // Proper YouTube embed URL with autoplay
    youtubePlayer.src = `https://youtu.be/euK_DYmsSTI?si=ZVFhSRhlSsyhQtv5`;
  });

  // Add error handling for YouTube iframe
  youtubePlayer.addEventListener('error', function() {
    showVideoFallback(videoIframe);
  });

  // Fallback if video takes too long to load
  setTimeout(() => {
    try {
      // Check if iframe loaded successfully
      if (youtubePlayer && !youtubePlayer.src) {
        showVideoFallback(videoIframe);
      }
    } catch (e) {
      // If error checking, show fallback
      showVideoFallback(videoIframe);
    }
  }, 5000);
}

// Show fallback message if video fails
function showVideoFallback(videoIframe) {
  if (!videoIframe) return;
  
  videoIframe.innerHTML = `
    <div style="width:100%; height:100%; background:#1e293b; display:flex; flex-direction:column; align-items:center; justify-content:center; color:white; gap:1rem; text-align:center; padding:2rem;">
      <i class="fas fa-exclamation-circle" style="font-size:3rem; color:#e11d48;"></i>
      <p style="font-size:1.2rem;">Video could not load. Please try again later.</p>
      <button onclick="window.location.reload()" style="background:#e11d48; border:none; color:white; padding:0.7rem 2rem; border-radius:40px; cursor:pointer; font-size:1rem; font-weight:600;">
        <i class="fas fa-redo"></i> Refresh Page
      </button>
    </div>
  `;
}


function initSimpleVideoPlayer() {
  const playButton = document.querySelector('.play-button');
  if (playButton) {
    playButton.addEventListener('click', () => {
      alert('🎥 Video would play here!\n\nRecipe: Creamy Garlic Pasta\nDuration: 12:34 minutes');
    });
  }
}

// Run simple video player as backup
document.addEventListener('DOMContentLoaded', () => {
  initSimpleVideoPlayer();
});