// دالة لتحديث شبكة باقي الرحلات مع ضبط عرض الصور والنصوص بشكل مثالي
function updateLaunchesGrid(launches) {
  const gridContainer = document.getElementById('launches-grid');
  if (!gridContainer) return;

  gridContainer.innerHTML = '';

  launches.forEach(launch => {
    const launchDate = new Date(launch.net);
    const formattedDate = launchDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const formattedTime = launchDate.getUTCHours().toString().padStart(2, '0') + ':' + 
                          launchDate.getUTCMinutes().toString().padStart(2, '0') + ' UTC';

    const statusName = launch.status?.abbrev || 'TBD';
    let badgeColor = 'bg-blue-500/90';
    if (statusName === 'Go') badgeColor = 'bg-green-500/90';
    else if (statusName === 'TBC') badgeColor = 'bg-yellow-500/90';

    // استخدام صورة بديلة إذا لم تتوفر صورة للرحلة
    const launchImage = launch.image ? launch.image : './assets/images/earth.png';

    const cardHTML = `
      <div class="bg-slate-800/80 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer flex flex-col justify-between">
        <!-- قسم الصورة -->
        <div class="relative h-40 bg-slate-900 overflow-hidden">
          <img src="${launchImage}" alt="${launch.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
          <div class="absolute top-3 right-3 z-10">
            <span class="px-3 py-1 ${badgeColor} text-white backdrop-blur-md rounded-full text-xs font-semibold shadow-md">
              ${statusName}
            </span>
          </div>
        </div>
        
        <!-- قسم النصوص والبيانات -->
        <div class="p-5 flex-1 flex flex-col justify-between">
          <div class="mb-3">
            <h4 class="font-bold text-base mb-1 line-clamp-2 group-hover:text-blue-400 transition-colors text-white">
              ${launch.name}
            </h4>
            <p class="text-xs text-slate-400 flex items-center gap-2">
              <i class="fas fa-building text-xs"></i>
              ${launch.launch_service_provider?.name || 'Agency'}
            </p>
          </div>
          
          <div class="space-y-1.5 mb-4 text-xs">
            <div class="flex items-center gap-2">
              <i class="fas fa-calendar text-slate-500 w-4"></i>
              <span class="text-slate-300">${formattedDate}</span>
            </div>
            <div class="flex items-center gap-2">
              <i class="fas fa-clock text-slate-500 w-4"></i>
              <span class="text-slate-300">${formattedTime}</span>
            </div>
            <div class="flex items-center gap-2">
              <i class="fas fa-rocket text-slate-500 w-4"></i>
              <span class="text-slate-300">${launch.rocket?.configuration?.name || 'Rocket'}</span>
            </div>
            <div class="flex items-center gap-2">
              <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
              <span class="text-slate-300 line-clamp-1">${launch.pad?.location?.name || 'Location'}</span>
            </div>
          </div>

          <div class="flex items-center gap-2 pt-3 border-t border-slate-700/60">
            <a href="${launch.vidURLs?.[0]?.url || '#'}" target="_blank" class="flex-1 text-center px-3 py-2 bg-slate-700/80 hover:bg-slate-600 rounded-lg transition-colors text-xs font-semibold text-white">
              Details
            </a>
            <button class="px-3 py-2 bg-slate-700/80 hover:bg-slate-600 rounded-lg transition-colors text-slate-300 hover:text-red-400">
              <i class="far fa-heart"></i>
            </button>
          </div>
        </div>
      </div>
    `;
    gridContainer.insertAdjacentHTML('beforeend', cardHTML);
  });
}


















// بيانات الكواكب الحقيقية والمنظمة (لا تحتاج لاتصال خارجي وتعمل بكفاءة عالية)
const planetsData = [
  {
    id: "mercury",
    englishName: "Mercury",
    gravity: 3.7,
    semimajorAxis: 57909227,
    meanRadius: 2439.7,
    mass: { massValue: 3.3011, massExponent: 23 },
    density: 5.427,
    sideralOrbit: 88,
    sideralRotation: 1407.6,
    moons: [],
    discoveredBy: "Known since antiquity",
    discoveryDate: "Ancient",
    isPlanet: true,
    perihelion: 46001272,
    aphelion: 69816900,
    eccentricity: 0.2056,
    inclination: 7.00,
    axialTilt: 0.034,
    avgTemp: 440,
    escape: 4.25,
    color: "#eab308",
    img: "./assets/images/mercury.png"
  },
  {
    id: "venus",
    englishName: "Venus",
    gravity: 8.87,
    semimajorAxis: 108208475,
    meanRadius: 6051.8,
    mass: { massValue: 4.8675, massExponent: 24 },
    density: 5.243,
    sideralOrbit: 225,
    sideralRotation: -5832.5,
    moons: [],
    discoveredBy: "Known since antiquity",
    discoveryDate: "Ancient",
    isPlanet: true,
    perihelion: 107477000,
    aphelion: 108939000,
    eccentricity: 0.0067,
    inclination: 3.39,
    axialTilt: 177.36,
    avgTemp: 737,
    escape: 10.46,
    color: "#f97316",
    img: "./assets/images/venus.png"
  },
  {
    id: "earth",
    englishName: "Earth",
    gravity: 9.8,
    semimajorAxis: 149598023,
    meanRadius: 6371,
    mass: { massValue: 5.9723, massExponent: 24 },
    density: 5.514,
    sideralOrbit: 365.25,
    sideralRotation: 23.93,
    moons: [ { rel: "Moon" } ],
    discoveredBy: "Known since antiquity",
    discoveryDate: "Ancient",
    isPlanet: true,
    perihelion: 147095000,
    aphelion: 152100000,
    eccentricity: 0.0167,
    inclination: 0.00,
    axialTilt: 23.44,
    avgTemp: 288,
    escape: 11.2,
    color: "#3b82f6",
    img: "./assets/images/earth.png"
  },
  {
    id: "mars",
    englishName: "Mars",
    gravity: 3.72,
    semimajorAxis: 227939200,
    meanRadius: 3389.5,
    mass: { massValue: 6.4171, massExponent: 23 },
    density: 3.934,
    sideralOrbit: 687,
    sideralRotation: 24.62,
    moons: [ { rel: "Phobos" }, { rel: "Deimos" } ],
    discoveredBy: "Known since antiquity",
    discoveryDate: "Ancient",
    isPlanet: true,
    perihelion: 206620000,
    aphelion: 249230000,
    eccentricity: 0.0934,
    inclination: 1.85,
    axialTilt: 25.19,
    avgTemp: 210,
    escape: 5.03,
    color: "#ef4444",
    img: "./assets/images/mars.png"
  },
  {
    id: "jupiter",
    englishName: "Jupiter",
    gravity: 24.79,
    semimajorAxis: 778547200,
    meanRadius: 69911,
    mass: { massValue: 1.8982, massExponent: 27 },
    density: 1.326,
    sideralOrbit: 4333,
    sideralRotation: 9.93,
    moons: new Array(79), // تمثيل عدد الأقمار
    discoveredBy: "Known since antiquity",
    discoveryDate: "Ancient",
    isPlanet: true,
    perihelion: 740573600,
    aphelion: 816620800,
    eccentricity: 0.0489,
    inclination: 1.30,
    axialTilt: 3.13,
    avgTemp: 165,
    escape: 59.5,
    color: "#fb923c",
    img: "./assets/images/jupiter.png"
  },
  {
    id: "saturn",
    englishName: "Saturn",
    gravity: 10.44,
    semimajorAxis: 1433449370,
    meanRadius: 58232,
    mass: { massValue: 5.6834, massExponent: 26 },
    density: 0.687,
    sideralOrbit: 10759,
    sideralRotation: 10.7,
    moons: new Array(82),
    discoveredBy: "Known since antiquity",
    discoveryDate: "Ancient",
    isPlanet: true,
    perihelion: 1352550000,
    aphelion: 1514500000,
    eccentricity: 0.0565,
    inclination: 2.48,
    axialTilt: 26.73,
    avgTemp: 134,
    escape: 35.5,
    color: "#facc15",
    img: "./assets/images/saturn.png"
  },
  {
    id: "uranus",
    englishName: "Uranus",
    gravity: 8.69,
    semimajorAxis: 2876679082,
    meanRadius: 25362,
    mass: { massValue: 8.6810, massExponent: 25 },
    density: 1.27,
    sideralOrbit: 30687,
    sideralRotation: -17.24,
    moons: new Array(27),
    discoveredBy: "William Herschel",
    discoveryDate: "13/03/1781",
    isPlanet: true,
    perihelion: 2741300000,
    aphelion: 3011000000,
    eccentricity: 0.0463,
    inclination: 0.77,
    axialTilt: 97.77,
    avgTemp: 76,
    escape: 21.3,
    color: "#06b6d4",
    img: "./assets/images/uranus.png"
  },
  {
    id: "neptune",
    englishName: "Neptune",
    gravity: 11.15,
    semimajorAxis: 4503443661,
    meanRadius: 24622,
    mass: { massValue: 1.0241, massExponent: 26 },
    density: 1.638,
    sideralOrbit: 60190,
    sideralRotation: 16.11,
    moons: new Array(14),
    discoveredBy: "Urbain Le Verrier, John Couch Adams, Johann Galle",
    discoveryDate: "23/09/1846",
    isPlanet: true,
    perihelion: 4444450000,
    aphelion: 4545670000,
    eccentricity: 0.00945,
    inclination: 1.77,
    axialTilt: 28.32,
    avgTemp: 55,
    escape: 23.5,
    color: "#2563eb",
    img: "./assets/images/neptune.png"
  }
];

function initSolarSystemExplorer() {
  const planetCards = document.querySelectorAll('.planet-card');
  
  planetCards.forEach(card => {
    card.addEventListener('click', () => {
      const planetId = card.getAttribute('data-planet-id');
      const selectedPlanet = planetsData.find(p => p.id === planetId);
      
      if (selectedPlanet) {
        updatePlanetData(selectedPlanet);
      }
    });
  });

  // تعيين الأرض كافتراضي عند فتح الصفحة
  const defaultPlanet = planetsData.find(p => p.id === 'earth');
  if (defaultPlanet) {
    updatePlanetData(defaultPlanet);
  }
}

function updatePlanetData(planet) {
  document.getElementById('planet-detail-name').textContent = planet.englishName;
  
  const detailImage = document.getElementById('planet-detail-image');
  detailImage.src = planet.img;
  detailImage.alt = `${planet.englishName} planet detailed realistic render`;

  document.getElementById('planet-detail-description').textContent = 
    `${planet.englishName} is a celestial body in our solar system. It features a surface gravity of ${planet.gravity} m/s² and orbits the Sun at a mean distance of approximately ${(planet.semimajorAxis / 149597870.7).toFixed(1)}M km.`;

  document.getElementById('planet-distance').textContent = (planet.semimajorAxis / 149597870.7 / 149.6).toFixed(2) + ' AU';
  document.getElementById('planet-radius').textContent = `${planet.meanRadius.toLocaleString()} km`;
  document.getElementById('planet-mass').textContent = `${planet.mass.massValue} × 10^${planet.mass.massExponent} kg`;
  document.getElementById('planet-density').textContent = `${planet.density} g/cm³`;
  document.getElementById('planet-orbital-period').textContent = `${planet.sideralOrbit} days`;
  document.getElementById('planet-rotation').textContent = `${Math.abs(planet.sideralRotation).toFixed(1)} hours`;
  
  const moonsCount = planet.moons ? planet.moons.length : 0;
  document.getElementById('planet-moons').textContent = moonsCount;
  
  document.getElementById('planet-gravity').textContent = `${planet.gravity} m/s²`;

  document.getElementById('planet-discoverer').textContent = planet.discoveredBy;
  document.getElementById('planet-discovery-date').textContent = planet.discoveryDate;
  document.getElementById('planet-body-type').textContent = planet.isPlanet ? 'Planet' : 'Celestial Body';

  document.getElementById('planet-perihelion').textContent = `${(planet.perihelion / 1000000).toFixed(1)}M km`;
  document.getElementById('planet-aphelion').textContent = `${(planet.aphelion / 1000000).toFixed(1)}M km`;
  document.getElementById('planet-eccentricity').textContent = planet.eccentricity;
  document.getElementById('planet-inclination').textContent = `${planet.inclination}°`;
  document.getElementById('planet-axial-tilt').textContent = `${planet.axialTilt}°`;
  
  if (planet.avgTemp) {
    const tempC = Math.round(planet.avgTemp - 273.15);
    document.getElementById('planet-temp').textContent = `${tempC > 0 ? '+' : ''}${tempC}°C`;
  } else {
    document.getElementById('planet-temp').textContent = 'N/A';
  }

  document.getElementById('planet-escape').textContent = `${planet.escape} km/s`;
}

document.addEventListener('DOMContentLoaded', initSolarSystemExplorer);


