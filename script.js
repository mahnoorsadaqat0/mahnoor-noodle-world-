document.addEventListener('DOMContentLoaded', () => {
    console.log("Script loaded and DOMContentLoaded fired.");
    const toggleBtn = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // --- Entry Wall Logic ---
    const signupWall = document.getElementById('signup-wall');
    const signupForm = document.getElementById('signup-form');

    if (signupWall) {
        console.log("Signup wall element found.");
        if (localStorage.getItem('websiteEntered') === 'true') {
            console.log("User already entered, hiding signup wall.");
            signupWall.style.display = 'none';
            body.classList.remove('locked');
        } else {
            console.log("User not entered, showing signup wall and locking body scroll.");
            body.classList.add('locked');
        }
    }

    // --- Unique Noodle Rain Logic ---
    function createNoodleRain() {
        if (!signupWall || signupWall.style.display === 'none') return;
        
        const emojis = ['🍜', '🥢', '🌶️', '🍳', '🍲'];
        for (let i = 0; i < 15; i++) {
            const noodle = document.createElement('div');
            noodle.className = 'noodle-rain';
            noodle.innerText = emojis[Math.floor(Math.random() * emojis.length)];
            noodle.style.left = Math.random() * 100 + 'vw';
            noodle.style.animationDelay = Math.random() * 8 + 's';
            noodle.style.animationDuration = (Math.random() * 5 + 5) + 's';
            noodle.style.fontSize = (Math.random() * 1 + 1.5) + 'rem';
            noodle.style.width = 'auto'; // Override CSS width: 100%
            signupWall.appendChild(noodle);
        }
    }
    createNoodleRain();

    if (signupForm) {
        console.log("Signup form found.");
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const user = document.getElementById('username-input').value;
            localStorage.setItem('websiteEntered', 'true');
            signupWall.style.display = 'none';
            body.classList.remove('locked');
            alert(`Welcome to the Noodle Club, ${user}! 🍜`); // This alert should definitely show up.
            console.log(`User '${user}' entered the website.`);
        });
    }

    // Theme Preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        if (toggleBtn) toggleBtn.innerText = '☀️ Light Mode'; // Check if toggleBtn exists before accessing innerText
        console.log("Dark mode applied based on localStorage.");
    }

// Toggle theme on button click
if (toggleBtn) {
    console.log("Dark mode toggle button found.");
    toggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            toggleBtn.innerText = '☀️ Light Mode';
        } else {
            localStorage.setItem('theme', 'light');
            toggleBtn.innerText = '🌙 Dark Mode';
        }
        console.log("Theme toggled to:", body.classList.contains('dark-mode') ? 'dark' : 'light');
    });
} else {
    console.warn("Dark mode toggle button not found.");
}

// Interactive Shopping List logic
const listItems = document.querySelectorAll('#interactive-list li');
listItems.forEach(item => {
    console.log("Adding click listener to shopping list item:", item.innerText);
    item.addEventListener('click', () => {
        item.classList.toggle('completed');
    });
});

// Recipe Copy Logic
const copyBtn = document.querySelector('button.copy');
if (copyBtn) {
    console.log("Copy button found for Knorr recipe.");
    copyBtn.addEventListener('click', () => {
        const codeElement = document.getElementById('recipeCode');
        const originalText = copyBtn.innerText;

        navigator.clipboard?.writeText(codeElement.innerText).then(() => {
            copyBtn.innerText = 'Copied!';
            console.log("Recipe JSON copied to clipboard.");
            setTimeout(() => { copyBtn.innerText = originalText; }, 2000);
        }).catch(() => {
            prompt('Copy this recipe JSON:', codeElement.innerText);
            console.warn("Clipboard API failed, falling back to prompt for copy.");
        });
    });
} else {
    console.warn("Copy button for Knorr recipe not found.");
}

// Contact Form Logic
const forms = ['contactForm', 'mainContactForm'];
forms.forEach(id => {
    const form = document.getElementById(id);
    if (form) {
        console.log(`Adding submit listener to form: ${id}`);
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            alert('Thank you! Mahnoor ko aapka message mil gaya hai.');
            form.reset(); // Form clear karne ke liye
            console.log(`Form ${id} submitted.`);
        });
    }
});

// --- Unique Recipe Modal Logic for Page 2 ---
const galleryItems = document.querySelectorAll('.gallery-item');
const recipeModal = document.getElementById('recipe-modal');
const modalBody = document.getElementById('modal-body');
const closeModal = document.querySelector('.close-modal');

// Detailed Recipe Database
const noodleRecipes = {
    "🔥 Garam Garam Spicy Ramen": {
        ingredients: ["Ramen noodles", "Chicken/Veg broth", "Miso paste", "Chili oil", "Soft boiled egg", "Nori seaweed"],
        steps: ["Boil chicken or veg broth with ginger and garlic.", "Add soy sauce, miso paste, and chili oil for that 'Spicy' kick.", "Cook ramen noodles separately for 3 minutes.", "Combine noodles and broth in a bowl.", "Top with a soft-boiled egg, seaweed (nori), and spring onions."],
        emoji: "🔥",
        time: "20 mins",
        difficulty: "Medium",
        category: ["spicy", "asian"]
    },
    "🥢 Steaming Chicken Chow Mein": {
        ingredients: ["Egg noodles", "Chicken strips", "Cabbage", "Carrots", "Soy sauce", "Oyster sauce"],
        steps: ["Stir-fry thin chicken strips until golden brown.", "Add sliced cabbage, carrots, and bell peppers.", "Toss in boiled egg noodles.", "Pour soy sauce, oyster sauce, and a dash of sesame oil.", "Cook on high heat for 2 minutes while tossing continuously."],
        emoji: "🥢",
        time: "15 mins",
        difficulty: "Easy",
        category: ["asian", "quick"]
    },
    "🌶️ Tangy Pad Thai": {
        ingredients: ["Flat rice noodles", "Shrimp/Tofu", "Tamarind paste", "Peanuts", "Bean sprouts", "Lime"],
        steps: ["Soak flat rice noodles in warm water until soft.", "Stir-fry shrimp or tofu with crushed garlic and shallots.", "Add tamarind paste, fish sauce, and palm sugar for the signature tangy taste.", "Scramble an egg on the side of the pan and mix in.", "Garnish with crushed peanuts, bean sprouts, and lime."],
        emoji: "🌶️",
        time: "25 mins",
        difficulty: "Medium",
        category: ["spicy", "asian"]
    },
    "🇮🇳 Everyone's Favorite Maggi": {
        ingredients: ["Maggi packet", "Tastemaker", "Water", "Butter", "Green chilies"],
        steps: ["Boil 1.5 cups of water in a pan.", "Break the Maggi cake into 4 parts and add to water.", "Add the 'Magic' Tastemaker packet immediately.", "Add a small cube of butter and chopped green chilies if you like it spicy.", "Cook until the water is almost absorbed but keep it slightly 'juicy'."],
        emoji: "🇮🇳",
        time: "5 mins",
        difficulty: "Very Easy",
        category: ["quick", "indian"]
    },
    "🍝 Italian Spaghetti Aglio e Olio": {
        ingredients: ["Spaghetti", "Garlic", "Olive oil", "Red chili flakes", "Parsley", "Parmesan cheese"],
        steps: ["Boil spaghetti in salted water until al dente.", "In a pan, sauté lots of sliced garlic in plenty of olive oil.", "Add dried red chili flakes.", "Toss the pasta into the garlic oil with some pasta water.", "Finish with fresh parsley and grated parmesan cheese."],
        emoji: "🍝",
        time: "15 mins",
        difficulty: "Easy",
        category: ["italian", "quick"]
    },
    "🍜 Hearty Udon Noodles": {
        ingredients: ["Thick Udon noodles", "Dashi broth", "Soy sauce", "Mirin", "Scallions"],
        steps: ["Prepare a dashi-based broth with soy sauce and mirin.", "Boil thick udon noodles until chewy and soft.", "Place noodles in the hot broth.", "Add tempura flakes or sliced narutomaki.", "Top with plenty of chopped scallions."],
        emoji: "🍜",
        time: "18 mins",
        difficulty: "Medium",
        category: ["asian", "healthy"]
    },
    "🍳 Sizzling Stir-fry": {
        ingredients: ["Wheat noodles", "Bell peppers", "Broccoli", "Snap peas", "Stir-fry sauce"],
        steps: ["Heat oil in a wok and sauté garlic and ginger.", "Add sliced peppers, broccoli, and snap peas.", "Toss in cooked noodles and stir-fry sauce.", "Garnish with sesame seeds and green onions.", "Serve hot and sizzling!"],
        emoji: "🍳",
        time: "12 mins",
        difficulty: "Easy",
        category: ["asian", "quick", "healthy"]
    },
    "🥣 Warm Healthy Noodle Soup": {
        ingredients: ["Whole wheat noodles", "Veg stock", "Celery", "Mushrooms", "Spinach"],
        steps: ["Simmer vegetable stock with carrots and celery.", "Add light soy sauce and a touch of honey.", "Place cooked whole wheat noodles in a bowl.", "Pour the hot broth over the noodles.", "Add fresh spinach and sliced mushrooms."],
        emoji: "🥣",
        time: "20 mins",
        difficulty: "Easy",
        category: ["healthy", "quick"]
    },
    "🥥 Creamy Coconut Laksa": {
        ingredients: ["Rice vermicelli", "Coconut milk", "Laksa paste", "Tofu puffs", "Fish cakes"],
        steps: ["Fry laksa paste until fragrant.", "Add coconut milk and water, simmer for 10 mins.", "Add tofu puffs and fish cakes.", "Prepare rice vermicelli and bean sprouts.", "Pour soup over noodles and top with laksa leaves."],
        emoji: "🥥",
        time: "30 mins",
        difficulty: "Hard",
        category: ["spicy", "asian"]
    },
    "🌿 Aromatic Vietnamese Pho": {
        ingredients: ["Rice noodles", "Beef bones", "Ginger", "Star anise", "Cinnamon", "Fresh herbs"],
        steps: ["Char onions and ginger for the broth.", "Simmer beef bones with star anise and cinnamon for hours.", "Cook rice noodles until soft.", "Add thin beef slices to the hot broth.", "Serve with fresh basil, bean sprouts, and lime."],
        emoji: "🌿",
        time: "4+ hours",
        difficulty: "Hard",
        category: ["asian", "healthy"]
    },
    "🖤 Korean Black Bean Noodles (Jajangmyeon)": {
        ingredients: ["Thick noodles", "Black bean paste", "Pork belly", "Onions", "Cucumber"],
        steps: ["Fry black bean paste with oil and sugar.", "Sauté diced pork and onions in a separate pan.", "Combine paste with meat and vegetables.", "Add starch water to thicken the sauce.", "Pour over thick handmade noodles and garnish with cucumber."],
        emoji: "🖤",
        time: "25 mins",
        difficulty: "Medium",
        category: ["asian"]
    },
    "🌶️ Spicy Sichuan Dan Dan Noodles": {
        ingredients: ["Wheat noodles", "Minced pork", "Chili oil", "Tahini", "Peanuts"],
        steps: ["Fry minced pork with preserved vegetables.", "Make sauce with tahini, soy sauce, and chili oil.", "Cook thin wheat noodles.", "Place sauce in a bowl, add noodles, then pork.", "Top with toasted peanuts and Sichuan peppercorns."],
        emoji: "🌶️",
        time: "20 mins",
        difficulty: "Medium",
        category: ["spicy", "asian"]
    },
    "🍤 Garlic Shrimp Scampi": {
        ingredients: ["Linguine", "Shrimp", "Butter", "Garlic", "Lemon juice", "Parsley"],
        steps: ["Sauté shrimp in butter and olive oil with minced garlic.", "Add red pepper flakes and lemon juice.", "Whisk in white wine or chicken broth and simmer.", "Toss in cooked linguine or spaghetti.", "Garnish with fresh parsley and lemon zest."],
        emoji: "🍤",
        time: "15 mins",
        difficulty: "Easy",
        category: ["italian", "quick"]
    },
    "🥘 Thai Green Curry Noodles": {
        ingredients: ["Rice noodles", "Green curry paste", "Coconut milk", "Bamboo shoots", "Thai basil"],
        steps: ["Heat green curry paste in coconut milk.", "Add bamboo shoots and green beans.", "Simmer with lime leaves and palm sugar.", "Pour over rice noodles.", "Top with fresh Thai basil."],
        emoji: "🥘",
        time: "22 mins",
        difficulty: "Medium",
        category: ["spicy", "asian"]
    },
    "🇮🇹 Creamy Tomato Penne": {
        ingredients: ["Penne pasta", "Tomato puree", "Heavy cream", "Garlic", "Basil", "Mozzarella"],
        steps: ["Cook penne in salted water.", "Simmer tomato puree with garlic and basil.", "Stir in heavy cream for a pink sauce.", "Toss cooked penne with the sauce.", "Top with mozzarella and bake until bubbly."],
        emoji: "🇮🇹",
        time: "20 mins",
        difficulty: "Easy",
        category: ["italian", "quick"]
    },
    "🍄 Creamy Mushroom Fettuccine": {
        ingredients: ["Fettuccine", "Mushrooms", "Butter", "Heavy cream", "Parmesan", "Thyme"],
        steps: ["Sauté sliced mushrooms in butter with thyme.", "Add heavy cream and parmesan cheese.", "Cook fettuccine al dente.", "Mix pasta into the mushroom cream sauce.", "Garnish with black pepper and more parmesan."],
        emoji: "🍄",
        time: "18 mins",
        difficulty: "Easy",
        category: ["italian", "healthy"]
    },
    "🥓 Creamy Egg Carbonara": {
        ingredients: ["Spaghetti", "Eggs", "Pecorino Romano", "Bacon/Pancetta", "Black pepper"],
        steps: ["Fry pancetta or bacon until crispy.", "Whisk eggs with grated Pecorino Romano.", "Cook spaghetti and keep some pasta water.", "Mix hot pasta with eggs and bacon away from heat.", "Add pasta water to create a creamy sauce."],
        emoji: "🥓",
        time: "15 mins",
        difficulty: "Medium",
        category: ["italian", "quick"]
    },
    "🥒 Healthy Zucchini Noodles": {
        ingredients: ["Zucchini", "Olive oil", "Pesto sauce", "Cherry tomatoes"],
        steps: ["Spiralize zucchini into 'noodles'.", "Sauté in olive oil for only 2-3 minutes.", "Toss with pesto or fresh tomato sauce.", "Garnish with cherry tomatoes.", "Serve immediately before they get soggy."],
        emoji: "🥒",
        time: "10 mins",
        difficulty: "Very Easy",
        category: ["healthy", "quick"]
    },
    "🥢 Chilled Soba Noodles": {
        ingredients: ["Buckwheat Soba", "Dashi", "Soy sauce", "Wasabi", "Nori seaweed"],
        steps: ["Boil buckwheat noodles (soba).", "Chill them immediately in ice water.", "Prepare a dipping sauce with dashi, soy sauce, and mirin.", "Serve noodles on a bamboo mat.", "Garnish with wasabi, grated ginger, and shredded nori."],
        emoji: "🥢",
        time: "12 mins",
        difficulty: "Easy",
        category: ["asian", "healthy"]
    },
    "🇮🇳 Classic Indomie Mi Goreng": {
        ingredients: ["Indomie packet", "Sachet oils/seasoning", "Egg", "Fried onions"],
        steps: ["Boil noodles for 3 minutes.", "Drain the water completely.", "Add all the seasoning oils and powders from the sachets.", "Mix thoroughly.", "Top with a fried egg and fried onions."],
        emoji: "🇮🇳",
        time: "5 mins",
        difficulty: "Very Easy",
        category: ["quick", "asian"]
    },
    "🇯🇵 Japanese Fried Yakisoba": {
        ingredients: ["Yakisoba noodles", "Pork slices", "Cabbage", "Yakisoba sauce", "Pickled ginger"],
        steps: ["Stir-fry pork slices and cabbage.", "Add yakisoba noodles and a splash of water.", "Mix in the sweet and savory yakisoba sauce.", "Toss until everything is well coated.", "Top with pickled ginger (beni shoga) and dried seaweed."],
        emoji: "🇯🇵",
        time: "15 mins",
        difficulty: "Easy",
        category: ["asian", "quick"]
    },
    "🍜 Thai Coconut Curry Khao Soy": {
        ingredients: ["Egg noodles", "Chicken", "Red curry paste", "Coconut milk", "Turmeric"],
        steps: ["Cook red curry paste with turmeric and coconut milk.", "Add chicken and simmer until tender.", "Prepare boiled egg noodles.", "Deep-fry a small portion of noodles for the garnish.", "Serve soup over boiled noodles, top with crispy noodles and lime."],
        emoji: "🍜",
        time: "35 mins",
        difficulty: "Hard",
        category: ["spicy", "asian"]
    },
    "🇨🇳 Famous Biang Biang Wide Noodles": {
        ingredients: ["Flour dough", "Chili flakes", "Garlic", "Black vinegar", "Hot oil"],
        steps: ["Hand-pull the dough into wide, flat ribbons.", "Boil noodles until chewy.", "Place noodles in a bowl with chili flakes, garlic, and green onions.", "Pour smoking hot oil over the spices to release aroma.", "Add black vinegar and soy sauce before mixing."],
        emoji: "🇨🇳",
        time: "40 mins",
        difficulty: "Expert",
        category: ["asian"]
    },
    "🇰🇷 Spicy Kimchi Ramyun": {
        ingredients: ["Ramyun packet", "Kimchi", "Gochujang paste", "Egg", "Spring onions"],
        steps: ["Boil water with ramyun seasoning and dried flakes.", "Add chopped kimchi and a spoonful of gochujang.", "Cook noodles for 4 minutes.", "Crack an egg on top and cover for 1 minute.", "Garnish with extra kimchi and green onions."],
        emoji: "🇰🇷",
        time: "8 mins",
        difficulty: "Easy",
        category: ["spicy", "asian", "quick"]
    },
    "🇸🇬 Spicy Singapore Curry Noodles": {
        ingredients: ["Rice vermicelli", "Shrimp", "Curry powder", "Bell peppers", "Bean sprouts"],
        steps: ["Soak rice vermicelli in water.", "Stir-fry shrimp, pork, and egg with curry powder.", "Add onions, peppers, and bean sprouts.", "Toss in the noodles and season with soy sauce.", "Cook until noodles are dry and slightly charred."],
        emoji: "🇸🇬",
        time: "15 mins",
        difficulty: "Medium",
        category: ["spicy", "asian"]
    },
    "💎 Clear Glass Noodles": {
        ingredients: ["Glass noodles", "Soy sauce", "Sesame oil", "Vegetables (carrots, spinach)", "Mushrooms"],
        steps: ["Soak glass noodles in warm water until soft and translucent.", "Stir-fry your choice of vegetables and mushrooms.", "Add the soaked noodles to the pan.", "Season with soy sauce, sesame oil, and a touch of sugar.", "Toss well until heated through and flavors are combined."],
        emoji: "💎",
        time: "20 mins",
        difficulty: "Easy",
        category: ["asian", "healthy"]
    },
    "🥜 Nutty Sesame Noodles": {
        ingredients: ["Noodles (spaghetti or ramen)", "Sesame paste", "Soy sauce", "Rice vinegar", "Garlic", "Cucumber", "Peanuts"],
        steps: ["Cook noodles according to package directions; drain and rinse with cold water.", "Whisk together sesame paste, soy sauce, rice vinegar, minced garlic, and a little water to form a smooth sauce.", "Toss the cold noodles with the sesame sauce.", "Garnish with shredded cucumber and crushed peanuts.", "Serve chilled or at room temperature."],
        emoji: "🥜",
        time: "15 mins",
        difficulty: "Easy",
        category: ["asian", "healthy"]
    },
    "🥘 Malaysian Curry Mee": {
        ingredients: ["Yellow noodles", "Coconut milk", "Curry paste", "Chicken/Shrimp", "Tofu puffs", "Bean sprouts"],
        steps: ["Sauté curry paste until fragrant.", "Add chicken or shrimp and cook until almost done.", "Pour in coconut milk and water, bring to a simmer.", "Add yellow noodles, tofu puffs, and bean sprouts.", "Cook until noodles are heated through and serve hot."],
        emoji: "🥘",
        time: "25 mins",
        difficulty: "Medium",
        category: ["spicy", "asian"]
    },
    "🥢 Wok-Tossed Rice Noodles": {
        ingredients: ["Flat rice noodles", "Soy sauce", "Oyster sauce", "Chicken/Beef", "Broccoli", "Carrots"],
        steps: ["Soak flat rice noodles in warm water until pliable.", "Heat wok with oil, stir-fry protein (chicken/beef) until cooked.", "Add vegetables like broccoli and carrots, stir-fry until tender-crisp.", "Add soaked noodles to the wok.", "Pour in a sauce made of soy sauce, oyster sauce, and a dash of sugar, toss vigorously."],
        emoji: "🥢",
        time: "20 mins",
        difficulty: "Medium",
        category: ["asian", "quick"]
    }
};

const defaultRecipe = {
    ingredients: ["Noodles", "Water", "Salt", "Your choice of spices"],
    steps: ["Boil water with a pinch of salt.", "Add your favorite noodles and cook until soft.", "Drain the water and add seasoning or sauce.", "Stir well on medium heat.", "Garnish with fresh herbs and serve hot!"],
    emoji: "👩‍🍳",
    time: "10 mins",
    difficulty: "Easy",
    category: ["quick"]
};

if (galleryItems.length > 0 && recipeModal) {
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            console.log("Gallery item clicked:", item.querySelector('p').innerText);
            const noodleName = item.querySelector('p').innerText;
            const imgSrc = item.querySelector('img').src;
            
            // Find the specific recipe or use default
            const recipeInfo = noodleRecipes[noodleName] || defaultRecipe;
            
            // Generate steps list HTML
            const stepsHTML = (recipeInfo.steps || []).map(step => `<li>${step}</li>`).join('');
            const ingredientsHTML = (recipeInfo.ingredients || []).map(ing => `<span>${ing}</span>`).join(', ');

            modalBody.innerHTML = `
                <div class="modal-recipe-header">
                    <div class="emoji-large">${recipeInfo.emoji}</div>
                    <h2>${noodleName}</h2>
                    <img src="${imgSrc}" alt="${noodleName}" style="width:100%; border-radius:10px; margin-bottom:15px;">
                    <div style="margin-bottom: 15px; font-size: 0.9em; display:flex; justify-content:center; gap:20px;">
                        <span>⏱️ <b>Time:</b> ${recipeInfo.time}</span>
                        <span>📊 <b>Level:</b> ${recipeInfo.difficulty}</span>
                    </div>
                </div>
                <div class="recipe-ingredients" style="background: rgba(217, 119, 6, 0.1); padding: 15px; border-radius:10px; margin-bottom: 15px;">
                    <p><b>🛒 Ingredients:</b></p>
                    <p style="font-size: 0.9em;">${ingredientsHTML}</p>
                </div>
                <div class="recipe-steps">
                    <p><b>👩‍🍳 Cooking Instructions:</b></p>
                    <ul>${stepsHTML}</ul>
                </div>
                <div style="display: flex; gap: 10px; margin-top: 20px;">
                    <button onclick="window.print()" style="flex: 1; padding:10px; border-radius:6px; cursor:pointer; background:var(--accent-color); color:white; border:none; font-weight:bold;">🖨️ Print Recipe</button>
                    <button onclick="orderOnWhatsApp('${noodleName}')" style="flex: 1; padding:10px; border-radius:6px; cursor:pointer; background:#25D366; color:white; border:none; font-weight:bold;">📱 Order on WhatsApp</button>
                </div>
            `;
            recipeModal.classList.add('show');
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', () => recipeModal.classList.remove('show'));
    }
    
    window.addEventListener('click', (e) => { 
        if (e.target === recipeModal) recipeModal.classList.remove('show'); 
    });

    // WhatsApp Order Function
    window.orderOnWhatsApp = (noodleName) => {
        const phoneNumber = '923001234567'; // Replace with Mahnoor's actual WhatsApp number
        const message = `Hello, I would like to order "${noodleName}" from your website.`;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };
} else {
    console.warn("page2 items or recipe modal not found. Recipe modal logic might not be active.");
}

// page2 Filtering Logic
const filterButtons = document.querySelectorAll('.filter-btn');

if (filterButtons.length > 0 && galleryItems.length > 0) {
    console.log("Filter buttons and page2 items found. Initializing filter logic.");
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.dataset.filter;

            console.log("Filter button clicked:", filterValue);
            galleryItems.forEach(item => {
                const itemCategories = item.dataset.category ? item.dataset.category.split(' ') : [];
                if (filterValue === 'all' || itemCategories.includes(filterValue)) {
                    item.style.display = 'block'; // Show item
                } else {
                    item.style.display = 'none'; // Hide item
                }
            });
        });
    });
} else {
    console.warn("Filter buttons or page2 items not found. Filter logic might not be active.");
}

// --- UNIQUE: Surprise Me Randomizer ---
const surpriseBtn = document.getElementById('surprise-me');
if (surpriseBtn) {
    console.log("Surprise Me button found.");
    surpriseBtn.addEventListener('click', () => {
        console.log("Surprise Me button clicked.");
        const visibleItems = Array.from(galleryItems).filter(item => item.style.display !== 'none');
        console.log("Visible page2 items for surprise:", visibleItems.length);
        if (visibleItems.length === 0) {
            console.warn("No visible page2 items to surprise with.");
            return;
        }

        surpriseBtn.innerText = "🎲 Picking...";
        surpriseBtn.disabled = true;

        // Rapid random highlighting effect
        let count = 0;
        const interval = setInterval(() => {
            visibleItems.forEach(i => i.style.outline = "none");
            const randomIdx = Math.floor(Math.random() * visibleItems.length);
            visibleItems[randomIdx].style.outline = "4px solid var(--accent-color)";
            count++;

            if (count > 15) {
                clearInterval(interval);
                visibleItems.forEach(i => i.style.outline = "none");
                const finalSelection = visibleItems[Math.floor(Math.random() * visibleItems.length)]; // Ensure final selection is from visible items
                if (finalSelection) { // Check if a final selection was made
                    finalSelection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    setTimeout(() => {
                        finalSelection.click(); // Trigger the modal
                        console.log("Triggering click on final selection:", finalSelection.querySelector('p').innerText);
                        surpriseBtn.innerText = "✨ Surprise Me!";
                        surpriseBtn.disabled = false;
                    }, 500);
                } else {
                    console.warn("Final selection for surprise failed.");
                    surpriseBtn.innerText = "✨ Surprise Me!"; // Reset button even if selection fails
                    surpriseBtn.disabled = false;
                }
            }
        }, 100);
    });
} else {
    console.warn("Surprise Me button not found.");
}
});