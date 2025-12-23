import { useState } from 'react'
import './App.css'

interface UnsplashImage {
  keyword: string
  description: string
  imageUrl: string
  unsplashLink: string
  photographer: string
}

interface ImagesData {
  websiteType: string
  generatedAt: string
  images: UnsplashImage[]
}

function App() {
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [imagesData, setImagesData] = useState<ImagesData | null>(null)
  const [selectedImage, setSelectedImage] = useState<UnsplashImage | null>(null)

  const generateImages = async () => {
    if (!description.trim()) {
      setError('Please enter a website description')
      return
    }

    setLoading(true)
    setError('')
    setImagesData(null)

    try {
      const response = await fetch('http://localhost:3001/images/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate images')
      }

      const data = await response.json()
      setImagesData(data.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const loadExistingImages = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch('http://localhost:3001/images/current')
      if (!response.ok) {
        throw new Error('Failed to load images')
      }
      const data = await response.json()
      if (data.images) {
        setImagesData(data)
      } else {
        setError('No images found. Generate some first!')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🖼️ Image Manager</h1>
        <p>Generate website images using AI + Unsplash</p>
      </header>

      <main className="main">
        <section className="input-section">
          <div className="input-group">
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., cake selling website, fitness gym, tech startup..."
              className="description-input"
              disabled={loading}
            />
            <button
              onClick={generateImages}
              disabled={loading}
              className="generate-btn"
            >
              {loading ? 'Generating...' : 'Generate Images'}
            </button>
          </div>
          <button onClick={loadExistingImages} className="load-btn" disabled={loading}>
            Load Existing Images
          </button>
        </section>

        {error && <div className="error">{error}</div>}

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Generating 25 images... This may take a minute.</p>
          </div>
        )}

        {imagesData && (
          <section className="results">
            <div className="results-header">
              <h2>Images for: {imagesData.websiteType}</h2>
              <p>{imagesData.images.length} images • Generated {new Date(imagesData.generatedAt).toLocaleString()}</p>
            </div>

            <div className="gallery">
              {imagesData.images.map((image, index) => (
                <div
                  key={index}
                  className="image-card"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image.imageUrl}
                    alt={image.keyword}
                    loading="lazy"
                  />
                  <div className="image-info">
                    <h3>{image.keyword}</h3>
                    <p>{image.description}</p>
                    <span className="photographer">📷 {image.photographer}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Modal for selected image */}
        {selectedImage && (
          <div className="modal" onClick={() => setSelectedImage(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={() => setSelectedImage(null)}>×</button>
              <img src={selectedImage.imageUrl} alt={selectedImage.keyword} />
              <div className="modal-info">
                <h2>{selectedImage.keyword}</h2>
                <p>{selectedImage.description}</p>
                <p className="photographer">Photo by: {selectedImage.photographer}</p>
                <a
                  href={selectedImage.unsplashLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="unsplash-link"
                >
                  View on Unsplash ↗
                </a>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
