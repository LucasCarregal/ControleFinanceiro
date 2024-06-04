"use client";

export default function Container({ children, ...props }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2 px-20 dark:bg-gray-800">
      {children}
    </div>
  );
}
