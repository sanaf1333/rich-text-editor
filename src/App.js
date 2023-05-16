import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Carousel, Button } from 'antd';

function App() {
  const [content, setContent] = useState('');
  const [showContent, setShowContent] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const carouselRef = useRef();

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleSubmit = () => {
    setShowContent(true);

    const images = document.querySelectorAll('img');
    const urls = [];
    images.forEach((image) => {
      image.style.width = '200px';
      image.style.height = '200px';
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 200;
      canvas.height = 200;
      ctx.drawImage(image, 0, 0, 200, 200);
      urls.push(canvas.toDataURL());
    });
    setImageUrls(urls);
  };

  const toolbarOptions = [
    ['bold', 'italic'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
  ];

  useEffect(() => {
    if (showContent) {
      const images = document.querySelectorAll('img');
      if (images.length > 2) {
        images.forEach((image) => {
          image.style.removeProperty('width');
          image.style.removeProperty('height');
        });
      }
    }
  }, [showContent]);
  

  const handlePrev = () => {
    carouselRef.current.prev();
  };

  const handleNext = () => {
    carouselRef.current.next();
  };

  return (
    <div style={{width: "700px"}}>
      <h1>React Quill Example</h1>
      <ReactQuill
        value={content}
        onChange={handleContentChange}
        modules={{ toolbar: toolbarOptions }}
      />

      <button onClick={handleSubmit}>Submit</button>

      {showContent && (
        <div>
          <h2>Entered Content:</h2>
          <div dangerouslySetInnerHTML={{ __html: content }}></div>
          {imageUrls.length > 2 && (
            <Carousel ref={carouselRef} className="ql-carousel">
              {imageUrls.map((url, index) => (
                <div key={index}>
                  <img src={url} alt={`Image ${index}`} />
                </div>
              ))}
            </Carousel>
          )}
        </div>
      )}

      {showContent && imageUrls.length > 2 && (
        <div>
          <Button.Group>
            <Button onClick={handlePrev}>Prev</Button>
            <Button onClick={handleNext}>Next</Button>
          </Button.Group>
        </div>
      )}
    </div>
  );
}

export default App;
