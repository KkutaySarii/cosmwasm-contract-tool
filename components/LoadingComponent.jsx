import React from "react";

function LoadingComponent() {
  return (
    <div className="flex mx-auto items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  );
}

export default LoadingComponent;
