// ==================== DOM ELEMENTS ====================
const filterBtns = document.querySelectorAll('.filter-btn');
const viewBtns = document.querySelectorAll('.view-btn');
const recipesGrid = document.getElementById('recipesGrid');
const recipeCards = document.querySelectorAll('.recipe-card');
const scrollDownBtn = document.getElementById('scrollDown');
const noResults = document.getElementById('noResults');

// ==================== SMOOTH SCROLL ====================
scrollDownBtn.addEventListener('click', () => {
    document.querySelector('.main-content').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

// Add smooth scroll to all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== FILTER FUNCTIONALITY ====================
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Get filter value
        const filter = btn.getAttribute('data-filter');

        // Filter cards
        filterCards(filter);
    });
});

function filterCards(category) {
    let visibleCount = 0;

    recipeCards.forEach((card, index) => {
        const cardCategory = card.getAttribute('data-category');

        // Reset flip state
        card.classList.remove('flipped');

        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            // Stagger animation
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            }, index * 50);
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    // Show/hide no results message
    if (visibleCount === 0) {
        noResults.classList.remove('hidden');
        recipesGrid.style.display = 'none';
    } else {
        noResults.classList.add('hidden');
        recipesGrid.style.display = 'grid';
    }
}

// ==================== VIEW TOGGLE ====================
viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        viewBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Get view type
        const view = btn.getAttribute('data-view');

        // Update grid class
        if (view === 'list') {
            recipesGrid.classList.add('list-view');
            // Unflip all cards when switching to list view
            recipeCards.forEach(card => card.classList.remove('flipped'));
        } else {
            recipesGrid.classList.remove('list-view');
        }
    });
});

// ==================== CARD FLIP FUNCTIONALITY ====================
const flipBtns = document.querySelectorAll('.flip-btn');

flipBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();

        // Get recipe index
        const recipeIndex = btn.getAttribute('data-recipe');

        // Find the parent card
        const card = btn.closest('.recipe-card');

        // Toggle flip
        card.classList.toggle('flipped');

        // Scroll card into view smoothly
        setTimeout(() => {
            card.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 300);
    });
});

// ==================== KEYBOARD NAVIGATION ====================
document.addEventListener('keydown', (e) => {
    // Press ESC to flip back all cards
    if (e.key === 'Escape') {
        recipeCards.forEach(card => {
            card.classList.remove('flipped');
        });
    }
});

// ==================== INTERSECTION OBSERVER ====================
// Animate cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all recipe cards
recipeCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ==================== RECIPE COUNTER ====================
function updateRecipeCount() {
    const visibleCards = document.querySelectorAll('.recipe-card[style*="display: block"], .recipe-card:not([style*="display: none"])');
    const count = visibleCards.length;

    // You could add a counter element to show this
    console.log(`Showing ${count} recipe(s)`);
}

// ==================== ANIMATION ON LOAD ====================
window.addEventListener('load', () => {
    // Stagger fade in for initial cards
    recipeCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// ==================== PARALLAX EFFECT (Hero) ====================
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.5;

    if (hero && scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// ==================== CARD HOVER EFFECTS ====================
recipeCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        if (!this.classList.contains('flipped')) {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        }
    });

    card.addEventListener('mouseleave', function() {
        if (!this.classList.contains('flipped')) {
            this.style.transform = 'translateY(0) scale(1)';
        }
    });
});

// ==================== RANDOM RECIPE FEATURE ====================
function getRandomRecipe() {
    const randomIndex = Math.floor(Math.random() * recipeCards.length);
    const randomCard = recipeCards[randomIndex];

    // Scroll to card
    randomCard.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });

    // Flip it after scrolling
    setTimeout(() => {
        randomCard.classList.add('flipped');
    }, 800);
}

// You could add a button to trigger this:
// <button onclick="getRandomRecipe()">Surprise Me!</button>

// ==================== SEARCH FUNCTIONALITY (Bonus) ====================
// You can add a search input and use this function
function searchRecipes(query) {
    const lowerQuery = query.toLowerCase();
    let visibleCount = 0;

    recipeCards.forEach(card => {
        const title = card.querySelector('.recipe-title').textContent.toLowerCase();
        const description = card.querySelector('.recipe-description').textContent.toLowerCase();

        if (title.includes(lowerQuery) || description.includes(lowerQuery)) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    // Show/hide no results
    if (visibleCount === 0) {
        noResults.classList.remove('hidden');
        recipesGrid.style.display = 'none';
    } else {
        noResults.classList.add('hidden');
        recipesGrid.style.display = 'grid';
    }
}

// ==================== LOCAL STORAGE (Favorites) ====================
// Save favorite recipes
let favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

function toggleFavorite(recipeIndex) {
    const index = favorites.indexOf(recipeIndex);

    if (index > -1) {
        // Remove from favorites
        favorites.splice(index, 1);
    } else {
        // Add to favorites
        favorites.push(recipeIndex);
    }

    // Save to localStorage
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));

    console.log('Favorites:', favorites);
}

// You could add heart buttons to cards:
// <button onclick="toggleFavorite(0)">♥️ Favorite</button>

// ==================== PRINT RECIPE ====================
function printRecipe(recipeIndex) {
    const card = recipeCards[recipeIndex];
    const title = card.querySelector('.recipe-title').textContent;
    const ingredients = card.querySelector('.ingredients').innerHTML;
    const instructions = card.querySelector('.instructions').innerHTML;

    // Create print window
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>${title} - Recipe</title>
            <style>
                body {
                    font-family: Georgia, serif;
                    padding: 2rem;
                    max-width: 800px;
                    margin: 0 auto;
                }
                h1 {
                    color: #4CAF50;
                    margin-bottom: 2rem;
                }
                h2 {
                    color: #2E7D32;
                    margin-top: 1.5rem;
                }
                ul, ol {
                    line-height: 1.8;
                }
            </style>
        </head>
        <body>
            <h1>${title}</h1>
            ${ingredients}
            ${instructions}
            <p style="margin-top: 2rem; color: #666; font-size: 0.9rem;">
                Printed from Vegan Delights Recipe Collection
            </p>
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

// ==================== ANALYTICS (Console Logs) ====================
console.log('%c🌱 Vegan Delights Recipe Collection', 'color: #4CAF50; font-size: 24px; font-weight: bold;');
console.log('%c5 delicious plant-based recipes loaded!', 'color: #8BC34A; font-size: 14px;');
console.log('%cPress ESC to flip all cards back', 'color: #666; font-size: 12px;');
console.log('%cTip: You can add more recipes by duplicating the recipe-card HTML structure!', 'color: #FF6F00; font-size: 12px;');

// ==================== RECIPE SHARING ====================
function shareRecipe(recipeIndex) {
    const card = recipeCards[recipeIndex];
    const title = card.querySelector('.recipe-title').textContent;

    if (navigator.share) {
        navigator.share({
            title: title,
            text: `Check out this recipe: ${title}`,
            url: window.location.href
        }).then(() => {
            console.log('Recipe shared successfully!');
        }).catch((error) => {
            console.log('Error sharing recipe:', error);
        });
    } else {
        // Fallback: Copy to clipboard
        const url = window.location.href;
        navigator.clipboard.writeText(`${title} - ${url}`);
        alert('Recipe link copied to clipboard!');
    }
}

// ==================== LAZY LOADING IMAGES ====================
// If you add real images later, use this:
/*
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));
*/
