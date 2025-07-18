<template>
  <div class="p-4">
    <h1 class="text-xl font-semibold mb-4">Buscar Talleres Cercanos</h1>

    <div class="mb-4 flex flex-col gap-2 md:flex-row md:items-center">
      <input
        v-model="locationQuery"
        type="text"
        placeholder="Ubicación (ej: Madrid)"
        class="border border-gray-300 rounded px-3 py-2 w-full md:w-auto"
      />
      <input
        v-model.number="radius"
        type="number"
        placeholder="Radio en metros (ej: 5000)"
        class="border border-gray-300 rounded px-3 py-2 w-full md:w-auto"
      />
      <select
        v-model="sortBy"
        class="border border-gray-300 rounded px-3 py-2 w-full md:w-auto"
      >
        <option value="distance">Distancia</option>
        <option value="rating">Rating</option>
        <option value="reviews">Reviews</option>
      </select>
      <button
        @click="searchRepairShops"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Buscar
      </button>
    </div>

    <!-- Mapa o imagen de reemplazo -->
    <div v-if="!googleMapsLoaded" class="w-full h-96 bg-cover bg-center rounded" style="background-image: url('https://via.placeholder.com/600x400?text=Mapa+no+disponible');">
    </div>
    <div v-else id="map" class="w-full h-96 rounded shadow"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useGoogleMapsLoader } from '../composables/useGoogleMapsLoader'

const locationQuery = ref('')
const radius = ref(5000)
const sortBy = ref('distance')
const map = ref<google.maps.Map>()
const googleMapsLoaded = ref(false)

const searchRepairShops = () => {
  if (!map.value || !locationQuery.value) return

  const geocoder = new google.maps.Geocoder()
  geocoder.geocode({ address: locationQuery.value }, (results, status) => {
    if (status === 'OK' && results && results[0]) {
      const location = results[0].geometry?.location
      if (!location) return

      map.value?.setCenter(location)

      const service = new google.maps.places.PlacesService(map.value!)
      service.nearbySearch(
        {
          location,
          radius: radius.value,
          keyword: 'repair shop',
        },
        (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            let sortedResults = [...results]
            switch (sortBy.value) {
              case 'rating':
                sortedResults.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
                break
              case 'reviews':
                sortedResults.sort((a, b) => (b.user_ratings_total ?? 0) - (a.user_ratings_total ?? 0))
                break
              case 'distance':
              default:
                sortedResults.sort((a, b) =>
                  google.maps.geometry.spherical.computeDistanceBetween(location, a.geometry?.location!) -
                  google.maps.geometry.spherical.computeDistanceBetween(location, b.geometry?.location!)
                )
            }

            sortedResults.forEach(place => {
              if (!place.geometry || !place.geometry.location) return
              new google.maps.Marker({
                map: map.value!,
                position: place.geometry.location,
                title: place.name,
              })
            })
          }
        }
      )
    }
  })
}

onMounted(async () => {
  try {
    await useGoogleMapsLoader('TU_API_KEY')
    googleMapsLoaded.value = true

    map.value = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: { lat: 40.4168, lng: -3.7038 },
      zoom: 12,
    })
  } catch (error) {
    console.error('Error cargando Google Maps:', error)
  }
})
</script>