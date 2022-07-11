import {  LegacyRef, useEffect, useLayoutEffect, useRef, useState } from "react"
import "./style.css";
import classNames from 'classnames';
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
import { ICropperDialog } from "../types";


export const CropperDialog : React.FC<ICropperDialog> = ({
    onChanged,
    field,
    error,
    touched,
    value,
    aspectRation=1/1
}) => {

    const [show, setShow] = useState<boolean>(false);
    const [currentImage, setCurrentImage] = useState("https://play-lh.googleusercontent.com/CWzqShf8hi-AhV9dUjzsqk2URzdIv8Vk2LmxBzf-Hc8T-oGkLVXe6pMpcXv36ofpvtc");
    const [image, setImage] = useState<string>("");
    const [cropperObj, setCropperObj] = useState<Cropper>();
    const imgRef = useRef<HTMLImageElement>();
    const imgPrev = useRef<HTMLImageElement>();

    useEffect(() => {
        if(imgRef.current)
        {
            const cropper = new Cropper(imgRef.current as HTMLImageElement, {
                viewMode: 1,
                aspectRatio: 1/1,
                preview: imgPrev.current
            });
            setCropperObj(cropper);
        }
    }, [])

   const handleImageSelect = (e: React.FormEvent<HTMLInputElement>) => {
       let file = (e.currentTarget.files as FileList)[0];
        console.log("Select image cropper", file);
        if(file){
            const url=URL.createObjectURL(file);
            console.log("url show image", url);
            setShow(true);
            setImage(url);
            cropperObj?.replace(url);
    }
    e.currentTarget.value = "";
   }
   const toggleModal = () =>{
       setShow(prev=>!prev);
   }
const handleSelectImage = ()=>{
    //console.log("Оберіть фото");
    const base64 = cropperObj?.getCroppedCanvas().toDataURL() as string;
    //console.log(base64);
    onChanged(field, base64);
    setCurrentImage(base64);
    toggleModal();
}

    return(
        <>
      <label htmlFor="image">
        <img
          style={{ cursor: "pointer" }}
          src={currentImage}
          width="150"
          alt="Оберіть фото"
        />
      </label>
      <input
        type="file"
        className="d-none"
        accept="image/*" 
        id="image"
        onChange={handleImageSelect}
      />

{error && <div className="alert alert-danger" role="alert">
    {error}
</div>}

      <div className={classNames("modal fade show", { "custom-modal": show })}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal title</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={toggleModal}
              ></button>
            </div>
            <div className="modal-body">
                <div className="row">
                    <div className="col-md-8 col-lg-9">
                        <div className="d-flex justify-content-center">
                            <img
                            style={{ cursor: "pointer" }}
                            src={image}
                            ref={imgRef as LegacyRef<HTMLImageElement>}
                            width="100%"
                            alt="Оберіть фото"
                            />
                        </div>                    
                    </div>
                    <div className="col-md-4 col-lg-3 ">
                    <div className="d-flex justify-content-center">    
                    <div
                        ref={imgPrev as LegacyRef<HTMLDivElement>}
                        style={{
                        height: "150px",
                        width: "150px",
                        border: "1px solid silver",
                        overflow: "hidden",
                      }}
                    ></div>
                    </div>
                    </div>
                </div>
              
              <p>Modal body text goes here.</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={toggleModal}
              >
                Скасувати
              </button>
              <button type="button" onClick={handleSelectImage} className="btn btn-primary">
                Обрізати фото
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
    )       
}