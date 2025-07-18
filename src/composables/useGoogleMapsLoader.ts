// composables/useGoogleMapsLoader.ts
export function useGoogleMapsLoader(apiKey: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof window.google !== 'undefined' && window.google.maps) {
        resolve()
        return
      }
  
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry`
      script.async = true
      script.defer = true
      script.onload = () => resolve()
      script.onerror = () => reject(new Error('Error loading Google Maps'))
      document.head.appendChild(script)
    })
  }