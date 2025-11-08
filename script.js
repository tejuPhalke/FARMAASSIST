function showPage(pageId) {
            // Hide all pages
            const pages = document.querySelectorAll('.page');
            pages.forEach(page => {
                page.classList.remove('active');
            });

            // Show selected page
            const targetPage = document.getElementById(pageId);
            if (targetPage) {
                targetPage.classList.add('active');
            }

            // Update nav links
            const navLinks = document.querySelectorAll('.nav-btn');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.dataset.page === pageId) {
                    link.classList.add('active');
                }
            });

            // Close mobile menu
            const nav = document.getElementById('nav');
            const mobileBtn = document.getElementById('mobileMenuBtn');
            nav.classList.remove('active');
            mobileBtn.classList.remove('active');

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Mobile menu toggle
        document.getElementById('mobileMenuBtn').addEventListener('click', function() {
            const nav = document.getElementById('nav');
            const btn = this;
            
            nav.classList.toggle('active');
            btn.classList.toggle('active');
        });

        // Navigation link handlers
        document.querySelectorAll('.nav-btn').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const pageId = link.dataset.page;
                if (pageId) {
                    showPage(pageId);
                }
            });
        });

        // Weather Function
        function getWeather() {
            const city = document.getElementById("cityInput").value;
            const result = document.getElementById("weatherResult");

            if (!city) {
                alert("Please enter a city name");
                return;
            }

            // Show loading
            result.innerHTML = '<div class="loading"></div> Getting weather data...';
            result.classList.add('show');

            // Simulate API call with timeout
            setTimeout(() => {
                const weatherData = {
                    'New Delhi': { temp: '28°C', condition: 'Sunny', humidity: '65%', wind: '15 km/h' },
                    'Mumbai': { temp: '32°C', condition: 'Humid', humidity: '85%', wind: '12 km/h' },
                    'Bangalore': { temp: '25°C', condition: 'Pleasant', humidity: '70%', wind: '8 km/h' },
                    'Chennai': { temp: '30°C', condition: 'Hot', humidity: '80%', wind: '10 km/h' }
                };

                const weather = weatherData[city] || { temp: '26°C', condition: 'Clear', humidity: '60%', wind: '10 km/h' };
                
                result.innerHTML = `
                    <h4>Weather in ${city}</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem;">
                        <div><strong>Temperature:</strong> ${weather.temp}</div>
                        <div><strong>Condition:</strong> ${weather.condition}</div>
                        <div><strong>Humidity:</strong> ${weather.humidity}</div>
                        <div><strong>Wind Speed:</strong> ${weather.wind}</div>
                    </div>
                    <div style="margin-top: 1rem; padding: 1rem; background: #e8f5e8; border-radius: 8px;">
                        <strong>Farming Recommendation:</strong><br>
                        Good conditions for field work. Consider irrigation if humidity is low.
                    </div>
                `;
            }, 1500);
        }

        // Fertilizer Calculator
        function calculateFertilizer() {
            const crop = document.getElementById('fertilizerCrop').value;
            const area = parseFloat(document.getElementById('fertilizerArea').value);
            const soilType = document.getElementById('soilType').value;

            if (!area || area <= 0) {
                alert('Please enter a valid area');
                return;
            }

            const fertilizerRates = {
                wheat: { n: 120, p: 60, k: 40 },
                rice: { n: 100, p: 50, k: 50 },
                corn: { n: 150, p: 75, k: 60 },
                vegetables: { n: 80, p: 40, k: 60 },
                cotton: { n: 100, p: 50, k: 50 },
                sugarcane: { n: 200, p: 100, k: 100 }
            };

            // Soil adjustment factors
            const soilFactors = {
                clay: { n: 1.1, p: 0.9, k: 1.0 },
                sandy: { n: 1.2, p: 1.1, k: 1.2 },
                loam: { n: 1.0, p: 1.0, k: 1.0 },
                silt: { n: 0.9, p: 1.0, k: 0.9 }
            };

            const rates = fertilizerRates[crop];
            const factors = soilFactors[soilType];

            const nNeeded = Math.round(rates.n * area * factors.n);
            const pNeeded = Math.round(rates.p * area * factors.p);
            const kNeeded = Math.round(rates.k * area * factors.k);

            // Calculate common fertilizer quantities
            const urea = Math.round(nNeeded / 0.46); // Urea is 46% N
            const dap = Math.round(pNeeded / 0.46); // DAP is 46% P2O5
            const mop = Math.round(kNeeded / 0.60); // MOP is 60% K2O

            const resultDiv = document.getElementById('fertilizerResult');
            resultDiv.innerHTML = `
                <h4>Fertilizer Requirements for ${area} acres of ${crop}:</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1rem 0;">
                    <div><strong>Nitrogen (N):</strong> ${nNeeded} kg</div>
                    <div><strong>Phosphorus (P):</strong> ${pNeeded} kg</div>
                    <div><strong>Potassium (K):</strong> ${kNeeded} kg</div>
                    <div><strong>Soil Type:</strong> ${soilType}</div>
                </div>
                <h4>Commercial Fertilizer Quantities:</h4>
                <div style="margin: 1rem 0;">
                    <p><strong>Urea:</strong> ${urea} kg</p>
                    <p><strong>DAP:</strong> ${dap} kg</p>
                    <p><strong>MOP:</strong> ${kNeeded} kg</p>
                </div>
                <div style="background: #fff3cd; padding: 1rem; border-radius: 8px; margin-top: 1rem;">
                    <strong>Application Schedule:</strong><br>
                    • Apply 50% nitrogen as basal dose<br>
                    • Apply remaining nitrogen in 2 split doses<br>
                    • Apply full phosphorus and potassium as basal dose
                </div>
            `;
            resultDiv.classList.add('show');
        }

        // Price Alert Function
        function setPriceAlert() {
            const crop = document.getElementById('alertCrop').value;
            const targetPrice = document.getElementById('targetPrice').value;
            const resultDiv = document.getElementById('alertResult');

            if (!targetPrice) {
                alert('Please enter target price');
                return;
            }

            resultDiv.innerHTML = `
                <h4>Price Alert Set Successfully!</h4>
                <p><strong>Crop:</strong> ${crop.charAt(0).toUpperCase() + crop.slice(1)}</p>
                <p><strong>Target Price:</strong> ₹${targetPrice}/quintal</p>
                <p>You will be notified when the price reaches your target.</p>
            `;
            resultDiv.classList.add('show');
        }

        // Update Prices Function
        function updatePrices() {
            const button = event.target;
            const originalText = button.innerHTML;
            
            button.innerHTML = '<div class="loading"></div> Updating...';
            button.disabled = true;

            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
                alert('Prices updated successfully!');
            }, 2000);
        }

        // Profit Calculator
        function calculateProfit() {
            const crop = document.getElementById('profitCrop').value;
            const area = parseFloat(document.getElementById('profitArea').value);
            const yieldPerAcre = parseFloat(document.getElementById('profitYield').value);
            const sellingPrice = parseFloat(document.getElementById('profitSellingPrice').value);

            if (!area || !yieldPerAcre || !sellingPrice) {
                alert('Please fill all fields');
                return;
            }

            const totalYield = area * yieldPerAcre;
            const grossIncome = totalYield * sellingPrice;

            // Estimated costs per acre for different crops
            const costEstimates = {
                wheat: 15000,
                rice: 18000,
                tomato: 25000,
                potato: 22000,
                corn: 16000
            };

            const estimatedCost = area * (costEstimates[crop] || 15000);
            const netProfit = grossIncome - estimatedCost;
            const profitPerAcre = netProfit / area;

            const resultDiv = document.getElementById('profitResult');
            resultDiv.innerHTML = `
                <h4>Profit Analysis for ${crop.charAt(0).toUpperCase() + crop.slice(1)}:</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1rem 0;">
                    <div><strong>Total Yield:</strong> ${totalYield} quintals</div>
                    <div><strong>Gross Income:</strong> ₹${grossIncome.toLocaleString()}</div>
                    <div><strong>Estimated Cost:</strong> ₹${estimatedCost.toLocaleString()}</div>
                    <div><strong>Net Profit:</strong> ₹${netProfit.toLocaleString()}</div>
                </div>
                <div style="background: ${netProfit > 0 ? '#d4edda' : '#f8d7da'}; padding: 1rem; border-radius: 8px;">
                    <strong>Profit per Acre:</strong> ₹${profitPerAcre.toLocaleString()}<br>
                    <strong>Profit Margin:</strong> ${((netProfit/grossIncome)*100).toFixed(1)}%
                </div>
            `;
            resultDiv.classList.add('show');
        }

        // Detailed Cost Analysis
        function calculateDetailedProfit() {
            const seedCost = parseFloat(document.getElementById('seedCost').value) || 0;
            const fertilizerCost = parseFloat(document.getElementById('fertilizerCost').value) || 0;
            const laborCost = parseFloat(document.getElementById('laborCost').value) || 0;
            const otherCosts = parseFloat(document.getElementById('otherCosts').value) || 0;

            const totalCosts = seedCost + fertilizerCost + laborCost + otherCosts;

            const resultDiv = document.getElementById('costResult');
            resultDiv.innerHTML = `
                <h4>Detailed Cost Breakdown:</h4>
                <div style="margin: 1rem 0;">
                    <div style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid #eee;">
                        <span>Seed Cost:</span><span>₹${seedCost.toLocaleString()}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid #eee;">
                        <span>Fertilizer Cost:</span><span>₹${fertilizerCost.toLocaleString()}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid #eee;">
                        <span>Labor Cost:</span><span>₹${laborCost.toLocaleString()}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid #eee;">
                        <span>Other Costs:</span><span>₹${otherCosts.toLocaleString()}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; padding: 0.5rem 0; font-weight: bold; background: #f8f9fa; padding: 1rem; border-radius: 8px;">
                        <span>Total Costs:</span><span>₹${totalCosts.toLocaleString()}</span>
                    </div>
                </div>
                <div style="background: #e3f2fd; padding: 1rem; border-radius: 8px; margin-top: 1rem;">
                    <strong>Cost Distribution:</strong><br>
                    Seeds: ${((seedCost/totalCosts)*100).toFixed(1)}% | 
                    Fertilizer: ${((fertilizerCost/totalCosts)*100).toFixed(1)}% | 
                    Labor: ${((laborCost/totalCosts)*100).toFixed(1)}% | 
                    Others: ${((otherCosts/totalCosts)*100).toFixed(1)}%
                </div>
            `;
            resultDiv.classList.add('show');
        }

        // Initialize page
        document.addEventListener('DOMContentLoaded', function() {
            // Set today's date for weather
            const today = new Date();
            const cityInput = document.getElementById('cityInput');
            if (cityInput && !cityInput.value) {
                cityInput.value = 'New Delhi';
            }

            // Mobile menu close on resize
            window.addEventListener('resize', function() {
                if (window.innerWidth > 768) {
                    document.getElementById('nav').classList.remove('active');
                    document.getElementById('mobileMenuBtn').classList.remove('active');
                }
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', function(event) {
                const nav = document.getElementById('nav');
                const btn = document.getElementById('mobileMenuBtn');
                
                if (!nav.contains(event.target) && !btn.contains(event.target)) {
                    nav.classList.remove('active');
                    btn.classList.remove('active');
                }
            });
        });

        // Google Search Functions
        function performGoogleSearch() {
            const searchInput = document.getElementById('googleSearchInput');
            const query = searchInput.value.trim();
            
            if (!query) {
                alert('Please enter a search query');
                searchInput.focus();
                return;
            }
            
            // Open Google search in new tab
            const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
            window.open(searchUrl, '_blank');
            
            // Add visual feedback
            searchInput.style.transform = 'scale(0.98)';
            setTimeout(() => {
                searchInput.style.transform = 'scale(1)';
            }, 150);
        }

        function handleSearchKeyPress(event) {
            if (event.key === 'Enter') {
                performGoogleSearch();
            }
        }

        function searchFarmingTips() {
            const searchUrl = 'https://www.google.com/search?q=best+farming+tips+and+techniques';
            window.open(searchUrl, '_blank');
        }

        function searchCropDiseases() {
            const searchUrl = 'https://www.google.com/search?q=common+crop+diseases+and+treatment';
            window.open(searchUrl, '_blank');
        }

        function searchMarketTrends() {
            const searchUrl = 'https://www.google.com/search?q=agricultural+market+trends+and+prices';
            window.open(searchUrl, '_blank');
        }
