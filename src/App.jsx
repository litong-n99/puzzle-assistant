import { useRef, useState } from 'react'
import cv from "@techstark/opencv-js";
import './App.css'
import imgFeatureMatch from './utils/imgFeatureMatch';

window.cv = cv;

const useUploadImg = () => {
  const imgInputRef = useRef();
  const [imgSrc, setImgSrc] = useState();
  const uploadImg = () => {
    const file = imgInputRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setImgSrc(e.target.result);
    }
  }
  return [imgInputRef, uploadImg, imgSrc];
}

function App() {
  const [bigImgInputRef, uploadBigImg, bigImgSrc] = useUploadImg();
  const [pieceImgInputRef, uploadPieceImg, pieceImgSrc] = useUploadImg();

  const bigImgRef = useRef();
  const pieceImgRef = useRef();
  const canvasRef = useRef();
  const [canvasWH, setCanvasWH] = useState({
    width: 0,
    height: 0
  });

  const onLoadBigImg = () => {
    setCanvasWH({
      width: bigImgRef.current.width,
      height: bigImgRef.current.height
    })
  }

  return (
    <>
      <div>
        <p>Upload Big Image</p>
        <input ref={bigImgInputRef} type='file' onChange={uploadBigImg} accept='image/*' capture="camera" />
        {
          bigImgSrc && <img ref={bigImgRef} onLoad={onLoadBigImg} src={bigImgSrc} />
        }
      </div>
      <div>
        <p>Upload Piece Image</p>
        <input ref={pieceImgInputRef} type='file' onChange={uploadPieceImg} accept='image/*' capture="camera" />
        {
          pieceImgSrc && <img ref={pieceImgRef} src={pieceImgSrc} />
        }
      </div>
      <div>
        <button onClick={() => imgFeatureMatch(bigImgRef.current, pieceImgRef.current, canvasRef.current)}>Find</button>
      </div>
      <div>
        <canvas className='matchCanvas' ref={canvasRef} width={canvasWH.width} height={canvasWH.height}></canvas>
      </div>
    </>
  )
}

export default App
