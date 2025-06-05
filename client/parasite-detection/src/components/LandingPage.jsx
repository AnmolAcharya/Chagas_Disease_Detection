import React, { useState } from 'react';
import './LandingPage.css';

const LandingPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [resultImageUrl, setResultImageUrl] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselData = [
    {
      title: "What is Chagas Disease?",
      content: `Chagas disease is caused by the parasite Trypanosoma cruzi and is primarily transmitted through triatomine bugs, 
      also known as "kissing bugs." This disease affects millions of people across the Americas and can cause serious 
      cardiac, digestive, and neurological complications if left untreated.`
    },
    {
      title: "Disease Causes & Transmission",
      content: `The main route of transmission is through triatomine bugs that carry the T. cruzi parasite. These insects feed 
      on blood at night and transmit the parasite through their feces. Transmission can also occur through contaminated food, 
      blood transfusions, organ transplants, and from mother to child during pregnancy.`
    },
    {
      title: "Parasite Details",
      content: `Trypanosoma cruzi is a protozoan parasite that cycles between vertebrate hosts and insect vectors. In human blood, 
      it appears as trypomastigotes, which can invade cells and transform into amastigotes. The parasite's ability to hide 
      within cells makes it particularly challenging to treat.`
    },
    {
      title: "Disease Cases & Impact",
      content: `Chagas disease affects approximately 6-7 million people worldwide, primarily in Latin America. However, cases 
      have been reported globally due to migration. The disease causes about 10,000 deaths annually and creates a significant 
      economic burden in affected regions.`
    },
    {
      title: "Treatment & Prevention",
      content: `Treatment is most effective in the acute phase using antiparasitic drugs like benznidazole and nifurtimox. 
      Prevention methods include: 
      • Using insecticide-treated bed nets
      • Maintaining clean living spaces
      • Regular insect control measures
      • Blood screening programs
      • Avoiding sleeping in high-risk areas`
    }
  ];

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResultImageUrl(null); // Reset result if re-uploading
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("file", selectedImage);

    try {
      const response = await fetch("http://localhost:8000/predict-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to get prediction image");
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setResultImageUrl(imageUrl);
    } catch (error) {
      console.error("Error uploading or analyzing image:", error);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselData.length) % carouselData.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="landing-container">
      <header className="header">
        <h1>Chagas Disease Detection System</h1>
        <p className="subtitle">Advanced Parasitic Detection through Blood Smear Analysis</p>
      </header>

      <section className="upload-section">
        <h2>Upload Blood Smear Image</h2>
        <form onSubmit={handleSubmit} className="upload-form">
          <div className="file-input-container">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input"
            />
            <button type="submit" className="submit-button">
              Analyze Image
            </button>
          </div>
          {previewUrl && (
            <div className="image-preview">
              <h3>Selected Image Preview:</h3>
              <img src={previewUrl} alt="Preview" />
            </div>
          )}
        </form>
        {resultImageUrl && (
          <div className="result-section">
            <h3>AI Detection Result:</h3>
            <img src={resultImageUrl} alt="Prediction result" className="result-image" />
          </div>
        )}
      </section>

      <section className="demo-section">
        <h2>How It Works</h2>
        <p className="demo-description">
          Our advanced AI model analyzes blood smear images to detect and highlight potential Trypanosoma cruzi parasites,
          helping healthcare professionals in diagnosis.
        </p>
        <div className="demo-container">
          <div className="demo-image-container">
            <h3>Original Blood Smear</h3>
            <div className="demo-image">
              <img src="/1.jpg" alt="Original blood smear sample" />
              <div className="image-caption">
                Blood smear sample viewed under microscope
              </div>
            </div>
          </div>
          <div className="demo-arrow">→</div>
          <div className="demo-image-container">
            <h3>AI Detection Result</h3>
            <div className="demo-image">
              <img src="/image.jpg" alt="Detection result with highlighted parasites" />
              <div className="image-caption">
                Parasites detected and highlighted by our AI model
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="carousel-section">
        <h2>About Chagas Disease</h2>
        <div className="carousel-container">
          <button className="carousel-button prev" onClick={prevSlide}>❮</button>
          {carouselData.map((slide, index) => (
            <div
              key={index}
              className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
            >
              <h3 className="carousel-title">{slide.title}</h3>
              <p className="carousel-content">{slide.content}</p>
            </div>
          ))}
          <button className="carousel-button next" onClick={nextSlide}>❯</button>

          <div className="carousel-nav">
            {carouselData.map((_, index) => (
              <div
                key={index}
                className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;






////May 30's code part
// import React, { useState } from 'react';
// import './LandingPage.css';

// const LandingPage = () => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [resultImageUrl, setResultImageUrl] = useState(null);
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const carouselData = [
//     {
//       title: "What is Chagas Disease?",
//       content: `Chagas disease is caused by the parasite Trypanosoma cruzi and is primarily transmitted through triatomine bugs, 
//       also known as "kissing bugs." This disease affects millions of people across the Americas and can cause serious 
//       cardiac, digestive, and neurological complications if left untreated.`
//     },
//     {
//       title: "Disease Causes & Transmission",
//       content: `The main route of transmission is through triatomine bugs that carry the T. cruzi parasite. These insects feed 
//       on blood at night and transmit the parasite through their feces. Transmission can also occur through contaminated food, 
//       blood transfusions, organ transplants, and from mother to child during pregnancy.`
//     },
//     {
//       title: "Parasite Details",
//       content: `Trypanosoma cruzi is a protozoan parasite that cycles between vertebrate hosts and insect vectors. In human blood, 
//       it appears as trypomastigotes, which can invade cells and transform into amastigotes. The parasite's ability to hide 
//       within cells makes it particularly challenging to treat.`
//     },
//     {
//       title: "Disease Cases & Impact",
//       content: `Chagas disease affects approximately 6-7 million people worldwide, primarily in Latin America. However, cases 
//       have been reported globally due to migration. The disease causes about 10,000 deaths annually and creates a significant 
//       economic burden in affected regions.`
//     },
//     {
//       title: "Treatment & Prevention",
//       content: `Treatment is most effective in the acute phase using antiparasitic drugs like benznidazole and nifurtimox. 
//       Prevention methods include: 
//       • Using insecticide-treated bed nets
//       • Maintaining clean living spaces
//       • Regular insect control measures
//       • Blood screening programs
//       • Avoiding sleeping in high-risk areas`
//     }
//   ];

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedImage(file);
//       setPreviewUrl(URL.createObjectURL(file));
//       setResultImageUrl(null); // Reset result if re-uploading
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!selectedImage) return;

//     const formData = new FormData();
//     formData.append("file", selectedImage);

//     try {
//       const response = await fetch("http://localhost:8000/predict", {
//         method: "POST",
//         body: formData,
//       });

//       const blob = await response.blob();
//       const imageUrl = URL.createObjectURL(blob);
//       setResultImageUrl(imageUrl);
//     } catch (error) {
//       console.error("Error uploading or analyzing image:", error);
//     }
//   };

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % carouselData.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + carouselData.length) % carouselData.length);
//   };

//   const goToSlide = (index) => {
//     setCurrentSlide(index);
//   };

//   return (
//     <div className="landing-container">
//       <header className="header">
//         <h1>Chagas Disease Detection System</h1>
//         <p className="subtitle">Advanced Parasitic Detection through Blood Smear Analysis</p>
//       </header>

//       <section className="upload-section">
//         <h2>Upload Blood Smear Image</h2>
//         <form onSubmit={handleSubmit} className="upload-form">
//           <div className="file-input-container">
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="file-input"
//             />
//             <button type="submit" className="submit-button">
//               Analyze Image
//             </button>
//           </div>
//           {previewUrl && (
//             <div className="image-preview">
//               <h3>Selected Image Preview:</h3>
//               <img src={previewUrl} alt="Preview" />
//             </div>
//           )}
//         </form>
//         {resultImageUrl && (
//           <div className="result-section">
//             <h3>AI Detection Result:</h3>
//             <img src={resultImageUrl} alt="Prediction result" className="result-image" />
//           </div>
//         )}
//       </section>

//       <section className="demo-section">
//         <h2>How It Works</h2>
//         <p className="demo-description">
//           Our advanced AI model analyzes blood smear images to detect and highlight potential Trypanosoma cruzi parasites,
//           helping healthcare professionals in diagnosis.
//         </p>
//         <div className="demo-container">
//           <div className="demo-image-container">
//             <h3>Original Blood Smear</h3>
//             <div className="demo-image">
//               <img src="/1.jpg" alt="Original blood smear sample" />
//               <div className="image-caption">
//                 Blood smear sample viewed under microscope
//               </div>
//             </div>
//           </div>
//           <div className="demo-arrow">→</div>
//           <div className="demo-image-container">
//             <h3>AI Detection Result</h3>
//             <div className="demo-image">
//               <img src="/image.jpg" alt="Detection result with highlighted parasites" />
//               <div className="image-caption">
//                 Parasites detected and highlighted by our AI model
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="carousel-section">
//         <h2>About Chagas Disease</h2>
//         <div className="carousel-container">
//           <button className="carousel-button prev" onClick={prevSlide}>❮</button>
//           {carouselData.map((slide, index) => (
//             <div
//               key={index}
//               className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
//             >
//               <h3 className="carousel-title">{slide.title}</h3>
//               <p className="carousel-content">{slide.content}</p>
//             </div>
//           ))}
//           <button className="carousel-button next" onClick={nextSlide}>❯</button>
          
//           <div className="carousel-nav">
//             {carouselData.map((_, index) => (
//               <div
//                 key={index}
//                 className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
//                 onClick={() => goToSlide(index)}
//               />
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default LandingPage;



/////before may 30, may 28-29

// import React, { useState } from 'react';
// import './LandingPage.css';

// const LandingPage = () => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const carouselData = [
//     {
//       title: "What is Chagas Disease?",
//       content: `Chagas disease is caused by the parasite Trypanosoma cruzi and is primarily transmitted through triatomine bugs, 
//       also known as "kissing bugs." This disease affects millions of people across the Americas and can cause serious 
//       cardiac, digestive, and neurological complications if left untreated.`
//     },
//     {
//       title: "Disease Causes & Transmission",
//       content: `The main route of transmission is through triatomine bugs that carry the T. cruzi parasite. These insects feed 
//       on blood at night and transmit the parasite through their feces. Transmission can also occur through contaminated food, 
//       blood transfusions, organ transplants, and from mother to child during pregnancy.`
//     },
//     {
//       title: "Parasite Details",
//       content: `Trypanosoma cruzi is a protozoan parasite that cycles between vertebrate hosts and insect vectors. In human blood, 
//       it appears as trypomastigotes, which can invade cells and transform into amastigotes. The parasite's ability to hide 
//       within cells makes it particularly challenging to treat.`
//     },
//     {
//       title: "Disease Cases & Impact",
//       content: `Chagas disease affects approximately 6-7 million people worldwide, primarily in Latin America. However, cases 
//       have been reported globally due to migration. The disease causes about 10,000 deaths annually and creates a significant 
//       economic burden in affected regions.`
//     },
//     {
//       title: "Treatment & Prevention",
//       content: `Treatment is most effective in the acute phase using antiparasitic drugs like benznidazole and nifurtimox. 
//       Prevention methods include: 
//       • Using insecticide-treated bed nets
//       • Maintaining clean living spaces
//       • Regular insect control measures
//       • Blood screening programs
//       • Avoiding sleeping in high-risk areas`
//     }
//   ];

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedImage(file);
//       setPreviewUrl(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // TODO: Add image processing logic here
//     console.log('Image submitted:', selectedImage);
//   };

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % carouselData.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + carouselData.length) % carouselData.length);
//   };

//   const goToSlide = (index) => {
//     setCurrentSlide(index);
//   };

//   return (
//     <div className="landing-container">
//       <header className="header">
//         <h1>Chagas Disease Detection System</h1>
//         <p className="subtitle">Advanced Parasitic Detection through Blood Smear Analysis</p>
//       </header>

//       <section className="upload-section">
//         <h2>Upload Blood Smear Image</h2>
//         <form onSubmit={handleSubmit} className="upload-form">
//           <div className="file-input-container">
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="file-input"
//             />
//             <button type="submit" className="submit-button">
//               Analyze Image
//             </button>
//           </div>
//           {previewUrl && (
//             <div className="image-preview">
//               <h3>Selected Image Preview:</h3>
//               <img src={previewUrl} alt="Preview" />
//             </div>
//           )}
//         </form>
//       </section>

//       <section className="demo-section">
//         <h2>How It Works</h2>
//         <p className="demo-description">
//           Our advanced AI model analyzes blood smear images to detect and highlight potential Trypanosoma cruzi parasites,
//           helping healthcare professionals in diagnosis.
//         </p>
//         <div className="demo-container">
//           <div className="demo-image-container">
//             <h3>Original Blood Smear</h3>
//             <div className="demo-image">
//               <img src="/1.jpg" alt="Original blood smear sample" />
//               <div className="image-caption">
//                 Blood smear sample viewed under microscope
//               </div>
//             </div>
//           </div>
//           <div className="demo-arrow">→</div>
//           <div className="demo-image-container">
//             <h3>AI Detection Result</h3>
//             <div className="demo-image">
//               <img src="/image.jpg" alt="Detection result with highlighted parasites" />
//               <div className="image-caption">
//                 Parasites detected and highlighted by our AI model
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="carousel-section">
//         <h2>About Chagas Disease</h2>
//         <div className="carousel-container">
//           <button className="carousel-button prev" onClick={prevSlide}>❮</button>
//           {carouselData.map((slide, index) => (
//             <div
//               key={index}
//               className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
//             >
//               <h3 className="carousel-title">{slide.title}</h3>
//               <p className="carousel-content">{slide.content}</p>
//             </div>
//           ))}
//           <button className="carousel-button next" onClick={nextSlide}>❯</button>
          
//           <div className="carousel-nav">
//             {carouselData.map((_, index) => (
//               <div
//                 key={index}
//                 className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
//                 onClick={() => goToSlide(index)}
//               />
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default LandingPage; 