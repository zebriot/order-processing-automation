import React, { useRef, useState, useEffect } from "react";

export const DragToUpload = () => {
  const drop = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [over, setOver] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOver(false);
    if (e.dataTransfer) {
      const { files } = e.dataTransfer;
      if (files && files.length) {
        setFile(files[0]);
      }
    }
  };

  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOver(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOver(false);
  };

  const handleBrowse = () => {
    fileInputRef.current?.click();
  };

  const resetInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      setFile(undefined);
    }
  };

  useEffect(() => {
    if (!drop.current) return;
    drop.current.addEventListener("dragover", handleDragOver);
    drop.current.addEventListener("drop", handleDrop);
    drop.current.addEventListener("dragenter", handleDragEnter);
    drop.current.addEventListener("dragleave", handleDragLeave);

    return () => {
      drop.current?.removeEventListener("dragover", handleDragOver);
      drop.current?.removeEventListener("drop", handleDrop);
      drop.current?.removeEventListener("dragenter", handleDragEnter);
      drop.current?.removeEventListener("dragleave", handleDragLeave);
    };
  }, [drop]);

  return (
    <>
      <p className="header-1 mt-5">Upload Your PDF</p>
      <p className="descriptive-1">Make sure to use the provided template.</p>
      <div ref={drop} className="drag-container" onClick={handleBrowse}>
        {over ? (
          <div className="flex flex-col items-center justify-center align-middle">
            <img src="/svg/loader.svg" className="rotating h-24 w-24 " />
            <p className=" text-primary-600 font-medium text-sm mt-3">
              Drop To Upload
            </p>
          </div>
        ) : (
          <>
            <div className="home_upload-cloud-icon-container">
              <img src="/svg/add-svg.svg" className="h-10 w-10" />
            </div>

            <p
              style={{
                fontFamily: "Inter",
                fontWeight: "500",
                fontSize: "13px",
                lineHeight: "19px",
                color: "#98A2B3",
                textAlign: "center",
                letterSpacing: "-0.16px",
              }}
              className="cursor-pointer"
            >
              <span className=" text-primary-600">Click to upload </span>or, or
              drag and drop
              <br />
              PDF (max. 10MB)
            </p>
          </>
        )}
        <input
          type="file"
          name="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files?.[0])}
          placeholder=""
          style={{ display: "none" }}
          aria-selected={false}
          ref={fileInputRef}
        />
      </div>

      {file?.name && (
        <div className="home-step-uploaded-csv-container relative mt-3">
          <img src="/svg/pdf.svg" className=" h-8 w-8 mr-3" />
          <div>
            <p
              style={{
                fontFamily: "Inter",
                fontWeight: "500",
                fontSize: "13px",
                lineHeight: "19px",
                color: "#101828",
              }}
            >
              {file?.name}
            </p>
            <p
              style={{
                fontFamily: "Inter",
                fontWeight: "500",
                fontSize: "11px",
                lineHeight: "15px",
              }}
              className=" text-primary-500"
            >
              {(file?.size / 1024).toFixed(2)} KB
            </p>
          </div>
          <img
            src="/svg/x.svg"
            className=" absolute right-3 w-5 h-5 cursor-pointer"
            color={"#52b788"}
            onClick={resetInput}
          />
        </div>
      )}
    </>
  );
};
