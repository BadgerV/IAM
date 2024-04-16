import "./uploadFiles.css";

//importing nessesary imports
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Link, useNavigate } from "react-router-dom";
import FileUploadModal from "../../components/FileUploadModal/FileUploadModal";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { CreateFile } from "../../redux/slices/fileSlice";
import { FileData } from "../../utils/types";
import { calculateFileSize } from "../../utils/helpers";

const UploadFiles = () => {
  const [formData, setFormData] = useState<FileData>({
    file_name: "",
    file_size: "",
    folder_id: null,
    category_id: null,
    description: "",
    file: null,
  });
  //declaring dispatch
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (formData.file) {
      const fileSize = calculateFileSize(formData.file);
      setFormData((prevFormData) => ({
        ...prevFormData,
        file_size: fileSize,
        file_name: prevFormData.file.name,
      }));
    }
  }, [formData.file]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleSubmit = async () => {
    const result = await dispatch(CreateFile(formData));

    console.log(result);
  };

  //react dropzone config
  const onDrop = useCallback((acceptedFiles: any) => {
    // Do something with the files
    console.log("accepted files = ", acceptedFiles);
    setFormData((prevFormData) => ({
      ...prevFormData,
      file: acceptedFiles[0],
    }));
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  //mock loading state
  const [isLoading, setIsLoading] = useState(false);

  //usenavigate for navigation
  const navigate = useNavigate();
  return (
    <div className="file-upload-content">
      <div className="file-upload-absolute">
        {isLoading && <FileUploadModal setIsLoading={setIsLoading} />}
      </div>
      <Link className="file-upload-upper" to="/">
        <img src="/assets/arrow-left.png" alt="Back" />
        <span>Back to overview</span>
      </Link>

      <div className="file-upload-content">
        <span className="upload-files-text">Upload Files</span>

        <div className="file-upload-input-container" {...getRootProps()}>
          <input {...getInputProps()} />
          <img src="/assets/folder.png" alt="Folder" />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag and drop files here or browse </p>
          )}
        </div>

        <div className="file-upload-buttons-container">
          <button className="cancel-button" onClick={() => navigate("/")}>
            Cancel
          </button>
          <button
            className="upload-button"
            onClick={() => {
              setIsLoading(true);
              handleSubmit();
            }}
          >
            Upload File
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadFiles;
