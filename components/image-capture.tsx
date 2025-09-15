"use client";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  image?: string | null;
}

export function ImageCapture({ image = null }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraActive, setCameraActive] = useState(!image);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  // Function to capture image
  function captureImage() {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height,
        );

        const imageSrc = canvasRef.current.toDataURL("image/png");
        return imageSrc;
      }
    }
  }

  // Expose the captureImage method
  ImageCapture.captureImage = captureImage;

  // Start camera when component mounts or when cameraActive changes
  useEffect(() => {
    if (cameraActive) {
      navigator.mediaDevices
        .getUserMedia({
          video: { facingMode: "environment" },
        })
        .then((mediaStream) => {
          mediaStreamRef.current = mediaStream;
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
          }
        })
        .catch(() => {
          toast.error("Could not start camera, please try again.");
        });
    }

    // Cleanup function to stop camera when component unmounts
    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
      }
    };
  }, [cameraActive]);

  // Update cameraActive when image prop changes
  useEffect(() => {
    setCameraActive(!image);
  }, [image]);

  return (
    <div className="space-y-2">
      {image ? (
        <img src={image} alt="Preview" className="max-h-64 border rounded-md" />
      ) : (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full max-h-64 border rounded-md"
          />
          <canvas ref={canvasRef} style={{ display: "none" }} />
        </>
      )}
    </div>
  );
}

// Initialize static method
ImageCapture.captureImage = (): string | undefined => "";
